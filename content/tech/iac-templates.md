# Infrastructure as Code Templates

## Overview

This document provides production-ready Infrastructure as Code (IaC) templates for Terraform, Kubernetes YAML, and Helm charts for common infrastructure patterns.

## Terraform Templates

### VPC Module

```hcl
# modules/vpc/main.tf

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "main-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}

resource "aws_subnet" "public" {
  count             = length(var.public_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block         = var.public_subnet_cidrs[count.index]
  availability_zone  = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count            = length(var.private_subnet_cidrs)
  vpc_id           = aws_vpc.main.id
  cidr_block       = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "private-subnet-${count.index + 1}"
  }
}

resource "aws_nat_gateway" "main" {
  count         = length(aws_subnet.public)
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = {
    Name = "nat-gateway-${count.index + 1}"
  }
}

resource "aws_eip" "nat" {
  count  = length(aws_subnet.public)
  domain = "vpc"

  tags = {
    Name = "nat-eip-${count.index + 1}"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "public-rt"
  }
}

resource "aws_route_table" "private" {
  count  = length(aws_subnet.private)
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }

  tags = {
    Name = "private-rt-${count.index + 1}"
  }
}

resource "aws_route_table_association" "public" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = length(aws_subnet.private)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}
```

### BGP EVPN Data Center Fabric Module

```hcl
# modules/dc-fabric/main.tf

variable "spine_asn" {
  description = "ASN for spine switches"
  type        = number
  default     = 65000
}

variable "leaf_asns" {
  description = "ASNs for leaf switches"
  type        = list(number)
}

variable "route_reflector_ip" {
  description = "IP address of route reflector"
  type        = string
}

resource "aws_network_interface" "spine" {
  count           = 2
  subnet_id       = aws_subnet.fabric[count.index].id
  private_ips     = ["10.0.${count.index + 1}.10"]
  security_groups = [aws_security_group.fabric.id]

  tags = {
    Name = "spine-${count.index + 1}"
  }
}

resource "aws_network_interface" "leaf" {
  count           = length(var.leaf_asns)
  subnet_id       = aws_subnet.fabric[count.index % 2].id
  private_ips     = ["10.0.${count.index % 2 + 1}.${count.index + 20}"]
  security_groups = [aws_security_group.fabric.id]

  tags = {
    Name = "leaf-${count.index + 1}"
  }
}

# BGP configuration would be applied via configuration management
# (Ansible, etc.) after infrastructure provisioning
```

### Cloud Interconnect Module

```hcl
# modules/cloud-interconnect/main.tf

variable "connection_bandwidth" {
  description = "Bandwidth of the connection"
  type        = string
  default     = "10Gbps"
}

variable "location" {
  description = "AWS Direct Connect location"
  type        = string
}

resource "aws_dx_connection" "main" {
  name      = "main-dx-connection"
  bandwidth = var.connection_bandwidth
  location  = var.location
}

resource "aws_dx_lag" "main" {
  name                  = "main-dx-lag"
  connections_bandwidth = var.connection_bandwidth
  location              = var.location
  number_of_connections = 2
}

resource "aws_dx_private_virtual_interface" "main" {
  connection_id = aws_dx_connection.main.id
  name          = "main-vif"
  vlan          = 100
  address_family = "ipv4"
  bgp_asn       = 65000

  tags = {
    Name = "main-vif"
  }
}
```

### Kubernetes Cluster Provisioning

```hcl
# modules/eks-cluster/main.tf

variable "cluster_name" {
  description = "Name of the EKS cluster"
  type        = string
}

variable "cluster_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.28"
}

variable "node_groups" {
  description = "Map of node group configurations"
  type = map(object({
    instance_types = list(string)
    capacity_type  = string
    min_size       = number
    max_size       = number
    desired_size   = number
  }))
}

resource "aws_eks_cluster" "main" {
  name     = var.cluster_name
  role_arn = aws_iam_role.cluster.arn
  version  = var.cluster_version

  vpc_config {
    subnet_ids = var.subnet_ids
  }

  depends_on = [
    aws_iam_role_policy_attachment.cluster_policy,
  ]
}

resource "aws_eks_node_group" "main" {
  for_each        = var.node_groups
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = each.key
  node_role_arn   = aws_iam_role.node.arn
  subnet_ids      = var.subnet_ids

  instance_types = each.value.instance_types
  capacity_type  = each.value.capacity_type

  scaling_config {
    min_size     = each.value.min_size
    max_size     = each.value.max_size
    desired_size = each.value.desired_size
  }

  depends_on = [
    aws_iam_role_policy_attachment.node_policy,
  ]
}
```

