import { Briefcase } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import LinkableCard from "@/components/ui/LinkableCard";
import type { Project } from "@/data/projects";

export interface ProjectSectionProps {
  projects: Project[];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  if (projects.length === 0) return <EmptyPlaceholder />;

  return (
    <div className="space-y-8">
      <SectionHeader icon={Briefcase} title="作品集" />
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project, idx) => (
          <RevealOnScroll
            key={project.title}
            staggerIndex={idx}
            className="w-full md:w-[calc(50%-1rem)]"
          >
            <LinkableCard href={project.link} title={project.title}>
              <p className="text-gray-600 font-semibold text-lg leading-relaxed">
                {project.description}
              </p>
            </LinkableCard>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
