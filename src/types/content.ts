export interface ContentItem {
  id: string;
  date: string;
  body?: string;
}

export interface Blog extends ContentItem {
  title: string;
  summary: string;
  link?: string;
}

export interface Idea extends ContentItem {
  content: string;
}
