import { ClusterConfig } from "../types";

export const clusterData: ClusterConfig[] = [
  {
    id: "meta_h100",
    name: "Standard H100 SuperPOD (Meta AI Style)",
    vendor: "NVIDIA",
    clusterType: "ai",
    totalGpus: "24,576 GPUs",
    computePower: "24.5 ExaFLOPS (FP8)",
    interconnect: "InfiniBand (400Gbps)",
    description: "A standard DGX H100 SuperPOD architecture used for training massive LLMs like Llama 3.",
    components: {
      gpu: {
        title: "NVIDIA H100 80GB SXM5",
        desc: "The core AI accelerator. 8 of these are installed per compute node.",
        cost: "Est. $30,000 each",
        manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
        category: "gpu",
        quantity: 8,
        stats: [
          { label: "Memory", value: "80GB HBM3" },
          { label: "TDP", value: "700W" },
          { label: "Form Factor", value: "SXM5" },
        ],
      },
      baseboard: {
        title: "HGX H100 Baseboard",
        desc: "The motherboard that houses the 8 GPUs and 4 NVSwitch ASICs for all-to-all GPU communication.",
        cost: "Est. $15,000 (Board only)",
        manufacturer: { name: "NVIDIA / Foxconn", url: "https://www.nvidia.com" },
        category: "baseboard",
        quantity: 1,
        stats: [
          { label: "NVSwitches", value: "4x NVSwitch 3" },
          { label: "Bandwidth", value: "900 GB/s per GPU" },
        ],
      },
      cpu: {
        title: "Intel Xeon Platinum 8480+",
        desc: "Dual Sapphire Rapids CPUs handle OS, storage I/O, and data preprocessing.",
        cost: "Est. $10,000 each",
        manufacturer: { name: "Intel", url: "https://www.intel.com" },
        category: "cpu",
        quantity: 2,
        stats: [
          { label: "Cores", value: "56 Cores" },
          { label: "PCIe", value: "Gen5 x16" },
        ],
      },
      nic: {
        title: "ConnectX-7 400Gb/s OSFP",
        desc: "Dedicated Network Interface Cards for RDMA/RoCE. 1 NIC per GPU for non-blocking network.",
        cost: "Est. $2,500 each",
        manufacturer: { name: "Mellanox (NVIDIA)", url: "https://www.nvidia.com" },
        category: "nic",
        quantity: 8,
        stats: [
          { label: "Speed", value: "400 Gbps" },
          { label: "Port", value: "OSFP" },
        ],
      },
      leaf_switch: {
        title: "Quantum-2 QM9700 Switch",
        desc: "Top-of-Rack (ToR) InfiniBand switch connecting the compute nodes to the spine.",
        cost: "Est. $25,000",
        manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
        category: "switch",
        quantity: 1,
        stats: [
          { label: "Ports", value: "64x 400Gb/s" },
          { label: "Latency", value: "<1us" },
        ],
      },
      cable: {
        title: "800G OSFP AOC Cables",
        desc: "Active Optical Cables connecting NICs to Leaf Switches.",
        cost: "Est. $1,000 each",
        manufacturer: { name: "Amphenol / Finisar", url: "https://www.amphenol.com" },
        category: "cable",
        quantity: 8,
        stats: [
          { label: "Length", value: "10m - 30m" },
          { label: "Type", value: "AOC Fiber" },
        ],
      },
    },
  },
  {
    id: "nvl72",
    name: "NVIDIA GB200 NVL72 Rack",
    vendor: "NVIDIA",
    clusterType: "ai",
    totalGpus: "72 GPUs per Rack",
    computePower: "1.4 ExaFLOPS (FP4)",
    interconnect: "NVLink Switch (130TB/s)",
    description: "A liquid-cooled rack-scale system that acts as a single massive GPU. Procurement is typically per-rack.",
    components: {
      gpu: {
        title: "GB200 Superchip (Bianca Board)",
        desc: "Contains 2x Blackwell B200 GPUs and 1x Grace CPU. 2 of these boards per compute tray.",
        cost: "Est. $70,000 per board",
        manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
        category: "gpu",
        quantity: 36,
        stats: [
          { label: "GPUs", value: "2x B200" },
          { label: "CPU", value: "1x Grace" },
          { label: "Memory", value: "384GB HBM3e" },
        ],
      },
      baseboard: {
        title: "GB200 Compute Tray",
        desc: "The 1U chassis containing the Bianca boards, liquid cold plates, and PCIe switches.",
        cost: "Est. $150,000",
        manufacturer: { name: "Foxconn / Quanta", url: "https://www.foxconn.com" },
        category: "baseboard",
        quantity: 18,
        stats: [
          { label: "Cooling", value: "Direct-to-Chip Liquid" },
          { label: "Power", value: "1200W per GPU" },
        ],
      },
      switch: {
        title: "NVLink Switch Tray",
        desc: "Houses 2x NVSwitch 5 ASICs. 9 of these trays connect all 72 GPUs in a non-blocking fabric.",
        cost: "Est. $50,000 each",
        manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
        category: "switch",
        quantity: 9,
        stats: [
          { label: "Bandwidth", value: "14.4 TB/s per tray" },
          { label: "ASICs", value: "2x NVSwitch 5" },
        ],
      },
      nic: {
        title: "ConnectX-8 SuperNIC",
        desc: "800Gb/s Ethernet NIC for scale-out networking between NVL72 racks.",
        cost: "Est. $3,500 each",
        manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
        category: "nic",
        quantity: 18,
        stats: [
          { label: "Speed", value: "800 Gbps" },
          { label: "Network", value: "Spectrum-X Ethernet" },
        ],
      },
      infrastructure: {
        title: "Rack CDU & Power Shelf",
        desc: "Cooling Distribution Unit (CDU) and 33kW Power Shelves required to run the 120kW rack.",
        cost: "Est. $100,000 per rack",
        manufacturer: { name: "Vertiv / Delta", url: "https://www.vertiv.com" },
        category: "infrastructure",
        quantity: 1,
        stats: [
          { label: "Total Power", value: "120kW" },
          { label: "Cooling", value: "Liquid-to-Liquid" },
        ],
      },
      cable: {
        title: "NVLink Copper Cartridges",
        desc: "Massive passive copper backplane connecting compute trays to switch trays.",
        cost: "Est. $40,000 per rack",
        manufacturer: { name: "Amphenol", url: "https://www.amphenol.com" },
        category: "cable",
        quantity: 1,
        stats: [
          { label: "Type", value: "Passive Copper" },
          { label: "Weight", value: "Heavy" },
        ],
      },
    },
  },
  {
    id: "amd_mi300x",
    name: "Standard MI300X 8-GPU Node",
    vendor: "AMD",
    clusterType: "ai",
    totalGpus: "8 GPUs per Node",
    computePower: "20.8 PFLOPS (FP8)",
    interconnect: "Infinity Fabric (896GB/s)",
    description: "The standard industry building block for AMD AI clusters, competing directly with the HGX H100.",
    components: {
      gpu: {
        title: "AMD Instinct MI300X OAM",
        desc: "The primary AI accelerator. 8 of these are installed on the Universal Baseboard (UBB).",
        cost: "Est. $20,000 each",
        manufacturer: { name: "AMD", url: "https://www.amd.com" },
        category: "gpu",
        quantity: 8,
        stats: [
          { label: "Memory", value: "192GB HBM3" },
          { label: "TDP", value: "750W" },
          { label: "Form Factor", value: "OAM" },
        ],
      },
      baseboard: {
        title: "OAM Universal Baseboard (UBB 2.0)",
        desc: "Houses the 8 GPUs and routes the Infinity Fabric links between them.",
        cost: "Est. $12,000",
        manufacturer: { name: "Supermicro / Gigabyte", url: "https://www.supermicro.com" },
        category: "baseboard",
        quantity: 1,
        stats: [
          { label: "Standard", value: "OCP OAM UBB" },
          { label: "Topology", value: "Fully Connected Ring" },
        ],
      },
      cpu: {
        title: "AMD EPYC 9654 (Genoa)",
        desc: "Dual 96-core CPUs to drive the PCIe Gen5 lanes to the GPUs and NICs.",
        cost: "Est. $11,800 each",
        manufacturer: { name: "AMD", url: "https://www.amd.com" },
        category: "cpu",
        quantity: 2,
        stats: [
          { label: "Cores", value: "96 Cores" },
          { label: "PCIe", value: "128x Gen5" },
        ],
      },
      nic: {
        title: "Broadcom BCM57508 400G",
        desc: "High-speed Ethernet NICs for RoCEv2 scale-out networking.",
        cost: "Est. $2,000 each",
        manufacturer: { name: "Broadcom", url: "https://www.broadcom.com" },
        category: "nic",
        quantity: 8,
        stats: [
          { label: "Speed", value: "400 Gbps" },
          { label: "Protocol", value: "RoCEv2" },
        ],
      },
      leaf_switch: {
        title: "Arista 7060X5 Tomahawk 4",
        desc: "High-radix 400G Ethernet switch for the leaf network.",
        cost: "Est. $20,000",
        manufacturer: { name: "Arista Networks", url: "https://www.arista.com" },
        category: "switch",
        quantity: 1,
        stats: [
          { label: "Ports", value: "64x 400GbE" },
          { label: "ASIC", value: "Broadcom Tomahawk 4" },
        ],
      },
    },
  },
  {
    id: "tpu_v5p_pod",
    name: "Google TPU v5p SuperPod",
    vendor: "Google",
    clusterType: "ai",
    totalGpus: "8,960 TPUs",
    computePower: "4.1 ExaFLOPS (BF16)",
    interconnect: "Optical Circuit Switch (OCS)",
    description: "Google's massive 3D torus topology cluster, dynamically reconfigurable via optical switches.",
    components: {
      gpu: {
        title: "TPU v5p Accelerator",
        desc: "Google's custom AI chip with dual MXUs.",
        cost: "Internal",
        manufacturer: { name: "Google", url: "https://cloud.google.com/tpu" },
        category: "gpu",
        quantity: 4,
        stats: [
          { label: "Memory", value: "95GB HBM3" },
          { label: "Interconnect", value: "4,800 Gbps ICI" },
        ]
      },
      baseboard: {
        title: "TPU v5p Baseboard",
        desc: "Houses 4 TPU v5p chips with liquid cooling.",
        cost: "Internal",
        manufacturer: { name: "Google", url: "https://cloud.google.com/tpu" },
        category: "baseboard",
        quantity: 1,
        stats: [
          { label: "Cooling", value: "Direct Liquid" },
          { label: "Topology", value: "3D Torus Node" },
        ]
      },
      cpu: {
        title: "Custom Host CPU",
        desc: "Handles data feeding and host operations for the TPUs.",
        cost: "Internal",
        manufacturer: { name: "Intel / AMD", url: "" },
        category: "cpu",
        quantity: 2,
        stats: [
          { label: "Role", value: "Data Preprocessing" }
        ]
      },
      switch: {
        title: "Optical Circuit Switch (OCS)",
        desc: "Palomar OCS dynamically routes connections between TPU racks using mirrors.",
        cost: "Internal",
        manufacturer: { name: "Google", url: "https://cloud.google.com/tpu" },
        category: "switch",
        quantity: 1,
        stats: [
          { label: "Technology", value: "MEMS Mirrors" },
          { label: "Latency", value: "Near-zero (Optical)" },
        ]
      },
      cable: {
        title: "Optical Fiber Bundles",
        desc: "Connects TPU racks to the OCS for flexible topology.",
        cost: "Internal",
        manufacturer: { name: "Various", url: "" },
        category: "cable",
        quantity: 4,
        stats: [
          { label: "Type", value: "Single-mode Fiber" }
        ]
      }
    }
  },
  {
    id: "frontier",
    name: "Frontier Supercomputer",
    vendor: "AMD",
    clusterType: "hpc",
    totalGpus: "37,888 GPUs",
    computePower: "1.102 ExaFLOPS (FP64)",
    interconnect: "Slingshot-11 (800 Gbps per node)",
    description: "The world's first Exascale supercomputer, optimized for high-precision scientific simulations.",
    components: {
      gpu: {
        title: "AMD Instinct MI250X",
        desc: "Dual-GCD compute accelerator optimized for FP64 math.",
        cost: "Est. $15,000",
        manufacturer: { name: "AMD", url: "https://www.amd.com" },
        category: "gpu",
        quantity: 4,
        stats: [
          { label: "Memory", value: "128GB HBM2e" },
          { label: "FP64", value: "47.9 TFLOPS" },
        ]
      },
      baseboard: {
        title: "HPE Cray EX Node Board",
        desc: "High-density liquid-cooled blade housing 1 CPU and 4 GPUs.",
        cost: "Est. $80,000",
        manufacturer: { name: "HPE", url: "https://www.hpe.com" },
        category: "baseboard",
        quantity: 1,
        stats: [
          { label: "Form Factor", value: "Liquid-cooled Blade" },
          { label: "Ratio", value: "1 CPU : 4 GPU" },
        ]
      },
      cpu: {
        title: "AMD EPYC 7A53 (Trento)",
        desc: "Custom 64-core CPU with optimized Infinity Fabric links to GPUs.",
        cost: "Est. $8,000",
        manufacturer: { name: "AMD", url: "https://www.amd.com" },
        category: "cpu",
        quantity: 1,
        stats: [
          { label: "Cores", value: "64 Cores" },
          { label: "Memory", value: "512GB DDR4" },
        ]
      },
      nic: {
        title: "HPE Slingshot-11 NIC",
        desc: "High-performance network interface for HPC workloads.",
        cost: "Est. $2,500",
        manufacturer: { name: "HPE", url: "https://www.hpe.com" },
        category: "nic",
        quantity: 4,
        stats: [
          { label: "Speed", value: "200 Gbps per NIC" },
          { label: "Total Node BW", value: "800 Gbps" },
        ]
      },
      switch: {
        title: "Slingshot-11 Switch",
        desc: "64-port switch ASIC forming a Dragonfly topology.",
        cost: "Est. $30,000",
        manufacturer: { name: "HPE", url: "https://www.hpe.com" },
        category: "switch",
        quantity: 1,
        stats: [
          { label: "Topology", value: "Dragonfly" },
          { label: "Ports", value: "64x 200Gbps" },
        ]
      },
      infrastructure: {
        title: "HPE Cray EX Cabinet",
        desc: "Houses 64 compute blades (256 GPUs) with direct liquid cooling.",
        cost: "Est. $2M+",
        manufacturer: { name: "HPE", url: "https://www.hpe.com" },
        category: "infrastructure",
        quantity: 1,
        stats: [
          { label: "Nodes", value: "64 per Cabinet" },
          { label: "Cooling", value: "Warm Water Liquid" },
        ]
      }
    }
  }
];
