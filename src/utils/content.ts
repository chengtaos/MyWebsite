import type { Blog, Idea } from "@/types";

// --- frontmatter parser ---

interface Frontmatter {
  title: string;
  date: string;
  summary?: string;
  link?: string;
  body: string;
}

function parseFrontmatter(raw: string, filename: string): Frontmatter {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("---")) {
    return { title: filename, date: "", body: trimmed };
  }

  const second = trimmed.indexOf("---", 3);
  if (second === -1) {
    return { title: filename, date: "", body: trimmed.slice(3).trim() };
  }

  const fmBlock = trimmed.slice(3, second);
  const body = trimmed.slice(second + 3).trim();

  const meta: Record<string, string> = {};
  for (const line of fmBlock.split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    if (key) meta[key] = value;
  }

  return {
    title: meta.title || filename,
    date: meta.date || "",
    summary: meta.summary,
    link: meta.link,
    body,
  };
}

// --- glob loaders ---

const blogGlob = import.meta.glob("/content/blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const ideaGlob = import.meta.glob("/content/ideas/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function filename(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

// --- public API ---

export function loadBlogs(): Blog[] {
  return Object.entries(blogGlob).map(([path, raw]) => {
    const fm = parseFrontmatter(raw as string, filename(path));
    return {
      id: filename(path),
      title: fm.title,
      date: fm.date,
      summary: fm.summary || "",
      body: fm.body,
      link: fm.link,
    };
  });
}

export function loadIdeas(): Idea[] {
  return Object.entries(ideaGlob).map(([path, raw]) => {
    const fm = parseFrontmatter(raw as string, filename(path));
    return {
      id: filename(path),
      content: fm.title,
      date: fm.date,
      body: fm.body,
    };
  });
}
