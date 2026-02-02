# Benchmarking Scripts and Recipes

## Overview

This document provides comprehensive benchmarking scripts and recipes for network, storage, and compute performance validation. These benchmarks are essential for validating AI/ML infrastructure performance.

## fio (Flexible I/O Tester)

### Random Read/Write Profile

```bash
#!/bin/bash
# benchmarks/fio/random-rw.sh

# Random read/write benchmark
fio --name=random-rw \
    --ioengine=libaio \
    --iodepth=32 \
    --rw=randrw \
    --bs=4k \
    --direct=1 \
    --size=100G \
    --numjobs=4 \
    --runtime=300 \
    --group_reporting \
    --time_based \
    --filename=/dev/nvme0n1 \
    --output=random-rw-results.json \
    --output-format=json
```

### Sequential Training Data Pipeline Profile

```bash
#!/bin/bash
# benchmarks/fio/sequential-training.sh

# Sequential read/write for training data pipeline
fio --name=sequential-training \
    --ioengine=libaio \
    --iodepth=16 \
    --rw=readwrite \
    --bs=1M \
    --direct=1 \
    --size=500G \
    --numjobs=8 \
    --runtime=600 \
    --group_reporting \
    --time_based \
    --filename=/dev/nvme0n1 \
    --output=sequential-training-results.json \
    --output-format=json
```

### NVMe-cli Scripts

```bash
#!/bin/bash
# benchmarks/nvme/nvme-benchmark.sh

# NVMe device information
nvme id-ctrl /dev/nvme0n1

# NVMe read benchmark
nvme read /dev/nvme0n1 --start-block=0 --block-count=1000 --data-size=4096 --data=/tmp/nvme-read.bin

# NVMe write benchmark
nvme write /dev/nvme0n1 --start-block=0 --block-count=1000 --data-size=4096 --data=/tmp/nvme-write.bin

# NVMe performance test
nvme perf /dev/nvme0n1 --io-size=4096 --io-depth=32 --read-percent=70 --run-time=300
```

## iperf3

### RoCE Validation Mode

```bash
#!/bin/bash
# benchmarks/network/roce-validation.sh

# Server side (on GPU node)
iperf3 -s -p 5201

# Client side (on storage node)
iperf3 -c <server-ip> -p 5201 \
    --udp \
    --bandwidth 100G \
    --time 300 \
    --parallel 8 \
    --bind <client-ip> \
    --client <server-ip>
```

### Multi-Stream Testing

```bash
#!/bin/bash
# benchmarks/network/multi-stream.sh

# Server side
iperf3 -s -p 5201 &
iperf3 -s -p 5202 &
iperf3 -s -p 5203 &
iperf3 -s -p 5204 &

# Client side - parallel streams
for port in 5201 5202 5203 5204; do
    iperf3 -c <server-ip> -p $port \
        --bandwidth 25G \
        --time 300 \
        --parallel 4 &
done
wait
```

## NCCL (NVIDIA Collective Communications Library)

### All-Reduce Test Patterns

```python
# benchmarks/nccl/allreduce-test.py

import torch
import torch.distributed as dist
import os

def setup(rank, world_size):
    os.environ['MASTER_ADDR'] = 'localhost'
    os.environ['MASTER_PORT'] = '12355'
    dist.init_process_group("nccl", rank=rank, world_size=world_size)

def cleanup():
    dist.destroy_process_group()

def allreduce_benchmark(rank, world_size):
    setup(rank, world_size)
    
    # Create tensor on GPU
    tensor = torch.ones(1000000).cuda(rank)
    
    # Warmup
    for _ in range(10):
        dist.all_reduce(tensor, op=dist.ReduceOp.SUM)
    
    # Benchmark
    import time
    start = time.time()
    for _ in range(100):
        dist.all_reduce(tensor, op=dist.ReduceOp.SUM)
    end = time.time()
    
    if rank == 0:
        print(f"All-reduce time: {(end - start) / 100 * 1000:.2f} ms")
    
    cleanup()

if __name__ == "__main__":
    import torch.multiprocessing as mp
    world_size = 8
    mp.spawn(allreduce_benchmark, args=(world_size,), nprocs=world_size, join=True)
```

