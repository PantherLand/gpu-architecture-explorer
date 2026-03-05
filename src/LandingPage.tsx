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
  DollarSign,
  Check,
  Search,
  Globe,
} from "lucide-react";
import { buildExplorerPath, getDefaultExplorerRouteState, type ViewMode } from "./routes";
import { type Vendor } from "./types";

const VENDORS = [
  { name: "NVIDIA" as Vendor, color: "#76b900", models: ["A100", "H100", "H200", "B100", "B200", "B300"] },
  { name: "AMD" as Vendor, color: "#ed1c24", models: ["MI250X", "MI300X", "MI325X"] },
  { name: "Google" as Vendor, color: "#4285f4", models: ["TPU v5p"] },
  { name: "Apple" as Vendor, color: "#a2aaad", models: ["M1", "M2", "M2 Ultra", "M4", "M4 Max"] },
];

const EXPLORER_VIEWS = [
  {
    icon: DollarSign,
    title: "GPU Rental Pricing",
    desc: "Free comparison of hourly GPU rental rates across cloud providers and GPU clouds.",
    tag: "PRICING",
    viewMode: "pricing" as ViewMode,
  },
  {
    icon: Cpu,
    title: "Chip Architecture",
    desc: "Interactive GPU package diagrams: HBM, compute dies, NVLink, PCIe, and memory systems.",
    tag: "CHIP ARCH",
    viewMode: "gpu" as ViewMode,
  },
  {
    icon: Server,
    title: "AI Clusters",
    desc: "Visual explanations of large-scale AI training cluster design and component composition.",
    tag: "AI CLUSTERS",
    viewMode: "cluster" as ViewMode,
  },
  {
    icon: Layers,
    title: "HPC Clusters",
    desc: "Architecture references for HPC systems and datacenter deployment patterns.",
    tag: "HPC CLUSTERS",
    viewMode: "hpc" as ViewMode,
  },
  {
    icon: Network,
    title: "Network Architecture",
    desc: "InfiniBand, Ethernet, optics, switching, and interconnect topologies for AI infrastructure.",
    tag: "NETWORK ARCH",
    viewMode: "network" as ViewMode,
  },
];

const STATS = [
  { value: "100% FREE", label: "No Paywall" },
  { value: "17", label: "Providers Tracked" },
  { value: "35+", label: "Pricing Entries" },
  { value: "5", label: "Explorer Views" },
];

const FREE_PROMISE = [
  "All pricing and architecture views remain free to access.",
  "No signup required to browse data and compare providers.",
  "Public links are shareable for community discussion.",
  "Open-source codebase for transparency and collaboration.",
];

const SEO_TOPICS = [
  "GPU rental pricing comparison",
  "NVIDIA H100 cloud pricing",
  "AMD MI300X cloud pricing",
  "A100 vs H100 rental cost",
  "AI cluster architecture reference",
  "InfiniBand vs Ethernet for AI clusters",
];

