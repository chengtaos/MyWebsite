import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { X, Edit3, ExternalLink, Check, Undo2 } from "lucide-react";
import { useEditMode } from "@/hooks/useEditMode";
import MarkdownEditor from "@/components/ui/MarkdownEditor";
import type { ContentMeta } from "@/types";
import { PROSE_CLASSES } from "@/constants/styles";
import { MARKDOWN, BUTTON } from "@/constants/text";

export interface ContentModalProps {
  title: string;
  date: string;
  body?: string;
  summary?: string;
  link?: string;
  onClose: () => void;
  onEditBody?: (body: string) => void;
  onEditMeta?: (meta: ContentMeta) => void;
}

export default function ContentModal({
  title,
  date,
  body,
  summary,
  link,
  onClose,
  onEditBody,
  onEditMeta,
}: ContentModalProps) {
  const { editMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [editingMeta, setEditingMeta] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftDate, setDraftDate] = useState(date);
  const [draftSummary, setDraftSummary] = useState(summary || "");

  const handleEditBody = (newBody: string) => {
    onEditBody?.(newBody);
    setEditing(false);
  };

  const handleSaveMeta = () => {
    onEditMeta?.({ title: draftTitle, date: draftDate, summary: draftSummary });
    setEditingMeta(false);
  };

  const handleCancelMeta = () => {
    setDraftTitle(title);
    setDraftDate(date);
    setDraftSummary(summary || "");
    setEditingMeta(false);
  };

  if (editing) {
    return (
      <MarkdownEditor
        initialBody={body || ""}
        onSave={handleEditBody}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b-4 border-black gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            {editMode && editingMeta ? (
              <div className="space-y-2">
                <input
                  autoFocus
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full text-2xl font-extrabold border-2 border-black rounded-lg px-3 py-1 focus:outline-none focus:border-brand-blue"
                  placeholder="标题"
                />
                <input
                  value={draftDate}
                  onChange={(e) => setDraftDate(e.target.value)}
                  className="w-44 text-sm font-bold border-2 border-black rounded-lg px-3 py-1 focus:outline-none focus:border-brand-blue"
                  placeholder="日期"
                />
                {onEditMeta && (
                  <input
                    value={draftSummary}
                    onChange={(e) => setDraftSummary(e.target.value)}
                    className="w-full text-base border-2 border-black rounded-lg px-3 py-1 focus:outline-none focus:border-brand-blue"
                    placeholder="摘要"
                  />
                )}
                <div className="flex gap-2">
                  <button onClick={handleSaveMeta} className="brutalist-button-black text-xs px-3 py-1">
                    <Check size={14} /> {BUTTON.save}
                  </button>
                  <button onClick={handleCancelMeta} className="brutalist-button-white text-xs px-3 py-1">
                    <Undo2 size={14} /> {BUTTON.cancel}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold break-words">{title}</h2>
                <span className="text-sm font-bold uppercase tracking-wide text-gray-400">
                  {date}
                </span>
                {summary && (
                  <p className="text-gray-500 font-semibold text-base">{summary}</p>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {editMode && !editingMeta && onEditMeta && (
              <button
                onClick={() => setEditingMeta(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black hover:bg-brand-yellow/30 font-bold"
                title="编辑标题和摘要"
              >
                <Edit3 size={18} />
              </button>
            )}
            {editMode && !editingMeta && onEditBody && (
              <button
                onClick={() => setEditing(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black hover:bg-brand-blue/30 font-bold"
                title="编辑 Markdown 正文"
              >
                <span className="text-lg font-extrabold">M</span>
              </button>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black hover:bg-brand-blue/20 font-bold"
              >
                <ExternalLink size={18} />
              </a>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black hover:bg-gray-100 font-bold"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {body ? (
            <div className={PROSE_CLASSES}>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-gray-400 text-lg italic text-center py-12">
              {editMode ? MARKDOWN.editHint : MARKDOWN.noContent}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
