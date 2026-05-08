import RevealOnScroll from "@/components/ui/RevealOnScroll";
import LinkableCard from "@/components/ui/LinkableCard";
import EditOverlay from "@/components/ui/EditOverlay";
import { useEditMode } from "@/hooks/useEditMode";
import { CONFIRM } from "@/constants/text";
import type { Blog } from "@/types";

export interface BlogCardProps {
  blog: Blog;
  staggerIndex: number;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BlogCard({ blog, staggerIndex, onClick, onEdit, onDelete }: BlogCardProps) {
  const { editMode } = useEditMode();

  return (
    <RevealOnScroll
      staggerIndex={staggerIndex}
      className="w-full md:w-[calc(50%-1rem)]"
    >
      <div className="relative group/card cursor-pointer" onClick={onClick}>
        <LinkableCard
          title={blog.title}
          hoverColor="hover:bg-brand-blue/10"
          footer={
            <span className="text-sm font-bold uppercase tracking-wide text-gray-400">
              {blog.date}
            </span>
          }
        >
          <p className="text-gray-600 font-semibold text-lg leading-relaxed">
            {blog.summary}
          </p>
        </LinkableCard>
        {editMode && (
          <EditOverlay onEdit={onEdit} onDelete={onDelete} deleteConfirm={CONFIRM.deleteBlog} />
        )}
      </div>
    </RevealOnScroll>
  );
}
