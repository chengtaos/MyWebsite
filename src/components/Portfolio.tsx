import { projects } from "@/data/projects";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import LinkableCard from "@/components/ui/LinkableCard";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import { STATUS } from "@/constants/text";

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
            <RevealOnScroll
              key={project.title}
              staggerIndex={idx}
              className="w-full md:w-[calc(50%-1rem)]"
            >
              <LinkableCard
                href={project.link}
                title={project.title}
                footer={
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-brand-yellow border-2 border-black" />
                    <span className="text-sm font-bold uppercase tracking-wide text-gray-500">
                      {STATUS.online}
                    </span>
                  </div>
                }
              >
                <p className="text-gray-600 font-semibold text-lg leading-relaxed">
                  {project.description}
                </p>
              </LinkableCard>
            </RevealOnScroll>
          ))}
        </div>
      )}

      {wipProjects.length > 0 && (
        <div className="flex flex-wrap justify-center gap-8">
          {wipProjects.map((project, idx) => (
            <RevealOnScroll
              key={project.title}
              staggerIndex={idx}
              className="w-full md:w-[calc(50%-1rem)]"
            >
              <LinkableCard
                title={project.title}
                variant="dashed"
                footer={
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-300 border-2 border-black" />
                    <span className="text-sm font-bold uppercase tracking-wide text-gray-400">
                      {STATUS.wip}
                    </span>
                  </div>
                }
              >
                <p className="text-gray-400 font-semibold text-lg leading-relaxed">
                  {project.description}
                </p>
              </LinkableCard>
            </RevealOnScroll>
          ))}
        </div>
      )}

      {projects.length === 0 && <EmptyPlaceholder size="lg" />}
    </div>
  );
}
