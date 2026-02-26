export type ComponentData = {
  title: string;
  desc: string;
  cost: string;
  manufacturer: {
    name: string;
    url: string;
  };
  stats: { label: string; value: string }[];
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

export type Vendor = "NVIDIA" | "AMD";

export type VendorConfig = {
  name: Vendor;
  color: string;
  gpus: Record<string, GPUConfig>;
};
