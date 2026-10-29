export type CategoryType = 'all' | 'language' | 'frontend' | 'backend' | 'mobile' | 'devops' | 'database';

export type LanguageCode = 'pt' | 'en' | 'es';

export type ThemeMode = 'dark' | 'light';

export interface DocSection {
  id: string;
  title: string;
  slug: string;
  content: string; // Markdown
  tags?: string[];
  level?: number;
}

export interface DocItem {
  id: string;
  techId: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Full Markdown content
  category: CategoryType;
  tags: string[];
  version: string;
  sections?: DocSection[];
  lastUpdated: string;
  isCustom?: boolean;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  icon: string; // Icon name or SVG identifier
  category: CategoryType;
  description: string;
  website: string;
  docUrl: string;
  currentVersion: string;
  color: string;
  isDownloaded?: boolean;
  downloadedAt?: string;
  sizeBytes?: number;
  totalArticles: number;
  articles: DocItem[];
}

export interface Bookmark {
  id: string;
  techId: string;
  techName: string;
  articleId: string;
  title: string;
  category: CategoryType;
  savedAt: string;
}

export interface SearchResult {
  tech: Technology;
  article: DocItem;
  matches: string[];
}

export interface OnlineSearchResult {
  title: string;
  snippet: string;
  url: string;
  source: string;
  language: string;
  content?: string;
}
