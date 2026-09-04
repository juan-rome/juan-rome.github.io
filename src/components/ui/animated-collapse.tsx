"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animates a block between hidden and its natural height, for every
 * expand/collapse control on the site (AI Lab's "+N more skills", the
 * Experience role details, the Projects case studies). Framer Motion
 * measures `height: "auto"` itself, so this doesn't need the manual
 * scrollHeight/max-height bookkeeping a plain CSS transition would.
 */
export function AnimatedCollapse({
  open,
  id,
  children,
  className,
}: {
  open: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
          }
          className={cn("overflow-hidden", className)}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
