import { motion } from "motion/react";
import { projects } from "@/src/data/projects";
import { useScrollReveal } from "@/src/hooks/useScrollReveal";
import LinkableCard from "@/src/components/ui/LinkableCard";
import EmptyPlaceholder from "@/src/components/ui/EmptyPlaceholder";

const onlineProjects = projects.filter((p) => p.status === "online");
const wipProjects = projects.filter((p) => p.status === "wip");

export default function Portfolio() {
  return (
    <div className="pt-40 pb-24 px-8 max-w-7xl mx-auto space-y-16">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tight">
          正在 <span className="bg-brand-yellow px-4 rounded-lg">捣鼓中</span>
        </h1>
        <p className="text-xl text-gray-500 font-semibold max-w-2xl">
          这些是我最近在尝试的一些小玩意儿，目前还在各种"试验"阶段。
        </p>
      </div>

      {onlineProjects.length > 0 && (
        <div className="flex flex-wrap justify-center gap-8">
          {onlineProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              {...useScrollReveal({ staggerIndex: idx })}
              className="w-full md:w-[calc(50%-1rem)]"
            >
              <LinkableCard
                href={project.link}
                title={project.title}
                footer={
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-brand-yellow border-2 border-black" />
                    <span className="text-sm font-bold uppercase tracking-wide text-gray-500">
                      已上线
                    </span>
                  </div>
                }
              >
                <p className="text-gray-600 font-semibold text-lg leading-relaxed">
                  {project.description}
                </p>
              </LinkableCard>
            </motion.div>
          ))}
        </div>
      )}

      {wipProjects.length > 0 && (
        <div className="flex flex-wrap justify-center gap-8">
          {wipProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              {...useScrollReveal({ staggerIndex: idx })}
              className="w-full md:w-[calc(50%-1rem)]"
            >
              <div className="brutalist-card p-8 flex flex-col gap-6 bg-gray-50 border-dashed">
                <div className="space-y-3">
                  <h3 className="text-2xl font-extrabold text-gray-400">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 font-semibold text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-300 border-2 border-black" />
                  <span className="text-sm font-bold uppercase tracking-wide text-gray-400">
                    施工中
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {projects.length === 0 && <EmptyPlaceholder size="lg" />}
    </div>
  );
}
