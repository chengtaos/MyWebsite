import { useState } from "react";
import { projects } from "@/data/projects";
import { loadBlogs, loadIdeas } from "@/utils/content";
import ProjectSection from "@/components/Home/ProjectSection";
import BlogSection from "@/components/Home/BlogSection";
import IdeaSection from "@/components/Home/IdeaSection";
import StatusBar from "@/components/Home/StatusBar";
import ContentModal from "@/components/ui/ContentModal";

const featuredProjects = projects.filter((p) => p.featured);
const blogs = loadBlogs();
const ideas = loadIdeas();

type ModalState =
  | { type: "blog"; id: string }
  | { type: "idea"; id: string }
  | null;

export default function Services() {
  const [modal, setModal] = useState<ModalState>(null);

  const currentBlog = modal?.type === "blog" ? blogs.find((b) => b.id === modal.id) : undefined;
  const currentIdea = modal?.type === "idea" ? ideas.find((i) => i.id === modal.id) : undefined;

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
        </div>

        <ProjectSection projects={featuredProjects} />

        <BlogSection
          blogs={blogs}
          onOpen={(id) => setModal({ type: "blog", id })}
        />

        <IdeaSection
          ideas={ideas}
          onOpen={(id) => setModal({ type: "idea", id })}
        />

        <StatusBar />
      </section>

      {modal?.type === "blog" && currentBlog && (
        <ContentModal
          title={currentBlog.title}
          date={currentBlog.date}
          summary={currentBlog.summary}
          body={currentBlog.body}
          link={currentBlog.link}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "idea" && currentIdea && (
        <ContentModal
          title={currentIdea.content}
          date={currentIdea.date}
          body={currentIdea.body}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
