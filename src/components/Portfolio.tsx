import { motion } from "motion/react";
import { Zap } from "lucide-react";

const Portfolio = ({}: { key?: string }) => {
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
    </div>
  );
};

export default Portfolio;
