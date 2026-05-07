import { type Variants } from "motion/react";

interface ScrollRevealOptions {
  delay?: number;
  staggerIndex?: number;
  staggerDelay?: number;
  direction?: "up" | "down";
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { delay = 0, staggerIndex = 0, staggerDelay = 0.1, direction = "up" } = options;

  const y = direction === "up" ? 30 : -30;

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true } as const,
    transition: { delay: delay + staggerIndex * staggerDelay } as const,
  } as const;
}
