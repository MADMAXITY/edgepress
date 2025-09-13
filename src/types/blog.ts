export interface BlogSection {
  id: string;
  heading: string;
  summary: string;
  bullets: string[];
  code?: string;
  media?: string[];
}

export interface BlogRules {
  title: string;
  slug: string;
  metaDescription: string;
  intent: 'EDUCATIONAL' | 'TRANSACTIONAL' | 'PROOF-BASED' | 'AUTHORITY-BUILDING';
  contentType: string;
  hookType: string;
  targetKeywords: string[];
  readingGrade: number;
  wordTarget: number;
  influence: string[];
  closingStyle: string;
  cta: string;
  disallowPhrases: string[];
  sections: BlogSection[];
  references: Array<{label: string; url: string}>;
}

export interface GenerationRequest {
  rules: BlogRules;
  model?: string;
  allowFallbacks?: boolean;
}

export interface OutlineResponse {
  title: string;
  slug: string;
  metaDescription: string;
  sections: BlogSection[];
  estimatedWords: number;
}

export interface ContentResponse {
  title: string;
  slug: string;
  metaDescription: string;
  htmlContent: string;
  sections: BlogSection[];
}