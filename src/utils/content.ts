import type { Blog, Idea } from "@/types";

function filename(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function parseFrontmatter(raw: string, fallbackTitle: string) {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("---")) {
    return { title: fallbackTitle, date: "", summary: "", link: "", body: trimmed };
  }
  const end = trimmed.indexOf("---", 3);
  if (end === -1) {
    return { title: fallbackTitle, date: "", summary: "", link: "", body: trimmed.slice(3).trim() };
  }
  const fmBlock = trimmed.slice(3, end);
  const body = trimmed.slice(end + 3).trim();
  const meta: Record<string, string> = {};
  for (const line of fmBlock.split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    if (key) meta[key] = value;
  }
  return {
    title: meta.title || fallbackTitle,
    date: meta.date || "",
    summary: meta.summary || "",
    link: meta.link || "",
    body,
  };
}

export function loadBlogs(): Blog[] {
  const modules = import.meta.glob("/content/blogs/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });
  return Object.entries(modules).map(([path, raw]) => {
    const id = filename(path);
    const fm = parseFrontmatter(raw as string, id);
    return {
      id,
      title: fm.title,
      date: fm.date,
      summary: fm.summary,
      body: fm.body,
      link: fm.link || undefined,
    };
  });
}

export function loadIdeas(): Idea[] {
  const modules = import.meta.glob("/content/ideas/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  });
  return Object.entries(modules).map(([path, raw]) => {
    const id = filename(path);
    const fm = parseFrontmatter(raw as string, id);
    return {
      id,
      content: fm.title,
      date: fm.date,
      body: fm.body,
    };
  });
}
