import { motion } from "motion/react";
import { Mail, Briefcase } from "lucide-react";
import { SITE } from "@/config/site";
import { BUTTON } from "@/constants/text";
import OptimizedImage from "@/components/ui/OptimizedImage";

export interface HeroProps {
  onPortfolioClick: () => void;
}

export default function Hero({ onPortfolioClick }: HeroProps) {
  return (
    <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-display font-extrabold leading-tight text-black"
        >
          <span className="bg-brand-pink px-4 inline-block text-white rounded-lg -rotate-1">
            探索
          </span>
          技术
          <br />
          与设计的
          <br />
          <span className="bg-brand-blue px-4 inline-block text-white rounded-lg rotate-1">
            边界
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-700 max-w-lg leading-relaxed font-semibold italic"
        >
          这里是{SITE.name}的个人自留地。关于对这个世界的一点观察。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-6"
        >
          <button className="brutalist-button-black" onClick={onPortfolioClick}>
            <Briefcase size={20} />
            {BUTTON.explore}
          </button>
          <a className="brutalist-button-white" href={`mailto:${SITE.email}`}>
            <Mail size={20} />
            {BUTTON.sayHi}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
        animate={{
          opacity: 1,
          scale: [1, 1.02, 1],
          y: [0, -10, 0],
          rotate: 0,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="flex-1 relative"
      >
        <div className="w-full aspect-square bg-brand-yellow border-4 border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <OptimizedImage
              src="https://i.postimg.cc/fRBNbq50/fig2.png"
              alt={SITE.name}
              className="w-full h-full object-cover bg-brand-yellow"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
