import { motion } from "motion/react";
import { Code, Pencil, Lightbulb, Briefcase } from "lucide-react";
import { SITE } from "@/src/config/site";
import { projects } from "@/src/data/projects";
import { blogs } from "@/src/data/blogs";
import { ideas } from "@/src/data/ideas";
import { useScrollReveal } from "@/src/hooks/useScrollReveal";
import SectionHeader from "@/src/components/ui/SectionHeader";
import EmptyPlaceholder from "@/src/components/ui/EmptyPlaceholder";
import LinkableCard from "@/src/components/ui/LinkableCard";

const featuredProjects = projects.filter((p) => p.featured);

export default function Services() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto space-y-20" id="creations">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-7xl font-display font-extrabold">
          一些 <span className="bg-brand-pink text-white px-4 rounded-lg">有趣的创作</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-semibold">
          没有什么比把一个突然冒出来的想法变成现实更酷的事情了。
        </p>
      </div>

      {/* 作品集 */}
      <div className="space-y-8">
        <SectionHeader icon={Briefcase} title="作品集" />
        {featuredProjects.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                {...useScrollReveal({ staggerIndex: idx })}
                className="w-full md:w-[calc(50%-1rem)]"
              >
                <LinkableCard href={project.link} title={project.title}>
                  <p className="text-gray-600 font-semibold text-lg leading-relaxed">
                    {project.description}
                  </p>
                </LinkableCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder />
        )}
      </div>

      {/* 博客 */}
      {blogs.length > 0 && (
        <div className="space-y-8">
          <SectionHeader icon={Pencil} title="博客" />
          <div className="flex flex-wrap justify-center gap-8">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.title}
                {...useScrollReveal({ staggerIndex: idx })}
                className="w-full md:w-[calc(50%-1rem)]"
              >
                <LinkableCard
                  href={blog.link}
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
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 有趣想法 */}
      {ideas.length > 0 && (
        <div className="space-y-8">
          <SectionHeader icon={Lightbulb} title="有趣想法" />
          <div className="flex flex-wrap justify-center gap-6">
            {ideas.map((idea, idx) => (
              <motion.div
                key={`${idea.content}-${idx}`}
                {...useScrollReveal({ staggerIndex: idx })}
                className="brutalist-card p-6 flex items-start gap-4 w-full md:w-[calc(50%-0.75rem)] hover:bg-brand-pink/5 transition-colors"
              >
                <div className="w-8 h-8 bg-brand-yellow border-2 border-black rounded-lg flex items-center justify-center shrink-0">
                  <Lightbulb size={16} className="text-black" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700 font-semibold text-lg leading-relaxed">
                    {idea.content}
                  </p>
                  <span className="text-sm font-bold uppercase tracking-wide text-gray-400">
                    {idea.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 最近在捣鼓 */}
      <div className="max-w-4xl mx-auto bg-white border-4 border-black rounded-3xl p-6 flex items-center gap-6 shadow-[8px_8px_0px_0px_rgba(108,99,255,1)] hover:shadow-none transition-all cursor-default group">
        <div className="bg-brand-yellow p-4 rounded-2xl border-4 border-black group-hover:rotate-12 transition-transform">
          <Code size={32} className="text-black" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xl font-extrabold uppercase">最近在捣鼓</h4>
          <p className="text-gray-600 font-bold text-lg">{SITE.status}</p>
        </div>
      </div>
    </section>
  );
}