## Kubernetes YAML

### CNI Configuration (Cilium)

```yaml
# k8s/cni/cilium-config.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: cilium-config
  namespace: kube-system
data:
  # Enable BGP for external routing
  enable-bgp-control-plane: "true"
  
  # Enable SR-IOV for high-performance networking
  enable-sriov: "true"
  
  # Enable eBPF-based load balancing
  enable-bpf-masquerade: "true"
  
  # Enable Hubble for observability
  enable-hubble: "true"
  hubble-listen-address: ":4244"
  hubble-metrics-server: ":9965"
```

### GPU Scheduling (NVIDIA Device Plugin)

```yaml
# k8s/gpu/nvidia-device-plugin.yaml

apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: nvidia-device-plugin-daemonset
  namespace: kube-system
spec:
  selector:
    matchLabels:
      name: nvidia-device-plugin-ds
  updateStrategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        name: nvidia-device-plugin-ds
    spec:
      tolerations:
      - key: nvidia.com/gpu
        operator: Exists
        effect: NoSchedule
      priorityClassName: "system-node-critical"
      containers:
      - image: nvcr.io/nvidia/k8s-device-plugin:v0.14.1
        name: nvidia-device-plugin-ctr
        env:
        - name: FAIL_ON_INIT_ERROR
          value: "false"
        securityContext:
          allowPrivilegeEscalation: false
          capabilities:
            drop: ["ALL"]
        volumeMounts:
        - name: device-plugin
          mountPath: /var/lib/kubelet/device-plugins
      volumes:
      - name: device-plugin
        hostPath:
          path: /var/lib/kubelet/device-plugins
```

### StorageClass for NVMe-oF

```yaml
# k8s/storage/nvmeof-storageclass.yaml

apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: nvmeof
provisioner: nvmeof.csi.openebs.io
parameters:
  replicas: "3"
  poolType: "striped"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
```

## Helm Charts

### Prometheus + Grafana Stack

```yaml
# helm/prometheus-stack/values.yaml

prometheus:
  enabled: true
  prometheusSpec:
    retention: 30d
    storageSpec:
      volumeClaimTemplate:
        spec:
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 100Gi

grafana:
  enabled: true
  adminPassword: "admin"
  persistence:
    enabled: true
    size: 10Gi
  dashboardProviders:
    dashboardproviders.yaml:
      apiVersion: 1
      providers:
      - name: 'default'
        orgId: 1
        folder: ''
        type: file
        disableDeletion: false
        editable: true
        options:
          path: /var/lib/grafana/dashboards/default
```

### Fluent Bit

```yaml
# helm/fluent-bit/values.yaml

image:
  repository: fluent/fluent-bit
  tag: "2.1.0"

config:
  service: |
    [SERVICE]
        Flush         1
        Log_Level     info
        Daemon        off
        Parsers_File  parsers.conf

  inputs: |
    [INPUT]
        Name              tail
        Path              /var/log/containers/*.log
        Parser            docker
        Tag               kube.*
        Refresh_Interval  5

  outputs: |
    [OUTPUT]
        Name  loki
        Match *
        Host  loki.loki.svc
        Port  3100
        Labels job=fluentbit
```

### ArgoCD GitOps

```yaml
# helm/argocd/values.yaml

configs:
  params:
    server.insecure: true
    application.instanceLabelKey: argocd.argoproj.io/instance

server:
  service:
    type: LoadBalancer
  ingress:
    enabled: true
    ingressClassName: nginx
    hosts:
      - argocd.example.com

repoServer:
  resources:
    limits:
      cpu: 1000m
      memory: 1Gi
    requests:
      cpu: 500m
      memory: 512Mi
```

## Best Practices

1. **Version Control**: Store all IaC templates in version control
2. **Modularity**: Create reusable modules and components
3. **Testing**: Validate templates before production deployment
4. **Documentation**: Document all variables and outputs
5. **Security**: Follow security best practices (least privilege, encryption)
6. **Cost Management**: Use tags and cost allocation tags
7. **State Management**: Use remote state with locking
8. **CI/CD Integration**: Automate infrastructure deployment

