import { VendorConfig } from "../types";

export const vendorConfigs: Record<string, VendorConfig> = {
  NVIDIA: {
    name: "NVIDIA",
    color: "#76b900",
    gpus: {
      A100: {
        id: "A100",
        name: "A100",
        generation: "Ampere",
        process: "TSMC 7nm",
        layout: "single",
        hbmStacks: 6,
        components: {
          package: {
            title: "A100 Package",
            desc: "The first GPU to feature Multi-Instance GPU (MIG) technology, built on the Ampere architecture.",
            cost: "Est. $10,000",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "Transistors", value: "54.2B" },
              { label: "Die Size", value: "826 mm²" },
              { label: "TDP", value: "400W" },
            ],
          },
          die: {
            title: "Ampere GA100 Die",
            desc: "Massive monolithic die featuring 3rd Gen Tensor Cores and TF32 support.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "SMs", value: "108" },
              { label: "FP32 Performance", value: "19.5 TFLOPS" },
              { label: "FP8 Performance", value: "Not Supported" },
              { label: "Efficiency", value: "0.05 TFLOPS/W" },
            ],
          },
          hbm: {
            title: "HBM2e Subsystem",
            desc: "6 stacks of HBM2e providing high bandwidth for data-intensive workloads.",
            cost: "Est. $2,000",
            manufacturer: { name: "Samsung / SK Hynix", url: "https://www.samsung.com" },
            stats: [
              { label: "Total Memory", value: "80 GB" },
              { label: "Bandwidth", value: "2.0 TB/s" },
              { label: "Bus Width", value: "5120-bit" },
            ],
          },
          nvlink: {
            title: "NVLink 3.0",
            desc: "Third-generation interconnect for A100 clusters.",
            cost: "Included",
            manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
            stats: [
              { label: "Bandwidth", value: "600 GB/s" },
              { label: "Links", value: "12" },
            ],
          },
        },
      },
      H100: {
        id: "H100",
        name: "H100",
        generation: "Hopper",
        process: "TSMC 4N",
        layout: "single",
        hbmStacks: 6,
        components: {
          package: {
            title: "H100 Package",
            desc: "Hopper architecture introducing the Transformer Engine for massive LLM acceleration.",
            cost: "Est. $25,000",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "Transistors", value: "80B" },
              { label: "Die Size", value: "814 mm²" },
              { label: "TDP", value: "700W" },
            ],
          },
          die: {
            title: "Hopper GH100 Die",
            desc: "Monolithic die with 4th Gen Tensor Cores and DPX instructions.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "SMs", value: "132" },
              { label: "FP32 Performance", value: "67 TFLOPS" },
              { label: "FP8 Performance", value: "4,000 TFLOPS" },
              { label: "Efficiency", value: "5.71 TFLOPS/W" },
            ],
          },
          hbm: {
            title: "HBM3 Subsystem",
            desc: "6 stacks of HBM3 memory providing a massive leap in bandwidth.",
            cost: "Est. $4,000",
            manufacturer: { name: "SK Hynix", url: "https://www.skhynix.com" },
            stats: [
              { label: "Total Memory", value: "80 GB" },
              { label: "Bandwidth", value: "3.35 TB/s" },
              { label: "Stacks", value: "6" },
            ],
          },
          nvlink: {
            title: "NVLink 4.0",
            desc: "Fourth-generation interconnect.",
            cost: "Included",
            manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
            stats: [
              { label: "Bandwidth", value: "900 GB/s" },
              { label: "Links", value: "18" },
            ],
          },
        },
      },
      H200: {
        id: "H200",
        name: "H200",
        generation: "Hopper",
        process: "TSMC 4N",
        layout: "single",
        hbmStacks: 6,
        components: {
          package: {
            title: "H200 Package",
            desc: "Upgraded Hopper GPU with HBM3e for enhanced memory capacity and bandwidth.",
            cost: "Est. $30,000",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "Transistors", value: "80B" },
              { label: "TDP", value: "700W" },
              { label: "Memory Type", value: "HBM3e" },
            ],
          },
          die: {
            title: "Hopper GH100 Die",
            desc: "Same powerful die as H100 but paired with faster memory.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "SMs", value: "132" },
              { label: "FP32 Performance", value: "67 TFLOPS" },
              { label: "FP8 Performance", value: "4,000 TFLOPS" },
              { label: "Efficiency", value: "5.71 TFLOPS/W" },
            ],
          },
          hbm: {
            title: "HBM3e Subsystem",
            desc: "6 stacks of ultra-fast HBM3e memory.",
            cost: "Est. $6,000",
            manufacturer: { name: "Micron / SK Hynix", url: "https://www.micron.com" },
            stats: [
              { label: "Total Memory", value: "141 GB" },
              { label: "Bandwidth", value: "4.8 TB/s" },
              { label: "Stacks", value: "6" },
            ],
          },
          nvlink: {
            title: "NVLink 4.0",
            desc: "High-speed interconnect for H200 clusters.",
            cost: "Included",
            manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
            stats: [
              { label: "Bandwidth", value: "900 GB/s" },
              { label: "Links", value: "18" },
            ],
          },
        },
      },
      B100: {
        id: "B100",
        name: "B100",
        generation: "Blackwell",
        process: "TSMC 4NP",
        layout: "dual",
        hbmStacks: 8,
        components: {
          package: {
            title: "B100 Package",
            desc: "Dual-reticle design with 208 billion transistors, manufactured on TSMC 4NP process.",
            cost: "Est. $30,000 - $35,000",
            manufacturer: { name: "TSMC (Foundry)", url: "https://www.tsmc.com" },
            stats: [
              { label: "Transistors", value: "208B" },
              { label: "TDP", value: "700W" },
              { label: "Total Memory", value: "192 GB HBM3e" },
            ],
          },
          die0: {
            title: "Compute Die 0",
            desc: "One half of the Blackwell GPU, featuring 5th Gen Tensor Cores.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "SMs", value: "96" },
              { label: "FP32 Performance", value: "30 TFLOPS" },
              { label: "FP8 Performance", value: "1.75 PFLOPS" },
              { label: "Efficiency", value: "5.0 TFLOPS/W" },
            ],
          },
          die1: {
            title: "Compute Die 1",
            desc: "The second half of the Blackwell GPU, perfectly symmetrical to Die 0.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "SMs", value: "96" },
              { label: "FP32 Performance", value: "30 TFLOPS" },
              { label: "FP8 Performance", value: "1.75 PFLOPS" },
              { label: "Efficiency", value: "5.0 TFLOPS/W" },
            ],
          },
          hbi: {
            title: "NV-HBI",
            desc: "Ultra-fast die-to-die interconnect (10 TB/s).",
            cost: "Proprietary",
            manufacturer: { name: "TSMC (CoWoS-L)", url: "https://www.tsmc.com" },
            stats: [
              { label: "Bandwidth", value: "10 TB/s" },
              { label: "Latency", value: "Ultra-low" },
              { label: "Coherency", value: "Full Cache" },
            ],
          },
          hbm: {
            title: "HBM3e Subsystem",
            desc: "8 stacks of HBM3e memory.",
            cost: "Est. $7,000",
            manufacturer: { name: "SK Hynix / Micron", url: "https://www.skhynix.com" },
            stats: [
              { label: "Total Memory", value: "192 GB" },
              { label: "Bandwidth", value: "8.0 TB/s" },
              { label: "Stacks", value: "8" },
            ],
          },
          nvlink: {
            title: "NVLink 5.0",
            desc: "Fifth-generation interconnect.",
            cost: "Included",
            manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
            stats: [
              { label: "Bandwidth", value: "1.8 TB/s" },
              { label: "Links", value: "18" },
            ],
          },
        },
      },
      B200: {
        id: "B200",
        name: "B200",
        generation: "Blackwell",
        process: "TSMC 4NP",
        layout: "dual",
        hbmStacks: 8,
        components: {
          package: {
            title: "B200 Package",
            desc: "Full-performance Blackwell GPU with higher TDP and clock speeds.",
            cost: "Est. $40,000",
            manufacturer: { name: "TSMC (Foundry)", url: "https://www.tsmc.com" },
            stats: [
              { label: "Transistors", value: "208B" },
              { label: "TDP", value: "1000W" },
              { label: "Total Memory", value: "192 GB HBM3e" },
            ],
          },
          die0: {
            title: "Compute Die 0",
            desc: "High-clock Blackwell compute die.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "SMs", value: "96" },
              { label: "FP32 Performance", value: "45 TFLOPS" },
              { label: "FP8 Performance", value: "4.5 PFLOPS" },
              { label: "Efficiency", value: "9.0 TFLOPS/W" },
            ],
          },
          die1: {
            title: "Compute Die 1",
            desc: "High-clock Blackwell compute die.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "SMs", value: "96" },
              { label: "FP32 Performance", value: "45 TFLOPS" },
              { label: "FP8 Performance", value: "4.5 PFLOPS" },
              { label: "Efficiency", value: "9.0 TFLOPS/W" },
            ],
          },
          hbi: {
            title: "NV-HBI",
            desc: "10 TB/s die-to-die bridge.",
            cost: "Proprietary",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "Bandwidth", value: "10 TB/s" },
              { label: "Latency", value: "Ultra-low" },
            ],
          },
          hbm: {
            title: "HBM3e Subsystem",
            desc: "8 stacks of HBM3e.",
            cost: "Est. $8,000",
            manufacturer: { name: "SK Hynix", url: "https://www.skhynix.com" },
            stats: [
              { label: "Total Memory", value: "192 GB" },
              { label: "Bandwidth", value: "8.0 TB/s" },
              { label: "Stacks", value: "8" },
            ],
          },
          nvlink: {
            title: "NVLink 5.0",
            desc: "1.8 TB/s interconnect.",
            cost: "Included",
            manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
            stats: [
              { label: "Bandwidth", value: "1.8 TB/s" },
              { label: "Links", value: "18" },
            ],
          },
        },
      },
      B300: {
        id: "B300",
        name: "B300",
        generation: "Blackwell Ultra",
        process: "TSMC 4NP",
        layout: "dual",
        hbmStacks: 12,
        components: {
          package: {
            title: "B300 (Blackwell Ultra)",
            desc: "The ultimate Blackwell iteration with expanded memory capacity.",
            cost: "Est. $50,000+",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "Transistors", value: "208B+" },
              { label: "TDP", value: "1200W" },
              { label: "Total Memory", value: "288 GB HBM3e" },
            ],
          },
          die0: {
            title: "Compute Die 0",
            desc: "Blackwell Ultra compute die.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "SMs", value: "96" },
              { label: "FP32 Performance", value: "45 TFLOPS" },
              { label: "FP8 Performance", value: "4.5 PFLOPS" },
              { label: "Efficiency", value: "7.5 TFLOPS/W" },
            ],
          },
          die1: {
            title: "Compute Die 1",
            desc: "Blackwell Ultra compute die.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "SMs", value: "96" },
              { label: "FP32 Performance", value: "45 TFLOPS" },
              { label: "FP8 Performance", value: "4.5 PFLOPS" },
              { label: "Efficiency", value: "7.5 TFLOPS/W" },
            ],
          },
          hbi: {
            title: "NV-HBI",
            desc: "10 TB/s bridge.",
            cost: "Proprietary",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [{ label: "Bandwidth", value: "10 TB/s" }],
          },
          hbm: {
            title: "HBM3e Subsystem",
            desc: "12 stacks of HBM3e memory (12-high stacks).",
            cost: "Est. $12,000",
            manufacturer: { name: "SK Hynix / Micron", url: "https://www.skhynix.com" },
            stats: [
              { label: "Total Memory", value: "288 GB" },
              { label: "Bandwidth", value: "8.0 TB/s" },
              { label: "Stacks", value: "12" },
            ],
          },
          nvlink: {
            title: "NVLink 5.0",
            desc: "1.8 TB/s interconnect.",
            cost: "Included",
            manufacturer: { name: "NVIDIA", url: "https://www.nvidia.com" },
            stats: [
              { label: "Bandwidth", value: "1.8 TB/s" },
              { label: "Links", value: "18" },
            ],
          },
        },
      },
    }
  },
  AMD: {
    name: "AMD",
    color: "#ed1c24",
    gpus: {
      MI250X: {
        id: "MI250X",
        name: "Instinct MI250X",
        generation: "CDNA 2",
        process: "TSMC 6nm",
        layout: "dual",
        hbmStacks: 8,
        components: {
          package: {
            title: "MI250X Package",
            desc: "Dual-die architecture based on CDNA 2, featuring 2.5D packaging.",
            cost: "Est. $15,000",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "Transistors", value: "58B" },
              { label: "TDP", value: "560W" },
              { label: "Memory", value: "128GB HBM2e" },
            ],
          },
          die0: {
            title: "GCD 0",
            desc: "Graphics Compute Die 0, one of the two main compute engines.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "CUs", value: "110" },
              { label: "FP32 Performance", value: "47.9 TFLOPS" },
              { label: "FP8 Performance", value: "Not Supported" },
              { label: "Efficiency", value: "0.17 TFLOPS/W" },
            ],
          },
          die1: {
            title: "GCD 1",
            desc: "Graphics Compute Die 1, symmetrical to GCD 0.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "CUs", value: "110" },
              { label: "FP32 Performance", value: "47.9 TFLOPS" },
              { label: "FP8 Performance", value: "Not Supported" },
              { label: "Efficiency", value: "0.17 TFLOPS/W" },
            ],
          },
          hbi: {
            title: "Infinity Fabric Link",
            desc: "Ultra-fast die-to-die interconnect.",
            cost: "Proprietary",
            manufacturer: { name: "AMD", url: "https://www.amd.com" },
            stats: [
              { label: "Bandwidth", value: "400 GB/s" },
              { label: "Coherency", value: "Full" },
            ],
          },
          hbm: {
            title: "HBM2e Subsystem",
            desc: "8 stacks of HBM2e memory (4 per GCD).",
            cost: "Est. $3,000",
            manufacturer: { name: "Samsung / SK Hynix", url: "https://www.samsung.com" },
            stats: [
              { label: "Total Memory", value: "128 GB" },
              { label: "Bandwidth", value: "3.2 TB/s" },
              { label: "Stacks", value: "8" },
            ],
          },
          nvlink: {
            title: "Infinity Fabric",
            desc: "External interconnect for multi-GPU scaling.",
            cost: "Included",
            manufacturer: { name: "AMD", url: "https://www.amd.com" },
            stats: [
              { label: "Bandwidth", value: "800 GB/s" },
              { label: "Links", value: "8" },
            ],
          },
        },
      },
      MI300X: {
        id: "MI300X",
        name: "Instinct MI300X",
        generation: "CDNA 3",
        process: "TSMC 5nm/6nm",
        layout: "chiplet",
        hbmStacks: 8,
        components: {
          package: {
            title: "MI300X Package",
            desc: "World's first 3D chiplet GPU for AI, featuring 153 billion transistors.",
            cost: "Est. $20,000 - $25,000",
            manufacturer: { name: "TSMC (CoWoS-S)", url: "https://www.tsmc.com" },
            stats: [
              { label: "Transistors", value: "153B" },
              { label: "TDP", value: "750W" },
              { label: "Memory", value: "192GB HBM3" },
            ],
          },
          die: {
            title: "XCD Grid (8 Dies)",
            desc: "8 Accelerator Complex Dies (XCDs) stacked on 4 I/O Dies (IODs).",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "Total CUs", value: "304" },
              { label: "FP32 Performance", value: "163 TFLOPS" },
              { label: "FP8 Performance", value: "2.6 PFLOPS" },
              { label: "Efficiency", value: "3.47 TFLOPS/W" },
            ],
          },
          hbm: {
            title: "HBM3 Subsystem",
            desc: "8 stacks of HBM3 memory providing industry-leading capacity.",
            cost: "Est. $6,000",
            manufacturer: { name: "SK Hynix", url: "https://www.skhynix.com" },
            stats: [
              { label: "Total Memory", value: "192 GB" },
              { label: "Bandwidth", value: "5.3 TB/s" },
              { label: "Stacks", value: "8" },
            ],
          },
          nvlink: {
            title: "Infinity Fabric 4.0",
            desc: "Fourth-generation Infinity Fabric for massive throughput.",
            cost: "Included",
            manufacturer: { name: "AMD", url: "https://www.amd.com" },
            stats: [
              { label: "Bandwidth", value: "896 GB/s" },
              { label: "Links", value: "7" },
            ],
          },
        },
      },
      MI325X: {
        id: "MI325X",
        name: "Instinct MI325X",
        generation: "CDNA 3",
        process: "TSMC 5nm/6nm",
        layout: "chiplet",
        hbmStacks: 8,
        components: {
          package: {
            title: "MI325X Package",
            desc: "Enhanced MI300X with ultra-fast HBM3e memory.",
            cost: "Est. $30,000+",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "Transistors", value: "153B" },
              { label: "TDP", value: "750W" },
              { label: "Memory", value: "256GB HBM3e" },
            ],
          },
          die: {
            title: "XCD Grid (8 Dies)",
            desc: "Optimized CDNA 3 compute grid.",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "Total CUs", value: "304" },
              { label: "FP32 Performance", value: "163 TFLOPS" },
              { label: "FP8 Performance", value: "2.6 PFLOPS" },
              { label: "Efficiency", value: "3.47 TFLOPS/W" },
            ],
          },
          hbm: {
            title: "HBM3e Subsystem",
            desc: "8 stacks of HBM3e memory.",
            cost: "Est. $10,000",
            manufacturer: { name: "SK Hynix / Micron", url: "https://www.skhynix.com" },
            stats: [
              { label: "Total Memory", value: "256 GB" },
              { label: "Bandwidth", value: "6.0 TB/s" },
              { label: "Stacks", value: "8" },
            ],
          },
          nvlink: {
            title: "Infinity Fabric 4.0",
            desc: "High-speed interconnect.",
            cost: "Included",
            manufacturer: { name: "AMD", url: "https://www.amd.com" },
            stats: [
              { label: "Bandwidth", value: "896 GB/s" },
              { label: "Links", value: "7" },
            ],
          },
        },
      },
    }
  },
  Google: {
    name: "Google",
    color: "#4285F4",
    gpus: {
      TPU_v5p: {
        id: "TPU_v5p",
        name: "TPU v5p",
        generation: "v5",
        process: "TSMC 5nm",
        layout: "single",
        hbmStacks: 4,
        components: {
          package: {
            title: "TPU v5p Package",
            desc: "Google's most powerful and scalable AI accelerator.",
            cost: "Internal Use Only",
            manufacturer: { name: "Google / TSMC", url: "https://cloud.google.com/tpu" },
            stats: [
              { label: "Memory", value: "95GB HBM3" },
              { label: "Bandwidth", value: "2.76 TB/s" },
            ],
          },
          die: {
            title: "v5p Compute Die",
            desc: "Features dual Matrix Multiply Units (MXUs).",
            cost: "Integrated",
            manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
            stats: [
              { label: "FP32 Performance", value: "114 TFLOPS" },
              { label: "BF16 Performance", value: "459 TFLOPS" },
              { label: "Efficiency", value: "Unknown" },
            ],
          },
          hbm: {
            title: "HBM3 Subsystem",
            desc: "4 stacks of high-bandwidth memory.",
            cost: "Integrated",
            manufacturer: { name: "Unknown", url: "" },
            stats: [
              { label: "Total Memory", value: "95 GB" },
              { label: "Bandwidth", value: "2.76 TB/s" },
            ],
          },
          nvlink: {
            title: "Inter-Core Interconnect (ICI)",
            desc: "Google's custom 3D torus network interconnect.",
            cost: "Included",
            manufacturer: { name: "Google", url: "https://cloud.google.com/tpu" },
            stats: [
              { label: "Bandwidth", value: "4,800 Gbps" },
              { label: "Topology", value: "3D Torus" },
            ],
          },
        }
      }
    }
  }
};
