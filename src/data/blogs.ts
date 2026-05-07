export interface Blog {
  title: string;
  date: string;
  summary: string;
  link?: string;
  body?: string;
}

export const blogs: Blog[] = [
  {
    title: "示例博客文章",
    date: "2026-05-01",
    summary: "这是一篇示例博客，记录一些技术心得和生活感悟。",
    body: "## 欢迎\n\n这是我的第一篇博客文章。\n\n- 技术心得\n- 生活感悟\n- 项目记录\n\n> 持续更新中...",
  },
];
