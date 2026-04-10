export type SourceType =
  | "official"
  | "government-relay"
  | "industry-association"
  | "marketplace"
  | "commodity-tracker"
  | "research";

export type ConfidenceLevel = "high" | "medium" | "low";

export type PublishStatus = "draft" | "reviewed" | "published" | "needs_review";

export type SourceReference = {
  id: string;
  sourceType: SourceType;
  sourceTitle: string;
  sourceUrl: string;
  quotedAt: string;
  note: string;
};

export type EvidenceStamped = {
  sources: SourceReference[];
  confidence: ConfidenceLevel;
  publishStatus: PublishStatus;
  lastReviewedAt: string;
  dataMethod: string;
};

export type AgentOutputPayload = EvidenceStamped & {
  conclusion: string;
  evidence: string;
  risk: string;
  visualizationSuggestion: string;
  updatedAt: string;
};

export type CapabilityModule = EvidenceStamped & {
  id: string;
  title: string;
  machineSet: string[];
  fitProducts: string[];
  advantage: string;
  marketLink: string;
};

export type MarketSnapshot = EvidenceStamped & {
  id: string;
  title: string;
  region: string;
  timeframe: string;
  trend: "up" | "mixed" | "watch";
  summary: string;
  implication: string;
};

export type OverviewMetric = EvidenceStamped & {
  id: string;
  label: string;
  value: string;
  note: string;
};

export type RouteGateway = {
  id: string;
  title: string;
  href: string;
  description: string;
  highlights: string[];
};

export type OverviewData = {
  briefing: AgentOutputPayload;
  metrics: OverviewMetric[];
  capabilityModules: CapabilityModule[];
  marketSnapshots: MarketSnapshot[];
  routeGateways: RouteGateway[];
  agentRoles: AgentRole[];
  agentOutputBlocks: string[];
};

export type AgentRole = {
  id: string;
  name: string;
  responsibility: string;
  needsWeb: boolean;
  sequence: number;
};

export type ResearchCategory =
  | "国内市场"
  | "国际市场"
  | "外贸与认证"
  | "原材料与成本"
  | "竞争格局";

export type ResearchTopic = EvidenceStamped & {
  id: string;
  category: ResearchCategory;
  title: string;
  summary: string;
  region: string;
  evidenceLevel: "结构化占位" | "重点补证" | "待二次验证";
  sourceSummary: string;
  recommendedAction: string;
  tags: string[];
  agentOutput: AgentOutputPayload;
};

export type ReportsData = {
  pageMeta: AgentOutputPayload;
  reportTags: string[];
  reports: ResearchTopic[];
};

export type DashboardMetric = EvidenceStamped & {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
};

export type MetricSeries = EvidenceStamped & {
  label: string;
  unit: string;
  points: Array<{ period: string; value: number }>;
};

export type TradeSeries = EvidenceStamped & {
  country: string;
  marketSignal: string;
  channelSignal: string;
  complianceNote: string;
  watchPoint: string;
};

export type MaterialTrend = EvidenceStamped & {
  material: string;
  priceDirection: "up" | "down" | "flat";
  period: string;
  costImpact: string;
  note: string;
};

export type OperatingSignal = EvidenceStamped & {
  label: string;
  value: string;
  status: "positive" | "neutral" | "watch";
  note: string;
};

export type DashboardModuleMeta = AgentOutputPayload & {
  title: string;
  scope: string;
};

export type DashboardData = {
  pageMeta: AgentOutputPayload;
  dashboardMetrics: DashboardMetric[];
  dashboardSeriesByRange: Record<string, MetricSeries[]>;
  tradeSeriesByRange: Record<string, TradeSeries[]>;
  materialTrendsByRange: Record<string, MaterialTrend[]>;
  operatingSignalsByRange: Record<string, OperatingSignal[]>;
  moduleMeta: {
    metrics: DashboardModuleMeta;
    series: DashboardModuleMeta;
    trade: DashboardModuleMeta;
    materials: DashboardModuleMeta;
    operations: DashboardModuleMeta;
  };
};

export type TechnologyTrack = EvidenceStamped & {
  title: string;
  maturity: "成熟" | "成长" | "前瞻";
  differentiator: string;
  application: string;
  applicableRegion: string;
  standardConstraint: string;
};

export type AccuracyBand = EvidenceStamped & {
  grade: string;
  tolerance: string;
  scenario: string;
  risk: string;
};

export type TestMethod = EvidenceStamped & {
  name: string;
  purpose: string;
  keyCheckpoints: string[];
  linkedProcess: string;
};

export type CertificationStandard = EvidenceStamped & {
  name: string;
  scope: string;
  region: string;
  applicableProduct: string;
  implication: string;
};

export type TechnologyData = {
  pageMeta: AgentOutputPayload;
  technologyTracks: TechnologyTrack[];
  accuracyBands: AccuracyBand[];
  testMethods: TestMethod[];
  certificationStandards: CertificationStandard[];
};
