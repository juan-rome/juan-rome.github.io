"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Mount/scroll reveal: scales up from 92% with a slight spring overshoot
 *  past 100% while fading in, rather than rising into place. Callers that
 *  already pass a per-index `delay` (every grid of cards on the site does)
 *  get a left-to-right cascade for free, since cards in the same row cross
 *  the viewport threshold at the same instant and only the delay staggers
 *  them. Disabled entirely under reduced motion. */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        opacity: { duration: 0.5, delay, ease: "easeOut" },
        scale: { duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
