# SONiC Configuration Examples

## Overview

This document provides comprehensive SONiC configuration examples for common deployment scenarios, including PFC (Priority Flow Control), ECN (Explicit Congestion Notification), buffer tuning, and EVPN-VXLAN setup.

## PFC (Priority Flow Control) Configuration

### Per-Queue PFC Settings

```bash
# Enable PFC on specific queues (e.g., queue 3 and 4 for RoCE traffic)
# Configure via config_db.json

{
    "PORT_QOS_MAP": {
        "Ethernet0": {
            "pfc_enable": "3,4"
        },
        "Ethernet4": {
            "pfc_enable": "3,4"
        }
    },
    "QUEUE": {
        "Ethernet0|3": {
            "wred_profile": "AZURE_LOW",
            "ecn": "ecn_all"
        },
        "Ethernet0|4": {
            "wred_profile": "AZURE_LOW",
            "ecn": "ecn_all"
        }
    }
}
```

### PFC Watchdog Configuration

```bash
# Enable PFC watchdog to detect and handle PFC storms
# /etc/sonic/config_db.json

{
    "PFC_WD": {
        "GLOBAL": {
            "POLL_INTERVAL": "200",
            "DETECTION_TIME": "2000",
            "RESTORATION_TIME": "200",
            "ACTION": "drop"
        },
        "PORT": {
            "Ethernet0": {
                "enabled": "true"
            }
        }
    }
}
```

### CLI Configuration

```bash
# Configure PFC via SONiC CLI
config pfc asymmetric on Ethernet0 3,4
config pfc watchdog enable Ethernet0
config pfc watchdog restore-time 200
config pfc watchdog detection-time 2000
```

## ECN (Explicit Congestion Notification) Configuration

### ECN Thresholds

```bash
# Configure ECN thresholds for congestion management
# config_db.json

{
    "WRED_PROFILE": {
        "AZURE_LOW": {
            "red_max_threshold": "2097152",
            "wred_green_enable": "true",
            "ecn": "ecn_all",
            "red_min_threshold": "1048576",
            "wred_yellow_enable": "true",
            "wred_red_enable": "true"
        }
    },
    "QUEUE": {
        "Ethernet0|3": {
            "wred_profile": "AZURE_LOW",
            "ecn": "ecn_all"
        }
    }
}
```

### AQM (Active Queue Management) Parameters

```bash
# Advanced AQM configuration for DCQCN
# config_db.json

{
    "AQM": {
        "Ethernet0": {
            "ecn": "ecn_all",
            "red_max_threshold": "2097152",
            "red_min_threshold": "1048576",
            "wred_green_enable": "true",
            "wred_yellow_enable": "true",
            "wred_red_enable": "true"
        }
    }
}
```

## Buffer Tuning

### Ingress Buffer Configuration

```bash
# Configure ingress buffer pools and profiles
# config_db.json

{
    "BUFFER_POOL": {
        "ingress_lossless_pool": {
            "type": "ingress",
            "mode": "static",
            "size": "139458560",
            "xoff": "20971520"
        },
        "ingress_lossy_pool": {
            "type": "ingress",
            "mode": "dynamic",
            "size": "139458560"
        }
    },
    "BUFFER_PROFILE": {
        "ingress_lossless_profile": {
            "pool": "ingress_lossless_pool",
            "size": "2097152",
            "dynamic_th": "0",
            "xoff": "2097152",
            "xon": "2097152"
        }
    }
}
```

### Egress Buffer Configuration

```bash
# Configure egress buffer pools
# config_db.json

{
    "BUFFER_POOL": {
        "egress_lossless_pool": {
            "type": "egress",
            "mode": "static",
            "size": "139458560"
        },
        "egress_lossy_pool": {
            "type": "egress",
            "mode": "dynamic",
            "size": "139458560"
        }
    }
}
```

### Dynamic Threshold Models

```bash
# Configure dynamic threshold for adaptive buffer allocation
# config_db.json

{
    "BUFFER_PROFILE": {
        "dynamic_profile": {
            "pool": "ingress_lossy_pool",
            "size": "0",
            "dynamic_th": "7"
        }
    }
}
```

## EVPN-VXLAN Configuration

### L2VNI (Layer 2 VNI) Configuration

```bash
# Configure Layer 2 VXLAN Network Identifier
# config_db.json

{
    "VXLAN_TUNNEL": {
        "vxlan_tunnel_1": {
            "src_ip": "10.1.1.1"
        }
    },
    "VXLAN_TUNNEL_MAP": {
        "vxlan_tunnel_1|map_1000": {
            "vni": "1000",
            "vlan": "Vlan1000"
        }
    },
    "VLAN": {
        "Vlan1000": {
            "vlanid": "1000"
        }
    },
    "VLAN_MEMBER": {
        "Vlan1000|Ethernet0": {
            "tagging_mode": "untagged"
        }
    }
}
```

