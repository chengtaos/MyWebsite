import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { X, Eye, Edit3 } from "lucide-react";

export interface MarkdownEditorMeta {
  title: string;
  date: string;
  summary?: string;
}

interface MarkdownEditorProps {
  initialBody: string;
  initialTitle?: string;
  initialDate?: string;
  initialSummary?: string;
  onSave: (body: string, meta?: MarkdownEditorMeta) => void;
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

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        if (showMeta) {
          onSave(body, { title, date, summary: summary || undefined });
        } else {
          onSave(body);
        }
      }
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [body, title, date, summary, showMeta, onSave, onCancel]);

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
            <span className="font-extrabold text-lg">Markdown 编辑器</span>
            <span className="text-sm text-gray-400 font-semibold ml-2">Ctrl+Enter 保存</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreview(!preview)}
              className={`px-4 py-2 rounded-xl border-2 border-black font-bold text-sm flex items-center gap-2 transition-colors ${
                preview ? "bg-brand-blue text-white" : "bg-white"
              }`}
            >
              {preview ? <Edit3 size={16} /> : <Eye size={16} />}
              {preview ? "编辑" : "预览"}
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
              <div className="prose prose-lg max-w-none font-sans prose-headings:font-display prose-headings:font-extrabold prose-a:text-brand-blue prose-blockquote:border-l-4 prose-blockquote:border-black prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded">
                <ReactMarkdown>{body || "*暂无内容*"}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="flex-1 p-8 text-lg resize-none focus:outline-none bg-white"
              placeholder="在此输入 Markdown 内容..."
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-4 border-t-4 border-black bg-gray-50">
          <button onClick={onCancel} className="brutalist-button-white text-sm px-6 py-2">
            取消
          </button>
          <button onClick={handleSave} className="brutalist-button-black text-sm px-6 py-2">
            保存 (Ctrl+Enter)
          </button>
        </div>
      </div>
    </div>
  );
}
