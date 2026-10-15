"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const entries = [
  {
    when: "Mar 2026 – present",
    what: "Teleoperations & UX Designer · Arrive AI",
    current: true,
  },
  { when: "Jun – Aug 2025", what: "UX Design Intern · Arrive AI" },
  {
    when: "Jan 2024 – Dec 2025",
    what: "M.S. User Experience · Arizona State University · GPA 3.85",
  },
  {
    when: "Feb 2023 – Jan 2024",
    what: "UI/UX Designer · Nuance Digital Solutions (remote)",
  },
  { when: "Jan 2023", what: "UX Intern · Nexa · Dubai" },
  {
    when: "2019 – 2023",
    what: "B.Des User Experience · Symbiosis Institute of Design, Pune",
  },
];

/** Vertical timeline whose gold spine draws itself as you scroll. */
export default function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <ol ref={ref} className="relative pl-7" aria-label="Career timeline">
      <span
        aria-hidden="true"
        className="absolute left-[4px] top-1 h-full w-px bg-gold/15"
      />
      {!reduced && (
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute left-[4px] top-1 h-full w-px origin-top bg-gold"
        />
      )}
      {entries.map((entry, i) => (
        <motion.li
          key={entry.when}
          className="relative pb-9 last:pb-0"
          initial={reduced ? false : { opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
          whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            aria-hidden="true"
            className={`absolute -left-[27.5px] top-1.5 h-2.5 w-2.5 rounded-full ${
              entry.current ? "bg-gold" : "border border-gold/50 bg-surface"
            }`}
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            {entry.when}
          </p>
          <p className="mt-1 font-display text-sm font-semibold leading-relaxed text-ink sm:text-base">
            {entry.what}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
