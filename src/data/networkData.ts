import { Vendor, ComponentData } from "../types";

export type NetworkConfig = {
  id: string;
  name: string;
  vendor: Vendor;
  description: string;
  components: Record<string, ComponentData>;
};

export const networkData: NetworkConfig[] = [
  {
    id: "nv_infiniband",
    name: "InfiniBand Fat-Tree (NVIDIA SuperPOD)",
    vendor: "NVIDIA",
    description: "A non-blocking 3-tier Clos (Fat-Tree) network topology used in massive AI clusters to provide high-bandwidth, low-latency communication between thousands of GPUs.",
    components: {
      asic: {
        title: "Quantum-2 Switch ASIC",
        desc: "The core silicon chip inside the switch that processes and routes network packets at wire speed.",
        cost: "Est. $5,000 (Chip only)",
        manufacturer: { name: "TSMC / NVIDIA", url: "https://www.nvidia.com" },
        category: "asic",
        quantity: 1,
        stats: [
          { label: "Throughput", value: "25.6 Tb/s" },
          { label: "Process Node", value: "7nm" },
          { label: "Transistors", value: "54 Billion" },
        ],
      },
      switch: {
        title: "Quantum-2 QM9700 Switch",
        desc: "The complete switch equipment (chassis, power supplies, cooling, and the ASIC) used at the Leaf and Spine layers.",
        cost: "Est. $25,000",
        manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
        category: "switch",
        quantity: 1,
        stats: [
          { label: "Ports", value: "64x 400Gb/s OSFP" },
          { label: "Latency", value: "<130ns" },
          { label: "Form Factor", value: "1U Rackmount" },
        ],
      },
      nic: {
        title: "ConnectX-7 SmartNIC / BlueField-3 DPU",
        desc: "The Network Interface Card installed in the compute node. Connects the GPU directly to the network via RDMA (GPUDirect).",
        cost: "Est. $2,500",
        manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
        category: "nic",
        quantity: 1,
        stats: [
          { label: "Speed", value: "400 Gbps" },
          { label: "Interface", value: "PCIe Gen5 x16" },
          { label: "Features", value: "RDMA, RoCE v2" },
        ],
      },
      optic: {
        title: "800G OSFP Optical Transceiver",
        desc: "Pluggable optical modules that convert electrical signals from the switch/NIC into pulses of light for fiber optic cables.",
        cost: "Est. $1,500 each",
        manufacturer: { name: "Coherent / InnoLight", url: "https://www.innolight.com" },
        category: "optic",
        quantity: 2,
        stats: [
          { label: "Form Factor", value: "OSFP" },
          { label: "Reach", value: "Up to 500m (DR8)" },
          { label: "Power", value: "16W per module" },
        ],
      },
    },
  },
  {
    id: "amd_roce",
    name: "Ultra Ethernet / RoCEv2 (AMD/Broadcom)",
    vendor: "AMD",
    description: "An open standard Ethernet-based network topology using RoCEv2, heavily relying on Broadcom Tomahawk switches for AI scale-out.",
    components: {
      asic: {
        title: "Broadcom Tomahawk 5 ASIC",
        desc: "The industry-leading Ethernet switch silicon used in top-of-rack and spine switches for AI clusters.",
        cost: "Est. $6,000 (Chip only)",
        manufacturer: { name: "Broadcom", url: "https://www.broadcom.com" },
        category: "asic",
        quantity: 1,
        stats: [
          { label: "Throughput", value: "51.2 Tb/s" },
          { label: "Process Node", value: "5nm" },
          { label: "Features", value: "Cognitive Routing" },
        ],
      },
      switch: {
        title: "Arista 7060X5 / Celestica Switch",
        desc: "The physical switch equipment powered by the Tomahawk 5 ASIC, providing massive radix for Leaf/Spine tiers.",
        cost: "Est. $30,000",
        manufacturer: { name: "Arista Networks", url: "https://www.arista.com" },
        category: "switch",
        quantity: 1,
        stats: [
          { label: "Ports", value: "64x 800Gb/s OSFP" },
          { label: "Latency", value: "<800ns" },
          { label: "OS", value: "EOS / SONiC" },
        ],
      },
      nic: {
        title: "Broadcom Thor 2 NIC",
        desc: "High-performance Ethernet NIC supporting RoCEv2 for direct memory access across the network.",
        cost: "Est. $2,000",
        manufacturer: { name: "Broadcom", url: "https://www.broadcom.com" },
        category: "nic",
        quantity: 1,
        stats: [
          { label: "Speed", value: "400 Gbps" },
          { label: "Interface", value: "PCIe Gen5 x16" },
          { label: "Protocol", value: "RoCEv2" },
        ],
      },
      optic: {
        title: "800G QSFP-DD Transceiver",
        desc: "High-speed optical transceivers used to connect the NICs to the Leaf switches and Leaf switches to Spine switches.",
        cost: "Est. $1,200 each",
        manufacturer: { name: "Eoptolink / Lumentum", url: "https://www.eoptolink.com" },
        category: "optic",
        quantity: 2,
        stats: [
          { label: "Form Factor", value: "QSFP-DD" },
          { label: "Reach", value: "Up to 2km (FR4)" },
          { label: "Power", value: "14W per module" },
        ],
      },
    },
  },
  {
    id: "google_ocs",
    name: "Optical Circuit Switch (Google TPU)",
    vendor: "Google",
    description: "Google's proprietary network architecture using MEMS-based Optical Circuit Switches (OCS) to dynamically reconfigure the 3D Torus topology without converting light to electricity.",
    components: {
      asic: {
        title: "TPU v5p Network Interface (NCI)",
        desc: "Unlike NVIDIA/AMD, Google integrates the network interface directly onto the TPU package, eliminating the need for a separate NIC.",
        cost: "Included in TPU",
        manufacturer: { name: "Google", url: "https://cloud.google.com/tpu" },
        category: "asic",
        quantity: 1,
        stats: [
          { label: "Throughput", value: "4800 Gbps" },
          { label: "Integration", value: "On-Package" },
          { label: "Topology", value: "3D Torus" },
        ],
      },
      switch: {
        title: "Palomar OCS (Optical Circuit Switch)",
        desc: "A completely passive optical switch using microscopic mirrors (MEMS) to bounce light between ports. No electrical switching involved.",
        cost: "Proprietary",
        manufacturer: { name: "Google", url: "https://cloud.google.com" },
        category: "switch",
        quantity: 1,
        stats: [
          { label: "Ports", value: "136x136 mirrors" },
          { label: "Latency", value: "Speed of Light" },
          { label: "Power", value: "Near Zero (Passive)" },
        ],
      },
      nic: {
        title: "Titan / Mount Evans DPU",
        desc: "Used for host networking and storage access, separate from the TPU-to-TPU interconnect network.",
        cost: "Proprietary",
        manufacturer: { name: "Google / Intel", url: "https://cloud.google.com" },
        category: "nic",
        quantity: 1,
        stats: [
          { label: "Speed", value: "200 Gbps" },
          { label: "Function", value: "Storage & Host Net" },
        ],
      },
      optic: {
        title: "Google Custom Optical Transceiver",
        desc: "Custom-designed optics that connect the TPUs directly to the OCS. They use multiple wavelengths (WDM) to maximize fiber capacity.",
        cost: "Proprietary",
        manufacturer: { name: "Google", url: "https://cloud.google.com" },
        category: "optic",
        quantity: 2,
        stats: [
          { label: "Technology", value: "Silicon Photonics" },
          { label: "Multiplexing", value: "WDM" },
          { label: "Reliability", value: "High (Circulators)" },
        ],
      },
    },
  }
];
