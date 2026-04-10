import { promises as fs } from "fs";
import path from "path";

export {
  filterPapers,
  formatLiteratureDate,
  parseLiteratureFilters,
  sortPapers,
  type LiteratureFilters,
} from "@/lib/literature-utils";

export type LiteratureSourceLink = {
  label: string;
  url: string;
};

export type EvidenceSnippet = {
  fieldName: string;
  section: string;
  text: string;
  sourceLabel: string;
  sourceUrl: string;
  confidence: number;
};

export type SourceProvenance = {
  fieldName: string;
  source: string;
  sourceId: string;
  sourceUrl: string;
  excerpt: string;
  method: string;
  fetchedAt: string;
  confidence: number;
};

export type ChangeAlert = {
  alertType: string;
  severity: string;
  summary: string;
  details: string;
  detectedAt: string;
  sourceLabels: string[];
};

export type ThemeSummary = {
  theme: string;
  summary: string;
  paperSlugs: string[];
  count: number;
};

export type UserInterestProfile = {
  profileName: string;
  preferredTopics: string[];
  preferredMethods: string[];
  preferredEvidenceTypes: string[];
  highlightedKeywords: string[];
};

export type LiteraturePaper = {
  slug: string;
  canonicalId: string;
  title: string;
  authors: string[];
  source: string;
  journal: string;
  publishedAt: string;
  doi: string;
  pmid: string;
  pmcid: string;
  isPreprint: boolean;
  isHighImpact: boolean;
  sourceStatus: "verified" | "provisional";
  tags: string[];
  abstract: string;
  articleType: string;
  studyDesign: string;
  studyType: string;
  diseaseOrTopic: string;
  speciesOrSystem: string;
  biologicalSystem: string;
  sampleSize: string;
  cohortInfo: string;
  methods: string;
  methodsDetailed: string;
  datasets: string[];
  mainQuestion: string;
  keyFindings: string[];
  mainFindings: string[];
  effectDirection: string;
  novelty: string;
  noveltyClaim: string;
  limitations: string[];
  limitationsStructured: string[];
  relevanceReason: string;
  whyItMatters: string;
  whyReadNow: string;
  relatedWorks: string[];
  codeUrl: string;
  dataUrl: string;
  confidence: string;
  evidenceScope: string;
  evidenceLevel: string;
  fulltextAvailable: boolean;
  qualityScore: number;
  sourceProvenance: SourceProvenance[];
  changeAlerts: ChangeAlert[];
  evidenceSnippets: EvidenceSnippet[];
  sourceLinks: LiteratureSourceLink[];
  publishedLinkage: Record<string, unknown>;
  noveltyScore: number;
  rigorScore: number;
  relevanceScore: number;
  actionabilityScore: number;
  overallScore: number;
  explanation: string;
};

export type LiteratureDigest = {
  date: string;
  summary: string;
  featuredPaperSlugs: string[];
  highImpactCount: number;
  preprintCount: number;
  topicClusters: string[];
  paperSlugs: string[];
  verifiedPaperSlugs: string[];
  provisionalPaperSlugs: string[];
  topRecommendedSlugs: string[];
  watchlistSlugs: string[];
  themeSummaries: ThemeSummary[];
  featuredPapers?: LiteraturePaper[];
};

export type LiteratureIndex = {
  latestDigestDate: string | null;
  digestDates: string[];
  digests: LiteratureDigest[];
  paperCount: number;
  highImpactCount: number;
  preprintCount: number;
  verifiedCount: number;
  provisionalCount: number;
  alertCount: number;
  topics: string[];
  studyDesigns: string[];
  evidenceLevels: string[];
  topRecommendedSlugs: string[];
  interestProfile: UserInterestProfile | null;
};

const DATA_ROOT = path.join(process.cwd(), "data", "literature");

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function getLiteratureIndex(): Promise<LiteratureIndex> {
  const fallback: LiteratureIndex = {
    latestDigestDate: null,
    digestDates: [],
    digests: [],
    paperCount: 0,
    highImpactCount: 0,
    preprintCount: 0,
    verifiedCount: 0,
    provisionalCount: 0,
    alertCount: 0,
    topics: [],
    studyDesigns: [],
    evidenceLevels: [],
    topRecommendedSlugs: [],
    interestProfile: null,
  };

  return (await readJsonFile<LiteratureIndex>(path.join(DATA_ROOT, "index.json"))) ?? fallback;
}

export async function getLatestDigest(): Promise<LiteratureDigest | null> {
  const index = await getLiteratureIndex();
  if (!index.latestDigestDate) {
    return null;
  }
  return getDigestByDate(index.latestDigestDate);
}

export async function getDigestByDate(date: string): Promise<LiteratureDigest | null> {
  return readJsonFile<LiteratureDigest>(path.join(DATA_ROOT, "digests", `${date}.json`));
}

export async function getPaperBySlug(slug: string): Promise<LiteraturePaper | null> {
  return readJsonFile<LiteraturePaper>(path.join(DATA_ROOT, "papers", `${slug}.json`));
}

export async function getAllPaperSlugs(): Promise<string[]> {
  try {
    const papersDir = path.join(DATA_ROOT, "papers");
    const fileNames = await fs.readdir(papersDir);
    return fileNames
      .filter((name) => name.endsWith(".json"))
      .map((name) => name.replace(/\.json$/, ""))
      .sort();
  } catch {
    return [];
  }
}

export async function getPapersBySlugs(slugs: string[]): Promise<LiteraturePaper[]> {
  const papers = await Promise.all(slugs.map(async (slug) => getPaperBySlug(slug)));
  return papers.filter((item): item is LiteraturePaper => item !== null);
}
