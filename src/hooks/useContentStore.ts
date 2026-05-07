import { useState, useCallback } from "react";
import type { Blog } from "@/src/data/blogs";
import type { Idea } from "@/src/data/ideas";
import { blogs as defaultBlogs } from "@/src/data/blogs";
import { ideas as defaultIdeas } from "@/src/data/ideas";
import { SITE } from "@/src/config/site";

const BLOGS_KEY = "site_blogs";
const IDEAS_KEY = "site_ideas";
const STATUS_KEY = "site_status";

function loadFromStorage<T>(key: string, defaults: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaults;
    return JSON.parse(raw) as T;
  } catch {
    return defaults;
  }
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function useContentStore() {
  const [blogs, setBlogsState] = useState<Blog[]>(() =>
    loadFromStorage(BLOGS_KEY, defaultBlogs)
  );
  const [ideas, setIdeasState] = useState<Idea[]>(() =>
    loadFromStorage(IDEAS_KEY, defaultIdeas)
  );
  const [status, setStatusState] = useState<string>(() =>
    loadFromStorage(STATUS_KEY, SITE.status)
  );

  const persistBlogs = useCallback((next: Blog[]) => {
    setBlogsState(next);
    saveToStorage(BLOGS_KEY, next);
  }, []);

  const persistIdeas = useCallback((next: Idea[]) => {
    setIdeasState(next);
    saveToStorage(IDEAS_KEY, next);
  }, []);

  const addBlog = useCallback(
    (blog: Blog) => persistBlogs([blog, ...blogs]),
    [blogs, persistBlogs]
  );

  const updateBlog = useCallback(
    (index: number, blog: Blog) => {
      const next = [...blogs];
      next[index] = blog;
      persistBlogs(next);
    },
    [blogs, persistBlogs]
  );

  const deleteBlog = useCallback(
    (index: number) => {
      persistBlogs(blogs.filter((_, i) => i !== index));
    },
    [blogs, persistBlogs]
  );

  const addIdea = useCallback(
    (idea: Idea) => persistIdeas([idea, ...ideas]),
    [ideas, persistIdeas]
  );

  const updateIdea = useCallback(
    (index: number, idea: Idea) => {
      const next = [...ideas];
      next[index] = idea;
      persistIdeas(next);
    },
    [ideas, persistIdeas]
  );

  const deleteIdea = useCallback(
    (index: number) => {
      persistIdeas(ideas.filter((_, i) => i !== index));
    },
    [ideas, persistIdeas]
  );

  const setStatus = useCallback((s: string) => {
    setStatusState(s);
    saveToStorage(STATUS_KEY, s);
  }, []);

  return {
    blogs,
    ideas,
    status,
    setStatus,
    addBlog,
    updateBlog,
    deleteBlog,
    addIdea,
    updateIdea,
    deleteIdea,
  } as const;
}
