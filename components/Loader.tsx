"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const words = ["CHAOS", "SYSTEMS", "CLARITY"];

/**
 * Entry moment: three words flash — complexity resolving into clarity —
 * then the veil wipes upward. Total < 1.2s. Skipped under reduced motion.
 */
export default function Loader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const w1 = setTimeout(() => setWord(1), 300);
    const w2 = setTimeout(() => setWord(2), 600);
    const end = setTimeout(() => {
      setDone(true);
      document.documentElement.style.overflow = "";
    }, 1000);
    return () => {
      clearTimeout(w1);
      clearTimeout(w2);
      clearTimeout(end);
      document.documentElement.style.overflow = "";
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0E0D0C]"
          exit={{
            y: "-100%",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          aria-hidden="true"
        >
          <div className="relative flex items-center gap-4">
            <span className="font-mono text-xs text-[#7C766B]">
              {String(word + 1).padStart(2, "0")} / 03
            </span>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={word}
                initial={{ y: 24, opacity: 0, rotate: 3 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -24, opacity: 0, rotate: -3 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display text-4xl font-extrabold tracking-tight sm:text-6xl ${
                  word === 2 ? "text-[#E7AE56]" : "text-[#F3ECE0]"
                }`}
              >
                {words[word]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