const PRICE_PREVIEW = [
  { provider: "Nebius", gpu: "H100", price: "$2.95", state: "Medium" },
  { provider: "Hyperstack", gpu: "H100", price: "$2.40", state: "Medium" },
  { provider: "Genesis Cloud", gpu: "H100", price: "$1.60", state: "Medium" },
  { provider: "RunPod", gpu: "RTX 4090", price: "$0.74", state: "High" },
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
  const architectureExplorerPath = buildExplorerPath(getDefaultExplorerRouteState("gpu"));
  const pricingExplorerPath = buildExplorerPath(getDefaultExplorerRouteState("pricing"));

  const navigateTo = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      return;
    }

    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] overflow-x-hidden">
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#76b900]/20 border border-[#76b900]/40 flex items-center justify-center">
              <Cpu size={16} className="text-[#76b900]" />
            </div>
            <span className="font-mono font-bold text-sm tracking-wider">
              AI<span className="text-[#76b900]">ARCH</span>.SPACE
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/PantherLand/gpu-architecture-explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Github size={20} />
            </a>
            <button
              onClick={() => navigateTo(pricingExplorerPath)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#76b900] text-black hover:bg-[#8ad400] transition-colors cursor-pointer"
            >
              View Free Pricing
            </button>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-24 px-6">
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[720px] h-[420px] bg-[#76b900]/8 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div>
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2a2a2a] bg-[#141414] text-xs font-mono text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#76b900] animate-pulse" />
                  Free GPU pricing data + architecture references
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
              >
                <span className="text-white">FREE GPU</span>
                <br />
                <span className="text-[#76b900]">PRICING & ARCHITECTURE</span>
                <br />
                <span className="text-white">EXPLORER</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
              >
                Compare GPU cloud pricing, inspect chip and cluster architecture, and share links with your team.
                The project stays free for the community to support learning, benchmarking, and open discussion.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                <button
                  onClick={() => navigateTo(pricingExplorerPath)}
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-[#76b900] text-black hover:bg-[#8ad400] transition-all cursor-pointer"
                >
                  Open Free Pricing
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigateTo(architectureExplorerPath)}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium border border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a] hover:text-white transition-all cursor-pointer"
                >
                  Explore Architecture
                </button>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="relative">
              <div className="rounded-3xl border border-[#1a1a1a] bg-[#0d0d0d] p-6 md:p-7 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between pb-4 border-b border-[#1a1a1a]">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">Public Data Snapshot</div>
                    <div className="mt-1 text-2xl font-semibold">GPU Rental Pricing</div>
                  </div>
                  <div className="px-3 py-1 rounded-full border border-[#76b900]/30 bg-[#76b900]/10 text-[11px] font-mono text-[#76b900]">
                    Updated March 2026
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  {PRICE_PREVIEW.map((row) => (
                    <div
                      key={`${row.provider}-${row.gpu}`}
                      className="grid grid-cols-[1.2fr_0.8fr_0.7fr_0.6fr] items-center gap-3 rounded-2xl border border-[#1a1a1a] bg-[#111] px-4 py-3"
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">{row.provider}</div>
                        <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500">{row.gpu}</div>
                      </div>
                      <div className="text-sm text-gray-400">On-demand</div>
                      <div className="text-base font-semibold text-[#76b900]">{row.price}</div>
                      <div
                        className={`text-[11px] font-mono uppercase tracking-widest ${
                          row.state === "High" ? "text-emerald-400" : "text-yellow-400"
                        }`}
                      >
                        {row.state}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-[#1a1a1a] bg-[#111] p-4 grid sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-[#1f1f1f] bg-[#0d0d0d] p-3">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500">No Login</div>
                    <div className="mt-2 text-sm font-semibold">Instant access</div>
                  </div>
                  <div className="rounded-xl border border-[#1f1f1f] bg-[#0d0d0d] p-3">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500">No Paywall</div>
                    <div className="mt-2 text-sm font-semibold">Completely free</div>
                  </div>
                  <div className="rounded-xl border border-[#1f1f1f] bg-[#0d0d0d] p-3">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-gray-500">Shareable</div>
                    <div className="mt-2 text-sm font-semibold">Direct links</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-[#1a1a1a] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center py-10 border-r border-[#1a1a1a] last:border-r-0"
            >
              <span className="text-2xl md:text-4xl font-bold text-[#76b900] font-mono text-center">
                {s.value}
              </span>
              <span className="mt-1 text-sm text-gray-500 font-mono uppercase tracking-wider text-center">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              What You Can Explore For <span className="text-[#76b900]">Free</span>
            </h2>
            <p className="mt-4 text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Use pricing and architecture together: compare cloud rates first, then validate hardware and
              system design in the same tool.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {EXPLORER_VIEWS.map((view, i) => (
              <motion.div
                key={view.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                onClick={() => navigateTo(buildExplorerPath(getDefaultExplorerRouteState(view.viewMode)))}
                className="group relative p-8 rounded-2xl border border-[#1a1a1a] bg-[#0b0b0b] hover:border-[#76b900]/30 transition-all cursor-pointer"
              >
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 rounded-md border border-[#2a2a2a] text-[10px] font-mono text-gray-500 uppercase tracking-widest group-hover:border-[#76b900]/30 group-hover:text-[#76b900] transition-colors">
                    {view.tag}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#76b900]/10 border border-[#76b900]/20 flex items-center justify-center mb-5 group-hover:bg-[#76b900]/20 transition-colors">
                  <view.icon size={22} className="text-[#76b900]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{view.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{view.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-sm text-[#76b900] opacity-0 group-hover:opacity-100 transition-opacity">
                  Open view <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-[#1a1a1a] bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[#1a1a1a] bg-[#0b0b0b] p-8"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#76b900]/10 border border-[#76b900]/20 flex items-center justify-center">
              <Globe size={20} className="text-[#76b900]" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold">Free Data Commitment</h3>
            <p className="mt-3 text-gray-500 leading-relaxed">
              We keep this project open and free so more developers can learn GPU systems and compare provider
              pricing without friction.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              {FREE_PROMISE.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-[#1a1a1a] bg-[#111] p-4">
                  <div className="w-7 h-7 rounded-lg bg-[#76b900]/10 border border-[#76b900]/20 flex items-center justify-center shrink-0">
                    <Check size={14} className="text-[#76b900]" />
                  </div>
                  <span className="text-sm text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-3xl border border-[#1a1a1a] bg-[#0b0b0b] p-8"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#76b900]/10 border border-[#76b900]/20 flex items-center justify-center">
              <Search size={20} className="text-[#76b900]" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold">Topics We Optimize For Search</h3>
            <p className="mt-3 text-gray-500 leading-relaxed">
              Landing content is structured around terms users already search for, helping organic discovery
              while keeping all core pages publicly accessible to crawlers.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {SEO_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => navigateTo(pricingExplorerPath)}
                  className="px-3 py-2 rounded-lg border border-[#2a2a2a] bg-[#111] text-xs font-mono text-gray-400 hover:border-[#3a3a3a] hover:text-gray-200 transition-colors cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
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
              Coverage includes major GPU vendors and model families commonly used for AI and HPC workloads.
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

      <section className="py-24 px-6 border-t border-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative p-12 md:p-16 rounded-3xl border border-[#1a1a1a] bg-[#0d0d0d] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#76b900]/5 to-transparent pointer-events-none" />
            <div className="relative">
              <Zap size={40} className="text-[#76b900] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Keep It Open. Keep It Useful.
              </h2>
              <p className="text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                This project is focused on free public data sharing and practical GPU infrastructure education.
                Open the explorer, compare providers, and share links with your community.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigateTo(pricingExplorerPath)}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-[#76b900] text-black hover:bg-[#8ad400] transition-all cursor-pointer"
                >
                  Open Free Pricing
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigateTo(architectureExplorerPath)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium border border-[#2a2a2a] text-gray-300 hover:border-[#3a3a3a] hover:text-white transition-all cursor-pointer"
                >
                  Explore Architecture
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

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
