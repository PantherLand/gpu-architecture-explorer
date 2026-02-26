import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Info, Network, Layers } from "lucide-react";

type ComponentData = {
  title: string;
  desc: string;
  cost: string;
  manufacturer: {
    name: string;
    url: string;
  };
  stats: { label: string; value: string }[];
};

type GPUConfig = {
  id: string;
  name: string;
  generation: string;
  process: string;
  layout: "single" | "dual";
  hbmStacks: number;
  components: Record<string, ComponentData>;
};

const gpuConfigs: Record<string, GPUConfig> = {
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
          { label: "FP8 Performance", value: "N/A (Ampere)" },
          { label: "FP32 Performance", value: "19.5 TFLOPS" },
          { label: "Tensor Cores", value: "432 (3rd Gen)" },
          { label: "Process Node", value: "7nm" },
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
          { label: "FP8 Performance", value: "4,000 TFLOPS" },
          { label: "FP32 Performance", value: "67 TFLOPS" },
          { label: "Tensor Cores", value: "528 (4th Gen)" },
          { label: "Process Node", value: "4nm (4N)" },
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
          { label: "FP8 Performance", value: "4,000 TFLOPS" },
          { label: "FP32 Performance", value: "67 TFLOPS" },
          { label: "Tensor Cores", value: "528 (4th Gen)" },
          { label: "Process Node", value: "4nm (4N)" },
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
          { label: "FP8 Performance", value: "3,500 TFLOPS" },
          { label: "FP32 Performance", value: "30 TFLOPS" },
          { label: "Tensor Cores", value: "640 (5th Gen)" },
          { label: "Process Node", value: "4nm (4NP)" },
          { label: "Efficiency", value: "10.0 TFLOPS/W" },
        ],
      },
      die1: {
        title: "Compute Die 1",
        desc: "The second half of the Blackwell GPU, perfectly symmetrical to Die 0.",
        cost: "Integrated",
        manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
        stats: [
          { label: "FP8 Performance", value: "3,500 TFLOPS" },
          { label: "FP32 Performance", value: "30 TFLOPS" },
          { label: "Tensor Cores", value: "640 (5th Gen)" },
          { label: "Process Node", value: "4nm (4NP)" },
          { label: "Efficiency", value: "10.0 TFLOPS/W" },
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
          { label: "FP8 Performance", value: "4,500 TFLOPS" },
          { label: "FP32 Performance", value: "40 TFLOPS" },
          { label: "Tensor Cores", value: "640 (5th Gen)" },
          { label: "Process Node", value: "4nm (4NP)" },
          { label: "Efficiency", value: "9.0 TFLOPS/W" },
        ],
      },
      die1: {
        title: "Compute Die 1",
        desc: "High-clock Blackwell compute die.",
        cost: "Integrated",
        manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
        stats: [
          { label: "FP8 Performance", value: "4,500 TFLOPS" },
          { label: "FP32 Performance", value: "40 TFLOPS" },
          { label: "Tensor Cores", value: "640 (5th Gen)" },
          { label: "Process Node", value: "4nm (4NP)" },
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
          { label: "FP8 Performance", value: "5,000 TFLOPS" },
          { label: "FP32 Performance", value: "45 TFLOPS" },
          { label: "Tensor Cores", value: "640 (5th Gen)" },
          { label: "Process Node", value: "4nm (4NP)" },
          { label: "Efficiency", value: "8.33 TFLOPS/W" },
        ],
      },
      die1: {
        title: "Compute Die 1",
        desc: "Blackwell Ultra compute die.",
        cost: "Integrated",
        manufacturer: { name: "TSMC", url: "https://www.tsmc.com" },
        stats: [
          { label: "FP8 Performance", value: "5,000 TFLOPS" },
          { label: "FP32 Performance", value: "45 TFLOPS" },
          { label: "Tensor Cores", value: "640 (5th Gen)" },
          { label: "Process Node", value: "4nm (4NP)" },
          { label: "Efficiency", value: "8.33 TFLOPS/W" },
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
};

export default function App() {
  const [activeGpu, setActiveGpu] = useState<string>("B100");
  const [activeComponent, setActiveComponent] = useState<string>("package");

  const config = gpuConfigs[activeGpu];
  const activeData = config.components[activeComponent] || config.components["package"];

  const handleGpuChange = (gpuId: string) => {
    setActiveGpu(gpuId);
    setActiveComponent("package");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans p-4 md:p-8 flex flex-col">
      {/* Header */}
      <header className="mb-8 border-b border-[#2a2a2a] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
            NVIDIA GPU <span className="text-[#76b900]">ARCHITECTURE</span> EXPLORER
          </h1>
          <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">
            Interactive Comparison // A100 to B300
          </p>
        </div>

        {/* GPU Tabs */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(gpuConfigs).map((gpuId) => (
            <button
              key={gpuId}
              onClick={() => handleGpuChange(gpuId)}
              className={`px-4 py-2 text-xs font-mono rounded border transition-all ${
                activeGpu === gpuId
                  ? "border-[#76b900] text-[#76b900] bg-[#76b900]/10 shadow-[0_0_15px_rgba(118,185,0,0.2)]"
                  : "border-[#2a2a2a] text-gray-500 hover:border-gray-400"
              }`}
            >
              {gpuId}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Diagram Area */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center relative min-h-[600px] tech-border rounded-xl p-8 overflow-hidden">
          {/* Legend / Controls */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-50">
            <button
              onMouseEnter={() => setActiveComponent("package")}
              className={`px-3 py-1 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                activeComponent === "package"
                  ? "border-[#76b900] text-[#76b900] bg-[#76b900]/10"
                  : "border-[#2a2a2a] text-gray-500 hover:border-gray-500"
              }`}
            >
              FULL PACKAGE
            </button>
            <button
              onMouseEnter={() => setActiveComponent("nvlink")}
              className={`px-3 py-1 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                activeComponent === "nvlink"
                  ? "border-[#76b900] text-[#76b900] bg-[#76b900]/10"
                  : "border-[#2a2a2a] text-gray-500 hover:border-gray-500"
              }`}
            >
              NVLINK
            </button>
          </div>

          {/* Architecture Badge */}
          <div className="absolute top-4 right-4 text-right">
            <div className="text-[#76b900] font-bold text-xl tracking-tight">{config.generation}</div>
            <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{config.process}</div>
          </div>

          {/* The Chip Diagram */}
          <div className="relative w-full max-w-3xl aspect-[16/10] flex flex-col items-center justify-center mt-8">
            {/* Package Outline */}
            <div
              className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 cursor-crosshair ${
                activeComponent === "package"
                  ? "border-[#76b900] bg-[#76b900]/5 shadow-[0_0_30px_rgba(118,185,0,0.1)]"
                  : "border-[#2a2a2a] bg-[#141414]"
              }`}
              onMouseEnter={() => setActiveComponent("package")}
            ></div>

            {/* Inner Layout */}
            <div className="relative z-10 w-full h-full p-6 md:p-12 flex flex-col gap-6">
              {/* Top Section: HBM + Dies + HBM */}
              <div className="flex-1 flex gap-4 md:gap-8 justify-center items-stretch">
                {/* Left HBM Stacks */}
                <div
                  className={`w-16 md:w-24 flex flex-col gap-2 transition-all duration-300 cursor-crosshair ${
                    activeComponent === "hbm" ? "scale-105" : "opacity-70"
                  }`}
                  onMouseEnter={() => setActiveComponent("hbm")}
                >
                  {Array.from({ length: Math.ceil(config.hbmStacks / 2) }).map((_, i) => (
                    <div
                      key={`hbm-l-${i}`}
                      className={`flex-1 rounded border hbm-block flex items-center justify-center transition-all duration-300 ${
                        activeComponent === "hbm"
                          ? "border-[#76b900] shadow-[0_0_10px_rgba(118,185,0,0.3)]"
                          : "border-[#333]"
                      }`}
                    >
                      <span className="text-[10px] font-mono text-gray-500 rotate-[-90deg]">HBM</span>
                    </div>
                  ))}
                </div>

                {/* Die Area */}
                <div className="flex-1 flex relative">
                  {config.layout === "single" ? (
                    /* Single Die Layout (A100, H100, H200) */
                    <div
                      className={`flex-1 rounded-xl border flex flex-col overflow-hidden transition-all duration-300 cursor-crosshair ${
                        activeComponent === "die"
                          ? "border-[#76b900] z-20 shadow-[0_0_20px_rgba(118,185,0,0.2)] bg-[#76b900]/5"
                          : "border-[#333] z-10 bg-[#1a1a1a]"
                      }`}
                      onMouseEnter={() => setActiveComponent("die")}
                    >
                      <div className="bg-[#222] text-center py-1 text-xs font-mono border-b border-[#333] text-gray-400 uppercase">
                        {config.generation} Die
                      </div>
                      <div className="flex-1 die-grid relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                          <Cpu size={80} className={activeComponent === "die" ? "text-[#76b900]" : "text-white"} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Dual Die Layout (B100, B200, B300) */
                    <div className="flex-1 flex relative">
                      {/* Die 0 */}
                      <div
                        className={`flex-1 rounded-l-xl border-y border-l flex flex-col overflow-hidden transition-all duration-300 cursor-crosshair ${
                          activeComponent === "die0"
                            ? "border-[#76b900] z-20 shadow-[0_0_20px_rgba(118,185,0,0.2)] bg-[#76b900]/5"
                            : "border-[#333] z-10 bg-[#1a1a1a]"
                        }`}
                        onMouseEnter={() => setActiveComponent("die0")}
                      >
                        <div className="bg-[#222] text-center py-1 text-[10px] font-mono border-b border-[#333] text-gray-400">
                          DIE 0
                        </div>
                        <div className="flex-1 die-grid relative">
                          <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <Cpu size={48} className={activeComponent === "die0" ? "text-[#76b900]" : "text-white"} />
                          </div>
                        </div>
                      </div>

                      {/* NV-HBI Bridge */}
                      <div
                        className={`w-12 md:w-20 -mx-2 z-30 flex flex-col justify-center items-center cursor-crosshair transition-all duration-300 ${
                          activeComponent === "hbi" ? "scale-110" : ""
                        }`}
                        onMouseEnter={() => setActiveComponent("hbi")}
                      >
                        <div
                          className={`h-3/4 w-full rounded border flex items-center justify-center bg-[#1a1a1a] transition-all duration-300 ${
                            activeComponent === "hbi" ? "border-[#76b900] shadow-[0_0_15px_rgba(118,185,0,0.4)]" : "border-[#444]"
                          }`}
                        >
                          <div className="flex flex-col gap-1 w-full px-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                              <div
                                key={`link-${i}`}
                                className={`h-0.5 w-full transition-all duration-300 ${
                                  activeComponent === "hbi" ? "bg-[#76b900]" : "bg-[#444]"
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div
                          className={`absolute text-[9px] font-mono bg-[#0a0a0a] px-1 rounded transition-all duration-300 ${
                            activeComponent === "hbi" ? "text-[#76b900]" : "text-gray-500"
                          }`}
                        >
                          NV-HBI
                        </div>
                      </div>

                      {/* Die 1 */}
                      <div
                        className={`flex-1 rounded-r-xl border-y border-r flex flex-col overflow-hidden transition-all duration-300 cursor-crosshair ${
                          activeComponent === "die1"
                            ? "border-[#76b900] z-20 shadow-[0_0_20px_rgba(118,185,0,0.2)] bg-[#76b900]/5"
                            : "border-[#333] z-10 bg-[#1a1a1a]"
                        }`}
                        onMouseEnter={() => setActiveComponent("die1")}
                      >
                        <div className="bg-[#222] text-center py-1 text-[10px] font-mono border-b border-[#333] text-gray-400">
                          DIE 1
                        </div>
                        <div className="flex-1 die-grid relative">
                          <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <Cpu size={48} className={activeComponent === "die1" ? "text-[#76b900]" : "text-white"} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right HBM Stacks */}
                <div
                  className={`w-16 md:w-24 flex flex-col gap-2 transition-all duration-300 cursor-crosshair ${
                    activeComponent === "hbm" ? "scale-105" : "opacity-70"
                  }`}
                  onMouseEnter={() => setActiveComponent("hbm")}
                >
                  {Array.from({ length: Math.floor(config.hbmStacks / 2) }).map((_, i) => (
                    <div
                      key={`hbm-r-${i}`}
                      className={`flex-1 rounded border hbm-block flex items-center justify-center transition-all duration-300 ${
                        activeComponent === "hbm"
                          ? "border-[#76b900] shadow-[0_0_10px_rgba(118,185,0,0.3)]"
                          : "border-[#333]"
                      }`}
                    >
                      <span className="text-[10px] font-mono text-gray-500 rotate-[90deg]">HBM</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section: NVLink & PCIe */}
              <div className="h-16 md:h-20 flex gap-4 px-16 md:px-24">
                <div
                  className={`flex-[2] rounded border flex items-center justify-center transition-all duration-300 cursor-crosshair ${
                    activeComponent === "nvlink"
                      ? "border-[#76b900] bg-[#76b900]/10 shadow-[0_0_15px_rgba(118,185,0,0.2)]"
                      : "border-[#333] bg-[#1a1a1a]"
                  }`}
                  onMouseEnter={() => setActiveComponent("nvlink")}
                >
                  <div className="flex items-center gap-2">
                    <Network size={16} className={activeComponent === "nvlink" ? "text-[#76b900]" : "text-gray-500"} />
                    <span
                      className={`font-mono text-[10px] md:text-xs ${
                        activeComponent === "nvlink" ? "text-[#76b900]" : "text-gray-400"
                      }`}
                    >
                      NVLink Interconnect
                    </span>
                  </div>
                </div>
                <div
                  className={`flex-1 rounded border flex items-center justify-center transition-all duration-300 cursor-crosshair ${
                    activeComponent === "pcie"
                      ? "border-[#76b900] bg-[#76b900]/10 shadow-[0_0_15px_rgba(118,185,0,0.2)]"
                      : "border-[#333] bg-[#1a1a1a]"
                  }`}
                  onMouseEnter={() => setActiveComponent("pcie")}
                >
                  <span
                    className={`font-mono text-[10px] md:text-xs ${
                      activeComponent === "pcie" ? "text-[#76b900]" : "text-gray-400"
                    }`}
                  >
                    PCIe Interface
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="tech-border rounded-xl p-6 flex flex-col relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
            <Cpu size={250} />
          </div>

          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#2a2a2a]">
            <div className="p-2 bg-[#76b900]/10 rounded border border-[#76b900]/30 text-[#76b900]">
              <Info size={20} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">Component Details</h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeGpu}-${activeComponent}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-[#76b900]">{activeData.title}</h3>
                <div className="px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-[10px] font-mono text-gray-500">
                  {activeGpu}
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{activeData.desc}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-[#1a1a1a] rounded border border-[#2a2a2a]">
                  <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Est. Cost</div>
                  <div className="text-white font-mono text-xs">{activeData.cost}</div>
                </div>
                <div className="p-3 bg-[#1a1a1a] rounded border border-[#2a2a2a]">
                  <div className="text-[10px] font-mono text-gray-500 uppercase mb-1">Manufacturer</div>
                  <a
                    href={activeData.manufacturer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#76b900] font-mono text-xs hover:underline flex items-center gap-1"
                  >
                    {activeData.manufacturer.name}
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Specifications</div>
                {activeData.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-[#1a1a1a] rounded border border-[#2a2a2a]"
                  >
                    <span className="text-gray-400 font-mono text-xs">{stat.label}</span>
                    <span className="text-white font-mono text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

