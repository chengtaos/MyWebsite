import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { X, Eye, Edit3 } from "lucide-react";
import type { ContentMeta } from "@/types";
import { PROSE_CLASSES } from "@/constants/styles";
import { MARKDOWN, BUTTON } from "@/constants/text";

export interface MarkdownEditorProps {
  initialBody: string;
  initialTitle?: string;
  initialDate?: string;
  initialSummary?: string;
  onSave: (body: string, meta?: ContentMeta) => void;
  onCancel: () => void;
  showMeta?: boolean;
  summaryLabel?: string;
}

export default function MarkdownEditor({
  initialBody,
  initialTitle = "",
  initialDate = "",
  initialSummary = "",
  onSave,
  onCancel,
  showMeta = false,
  summaryLabel = "摘要",
}: MarkdownEditorProps) {
  const [body, setBody] = useState(initialBody);
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [summary, setSummary] = useState(initialSummary);
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Refs to avoid re-registering keyboard listener on every keystroke
  const bodyRef = useRef(body);
  const titleRef = useRef(title);
  const dateRef = useRef(date);
  const summaryRef = useRef(summary);
  const showMetaRef = useRef(showMeta);
  const onSaveRef = useRef(onSave);
  const onCancelRef = useRef(onCancel);
  bodyRef.current = body;
  titleRef.current = title;
  dateRef.current = date;
  summaryRef.current = summary;
  showMetaRef.current = showMeta;
  onSaveRef.current = onSave;
  onCancelRef.current = onCancel;

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        if (showMetaRef.current) {
          onSaveRef.current(bodyRef.current, {
            title: titleRef.current,
            date: dateRef.current,
            summary: summaryRef.current || undefined,
          });
        } else {
          onSaveRef.current(bodyRef.current);
        }
      }
      if (e.key === "Escape") onCancelRef.current();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSave = () => {
    if (showMeta) {
      onSave(body, { title, date, summary: summary || undefined });
    } else {
      onSave(body);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b-4 border-black bg-gray-50">
          <div className="flex items-center gap-2">
            <Edit3 size={20} className="text-black" />
            <span className="font-extrabold text-lg">{MARKDOWN.editorTitle}</span>
            <span className="text-sm text-gray-400 font-semibold ml-2">{MARKDOWN.ctrlEnterSave}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreview(!preview)}
              className={`px-4 py-2 rounded-xl border-2 border-black font-bold text-sm flex items-center gap-2 transition-colors ${
                preview ? "bg-brand-blue text-white" : "bg-white"
              }`}
            >
              {preview ? <Edit3 size={16} /> : <Eye size={16} />}
              {preview ? MARKDOWN.edit : MARKDOWN.preview}
            </button>
            <button
              onClick={onCancel}
              className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-black hover:bg-gray-100 font-bold"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Meta fields */}
        {showMeta && (
          <div className="flex flex-wrap gap-4 p-4 border-b-4 border-black bg-gray-50">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 min-w-[200px] text-lg font-extrabold border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:border-brand-blue"
              placeholder="标题"
            />
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-44 text-sm font-bold border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:border-brand-blue"
              placeholder="日期"
            />
            <input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="flex-1 min-w-[200px] text-base font-semibold border-2 border-black rounded-lg px-3 py-2 focus:outline-none focus:border-brand-blue"
              placeholder={summaryLabel}
            />
          </div>
        )}

        {/* Editor */}
        <div className="flex-1 flex overflow-hidden">
          {preview ? (
            <div className="flex-1 overflow-y-auto p-8">
              <div className={PROSE_CLASSES}>
                <ReactMarkdown>{body || "*暂无内容*"}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="flex-1 p-8 text-lg resize-none focus:outline-none bg-white"
              placeholder={MARKDOWN.placeholder}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-4 border-t-4 border-black bg-gray-50">
          <button onClick={onCancel} className="brutalist-button-white text-sm px-6 py-2">
            {BUTTON.cancel}
          </button>
          <button onClick={handleSave} className="brutalist-button-black text-sm px-6 py-2">
            {MARKDOWN.saveHint}
          </button>
        </div>
      </div>
    </div>
  );
}
