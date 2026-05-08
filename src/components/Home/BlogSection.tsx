import { Pencil, Plus } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import BlogCard from "@/components/Home/BlogCard";
import { useEditMode } from "@/hooks/useEditMode";
import { BUTTON } from "@/constants/text";
import type { Blog } from "@/types";

export interface BlogSectionProps {
  blogs: Blog[];
  onOpen: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function BlogSection({
  blogs, onOpen, onEdit, onDelete, onAdd,
}: BlogSectionProps) {
  const { editMode } = useEditMode();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <SectionHeader icon={Pencil} title="博客" />
        {editMode && (
          <button onClick={onAdd} className="brutalist-button-black text-sm px-4 py-2">
            <Plus size={18} />
            {BUTTON.writeBlog}
          </button>
        )}
      </div>

      {blogs.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-8">
          {blogs.map((blog, idx) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              staggerIndex={idx}
              onClick={() => onOpen(blog.id)}
              onEdit={() => onEdit(blog.id)}
              onDelete={() => onDelete(blog.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder />
      )}
    </div>
  );
}