### L3VNI (Layer 3 VNI) Configuration

```bash
# Configure Layer 3 VXLAN Network Identifier for inter-VNI routing
# config_db.json

{
    "VXLAN_TUNNEL": {
        "vxlan_tunnel_1": {
            "src_ip": "10.1.1.1"
        }
    },
    "VXLAN_TUNNEL_MAP": {
        "vxlan_tunnel_1|map_5000": {
            "vni": "5000",
            "vlan": "Vlan5000"
        }
    },
    "VLAN": {
        "Vlan5000": {
            "vlanid": "5000"
        }
    },
    "VLAN_INTERFACE": {
        "Vlan5000": {
            "proxy_arp": "enabled"
        }
    }
}
```

### VTEP (VXLAN Tunnel Endpoint) Configuration

```bash
# Configure VTEP for VXLAN encapsulation
# config_db.json

{
    "VXLAN_TUNNEL": {
        "vxlan_tunnel_1": {
            "src_ip": "10.1.1.1"
        }
    },
    "VXLAN_TUNNEL_MAP": {
        "vxlan_tunnel_1|map_1000": {
            "vni": "1000",
            "vlan": "Vlan1000"
        }
    }
}
```

### BGP EVPN Configuration

```bash
# Configure BGP for EVPN control plane
# config_db.json

{
    "BGP_NEIGHBOR": {
        "10.2.2.2": {
            "asn": "65000",
            "rr_client": "true"
        }
    },
    "BGP_EVPN": {
        "enabled": "true"
    }
}
```

### Route Reflector Configuration

```bash
# Configure BGP route reflector for EVPN
# config_db.json

{
    "DEVICE_METADATA": {
        "localhost": {
            "bgp_asn": "65000",
            "rr_client": "true"
        }
    },
    "BGP_NEIGHBOR": {
        "10.2.2.2": {
            "asn": "65000",
            "rr_client": "true"
        }
    }
}
```

## Real-World Example: Complete Leaf Switch Configuration

```bash
# Complete configuration for a leaf switch in EVPN-VXLAN fabric
# config_db.json

{
    "DEVICE_METADATA": {
        "localhost": {
            "hostname": "leaf01",
            "bgp_asn": "65001"
        }
    },
    "LOOPBACK_INTERFACE": {
        "Loopback0": {
            "ip": "10.1.1.1/32"
        }
    },
    "VXLAN_TUNNEL": {
        "vxlan_tunnel_1": {
            "src_ip": "10.1.1.1"
        }
    },
    "VXLAN_TUNNEL_MAP": {
        "vxlan_tunnel_1|map_1000": {
            "vni": "1000",
            "vlan": "Vlan1000"
        },
        "vxlan_tunnel_1|map_2000": {
            "vni": "2000",
            "vlan": "Vlan2000"
        }
    },
    "VLAN": {
        "Vlan1000": {
            "vlanid": "1000"
        },
        "Vlan2000": {
            "vlanid": "2000"
        }
    },
    "VLAN_MEMBER": {
        "Vlan1000|Ethernet0": {
            "tagging_mode": "untagged"
        },
        "Vlan2000|Ethernet4": {
            "tagging_mode": "untagged"
        }
    },
    "BGP_NEIGHBOR": {
        "10.0.0.1": {
            "asn": "65000",
            "rr_client": "true"
        },
        "10.0.0.2": {
            "asn": "65000",
            "rr_client": "true"
        }
    },
    "BGP_EVPN": {
        "enabled": "true"
    },
    "PORT_QOS_MAP": {
        "Ethernet0": {
            "pfc_enable": "3,4"
        }
    },
    "BUFFER_POOL": {
        "ingress_lossless_pool": {
            "type": "ingress",
            "mode": "static",
            "size": "139458560",
            "xoff": "20971520"
        }
    }
}
```

## CLI Commands Reference

```bash
# Apply configuration
config load -y /path/to/config_db.json

# View current configuration
show runningconfiguration

# View PFC status
show pfc counters

# View buffer pool status
show buffer pool

# View VXLAN tunnels
show vxlan tunnel

# View EVPN routes
show bgp evpn route

# View BGP neighbors
show bgp neighbors
```

## Best Practices

1. **Start with Defaults**: Begin with default configurations and tune as needed
2. **Test in Lab**: Validate configurations in lab environment first
3. **Document Changes**: Maintain detailed change logs
4. **Monitor Performance**: Track metrics after configuration changes
5. **Backup Configurations**: Keep backups of working configurations

