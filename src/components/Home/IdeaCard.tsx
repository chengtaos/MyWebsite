import { Lightbulb } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import EditOverlay from "@/components/ui/EditOverlay";
import { useEditMode } from "@/hooks/useEditMode";
import { CONFIRM } from "@/constants/text";
import type { Idea } from "@/types";

export interface IdeaCardProps {
  idea: Idea;
  staggerIndex: number;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function IdeaCard({ idea, staggerIndex, onClick, onEdit, onDelete }: IdeaCardProps) {
  const { editMode } = useEditMode();

  return (
    <RevealOnScroll
      staggerIndex={staggerIndex}
      className="w-full md:w-[calc(50%-0.75rem)]"
    >
      <div className="relative group/card cursor-pointer" onClick={onClick}>
        <div className="brutalist-card p-6 flex items-start gap-4 hover:bg-brand-pink/5 transition-colors">
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
        </div>
        {editMode && (
          <EditOverlay onEdit={onEdit} onDelete={onDelete} deleteConfirm={CONFIRM.deleteIdea} />
        )}
      </div>
    </RevealOnScroll>
  );
}
