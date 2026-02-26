import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Info, Network, Layers, ChevronRight } from "lucide-react";
import { vendorConfigs } from "./data/gpuData";
import { Vendor } from "./types";

export default function App() {
  const [activeVendor, setActiveVendor] = useState<Vendor>("NVIDIA");
  const [activeGpu, setActiveGpu] = useState<string>("B100");
  const [activeComponent, setActiveComponent] = useState<string>("package");

  const vendor = vendorConfigs[activeVendor];
  const config = vendor.gpus[activeGpu] || Object.values(vendor.gpus)[0];
  const activeData = config.components[activeComponent] || config.components["package"];

  const handleVendorChange = (v: Vendor) => {
    setActiveVendor(v);
    const firstGpuId = Object.keys(vendorConfigs[v].gpus)[0];
    setActiveGpu(firstGpuId);
    setActiveComponent("package");
  };

  const handleGpuChange = (gpuId: string) => {
    setActiveGpu(gpuId);
    setActiveComponent("package");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans p-4 md:p-8 flex flex-col">
      {/* Header */}
      <header className="mb-8 border-b border-[#2a2a2a] pb-6 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
              GPU <span style={{ color: vendor.color }}>ARCHITECTURE</span> EXPLORER
            </h1>
            <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">
              Interactive Comparison // {activeVendor} {config.generation}
            </p>
          </div>

          {/* Vendor Selector */}
          <div className="flex gap-2 p-1 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] w-fit">
            {(["NVIDIA", "AMD"] as Vendor[]).map((v) => (
              <button
                key={v}
                onClick={() => handleVendorChange(v)}
                className={`px-6 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeVendor === v
                    ? `bg-white text-black shadow-lg`
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* GPU Tabs */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(vendor.gpus).map((gpuId) => (
            <button
              key={gpuId}
              onClick={() => handleGpuChange(gpuId)}
              className={`px-4 py-2 text-xs font-mono rounded border transition-all ${
                activeGpu === gpuId
                  ? `text-white bg-opacity-20 shadow-[0_0_15px_rgba(255,255,255,0.1)]`
                  : "border-[#2a2a2a] text-gray-500 hover:border-gray-400"
              }`}
              style={{
                borderColor: activeGpu === gpuId ? vendor.color : "#2a2a2a",
                backgroundColor: activeGpu === gpuId ? `${vendor.color}22` : "transparent",
                color: activeGpu === gpuId ? vendor.color : undefined,
              }}
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
                  ? "text-white"
                  : "border-[#2a2a2a] text-gray-500 hover:border-gray-500"
              }`}
              style={{
                borderColor: activeComponent === "package" ? vendor.color : "#2a2a2a",
                backgroundColor: activeComponent === "package" ? `${vendor.color}22` : "transparent",
              }}
            >
              FULL PACKAGE
            </button>
            <button
              onMouseEnter={() => setActiveComponent("nvlink")}
              className={`px-3 py-1 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                activeComponent === "nvlink"
                  ? "text-white"
                  : "border-[#2a2a2a] text-gray-500 hover:border-gray-500"
              }`}
              style={{
                borderColor: activeComponent === "nvlink" ? vendor.color : "#2a2a2a",
                backgroundColor: activeComponent === "nvlink" ? `${vendor.color}22` : "transparent",
              }}
            >
              {activeVendor === "NVIDIA" ? "NVLINK" : "INFINITY FABRIC"}
            </button>
          </div>

          {/* Architecture Badge */}
          <div className="absolute top-4 right-4 text-right">
            <div className="font-bold text-xl tracking-tight" style={{ color: vendor.color }}>
              {config.generation}
            </div>
            <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
              {config.process}
            </div>
          </div>

          {/* The Chip Diagram */}
          <div className="relative w-full max-w-3xl aspect-[16/10] flex flex-col items-center justify-center mt-8">
            {/* Package Outline */}
            <div
              className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 cursor-crosshair ${
                activeComponent === "package" ? "shadow-[0_0_30px_rgba(255,255,255,0.05)]" : "bg-[#141414]"
              }`}
              style={{
                borderColor: activeComponent === "package" ? vendor.color : "#2a2a2a",
                backgroundColor: activeComponent === "package" ? `${vendor.color}05` : "#141414",
              }}
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
                        activeComponent === "hbm" ? "shadow-[0_0_10px_rgba(255,255,255,0.1)]" : "border-[#333]"
                      }`}
                      style={{
                        borderColor: activeComponent === "hbm" ? vendor.color : "#333",
                      }}
                    >
                      <span className="text-[10px] font-mono text-gray-500 rotate-[-90deg]">HBM</span>
                    </div>
                  ))}
                </div>

                {/* Die Area */}
                <div className="flex-1 flex relative">
                  {config.layout === "single" ? (
                    <div
                      className={`flex-1 rounded-xl border flex flex-col overflow-hidden transition-all duration-300 cursor-crosshair ${
                        activeComponent === "die" ? "z-20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "z-10 bg-[#1a1a1a]"
                      }`}
                      style={{
                        borderColor: activeComponent === "die" ? vendor.color : "#333",
                        backgroundColor: activeComponent === "die" ? `${vendor.color}05` : "#1a1a1a",
                      }}
                      onMouseEnter={() => setActiveComponent("die")}
                    >
                      <div className="bg-[#222] text-center py-1 text-xs font-mono border-b border-[#333] text-gray-400 uppercase">
                        {config.generation} Die
                      </div>
                      <div className="flex-1 die-grid relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                          <Cpu size={80} style={{ color: activeComponent === "die" ? vendor.color : "white" }} />
                        </div>
                      </div>
                    </div>
                  ) : config.layout === "dual" ? (
                    <div className="flex-1 flex relative">
                      {/* Die 0 */}
                      <div
                        className={`flex-1 rounded-l-xl border-y border-l flex flex-col overflow-hidden transition-all duration-300 cursor-crosshair ${
                          activeComponent === "die0" ? "z-20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "z-10 bg-[#1a1a1a]"
                        }`}
                        style={{
                          borderColor: activeComponent === "die0" ? vendor.color : "#333",
                          backgroundColor: activeComponent === "die0" ? `${vendor.color}05` : "#1a1a1a",
                        }}
                        onMouseEnter={() => setActiveComponent("die0")}
                      >
                        <div className="bg-[#222] text-center py-1 text-[10px] font-mono border-b border-[#333] text-gray-400">
                          DIE 0
                        </div>
                        <div className="flex-1 die-grid relative">
                          <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <Cpu size={48} style={{ color: activeComponent === "die0" ? vendor.color : "white" }} />
                          </div>
                        </div>
                      </div>

                      {/* Interconnect Bridge */}
                      <div
                        className={`w-12 md:w-20 -mx-2 z-30 flex flex-col justify-center items-center cursor-crosshair transition-all duration-300 ${
                          activeComponent === "hbi" ? "scale-110" : ""
                        }`}
                        onMouseEnter={() => setActiveComponent("hbi")}
                      >
                        <div
                          className={`h-3/4 w-full rounded border flex items-center justify-center bg-[#1a1a1a] transition-all duration-300 ${
                            activeComponent === "hbi" ? "shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "border-[#444]"
                          }`}
                          style={{ borderColor: activeComponent === "hbi" ? vendor.color : "#444" }}
                        >
                          <div className="flex flex-col gap-1 w-full px-2">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                              <div
                                key={`link-${i}`}
                                className={`h-0.5 w-full transition-all duration-300`}
                                style={{ backgroundColor: activeComponent === "hbi" ? vendor.color : "#444" }}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div
                          className={`absolute text-[9px] font-mono bg-[#0a0a0a] px-1 rounded transition-all duration-300 ${
                            activeComponent === "hbi" ? "text-white" : "text-gray-500"
                          }`}
                          style={{ color: activeComponent === "hbi" ? vendor.color : undefined }}
                        >
                          {activeVendor === "NVIDIA" ? "NV-HBI" : "IF-LINK"}
                        </div>
                      </div>

                      {/* Die 1 */}
                      <div
                        className={`flex-1 rounded-r-xl border-y border-r flex flex-col overflow-hidden transition-all duration-300 cursor-crosshair ${
                          activeComponent === "die1" ? "z-20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "z-10 bg-[#1a1a1a]"
                        }`}
                        style={{
                          borderColor: activeComponent === "die1" ? vendor.color : "#333",
                          backgroundColor: activeComponent === "die1" ? `${vendor.color}05` : "#1a1a1a",
                        }}
                        onMouseEnter={() => setActiveComponent("die1")}
                      >
                        <div className="bg-[#222] text-center py-1 text-[10px] font-mono border-b border-[#333] text-gray-400">
                          DIE 1
                        </div>
                        <div className="flex-1 die-grid relative">
                          <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <Cpu size={48} style={{ color: activeComponent === "die1" ? vendor.color : "white" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Chiplet Layout (MI300X) */
                    <div
                      className={`flex-1 rounded-xl border flex flex-col overflow-hidden transition-all duration-300 cursor-crosshair ${
                        activeComponent === "die" ? "z-20 shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "z-10 bg-[#1a1a1a]"
                      }`}
                      style={{
                        borderColor: activeComponent === "die" ? vendor.color : "#333",
                        backgroundColor: activeComponent === "die" ? `${vendor.color}05` : "#1a1a1a",
                      }}
                      onMouseEnter={() => setActiveComponent("die")}
                    >
                      <div className="bg-[#222] text-center py-1 text-[10px] font-mono border-b border-[#333] text-gray-400">
                        CHIPLET GRID (XCD + IOD)
                      </div>
                      <div className="flex-1 p-4 grid grid-cols-4 grid-rows-2 gap-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={`xcd-${i}`}
                            className={`rounded-sm border border-[#333] bg-[#222] flex items-center justify-center transition-all duration-300 ${
                              activeComponent === "die" ? "border-white/20" : ""
                            }`}
                          >
                            <span className="text-[8px] font-mono text-gray-600">XCD</span>
                          </div>
                        ))}
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
                        activeComponent === "hbm" ? "shadow-[0_0_10px_rgba(255,255,255,0.1)]" : "border-[#333]"
                      }`}
                      style={{
                        borderColor: activeComponent === "hbm" ? vendor.color : "#333",
                      }}
                    >
                      <span className="text-[10px] font-mono text-gray-500 rotate-[90deg]">HBM</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section: Interconnect & Interface */}
              <div className="h-16 md:h-20 flex gap-4 px-16 md:px-24">
                <div
                  className={`flex-[2] rounded border flex items-center justify-center transition-all duration-300 cursor-crosshair ${
                    activeComponent === "nvlink" ? "shadow-[0_0_15px_rgba(255,255,255,0.05)]" : "border-[#333] bg-[#1a1a1a]"
                  }`}
                  style={{
                    borderColor: activeComponent === "nvlink" ? vendor.color : "#333",
                    backgroundColor: activeComponent === "nvlink" ? `${vendor.color}11` : "#1a1a1a",
                  }}
                  onMouseEnter={() => setActiveComponent("nvlink")}
                >
                  <div className="flex items-center gap-2">
                    <Network size={16} style={{ color: activeComponent === "nvlink" ? vendor.color : "#666" }} />
                    <span
                      className={`font-mono text-[10px] md:text-xs ${
                        activeComponent === "nvlink" ? "text-white" : "text-gray-400"
                      }`}
                      style={{ color: activeComponent === "nvlink" ? vendor.color : undefined }}
                    >
                      {activeVendor === "NVIDIA" ? "NVLink Interconnect" : "Infinity Fabric"}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex-1 rounded border flex items-center justify-center transition-all duration-300 cursor-crosshair ${
                    activeComponent === "pcie" ? "shadow-[0_0_15px_rgba(255,255,255,0.05)]" : "border-[#333] bg-[#1a1a1a]"
                  }`}
                  style={{
                    borderColor: activeComponent === "pcie" ? vendor.color : "#333",
                    backgroundColor: activeComponent === "pcie" ? `${vendor.color}11` : "#1a1a1a",
                  }}
                  onMouseEnter={() => setActiveComponent("pcie")}
                >
                  <span
                    className={`font-mono text-[10px] md:text-xs ${
                      activeComponent === "pcie" ? "text-white" : "text-gray-400"
                    }`}
                    style={{ color: activeComponent === "pcie" ? vendor.color : undefined }}
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
            <div
              className="p-2 rounded border text-white"
              style={{
                backgroundColor: `${vendor.color}11`,
                borderColor: `${vendor.color}44`,
                color: vendor.color,
              }}
            >
              <Info size={20} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">Component Details</h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeVendor}-${activeGpu}-${activeComponent}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold" style={{ color: vendor.color }}>
                  {activeData.title}
                </h3>
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
                    className="font-mono text-xs hover:underline flex items-center gap-1"
                    style={{ color: vendor.color }}
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


