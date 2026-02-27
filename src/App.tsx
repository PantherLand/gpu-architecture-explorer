import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Info, Network, Layers, ChevronRight, Server, Database, Activity, Cable, Zap, Box } from "lucide-react";
import { vendorConfigs } from "./data/gpuData";
import { clusterData } from "./data/clusterData";
import { networkData } from "./data/networkData";
import { Vendor, ComponentCategory } from "./types";

const CategoryIcon = ({ category, size = 16 }: { category?: ComponentCategory; size?: number }) => {
  switch (category) {
    case "cpu": return <Cpu size={size} />;
    case "gpu": return <Box size={size} />;
    case "nic": return <Network size={size} />;
    case "switch": return <Server size={size} />;
    case "cable": return <Cable size={size} />;
    case "infrastructure": return <Zap size={size} />;
    case "baseboard": return <Layers size={size} />;
    case "optic": return <Zap size={size} />;
    case "asic": return <Cpu size={size} />;
    default: return <Activity size={size} />;
  }
};

export default function App() {
  const [viewMode, setViewMode] = useState<"gpu" | "cluster" | "hpc" | "network">("gpu");
  const [activeVendor, setActiveVendor] = useState<Vendor>("NVIDIA");
  const [activeGpu, setActiveGpu] = useState<string>("B100");
  const [activeCluster, setActiveCluster] = useState<string>("nvl72");
  const [activeNetwork, setActiveNetwork] = useState<string>("nv_infiniband");
  const [activeComponent, setActiveComponent] = useState<string>("package");

  // Cluster Data
  const availableClusters = viewMode === "gpu" || viewMode === "network"
    ? [] 
    : clusterData.filter(c => 
        (viewMode === "cluster" ? c.clusterType === "ai" : c.clusterType === "hpc") && 
        (viewMode === "hpc" ? true : c.vendor === activeVendor)
      );
  const clusterConfig = availableClusters.find(c => c.id === activeCluster) || availableClusters[0];

  const currentVendor = viewMode === "hpc" && clusterConfig ? clusterConfig.vendor : activeVendor;
  const vendor = vendorConfigs[currentVendor];
  
  // GPU Data
  const gpuConfig = vendor.gpus[activeGpu] || Object.values(vendor.gpus)[0];
  
  // Network Data
  const availableNetworks = viewMode === "network" ? networkData.filter(n => n.vendor === activeVendor) : [];
  const networkConfig = availableNetworks.find(n => n.id === activeNetwork) || availableNetworks[0];

  const activeData = viewMode === "gpu" 
    ? (gpuConfig?.components[activeComponent] || gpuConfig?.components["package"])
    : viewMode === "network"
    ? (networkConfig ? (networkConfig.components[activeComponent] || Object.values(networkConfig.components)[0]) : null)
    : (clusterConfig ? (clusterConfig.components[activeComponent] || Object.values(clusterConfig.components)[0]) : null);

  const availableVendors = (["NVIDIA", "AMD", "Google"] as Vendor[]).filter(v => {
    if (viewMode === "gpu") {
      return Object.keys(vendorConfigs[v].gpus).length > 0;
    } else if (viewMode === "network") {
      return networkData.some(n => n.vendor === v);
    } else {
      const type = viewMode === "cluster" ? "ai" : "hpc";
      return clusterData.some(c => c.clusterType === type && c.vendor === v);
    }
  });

  const handleVendorChange = (v: Vendor) => {
    setActiveVendor(v);
    if (viewMode === "gpu") {
      const firstGpuId = Object.keys(vendorConfigs[v].gpus)[0];
      if (firstGpuId) {
        setActiveGpu(firstGpuId);
        setActiveComponent("package");
      }
    } else if (viewMode === "network") {
      const firstNetwork = networkData.find(n => n.vendor === v);
      if (firstNetwork) {
        setActiveNetwork(firstNetwork.id);
        setActiveComponent(Object.keys(firstNetwork.components)[0]);
      }
    } else {
      const type = viewMode === "cluster" ? "ai" : "hpc";
      const firstCluster = clusterData.find(c => c.clusterType === type && c.vendor === v);
      if (firstCluster) {
        setActiveCluster(firstCluster.id);
        setActiveComponent(Object.keys(firstCluster.components)[0]);
      }
    }
  };

  const handleGpuChange = (gpuId: string) => {
    setActiveGpu(gpuId);
    setActiveComponent("package");
  };

  const handleClusterChange = (clusterId: string) => {
    setActiveCluster(clusterId);
    const cluster = clusterData.find(c => c.id === clusterId);
    if (cluster) {
      setActiveComponent(Object.keys(cluster.components)[0]);
    }
  };

  const handleNetworkChange = (networkId: string) => {
    setActiveNetwork(networkId);
    const network = networkData.find(n => n.id === networkId);
    if (network) {
      setActiveComponent(Object.keys(network.components)[0]);
    }
  };

  const handleViewModeChange = (mode: "gpu" | "cluster" | "hpc" | "network") => {
    setViewMode(mode);
    if (mode === "gpu") {
      const firstGpuId = Object.keys(vendorConfigs[activeVendor].gpus)[0];
      if (firstGpuId) {
        setActiveGpu(firstGpuId);
        setActiveComponent("package");
      }
    } else if (mode === "network") {
      let firstNetwork = networkData.find(n => n.vendor === activeVendor);
      if (!firstNetwork) {
        firstNetwork = networkData.find(n => true);
        if (firstNetwork) {
          setActiveVendor(firstNetwork.vendor);
        }
      }
      if (firstNetwork) {
        setActiveNetwork(firstNetwork.id);
        setActiveComponent(Object.keys(firstNetwork.components)[0]);
      }
    } else {
      const type = mode === "cluster" ? "ai" : "hpc";
      let firstCluster = clusterData.find(c => c.clusterType === type && (mode === "hpc" ? true : c.vendor === activeVendor));
      if (!firstCluster) {
        firstCluster = clusterData.find(c => c.clusterType === type);
        if (firstCluster && mode !== "hpc") {
          setActiveVendor(firstCluster.vendor);
        }
      }
      if (firstCluster) {
        setActiveCluster(firstCluster.id);
        setActiveComponent(Object.keys(firstCluster.components)[0]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans p-4 md:p-8 flex flex-col">
      {/* Header */}
      <header className="mb-8 border-b border-[#2a2a2a] pb-6 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-1 p-1 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
              <button
                onClick={() => handleViewModeChange("gpu")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-2 ${
                  viewMode === "gpu" ? "bg-[#333] text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Cpu size={14} /> CHIP ARCH
              </button>
              <button
                onClick={() => handleViewModeChange("cluster")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-2 ${
                  viewMode === "cluster" ? "bg-[#333] text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Server size={14} /> AI CLUSTERS
              </button>
              <button
                onClick={() => handleViewModeChange("hpc")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-2 ${
                  viewMode === "hpc" ? "bg-[#333] text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Database size={14} /> HPC CLUSTERS
              </button>
              <button
                onClick={() => handleViewModeChange("network")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-2 ${
                  viewMode === "network" ? "bg-[#333] text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <Network size={14} /> NETWORK ARCH
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
              {viewMode === "gpu" ? "CHIP" : viewMode === "hpc" ? "HPC CLUSTER" : viewMode === "network" ? "NETWORK" : "AI CLUSTER"}{" "}
              <span style={{ color: vendor.color }}>ARCHITECTURE</span> EXPLORER
            </h1>
            <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">
              Interactive Comparison // {activeVendor} {viewMode === "gpu" ? gpuConfig.generation : viewMode === "network" ? networkConfig?.name : clusterConfig?.name}
            </p>
          </div>

          {/* Vendor Selector */}
          {viewMode !== "hpc" && (
            <div className="flex gap-2 p-1 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] w-fit">
              {availableVendors.map((v) => (
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
          )}
        </div>

        {/* Selection Tabs */}
        <div className="flex flex-wrap gap-2">
          {viewMode === "gpu" ? (
            Object.keys(vendor.gpus).map((gpuId) => (
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
            ))
          ) : viewMode === "network" ? (
            availableNetworks.map((network) => (
              <button
                key={network.id}
                onClick={() => handleNetworkChange(network.id)}
                className={`px-4 py-2 text-xs font-mono rounded border transition-all ${
                  activeNetwork === network.id
                    ? `text-white bg-opacity-20 shadow-[0_0_15px_rgba(255,255,255,0.1)]`
                    : "border-[#2a2a2a] text-gray-500 hover:border-gray-400"
                }`}
                style={{
                  borderColor: activeNetwork === network.id ? vendor.color : "#2a2a2a",
                  backgroundColor: activeNetwork === network.id ? `${vendor.color}22` : "transparent",
                  color: activeNetwork === network.id ? vendor.color : undefined,
                }}
              >
                {network.name}
              </button>
            ))
          ) : (
            availableClusters.map((cluster) => (
              <button
                key={cluster.id}
                onClick={() => handleClusterChange(cluster.id)}
                className={`px-4 py-2 text-xs font-mono rounded border transition-all ${
                  activeCluster === cluster.id
                    ? `text-white bg-opacity-20 shadow-[0_0_15px_rgba(255,255,255,0.1)]`
                    : "border-[#2a2a2a] text-gray-500 hover:border-gray-400"
                }`}
                style={{
                  borderColor: activeCluster === cluster.id ? vendor.color : "#2a2a2a",
                  backgroundColor: activeCluster === cluster.id ? `${vendor.color}22` : "transparent",
                  color: activeCluster === cluster.id ? vendor.color : undefined,
                }}
              >
                {cluster.name}
              </button>
            ))
          )}
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Diagram Area */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center relative min-h-[600px] tech-border rounded-xl p-8 overflow-hidden">
          {viewMode === "gpu" ? (
            <>
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
                  {gpuConfig.generation}
                </div>
                <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                  {gpuConfig.process}
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
                      {Array.from({ length: Math.ceil(gpuConfig.hbmStacks / 2) }).map((_, i) => (
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
                      {gpuConfig.layout === "single" ? (
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
                            {gpuConfig.generation} Die
                          </div>
                          <div className="flex-1 die-grid relative">
                            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                              <Cpu size={80} style={{ color: activeComponent === "die" ? vendor.color : "white" }} />
                            </div>
                          </div>
                        </div>
                      ) : gpuConfig.layout === "dual" ? (
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
                      {Array.from({ length: Math.floor(gpuConfig.hbmStacks / 2) }).map((_, i) => (
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
            </>
          ) : viewMode === "network" ? (
            /* Network Architecture View */
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-4xl flex flex-col items-center justify-center gap-8 mt-8">
                <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Network Topology & Components</div>
                
                <div className="w-full max-w-2xl flex flex-col gap-6 relative">
                  {/* Spine/Leaf Switch Layer */}
                  {networkConfig?.components.switch && (
                    <div 
                      onMouseEnter={() => setActiveComponent("switch")}
                      className={`w-full p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer relative z-10 ${
                        activeComponent === "switch" ? "bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]" : "bg-[#111]"
                      }`}
                      style={{ borderColor: activeComponent === "switch" ? vendor.color : "#2a2a2a" }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <CategoryIcon category="switch" size={24} />
                        <span className="text-lg font-bold text-white">{networkConfig.components.switch.title}</span>
                      </div>
                      
                      {/* Switch ASIC inside Switch */}
                      {networkConfig.components.asic && (
                        <div 
                          onMouseEnter={(e) => { e.stopPropagation(); setActiveComponent("asic"); }}
                          className={`mt-4 p-3 rounded-lg border flex items-center justify-center transition-all cursor-pointer w-1/2 ${
                            activeComponent === "asic" ? "bg-white/10" : "bg-[#1a1a1a]"
                          }`}
                          style={{ borderColor: activeComponent === "asic" ? vendor.color : "#333" }}
                        >
                          <CategoryIcon category="asic" size={16} />
                          <span className="text-xs font-mono text-gray-400 ml-2">{networkConfig.components.asic.title}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Optical Links Layer */}
                  {networkConfig?.components.optic && (
                    <div className="flex justify-center w-full relative z-0 -my-4">
                      <div 
                        onMouseEnter={() => setActiveComponent("optic")}
                        className={`h-16 w-3/4 border-x-2 border-b-2 border-dashed rounded-b-2xl flex items-center justify-center transition-all cursor-pointer ${
                          activeComponent === "optic" ? "bg-white/5" : "bg-transparent"
                        }`}
                        style={{ borderColor: activeComponent === "optic" ? vendor.color : "#2a2a2a" }}
                      >
                        <div className="bg-[#0a0a0a] px-3 py-1 rounded-full text-xs font-mono text-gray-400 flex items-center gap-2 border border-[#2a2a2a]">
                          <CategoryIcon category="optic" size={14} /> {networkConfig.components.optic.title}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Compute Node / NIC Layer */}
                  <div className="w-full border-2 border-[#2a2a2a] rounded-xl p-6 flex flex-col items-center gap-4 relative mt-2 z-10 bg-[#0a0a0a]">
                    <div className="absolute -top-3 left-6 bg-[#0a0a0a] px-2 text-xs font-mono text-gray-500 uppercase">
                      Compute Node
                    </div>

                    {networkConfig?.components.nic && (
                      <div 
                        onMouseEnter={() => setActiveComponent("nic")}
                        className={`w-3/4 p-4 rounded-lg border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                          activeComponent === "nic" ? "bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]" : "bg-[#1a1a1a]"
                        }`}
                        style={{ borderColor: activeComponent === "nic" ? vendor.color : "#333" }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <CategoryIcon category="nic" size={20} />
                          <span className="text-sm font-bold text-white">{networkConfig.components.nic.title}</span>
                        </div>
                        <div className="text-[10px] font-mono text-gray-500 uppercase mt-2">
                          {networkConfig.components.nic.stats[0]?.value} | {networkConfig.components.nic.stats[1]?.value}
                        </div>
                      </div>
                    )}
                    
                    {/* Dummy GPU to show connection */}
                    <div className="w-1/2 p-2 rounded border border-[#333] bg-[#111] flex items-center justify-center opacity-50 mt-2">
                      <CategoryIcon category="gpu" size={14} />
                      <span className="text-[10px] font-mono text-gray-500 ml-2">AI Accelerator (GPU/TPU)</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ) : !clusterConfig ? (
            /* Empty State for Cluster/HPC */
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
              <Database size={48} className="mb-4 opacity-20" />
              <p className="text-sm">No {viewMode === "hpc" ? "HPC" : "AI"} clusters available for {activeVendor}.</p>
              <p className="text-xs mt-2 opacity-60">Try selecting a different vendor.</p>
            </div>
          ) : (
            /* Cluster Architecture View */
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              <div className="absolute top-0 right-0 text-right">
                <div className="font-bold text-xl tracking-tight" style={{ color: vendor.color }}>
                  {clusterConfig.totalGpus}
                </div>
                <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                  {clusterConfig.computePower}
                </div>
              </div>

              <div className="relative w-full max-w-4xl flex flex-col items-center justify-center gap-4 mt-8">
                <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">System Architecture & BOM</div>
                
                {/* Schematic Layout */}
                <div className="w-full max-w-2xl flex flex-col gap-3">
                  
                  {/* Switch Layer */}
                  {clusterConfig.components.switch && (
                    <div 
                      onMouseEnter={() => setActiveComponent("switch")}
                      className={`w-full p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                        activeComponent === "switch" ? "bg-white/5" : "bg-[#111]"
                      }`}
                      style={{ borderColor: activeComponent === "switch" ? vendor.color : "#2a2a2a" }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <CategoryIcon category="switch" size={18} />
                        <span className="text-sm font-bold text-white">{clusterConfig.components.switch.title}</span>
                      </div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase">
                        Qty: {clusterConfig.components.switch.quantity} | {clusterConfig.components.switch.stats[0]?.value}
                      </div>
                    </div>
                  )}

                  {/* Cables Layer */}
                  {clusterConfig.components.cable && (
                    <div className="flex justify-center w-full">
                      <div 
                        onMouseEnter={() => setActiveComponent("cable")}
                        className={`h-8 w-1/2 border-x-2 border-b-2 rounded-b-xl flex items-center justify-center transition-all cursor-pointer ${
                          activeComponent === "cable" ? "bg-white/5" : "bg-transparent"
                        }`}
                        style={{ borderColor: activeComponent === "cable" ? vendor.color : "#2a2a2a" }}
                      >
                        <div className="bg-[#0a0a0a] px-2 text-[10px] font-mono text-gray-500 flex items-center gap-1">
                          <CategoryIcon category="cable" size={12} /> {clusterConfig.components.cable.title}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NIC Layer */}
                  {clusterConfig.components.nic && (
                    <div className="grid grid-cols-4 gap-2 w-full mt-2">
                      {Array.from({ length: Math.min(4, clusterConfig.components.nic.quantity || 4) }).map((_, i) => (
                        <div 
                          key={`nic-${i}`}
                          onMouseEnter={() => setActiveComponent("nic")}
                          className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all cursor-pointer ${
                            activeComponent === "nic" ? "bg-white/5" : "bg-[#111]"
                          }`}
                          style={{ borderColor: activeComponent === "nic" ? vendor.color : "#2a2a2a" }}
                        >
                          <CategoryIcon category="nic" size={16} />
                          <div className="text-[8px] font-mono text-gray-500 mt-1">NIC {i+1}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Compute Node Box */}
                  <div className="w-full border-2 border-[#2a2a2a] rounded-xl p-4 flex flex-col gap-4 relative mt-2">
                    <div className="absolute -top-2.5 left-4 bg-[#0a0a0a] px-2 text-[10px] font-mono text-gray-500 uppercase">
                      Compute Node Baseboard
                    </div>

                    {/* CPU Layer */}
                    {clusterConfig.components.cpu && (
                      <div className="flex justify-center gap-4 w-full">
                        {Array.from({ length: Math.min(2, clusterConfig.components.cpu.quantity || 2) }).map((_, i) => (
                          <div 
                            key={`cpu-${i}`}
                            onMouseEnter={() => setActiveComponent("cpu")}
                            className={`flex-1 p-3 rounded-lg border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                              activeComponent === "cpu" ? "bg-white/5" : "bg-[#1a1a1a]"
                            }`}
                            style={{ borderColor: activeComponent === "cpu" ? vendor.color : "#333" }}
                          >
                            <CategoryIcon category="cpu" size={24} />
                            <div className="text-xs font-bold text-white mt-2 text-center">{clusterConfig.components.cpu.title.split(" ")[0]} CPU</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Baseboard/Switch Layer */}
                    {clusterConfig.components.baseboard && (
                      <div 
                        onMouseEnter={() => setActiveComponent("baseboard")}
                        className={`w-full py-2 rounded border flex items-center justify-center transition-all cursor-pointer ${
                          activeComponent === "baseboard" ? "bg-white/5" : "bg-[#1a1a1a]"
                        }`}
                        style={{ borderColor: activeComponent === "baseboard" ? vendor.color : "#333" }}
                      >
                        <div className="text-[10px] font-mono text-gray-400 flex items-center gap-2">
                          <CategoryIcon category="baseboard" size={14} />
                          {clusterConfig.components.baseboard.title}
                        </div>
                      </div>
                    )}

                    {/* GPU Layer */}
                    {clusterConfig.components.gpu && (
                      <div className="grid grid-cols-4 gap-2 w-full">
                        {Array.from({ length: Math.min(8, clusterConfig.components.gpu.quantity || 8) }).map((_, i) => (
                          <div 
                            key={`gpu-${i}`}
                            onMouseEnter={() => setActiveComponent("gpu")}
                            className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                              activeComponent === "gpu" ? "bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "bg-[#111]"
                            }`}
                            style={{ 
                              borderColor: activeComponent === "gpu" ? vendor.color : "#333",
                              backgroundColor: activeComponent === "gpu" ? `${vendor.color}11` : "#111"
                            }}
                          >
                            <CategoryIcon category="gpu" size={24} />
                            <div className="text-[10px] font-bold text-white mt-1">GPU {i+1}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Infrastructure Layer */}
                  {clusterConfig.components.infrastructure && (
                    <div 
                      onMouseEnter={() => setActiveComponent("infrastructure")}
                      className={`w-full p-3 rounded-xl border flex items-center justify-center transition-all cursor-pointer mt-2 ${
                        activeComponent === "infrastructure" ? "bg-white/5" : "bg-[#111]"
                      }`}
                      style={{ borderColor: activeComponent === "infrastructure" ? vendor.color : "#2a2a2a" }}
                    >
                      <div className="flex items-center gap-2">
                        <CategoryIcon category="infrastructure" size={16} />
                        <span className="text-xs font-mono text-gray-400">{clusterConfig.components.infrastructure.title}</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}
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

          {!activeData ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 h-full">
              <div className="flex flex-col items-center gap-2">
                <Info size={24} className="opacity-50" />
                <span className="text-sm">Select a component to view details</span>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeVendor}-${viewMode === "gpu" ? activeGpu : viewMode === "network" ? activeNetwork : activeCluster}-${activeComponent}`}
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
                  <div className="px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded text-[10px] font-mono text-gray-500 flex items-center gap-1">
                    {activeData.quantity && <span className="text-white font-bold">x{activeData.quantity}</span>}
                    {viewMode === "gpu" ? activeGpu : viewMode === "network" ? activeNetwork : activeCluster}
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
          )}
        </div>
      </div>
    </div>
  );
}


