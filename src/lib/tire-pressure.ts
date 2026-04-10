import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

import type {
  DashboardData,
  OverviewData,
  ReportsData,
  TechnologyData,
} from "@/content/tire-pressure-schema";

const DATA_ROOT = path.join(process.cwd(), "data", "tire-pressure");

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const overviewFallback: OverviewData = {
  briefing: {
    conclusion: "",
    evidence: "",
    risk: "",
    visualizationSuggestion: "",
    updatedAt: "",
    sources: [],
    confidence: "low",
    publishStatus: "draft",
    lastReviewedAt: "",
    dataMethod: "",
  },
  metrics: [],
  capabilityModules: [],
  marketSnapshots: [],
  routeGateways: [],
  agentRoles: [],
  agentOutputBlocks: [],
};

const reportsFallback: ReportsData = {
  pageMeta: {
    conclusion: "",
    evidence: "",
    risk: "",
    visualizationSuggestion: "",
    updatedAt: "",
    sources: [],
    confidence: "low",
    publishStatus: "draft",
    lastReviewedAt: "",
    dataMethod: "",
  },
  reportTags: [],
  reports: [],
};

const dashboardFallback: DashboardData = {
  pageMeta: {
    conclusion: "",
    evidence: "",
    risk: "",
    visualizationSuggestion: "",
    updatedAt: "",
    sources: [],
    confidence: "low",
    publishStatus: "draft",
    lastReviewedAt: "",
    dataMethod: "",
  },
  dashboardMetrics: [],
  dashboardSeriesByRange: {},
  tradeSeriesByRange: {},
  materialTrendsByRange: {},
  operatingSignalsByRange: {},
  moduleMeta: {
    metrics: {
      title: "",
      scope: "",
      conclusion: "",
      evidence: "",
      risk: "",
      visualizationSuggestion: "",
      updatedAt: "",
      sources: [],
      confidence: "low",
      publishStatus: "draft",
      lastReviewedAt: "",
      dataMethod: "",
    },
    series: {
      title: "",
      scope: "",
      conclusion: "",
      evidence: "",
      risk: "",
      visualizationSuggestion: "",
      updatedAt: "",
      sources: [],
      confidence: "low",
      publishStatus: "draft",
      lastReviewedAt: "",
      dataMethod: "",
    },
    trade: {
      title: "",
      scope: "",
      conclusion: "",
      evidence: "",
      risk: "",
      visualizationSuggestion: "",
      updatedAt: "",
      sources: [],
      confidence: "low",
      publishStatus: "draft",
      lastReviewedAt: "",
      dataMethod: "",
    },
    materials: {
      title: "",
      scope: "",
      conclusion: "",
      evidence: "",
      risk: "",
      visualizationSuggestion: "",
      updatedAt: "",
      sources: [],
      confidence: "low",
      publishStatus: "draft",
      lastReviewedAt: "",
      dataMethod: "",
    },
    operations: {
      title: "",
      scope: "",
      conclusion: "",
      evidence: "",
      risk: "",
      visualizationSuggestion: "",
      updatedAt: "",
      sources: [],
      confidence: "low",
      publishStatus: "draft",
      lastReviewedAt: "",
      dataMethod: "",
    },
  },
};

const technologyFallback: TechnologyData = {
  pageMeta: {
    conclusion: "",
    evidence: "",
    risk: "",
    visualizationSuggestion: "",
    updatedAt: "",
    sources: [],
    confidence: "low",
    publishStatus: "draft",
    lastReviewedAt: "",
    dataMethod: "",
  },
  technologyTracks: [],
  accuracyBands: [],
  testMethods: [],
  certificationStandards: [],
};

export const getOverviewData = cache(async (): Promise<OverviewData> => {
  return readJsonFile(path.join(DATA_ROOT, "overview.json"), overviewFallback);
});

export const getReportsData = cache(async (): Promise<ReportsData> => {
  return readJsonFile(path.join(DATA_ROOT, "reports.json"), reportsFallback);
});

export const getDashboardData = cache(async (): Promise<DashboardData> => {
  return readJsonFile(path.join(DATA_ROOT, "dashboard.json"), dashboardFallback);
});

export const getTechnologyData = cache(async (): Promise<TechnologyData> => {
  return readJsonFile(path.join(DATA_ROOT, "technology.json"), technologyFallback);
});
