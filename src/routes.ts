import { clusterData } from "./data/clusterData";
import { vendorConfigs } from "./data/gpuData";
import { networkData } from "./data/networkData";
import { type Vendor } from "./types";

export type ViewMode = "gpu" | "cluster" | "hpc" | "network";

export type ExplorerRouteState = {
  viewMode: ViewMode;
  vendor: Vendor;
  gpuId: string;
  clusterId: string;
  networkId: string;
  componentId: string;
};

const ALL_VENDORS: Vendor[] = ["NVIDIA", "AMD", "Google", "Apple"];

const VIEW_BASE_PATH: Record<ViewMode, string> = {
  gpu: "/explorer/chip",
  cluster: "/explorer/ai-clusters",
  hpc: "/explorer/hpc-clusters",
  network: "/explorer/network",
};

function slugifyPathSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function decodePathSegment(value?: string) {
  if (!value) {
    return "";
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function findVendorBySlug(value?: string) {
  const normalized = slugifyPathSegment(decodePathSegment(value));
  return ALL_VENDORS.find((vendor) => slugifyPathSegment(vendor) === normalized);
}

function pickBySlug(items: string[], value?: string) {
  const normalized = slugifyPathSegment(decodePathSegment(value));
  return items.find((item) => slugifyPathSegment(item) === normalized);
}

function firstVendorWithGpu() {
  return ALL_VENDORS.find((vendor) => Object.keys(vendorConfigs[vendor].gpus).length > 0) ?? "NVIDIA";
}

function firstVendorWithClusters(clusterType: "ai" | "hpc") {
  return (
    ALL_VENDORS.find((vendor) =>
      clusterData.some((cluster) => cluster.clusterType === clusterType && cluster.vendor === vendor)
    ) ?? "NVIDIA"
  );
}

function firstVendorWithNetwork() {
  return ALL_VENDORS.find((vendor) => networkData.some((network) => network.vendor === vendor)) ?? "NVIDIA";
}

function getGpuIds(vendor: Vendor) {
  return Object.keys(vendorConfigs[vendor]?.gpus ?? {});
}

function getClusterIds(clusterType: "ai" | "hpc", vendor?: Vendor) {
  return clusterData
    .filter((cluster) => cluster.clusterType === clusterType && (!vendor || cluster.vendor === vendor))
    .map((cluster) => cluster.id);
}

function getNetworkIds(vendor: Vendor) {
  return networkData.filter((network) => network.vendor === vendor).map((network) => network.id);
}

function getComponentIdsForGpu(vendor: Vendor, gpuId: string) {
  const gpu = vendorConfigs[vendor]?.gpus[gpuId];
  return gpu ? Object.keys(gpu.components) : [];
}

function getComponentIdsForCluster(clusterId: string) {
  const cluster = clusterData.find((item) => item.id === clusterId);
  return cluster ? Object.keys(cluster.components) : [];
}

function getComponentIdsForNetwork(networkId: string) {
  const network = networkData.find((item) => item.id === networkId);
  return network ? Object.keys(network.components) : [];
}

function pickComponentId(componentIds: string[], preferred?: string) {
  if (preferred && componentIds.includes(preferred)) {
    return preferred;
  }

  if (componentIds.includes("package")) {
    return "package";
  }

  return componentIds[0] ?? "";
}

function pickVendorForGpu(preferred?: Vendor) {
  if (preferred && getGpuIds(preferred).length > 0) {
    return preferred;
  }

  return firstVendorWithGpu();
}

function pickVendorForCluster(clusterType: "ai" | "hpc", preferred?: Vendor) {
  if (preferred && getClusterIds(clusterType, preferred).length > 0) {
    return preferred;
  }

  return firstVendorWithClusters(clusterType);
}

function pickVendorForNetwork(preferred?: Vendor) {
  if (preferred && getNetworkIds(preferred).length > 0) {
    return preferred;
  }

  return firstVendorWithNetwork();
}

export function getDefaultExplorerRouteState(viewMode: ViewMode = "gpu"): ExplorerRouteState {
  return normalizeExplorerRouteState({ viewMode });
}

export function normalizeExplorerRouteState(
  input: Partial<ExplorerRouteState> & { viewMode: ViewMode }
): ExplorerRouteState {
  if (input.viewMode === "gpu") {
    const vendor = pickVendorForGpu(input.vendor);
    const gpuIds = getGpuIds(vendor);
    const gpuId = gpuIds.includes(input.gpuId ?? "") ? input.gpuId! : gpuIds[0];
    const componentId = pickComponentId(getComponentIdsForGpu(vendor, gpuId), input.componentId);
    const clusterVendor = pickVendorForCluster("ai", vendor);
    const networkVendor = pickVendorForNetwork(vendor);

    return {
      viewMode: "gpu",
      vendor,
      gpuId,
      clusterId: getClusterIds("ai", clusterVendor)[0],
      networkId: getNetworkIds(networkVendor)[0],
      componentId,
    };
  }

  if (input.viewMode === "cluster") {
    const vendor = pickVendorForCluster("ai", input.vendor);
    const clusterIds = getClusterIds("ai", vendor);
    const clusterId = clusterIds.includes(input.clusterId ?? "") ? input.clusterId! : clusterIds[0];
    const componentId = pickComponentId(getComponentIdsForCluster(clusterId), input.componentId);
    const gpuVendor = pickVendorForGpu(vendor);
    const networkVendor = pickVendorForNetwork(vendor);

    return {
      viewMode: "cluster",
      vendor,
      gpuId: getGpuIds(gpuVendor)[0],
      clusterId,
      networkId: getNetworkIds(networkVendor)[0],
      componentId,
    };
  }

  if (input.viewMode === "hpc") {
    const requestedVendor = pickVendorForCluster("hpc", input.vendor);
    const vendorClusterIds = getClusterIds("hpc", requestedVendor);
    const allClusterIds = getClusterIds("hpc");
    const clusterPool = vendorClusterIds.length > 0 ? vendorClusterIds : allClusterIds;
    const clusterId = clusterPool.includes(input.clusterId ?? "") ? input.clusterId! : clusterPool[0];
    const cluster = clusterData.find((item) => item.id === clusterId) ?? clusterData.find((item) => item.clusterType === "hpc");
    const vendor = cluster?.vendor ?? requestedVendor;
    const componentId = pickComponentId(getComponentIdsForCluster(clusterId), input.componentId);
    const gpuVendor = pickVendorForGpu(vendor);
    const networkVendor = pickVendorForNetwork(vendor);

    return {
      viewMode: "hpc",
      vendor,
      gpuId: getGpuIds(gpuVendor)[0],
      clusterId,
      networkId: getNetworkIds(networkVendor)[0],
      componentId,
    };
  }

  const vendor = pickVendorForNetwork(input.vendor);
  const networkIds = getNetworkIds(vendor);
  const networkId = networkIds.includes(input.networkId ?? "") ? input.networkId! : networkIds[0];
  const componentId = pickComponentId(getComponentIdsForNetwork(networkId), input.componentId);
  const gpuVendor = pickVendorForGpu(vendor);
  const clusterVendor = pickVendorForCluster("ai", vendor);

  return {
    viewMode: "network",
    vendor,
    gpuId: getGpuIds(gpuVendor)[0],
    clusterId: getClusterIds("ai", clusterVendor)[0],
    networkId,
    componentId,
  };
}

export function buildExplorerPath(state: ExplorerRouteState) {
  const normalized = normalizeExplorerRouteState(state);

  if (normalized.viewMode === "gpu") {
    return [
      VIEW_BASE_PATH.gpu,
      slugifyPathSegment(normalized.vendor),
      slugifyPathSegment(normalized.gpuId),
    ].join("/");
  }

  if (normalized.viewMode === "cluster") {
    return [
      VIEW_BASE_PATH.cluster,
      slugifyPathSegment(normalized.vendor),
      slugifyPathSegment(normalized.clusterId),
      slugifyPathSegment(normalized.componentId),
    ].join("/");
  }

  if (normalized.viewMode === "hpc") {
    return [
      VIEW_BASE_PATH.hpc,
      slugifyPathSegment(normalized.vendor),
      slugifyPathSegment(normalized.clusterId),
      slugifyPathSegment(normalized.componentId),
    ].join("/");
  }

  return [
    VIEW_BASE_PATH.network,
    slugifyPathSegment(normalized.vendor),
    slugifyPathSegment(normalized.networkId),
    slugifyPathSegment(normalized.componentId),
  ].join("/");
}

export function parseExplorerPath(pathname: string) {
  const pathOnly = pathname.split("?")[0].replace(/\/+$/, "") || "/";

  if (pathOnly === "/") {
    return null;
  }

  const segments = pathOnly.split("/").filter(Boolean);

  if (segments[0] !== "explorer") {
    return null;
  }

  const routeType = segments[1];

  if (routeType === "chip") {
    const vendor = findVendorBySlug(segments[2]);
    const resolvedVendor = pickVendorForGpu(vendor);
    const gpuId = pickBySlug(getGpuIds(resolvedVendor), segments[3]);
    const resolvedGpuId = gpuId ?? getGpuIds(resolvedVendor)[0];
    const componentId =
      pickBySlug(getComponentIdsForGpu(resolvedVendor, resolvedGpuId), segments[4]) ?? "package";

    return normalizeExplorerRouteState({
      viewMode: "gpu",
      vendor: resolvedVendor,
      gpuId: resolvedGpuId,
      componentId,
    });
  }

  if (routeType === "ai-clusters") {
    const vendor = findVendorBySlug(segments[2]);
    const resolvedVendor = pickVendorForCluster("ai", vendor);
    const clusterId = pickBySlug(getClusterIds("ai", resolvedVendor), segments[3]);
    const resolvedClusterId = clusterId ?? getClusterIds("ai", resolvedVendor)[0];
    const componentId = pickBySlug(getComponentIdsForCluster(resolvedClusterId), segments[4]);

    return normalizeExplorerRouteState({
      viewMode: "cluster",
      vendor: resolvedVendor,
      clusterId: resolvedClusterId,
      componentId,
    });
  }

  if (routeType === "hpc-clusters") {
    const vendor = findVendorBySlug(segments[2]);
    const resolvedVendor = pickVendorForCluster("hpc", vendor);
    const clusterId = pickBySlug(getClusterIds("hpc", resolvedVendor), segments[3]);
    const fallbackClusterId = getClusterIds("hpc", resolvedVendor)[0] ?? getClusterIds("hpc")[0];
    const resolvedClusterId = clusterId ?? fallbackClusterId;
    const componentId = pickBySlug(getComponentIdsForCluster(resolvedClusterId), segments[4]);

    return normalizeExplorerRouteState({
      viewMode: "hpc",
      vendor: resolvedVendor,
      clusterId: resolvedClusterId,
      componentId,
    });
  }

  if (routeType === "network") {
    const vendor = findVendorBySlug(segments[2]);
    const resolvedVendor = pickVendorForNetwork(vendor);
    const networkId = pickBySlug(getNetworkIds(resolvedVendor), segments[3]);
    const resolvedNetworkId = networkId ?? getNetworkIds(resolvedVendor)[0];
    const componentId = pickBySlug(getComponentIdsForNetwork(resolvedNetworkId), segments[4]);

    return normalizeExplorerRouteState({
      viewMode: "network",
      vendor: resolvedVendor,
      networkId: resolvedNetworkId,
      componentId,
    });
  }

  return null;
}
