import { motion } from "motion/react";
import { ExternalLink, Zap } from "lucide-react";
import { projects } from "../data/projects.ts";

const onlineProjects = projects.filter((p) => p.status === "online");
const wipProjects = projects.filter((p) => p.status === "wip");

const Portfolio = () => {
  return (
    <div className="pt-40 pb-24 px-8 max-w-7xl mx-auto space-y-16">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tight">
          正在 <span className="bg-brand-yellow px-4 rounded-lg">捣鼓中</span>
        </h1>
        <p className="text-xl text-gray-500 font-semibold max-w-2xl">
          这些是我最近在尝试的一些小玩意儿，目前还在各种“试验”阶段。
        </p>
      </div>

      {onlineProjects.length > 0 && (
        <div className="flex flex-wrap justify-center gap-8">
          {onlineProjects.map((project, idx) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="brutalist-card p-8 flex flex-col justify-between gap-6 cursor-pointer group hover:bg-brand-yellow/20 w-full md:w-[calc(50%-1rem)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-extrabold group-hover:underline">
                    {project.title}
                  </h3>
                  <ExternalLink
                    size={20}
                    className="text-gray-400 group-hover:text-black transition-colors shrink-0"
                  />
                </div>
                <p className="text-gray-600 font-semibold text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-brand-yellow border-2 border-black" />
                <span className="text-sm font-bold uppercase tracking-wide text-gray-500">
                  已上线
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {wipProjects.length > 0 && (
        <div className="flex flex-wrap justify-center gap-8">
          {wipProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="brutalist-card p-8 flex flex-col gap-6 bg-gray-50 border-dashed w-full md:w-[calc(50%-1rem)]"
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-extrabold text-gray-400">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-semibold text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300 border-2 border-black" />
                <span className="text-sm font-bold uppercase tracking-wide text-gray-400">
                  施工中
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="brutalist-card p-12 md:p-20 flex flex-col items-center text-center space-y-8 bg-gray-50 border-dashed border-4 border-black"
        >
          <div className="w-20 h-20 bg-brand-blue border-4 border-black rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <Zap size={40} className="text-white" />
          </div>
          <div className="space-y-4">
            <h3 className="text-4xl font-extrabold italic">“施工中...”</h3>
            <p className="text-xl text-gray-600 font-bold max-w-lg mx-auto">
              这里还在施工中，新的小玩意儿正在路上...
            </p>
          </div>
          <div className="flex gap-4">
            <div className="h-4 w-4 rounded-full bg-brand-pink border-2 border-black" />
            <div className="h-4 w-4 rounded-full bg-brand-yellow border-2 border-black" />
            <div className="h-4 w-4 rounded-full bg-brand-blue border-2 border-black" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Portfolio;
