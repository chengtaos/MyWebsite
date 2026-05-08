import { type ReactNode } from "react";
import { motion } from "motion/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  staggerIndex?: number;
  direction?: "up" | "down";
}

export default function RevealOnScroll({
  children,
  className,
  staggerIndex = 0,
  direction = "up",
}: RevealOnScrollProps) {
  const reveal = useScrollReveal({ staggerIndex, direction });
  return (
    <motion.div {...reveal} className={className}>
      {children}
    </motion.div>
  );
}
