import { Lightbulb, Plus } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyPlaceholder from "@/components/ui/EmptyPlaceholder";
import IdeaCard from "@/components/Home/IdeaCard";
import { useEditMode } from "@/hooks/useEditMode";
import { BUTTON } from "@/constants/text";
import type { Idea } from "@/types";

export interface IdeaSectionProps {
  ideas: Idea[];
  onOpen: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function IdeaSection({
  ideas, onOpen, onEdit, onDelete, onAdd,
}: IdeaSectionProps) {
  const { editMode } = useEditMode();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <SectionHeader icon={Lightbulb} title="有趣想法" />
        {editMode && (
          <button onClick={onAdd} className="brutalist-button-black text-sm px-4 py-2">
            <Plus size={18} />
            {BUTTON.recordIdea}
          </button>
        )}
      </div>

      {ideas.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {ideas.map((idea, idx) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              staggerIndex={idx}
              onClick={() => onOpen(idea.id)}
              onEdit={() => onEdit(idea.id)}
              onDelete={() => onDelete(idea.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder />
      )}
    </div>
  );
}
