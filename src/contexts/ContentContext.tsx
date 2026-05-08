import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Blog, Idea } from "@/types";
import { blogs as defaultBlogs } from "@/data/blogs";
import { ideas as defaultIdeas } from "@/data/ideas";
import { SITE } from "@/config/site";

const BLOGS_KEY = "site_blogs";
const IDEAS_KEY = "site_ideas";
const STATUS_KEY = "site_status";

// --- helpers ---

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJson<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

function migrateIfNeeded<T extends { id?: string }>(items: T[]): T[] {
  let changed = false;
  const migrated = items.map((item) => {
    if (!item.id) {
      changed = true;
      return { ...item, id: crypto.randomUUID() };
    }
    return item;
  });
  // ensure id is always string, not optional
  return migrated as T[];
}

function withIds<T extends { id?: string }>(items: T[]): (T & { id: string })[] {
  return items.map((item) =>
    item.id ? (item as T & { id: string }) : { ...item, id: crypto.randomUUID() }
  );
}

// --- context ---

interface ContentStore {
  blogs: Blog[];
  ideas: Idea[];
  status: string;
  setStatus: (s: string) => void;
  addBlog: (blog: Blog) => void;
  updateBlog: (id: string, blog: Blog) => void;
  deleteBlog: (id: string) => void;
  addIdea: (idea: Idea) => void;
  updateIdea: (id: string, idea: Idea) => void;
  deleteIdea: (id: string) => void;
}

const ContentContext = createContext<ContentStore | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    const loaded = loadJson<Blog[]>(BLOGS_KEY, defaultBlogs);
    const migrated = migrateIfNeeded(loaded);
    if (migrated !== loaded) saveJson(BLOGS_KEY, migrated);
    return migrated;
  });

  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const loaded = loadJson<Idea[]>(IDEAS_KEY, defaultIdeas);
    const migrated = migrateIfNeeded(loaded);
    if (migrated !== loaded) saveJson(IDEAS_KEY, migrated);
    return migrated;
  });

  const [status, setStatusState] = useState<string>(() =>
    loadJson(STATUS_KEY, SITE.status)
  );

  const persistBlogs = useCallback((next: Blog[]) => {
    setBlogs(next);
    saveJson(BLOGS_KEY, next);
  }, []);

  const persistIdeas = useCallback((next: Idea[]) => {
    setIdeas(next);
    saveJson(IDEAS_KEY, next);
  }, []);

  const addBlog = useCallback(
    (blog: Blog) => persistBlogs([blog, ...blogs]),
    [blogs, persistBlogs]
  );

  const updateBlog = useCallback(
    (id: string, blog: Blog) => {
      persistBlogs(blogs.map((b) => (b.id === id ? blog : b)));
    },
    [blogs, persistBlogs]
  );

  const deleteBlog = useCallback(
    (id: string) => {
      persistBlogs(blogs.filter((b) => b.id !== id));
    },
    [blogs, persistBlogs]
  );

  const addIdea = useCallback(
    (idea: Idea) => persistIdeas([idea, ...ideas]),
    [ideas, persistIdeas]
  );

  const updateIdea = useCallback(
    (id: string, idea: Idea) => {
      persistIdeas(ideas.map((i) => (i.id === id ? idea : i)));
    },
    [ideas, persistIdeas]
  );

  const deleteIdea = useCallback(
    (id: string) => {
      persistIdeas(ideas.filter((i) => i.id !== id));
    },
    [ideas, persistIdeas]
  );

  const setStatus = useCallback((s: string) => {
    setStatusState(s);
    saveJson(STATUS_KEY, s);
  }, []);

  return (
    <ContentContext.Provider
      value={{
        blogs, ideas, status, setStatus,
        addBlog, updateBlog, deleteBlog,
        addIdea, updateIdea, deleteIdea,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContentStore(): ContentStore {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContentStore must be used within ContentProvider");
  return ctx;
}
