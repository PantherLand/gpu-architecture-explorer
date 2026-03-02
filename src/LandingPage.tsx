import { motion } from "motion/react";
import {
  Cpu,
  Server,
  Network,
  Box,
  ChevronRight,
  Layers,
  Zap,
  ArrowRight,
  Github,
} from "lucide-react";
import { buildExplorerPath, getDefaultExplorerRouteState, type ViewMode } from "./routes";
import { type Vendor } from "./types";

const VENDORS = [
  { name: "NVIDIA" as Vendor, color: "#76b900", models: ["A100", "H100", "H200", "B100", "B200", "B300"] },
  { name: "AMD" as Vendor, color: "#ed1c24", models: ["MI250X", "MI300X", "MI325X"] },
  { name: "Google" as Vendor, color: "#4285f4", models: ["TPU v5p"] },
  { name: "Apple" as Vendor, color: "#a2aaad", models: ["M1", "M2", "M2 Ultra", "M4", "M4 Max"] },
];

const FEATURES = [
  {
    icon: Cpu,
    title: "Chip Architecture",
    desc: "Interactive GPU package diagrams — HBM stacks, compute dies, NVLink interconnects, and PCIe interfaces.",
    tag: "CHIP ARCH",
    viewMode: "gpu" as ViewMode,
  },
  {
    icon: Server,
    title: "AI Clusters",
    desc: "Visualize large-scale AI training clusters like Meta's H100 SuperPOD with 24,576 GPUs.",
    tag: "AI CLUSTERS",
    viewMode: "cluster" as ViewMode,
  },
  {
    icon: Layers,
    title: "HPC Clusters",
    desc: "Explore high-performance computing systems like the Frontier supercomputer.",
    tag: "HPC CLUSTERS",
    viewMode: "hpc" as ViewMode,
  },
  {
    icon: Network,
    title: "Network Architecture",
    desc: "Understand InfiniBand fat-tree, RoCEv2 Ethernet, and Optical Circuit Switch topologies.",
    tag: "NETWORK ARCH",
    viewMode: "network" as ViewMode,
  },
];

const STATS = [
  { value: "15+", label: "GPU Models" },
  { value: "4", label: "Vendors" },
  { value: "5", label: "Cluster Configs" },
  { value: "3", label: "Network Topologies" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LandingPage({
  onNavigate,
}: {
  onNavigate?: (path: string) => void;
}) {
  const defaultExplorerPath = buildExplorerPath(getDefaultExplorerRouteState("gpu"));

  const navigateTo = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      return;
    }

    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#76b900]/20 border border-[#76b900]/40 flex items-center justify-center">
              <Cpu size={16} className="text-[#76b900]" />
            </div>
            <span className="font-mono font-bold text-sm tracking-wider">
              AI<span className="text-[#76b900]">ARCH</span>.SPACE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/PantherLand/gpu-architecture-explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Github size={20} />
            </a>
            <button
              onClick={() => navigateTo(defaultExplorerPath)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#76b900] text-black hover:bg-[#8ad400] transition-colors cursor-pointer"
            >
              Launch Explorer
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6">
        {/* Grid background */}
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
        {/* Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#76b900]/8 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          className="relative max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2a2a2a] bg-[#141414] text-xs font-mono text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] animate-pulse" />
              Open Source · Interactive · Free
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
          >
            <span className="text-white">GPU</span>
            <br />
            <span className="text-[#76b900]">ARCHITECTURE</span>
            <br />
            <span className="text-white">EXPLORER</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Interactive comparison of GPU architectures from NVIDIA, AMD, Google
            &amp; Apple. Explore chip packages, AI clusters, and network
            topologies — all in one place.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo(defaultExplorerPath)}
              className="group flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-[#76b900] text-black hover:bg-[#8ad400] transition-all cursor-pointer"
            >
              Start Exploring
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://github.com/PantherLand/gpu-architecture-explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium border border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a] hover:text-white transition-all"
            >
              <Github size={18} />
              View on GitHub
            </a>
          </motion.div>

          {/* Vendor pills */}
          <motion.div variants={itemVariants} className="mt-16 flex flex-wrap items-center justify-center gap-3">
            {VENDORS.map((v) => (
              <button
                key={v.name}
                onClick={() =>
                  navigateTo(
                    buildExplorerPath({
                      ...getDefaultExplorerRouteState("gpu"),
                      vendor: v.name,
                    })
                  )
                }
                className="px-4 py-2 rounded-lg border border-[#2a2a2a] bg-[#111] text-sm font-mono"
                style={{ color: v.color }}
              >
                {v.name}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-[#1a1a1a] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex flex-col items-center py-10 border-r border-[#1a1a1a] last:border-r-0"
            >
              <span className="text-3xl md:text-4xl font-bold text-[#76b900] font-mono">
                {s.value}
              </span>
              <span className="mt-1 text-sm text-gray-500 font-mono uppercase tracking-wider">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Four Views, <span className="text-[#76b900]">One Tool</span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              From individual chip packages to datacenter-scale clusters — explore every layer of modern AI infrastructure.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                onClick={() => navigateTo(buildExplorerPath(getDefaultExplorerRouteState(f.viewMode)))}
                className="group relative p-8 rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] hover:border-[#76b900]/30 transition-all cursor-pointer"
              >
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 rounded-md border border-[#2a2a2a] text-[10px] font-mono text-gray-500 uppercase tracking-widest group-hover:border-[#76b900]/30 group-hover:text-[#76b900] transition-colors">
                    {f.tag}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#76b900]/10 border border-[#76b900]/20 flex items-center justify-center mb-5 group-hover:bg-[#76b900]/20 transition-colors">
                  <f.icon size={22} className="text-[#76b900]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-sm text-[#76b900] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architectures ── */}
      <section className="py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Supported <span className="text-[#76b900]">Architectures</span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Covering the latest accelerators from all major vendors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VENDORS.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-6 rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d]"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: v.color + "18", border: `1px solid ${v.color}33` }}
                  >
                    <Box size={18} style={{ color: v.color }} />
                  </div>
                  <span className="font-bold text-lg" style={{ color: v.color }}>
                    {v.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {v.models.map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1 rounded-md bg-[#141414] border border-[#222] text-xs font-mono text-gray-400"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="relative p-12 md:p-16 rounded-3xl border border-[#1a1a1a] bg-[#0d0d0d] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#76b900]/5 to-transparent pointer-events-none" />
            <div className="relative">
              <Zap size={40} className="text-[#76b900] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Explore?
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Dive into the silicon that powers modern AI — from transistors to
                datacenter-scale clusters.
              </p>
              <button
                onClick={() => navigateTo(defaultExplorerPath)}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-[#76b900] text-black hover:bg-[#8ad400] transition-all cursor-pointer"
              >
                Launch Explorer
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1a1a1a] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-mono">
            <Cpu size={14} className="text-[#76b900]" />
            AI<span className="text-[#76b900]">ARCH</span>.SPACE
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a
              href="https://github.com/PantherLand/gpu-architecture-explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              GitHub
            </a>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
