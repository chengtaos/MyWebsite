import { useState } from "react";
import { motion } from "motion/react";
import {
  Code, Pencil, Lightbulb, Briefcase, Plus, Trash2, Edit3,
} from "lucide-react";
import { projects } from "@/src/data/projects";
import { useContentStore } from "@/src/hooks/useContentStore";
import { useEditMode } from "@/src/hooks/useEditMode";
import { useScrollReveal } from "@/src/hooks/useScrollReveal";
import SectionHeader from "@/src/components/ui/SectionHeader";
import EmptyPlaceholder from "@/src/components/ui/EmptyPlaceholder";
import LinkableCard from "@/src/components/ui/LinkableCard";
import ContentModal from "@/src/components/ui/ContentModal";
import MarkdownEditor from "@/src/components/ui/MarkdownEditor";

const featuredProjects = projects.filter((p) => p.featured);

type ModalState =
  | { type: "blog"; index: number }
  | { type: "idea"; index: number }
  | null;

export default function Services() {
  const {
    blogs, ideas, status, setStatus,
    addBlog, updateBlog, deleteBlog,
    addIdea, updateIdea, deleteIdea,
  } = useContentStore();
  const { editMode } = useEditMode();
  const [modal, setModal] = useState<ModalState>(null);
  const [addingType, setAddingType] = useState<"blog" | "idea" | null>(null);
  const [editingStatus, setEditingStatus] = useState(false);
  const [statusDraft, setStatusDraft] = useState(status);

  const closeModal = () => setModal(null);

  // --- Blog helpers ---
  const currentBlog = modal?.type === "blog" ? blogs[modal.index] : undefined;
  const handleSaveBlogBody = (body: string) => {
    if (modal?.type === "blog" && currentBlog) {
      updateBlog(modal.index, { ...currentBlog, body });
    }
  };

  const handleAddBlog = (body: string) => {
    const today = new Date().toISOString().slice(0, 10);
    addBlog({ title: "新博客", date: today, summary: "点击编辑按钮修改标题和摘要", body });
    setAddingType(null);
  };

  const handleSaveBlogMeta = (meta: { title: string; date: string; summary?: string }) => {
    if (modal?.type === "blog" && currentBlog) {
      updateBlog(modal.index, { ...currentBlog, title: meta.title, date: meta.date, summary: meta.summary || currentBlog.summary });
    }
  };

  // --- Idea helpers ---
  const currentIdea = modal?.type === "idea" ? ideas[modal.index] : undefined;
  const handleSaveIdeaBody = (body: string) => {
    if (modal?.type === "idea" && currentIdea) {
      updateIdea(modal.index, { ...currentIdea, body });
    }
  };

  const handleSaveIdeaMeta = (meta: { title: string; date: string; summary?: string }) => {
    if (modal?.type === "idea" && currentIdea) {
      updateIdea(modal.index, { ...currentIdea, content: meta.title, date: meta.date });
    }
  };

  const handleAddIdea = (body: string) => {
    const today = new Date().toISOString().slice(0, 10);
    addIdea({ content: "新想法", date: today, body });
    setAddingType(null);
  };

  // --- Status ---
  const handleSaveStatus = () => {
    setStatus(statusDraft);
    setEditingStatus(false);
  };

  return (
    <>
      <section className="py-24 px-8 max-w-7xl mx-auto space-y-20" id="creations">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-7xl font-display font-extrabold">
            一些 <span className="bg-brand-pink text-white px-4 rounded-lg">有趣的创作</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-semibold">
            没有什么比把一个突然冒出来的想法变成现实更酷的事情了。
          </p>
          {editMode && (
            <p className="text-sm text-brand-pink font-bold animate-pulse">
              ✏️ 编辑模式已开启 (Ctrl+Shift+E 退出)
            </p>
          )}
        </div>

        {/* ===== 作品集 ===== */}
        <div className="space-y-8">
          <SectionHeader icon={Briefcase} title="作品集" />
          {featuredProjects.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-8">
              {featuredProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  {...useScrollReveal({ staggerIndex: idx })}
                  className="w-full md:w-[calc(50%-1rem)]"
                >
                  <LinkableCard href={project.link} title={project.title}>
                    <p className="text-gray-600 font-semibold text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </LinkableCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyPlaceholder />
          )}
        </div>

        {/* ===== 博客 ===== */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <SectionHeader icon={Pencil} title="博客" />
            <div className="flex gap-2">
              {editMode && (
                <button
                  onClick={() => setAddingType("blog")}
                  className="brutalist-button-black text-sm px-4 py-2"
                >
                  <Plus size={18} />
                  写博客
                </button>
              )}
            </div>
          </div>

          {blogs.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-8">
              {blogs.map((blog, idx) => (
                <motion.div
                  key={`${blog.title}-${idx}`}
                  {...useScrollReveal({ staggerIndex: idx })}
                  className="w-full md:w-[calc(50%-1rem)]"
                >
                  <div
                    className="relative group/card cursor-pointer"
                    onClick={() => setModal({ type: "blog", index: idx })}
                  >
                    <LinkableCard
                      title={blog.title}
                      hoverColor="hover:bg-brand-blue/10"
                      footer={
                        <span className="text-sm font-bold uppercase tracking-wide text-gray-400">
                          {blog.date}
                        </span>
                      }
                    >
                      <p className="text-gray-600 font-semibold text-lg leading-relaxed">
                        {blog.summary}
                      </p>
                    </LinkableCard>

                    {editMode && (
                      <div
                        className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity"
                        style={{ zIndex: 5 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setModal({ type: "blog", index: idx })}
                          className="w-9 h-9 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-brand-yellow/30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          title="编辑"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => { if (confirm("删除这篇博客？")) deleteBlog(idx); }}
                          className="w-9 h-9 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-brand-pink/30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          title="删除"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyPlaceholder />
          )}
        </div>

        {/* ===== 有趣想法 ===== */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <SectionHeader icon={Lightbulb} title="有趣想法" />
            {editMode && (
              <button
                onClick={() => setAddingType("idea")}
                className="brutalist-button-black text-sm px-4 py-2"
              >
                <Plus size={18} />
                记想法
              </button>
            )}
          </div>

          {ideas.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {ideas.map((idea, idx) => (
                <motion.div
                  key={`${idea.content}-${idx}`}
                  {...useScrollReveal({ staggerIndex: idx })}
                  className="w-full md:w-[calc(50%-0.75rem)]"
                >
                  <div
                    className="relative group/card cursor-pointer"
                    onClick={() => setModal({ type: "idea", index: idx })}
                  >
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
                      <div
                        className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity"
                        style={{ zIndex: 5 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setModal({ type: "idea", index: idx })}
                          className="w-9 h-9 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-brand-yellow/30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          title="编辑"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => { if (confirm("删除这条想法？")) deleteIdea(idx); }}
                          className="w-9 h-9 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-brand-pink/30 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          title="删除"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyPlaceholder />
          )}
        </div>

        {/* ===== 最近在捣鼓 ===== */}
        <div className="max-w-4xl mx-auto bg-white border-4 border-black rounded-3xl p-6 flex items-center gap-6 shadow-[8px_8px_0px_0px_rgba(108,99,255,1)] hover:shadow-none transition-all group">
          <div className="bg-brand-yellow p-4 rounded-2xl border-4 border-black group-hover:rotate-12 transition-transform shrink-0">
            <Code size={32} className="text-black" />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <h4 className="text-xl font-extrabold uppercase">最近在捣鼓</h4>
            {editMode && editingStatus ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={statusDraft}
                  onChange={(e) => setStatusDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveStatus();
                    if (e.key === "Escape") { setStatusDraft(status); setEditingStatus(false); }
                  }}
                  className="flex-1 text-lg font-bold border-2 border-black rounded-lg px-3 py-1 focus:outline-none focus:border-brand-blue"
                />
                <button onClick={handleSaveStatus} className="brutalist-button-black text-xs px-3 py-1">保存</button>
                <button onClick={() => { setStatusDraft(status); setEditingStatus(false); }} className="brutalist-button-white text-xs px-3 py-1">取消</button>
              </div>
            ) : (
              <p
                className={`text-gray-600 font-bold text-lg ${editMode ? "cursor-pointer hover:text-brand-pink border-b-2 border-dashed border-gray-300 hover:border-brand-pink" : ""}`}
                onClick={() => editMode && setEditingStatus(true)}
                title={editMode ? "点击编辑" : undefined}
              >
                {status}
              </p>
            )}
          </div>
          {editMode && !editingStatus && (
            <button
              onClick={() => setEditingStatus(true)}
              className="shrink-0 w-8 h-8 bg-white border-2 border-black rounded-lg flex items-center justify-center hover:bg-brand-yellow/30"
              title="编辑状态"
            >
              <Edit3 size={14} />
            </button>
          )}
        </div>
      </section>

      {/* ===== Modals ===== */}
      {modal?.type === "blog" && currentBlog && (
        <ContentModal
          title={currentBlog.title}
          date={currentBlog.date}
          summary={currentBlog.summary}
          body={currentBlog.body}
          link={currentBlog.link}
          onClose={closeModal}
          onEditBody={handleSaveBlogBody}
          onEditMeta={handleSaveBlogMeta}
        />
      )}
      {modal?.type === "idea" && currentIdea && (
        <ContentModal
          title={currentIdea.content}
          date={currentIdea.date}
          body={currentIdea.body}
          onClose={closeModal}
          onEditBody={handleSaveIdeaBody}
          onEditMeta={handleSaveIdeaMeta}
        />
      )}

      {addingType === "blog" && (
        <MarkdownEditor initialBody="" onSave={handleAddBlog} onCancel={() => setAddingType(null)} />
      )}
      {addingType === "idea" && (
        <MarkdownEditor initialBody="" onSave={handleAddIdea} onCancel={() => setAddingType(null)} />
      )}
    </>
  );
}
