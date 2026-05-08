import { useState } from "react";
import { Code, Edit3 } from "lucide-react";
import { useContentStore } from "@/contexts/ContentContext";
import { useEditMode } from "@/hooks/useEditMode";
import { EDIT_MODE } from "@/constants/text";

export default function StatusBar() {
  const { status, setStatus } = useContentStore();
  const { editMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(status);

  const save = () => {
    setStatus(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(status);
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border-4 border-black rounded-3xl p-6 flex items-center gap-6 shadow-[8px_8px_0px_0px_rgba(108,99,255,1)] hover:shadow-none transition-all group">
      <div className="bg-brand-yellow p-4 rounded-2xl border-4 border-black group-hover:rotate-12 transition-transform shrink-0">
        <Code size={32} className="text-black" />
      </div>
      <div className="space-y-1 flex-1 min-w-0">
        <h4 className="text-xl font-extrabold uppercase">最近在捣鼓</h4>
        {editMode && editing ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") save();
                if (e.key === "Escape") cancel();
              }}
              className="flex-1 text-lg font-bold border-2 border-black rounded-lg px-3 py-1 focus:outline-none focus:border-brand-blue"
            />
            <button onClick={save} className="brutalist-button-black text-xs px-3 py-1">保存</button>
            <button onClick={cancel} className="brutalist-button-white text-xs px-3 py-1">取消</button>
          </div>
        ) : (
          <p
            className={`text-gray-600 font-bold text-lg ${editMode ? "cursor-pointer hover:text-brand-pink border-b-2 border-dashed border-gray-300 hover:border-brand-pink" : ""}`}
            onClick={() => editMode && setEditing(true)}
            title={editMode ? EDIT_MODE.clickToEdit : undefined}
          >
            {status}
          </p>
        )}
      </div>
      {editMode && !editing && (
        <button
          onClick={() => setEditing(true)}
          className="shrink-0 w-8 h-8 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-brand-yellow/30"
          title={EDIT_MODE.clickToEdit}
        >
          <Edit3 size={14} />
        </button>
      )}
    </div>
  );
}
