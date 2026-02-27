export type Vendor = "NVIDIA" | "AMD" | "Google";

export type ComponentCategory = "cpu" | "gpu" | "baseboard" | "nic" | "switch" | "infrastructure" | "cable" | "memory" | "optic" | "asic";

export type ComponentData = {
  title: string;
  desc: string;
  cost: string;
  manufacturer: {
    name: string;
    url: string;
  };
  stats: { label: string; value: string }[];
  category?: ComponentCategory;
  quantity?: number;
};

export type GPULayout = "single" | "dual" | "chiplet";

export type GPUConfig = {
  id: string;
  name: string;
  generation: string;
  process: string;
  layout: GPULayout;
  hbmStacks: number;
  components: Record<string, ComponentData>;
};

export type VendorConfig = {
  name: Vendor;
  color: string;
  gpus: Record<string, GPUConfig>;
};

export type ClusterConfig = {
  id: string;
  name: string;
  vendor: Vendor;
  clusterType: "ai" | "hpc";
  totalGpus: string;
  computePower: string;
  interconnect: string;
  description: string;
  components: Record<string, ComponentData>;
};
