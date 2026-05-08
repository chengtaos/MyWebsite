import { Trash2, Edit3 } from "lucide-react";

export interface EditOverlayProps {
  onEdit: () => void;
  onDelete: () => void;
  deleteConfirm: string;
}

export default function EditOverlay({ onEdit, onDelete, deleteConfirm }: EditOverlayProps) {
  return (
    <div
      className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onEdit}
        className="w-9 h-9 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-brand-yellow/30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        title="编辑"
      >
        <Edit3 size={15} />
      </button>
      <button
        onClick={() => { if (confirm(deleteConfirm)) onDelete(); }}
        className="w-9 h-9 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-brand-pink/30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        title="删除"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
