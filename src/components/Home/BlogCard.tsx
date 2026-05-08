import RevealOnScroll from "@/components/ui/RevealOnScroll";
import LinkableCard from "@/components/ui/LinkableCard";
import type { Blog } from "@/types";

export interface BlogCardProps {
  blog: Blog;
  staggerIndex: number;
  onClick: () => void;
}

export default function BlogCard({ blog, staggerIndex, onClick }: BlogCardProps) {
  return (
    <RevealOnScroll
      staggerIndex={staggerIndex}
      className="w-full md:w-[calc(50%-1rem)]"
    >
      <div className="cursor-pointer" onClick={onClick}>
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
      </div>
    </RevealOnScroll>
  );
}
