import { Pencil } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import BlogCard from "@/components/Home/BlogCard";
import type { Blog } from "@/types";

export interface BlogSectionProps {
  blogs: Blog[];
  onOpen: (id: string) => void;
}

export default function BlogSection({ blogs, onOpen }: BlogSectionProps) {
  return (
    <div className="space-y-8">
      <SectionHeader icon={Pencil} title="博客" />

      {blogs.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-8">
          {blogs.map((blog, idx) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              staggerIndex={idx}
              onClick={() => onOpen(blog.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder />
      )}
    </div>
  );
}
