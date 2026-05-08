import ReactMarkdown from "react-markdown";
import { X, ExternalLink } from "lucide-react";
import { PROSE_CLASSES } from "@/constants/styles";

export interface ContentModalProps {
  title: string;
  date: string;
  body?: string;
  summary?: string;
  link?: string;
  onClose: () => void;
}

export default function ContentModal({
  title,
  date,
  body,
  summary,
  link,
  onClose,
}: ContentModalProps) {
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
            <h2 className="text-2xl font-extrabold break-words">{title}</h2>
            <span className="text-sm font-bold uppercase tracking-wide text-gray-400">
              {date}
            </span>
            {summary && (
              <p className="text-gray-500 font-semibold text-base">{summary}</p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
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
              暂无详细内容
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
