import { useState } from "react";
import { projects } from "@/data/projects";
import { useContentStore } from "@/contexts/ContentContext";
import { useEditMode } from "@/hooks/useEditMode";
import ProjectSection from "@/components/Home/ProjectSection";
import BlogSection from "@/components/Home/BlogSection";
import IdeaSection from "@/components/Home/IdeaSection";
import StatusBar from "@/components/Home/StatusBar";
import ContentModal from "@/components/ui/ContentModal";
import MarkdownEditor from "@/components/ui/MarkdownEditor";
import type { ContentMeta } from "@/types";
import { EDIT_MODE } from "@/constants/text";

const featuredProjects = projects.filter((p) => p.featured);

type ModalState =
  | { type: "blog"; id: string }
  | { type: "idea"; id: string }
  | null;

export default function Services() {
  const {
    blogs, ideas,
    addBlog, updateBlog, deleteBlog,
    addIdea, updateIdea, deleteIdea,
  } = useContentStore();
  const { editMode } = useEditMode();
  const [modal, setModal] = useState<ModalState>(null);
  const [addingType, setAddingType] = useState<"blog" | "idea" | null>(null);

  const closeModal = () => setModal(null);

  const currentBlog = modal?.type === "blog" ? blogs.find((b) => b.id === modal.id) : undefined;
  const currentIdea = modal?.type === "idea" ? ideas.find((i) => i.id === modal.id) : undefined;

  const handleAddBlog = (body: string, meta?: ContentMeta) => {
    const today = new Date().toISOString().slice(0, 10);
    addBlog({
      id: crypto.randomUUID(),
      title: meta?.title || "新博客",
      date: meta?.date || today,
      summary: meta?.summary || "",
      body,
    });
    setAddingType(null);
  };

  const handleAddIdea = (body: string, meta?: ContentMeta) => {
    const today = new Date().toISOString().slice(0, 10);
    addIdea({
      id: crypto.randomUUID(),
      content: meta?.title || "新想法",
      date: meta?.date || today,
      body,
    });
    setAddingType(null);
  };

  return (
    <>
      <section className="py-24 px-8 max-w-7xl mx-auto space-y-20" id="creations">
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-7xl font-display font-extrabold">
            一些 <span className="bg-brand-pink text-white px-4 rounded-lg">有趣的创作</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-semibold">
            没有什么比把一个突然冒出来的想法变成现实更酷的事情了。
          </p>
          {editMode && (
            <p className="text-sm text-brand-pink font-bold animate-pulse">
              ✏️ {EDIT_MODE.enabled}
            </p>
          )}
        </div>

        <ProjectSection projects={featuredProjects} />

        <BlogSection
          blogs={blogs}
          onOpen={(id) => setModal({ type: "blog", id })}
          onEdit={(id) => setModal({ type: "blog", id })}
          onDelete={deleteBlog}
          onAdd={() => setAddingType("blog")}
        />

        <IdeaSection
          ideas={ideas}
          onOpen={(id) => setModal({ type: "idea", id })}
          onEdit={(id) => setModal({ type: "idea", id })}
          onDelete={deleteIdea}
          onAdd={() => setAddingType("idea")}
        />

        <StatusBar />
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
          onEditBody={(body) => updateBlog(modal.id, { ...currentBlog, body })}
          onEditMeta={(meta) => updateBlog(modal.id, { ...currentBlog, title: meta.title, date: meta.date, summary: meta.summary || currentBlog.summary })}
        />
      )}
      {modal?.type === "idea" && currentIdea && (
        <ContentModal
          title={currentIdea.content}
          date={currentIdea.date}
          body={currentIdea.body}
          onClose={closeModal}
          onEditBody={(body) => updateIdea(modal.id, { ...currentIdea, body })}
          onEditMeta={(meta) => updateIdea(modal.id, { ...currentIdea, content: meta.title, date: meta.date })}
        />
      )}

      {addingType === "blog" && (
        <MarkdownEditor
          initialBody=""
          initialTitle="新博客"
          initialDate={new Date().toISOString().slice(0, 10)}
          onSave={handleAddBlog}
          onCancel={() => setAddingType(null)}
          showMeta
          summaryLabel="摘要"
        />
      )}
      {addingType === "idea" && (
        <MarkdownEditor
          initialBody=""
          initialTitle="新想法"
          initialDate={new Date().toISOString().slice(0, 10)}
          onSave={handleAddIdea}
          onCancel={() => setAddingType(null)}
          showMeta
          summaryLabel="描述"
        />
      )}
    </>
  );
}
