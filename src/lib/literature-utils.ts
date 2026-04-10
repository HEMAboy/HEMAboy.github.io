export type LiteratureFilters = {
  status: "all" | "verified" | "provisional";
  publication: "all" | "formal" | "preprint";
  topic: string | null;
  studyDesign: string | null;
};

type SearchParamReader = {
  get(name: string): string | null;
};

type LiteratureFilterablePaper = {
  sourceStatus: "verified" | "provisional";
  isPreprint: boolean;
  tags: string[];
  studyDesign: string;
  relevanceScore: number;
  rigorScore: number;
  publishedAt: string;
};

function firstSearchValue(
  value: string | string[] | null | undefined,
): string | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

export function formatLiteratureDate(dateString: string): string {
  const value = new Date(dateString);

  if (Number.isNaN(value.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value);
}

export function parseLiteratureFilters(
  searchParams: Record<string, string | string[] | undefined>,
): LiteratureFilters {
  const statusValue = firstSearchValue(searchParams.status);
  const publicationValue = firstSearchValue(searchParams.publication);

  return {
    status:
      statusValue === "verified" || statusValue === "provisional"
        ? statusValue
        : "all",
    publication:
      publicationValue === "formal" || publicationValue === "preprint"
        ? publicationValue
        : "all",
    topic: firstSearchValue(searchParams.topic),
    studyDesign: firstSearchValue(searchParams.studyDesign),
  };
}

export function parseLiteratureFiltersFromUrl(
  searchParams: SearchParamReader,
): LiteratureFilters {
  const statusValue = searchParams.get("status");
  const publicationValue = searchParams.get("publication");

  return {
    status:
      statusValue === "verified" || statusValue === "provisional"
        ? statusValue
        : "all",
    publication:
      publicationValue === "formal" || publicationValue === "preprint"
        ? publicationValue
        : "all",
    topic: searchParams.get("topic"),
    studyDesign: searchParams.get("studyDesign"),
  };
}

export function filterPapers<T extends LiteratureFilterablePaper>(
  papers: T[],
  filters: LiteratureFilters,
): T[] {
  return papers.filter((paper) => {
    if (filters.status !== "all" && paper.sourceStatus !== filters.status) {
      return false;
    }

    if (filters.publication === "formal" && paper.isPreprint) {
      return false;
    }

    if (filters.publication === "preprint" && !paper.isPreprint) {
      return false;
    }

    if (filters.topic && !paper.tags.includes(filters.topic)) {
      return false;
    }

    if (filters.studyDesign && paper.studyDesign !== filters.studyDesign) {
      return false;
    }

    return true;
  });
}

export function sortPapers<T extends LiteratureFilterablePaper>(papers: T[]): T[] {
  return [...papers].sort((left, right) => {
    const statusDiff =
      statusPriority(right.sourceStatus) - statusPriority(left.sourceStatus);

    if (statusDiff !== 0) {
      return statusDiff;
    }

    if (right.relevanceScore !== left.relevanceScore) {
      return right.relevanceScore - left.relevanceScore;
    }

    if (right.rigorScore !== left.rigorScore) {
      return right.rigorScore - left.rigorScore;
    }

    return right.publishedAt.localeCompare(left.publishedAt);
  });
}

function statusPriority(status: LiteratureFilterablePaper["sourceStatus"]): number {
  return status === "verified" ? 2 : 1;
}
