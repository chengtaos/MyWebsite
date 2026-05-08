import { Lightbulb } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import IdeaCard from "@/components/Home/IdeaCard";
import type { Idea } from "@/types";

export interface IdeaSectionProps {
  ideas: Idea[];
  onOpen: (id: string) => void;
}

export default function IdeaSection({ ideas, onOpen }: IdeaSectionProps) {
  return (
    <div className="space-y-8">
      <SectionHeader icon={Lightbulb} title="有趣想法" />

      {ideas.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {ideas.map((idea, idx) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              staggerIndex={idx}
              onClick={() => onOpen(idea.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder />
      )}
    </div>
  );
}
