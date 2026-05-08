import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface EmptyPlaceholderProps {
  size?: "md" | "lg";
}

const SIZES = {
  md: { container: "p-12 md:p-16", icon: "w-16 h-16", iconSize: 32 },
  lg: { container: "p-12 md:p-20", icon: "w-20 h-20", iconSize: 40 },
} as const;

const DOTS = ["bg-brand-pink", "bg-brand-yellow", "bg-brand-blue"] as const;

export default function EmptyPlaceholder({ size = "md" }: EmptyPlaceholderProps) {
  const s = SIZES[size];
  const reveal = useScrollReveal();

  return (
    <motion.div
      {...reveal}
      className={`brutalist-card ${s.container} flex flex-col items-center text-center space-y-8 bg-gray-50 border-dashed border-4 border-black`}
    >
      <div className={`${s.icon} bg-brand-blue border-4 border-black rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}>
        <Zap size={s.iconSize} className="text-white" />
      </div>
      <div className="space-y-4">
        <h3 className="text-4xl font-extrabold italic">"施工中..."</h3>
        <p className="text-xl text-gray-600 font-bold max-w-lg mx-auto">
          这里还在施工中，新的小玩意儿正在路上...
        </p>
      </div>
      <div className="flex gap-4">
        {DOTS.map((color, i) => (
          <div key={i} className={`h-4 w-4 rounded-full ${color} border-2 border-black`} />
        ))}
      </div>
    </motion.div>
  );
}