### GPU Cluster Validation

```bash
#!/bin/bash
# benchmarks/nccl/gpu-cluster-validation.sh

# Test NCCL communication
python -m torch.distributed.launch \
    --nproc_per_node=8 \
    --nnodes=4 \
    --node_rank=0 \
    --master_addr=<master-ip> \
    --master_port=29500 \
    allreduce-test.py

# Validate GPU topology
nvidia-smi topo -m

# Test bandwidth between GPUs
nccl-tests/build/all_reduce_perf -b 1G -e 10G -f 2 -g 8
```

## PTP/Timing

### Offset Measurements

```bash
#!/bin/bash
# benchmarks/ptp/offset-measurement.sh

# Start PTP daemon
ptp4l -i eth0 -m -f /etc/ptp4l.conf

# Monitor PTP offset
pmc -u -b 0 'GET CURRENT_DATA_SET'
pmc -u -b 0 'GET TIME_STATUS_NP'

# Measure offset over time
for i in {1..100}; do
    offset=$(pmc -u -b 0 'GET CURRENT_DATA_SET' | grep offsetFromMaster | awk '{print $2}')
    echo "$(date +%s.%N),$offset" >> ptp-offset.csv
    sleep 1
done
```

### Jitter Analysis

```bash
#!/bin/bash
# benchmarks/ptp/jitter-analysis.sh

# Capture PTP packets
tcpdump -i eth0 -w ptp-capture.pcap port 319 or port 320

# Analyze jitter
tshark -r ptp-capture.pcap -T fields -e frame.time_relative -e ptp.sync.originTimestamp.secondsField > ptp-timestamps.csv

# Calculate jitter
python3 << EOF
import pandas as pd
import numpy as np

df = pd.read_csv('ptp-timestamps.csv', names=['time', 'timestamp'])
df['jitter'] = df['timestamp'].diff()
print(f"Mean jitter: {df['jitter'].mean():.9f} seconds")
print(f"Std dev jitter: {df['jitter'].std():.9f} seconds")
print(f"Max jitter: {df['jitter'].max():.9f} seconds")
EOF
```

## Network Performance

### Latency Testing

```bash
#!/bin/bash
# benchmarks/network/latency-test.sh

# ICMP ping test
ping -c 1000 -i 0.001 <target-ip> | tee ping-results.txt

# TCP latency test
for i in {1..1000}; do
    time nc -zv <target-ip> 22
done | tee tcp-latency-results.txt
```

### Throughput Testing

```bash
#!/bin/bash
# benchmarks/network/throughput-test.sh

# UDP throughput
iperf3 -c <server-ip> -u -b 100G -t 60

# TCP throughput
iperf3 -c <server-ip> -t 60 -P 8
```

## Storage Performance

### NVMe-oF Performance

```bash
#!/bin/bash
# benchmarks/storage/nvmeof-test.sh

# Connect to NVMe-oF target
nvme connect -t tcp -a <target-ip> -s 4420 -n nqn.2014-08.org.nvmexpress.discovery

# List connected devices
nvme list

# Run fio on NVMe-oF device
fio --name=nvmeof-test \
    --filename=/dev/nvme1n1 \
    --ioengine=libaio \
    --iodepth=64 \
    --rw=randread \
    --bs=4k \
    --size=100G \
    --numjobs=4 \
    --runtime=300 \
    --group_reporting
```

## Best Practices

1. **Baseline First**: Establish baseline before optimization
2. **Isolate Variables**: Test one variable at a time
3. **Multiple Runs**: Run benchmarks multiple times for consistency
4. **Document Everything**: Record all parameters and results
5. **Compare Results**: Compare against industry benchmarks
6. **Monitor Resources**: Monitor CPU, memory, network during tests
7. **Production-like**: Use production-like workloads when possible

