export interface Blog {
  title: string;
  date: string;
  summary: string;
  link?: string;
}

export const blogs: Blog[] = [
  {
    title: "示例博客文章",
    date: "2026-05-01",
    summary: "这是一篇示例博客，记录一些技术心得和生活感悟。",
  },
];
