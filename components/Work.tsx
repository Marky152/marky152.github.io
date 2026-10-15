"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

function Header() {
  return (
    <Reveal>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">
        01 / The Work
      </p>
      <h2 className="max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl">
        Hard problems,{" "}
        <span className="font-serif normal-case italic text-gold">
          calm interfaces.
        </span>
      </h2>
      <p className="mt-6 max-w-xl text-sm leading-relaxed text-dim sm:text-base">
        Real-time operations and AI, redrawn so the person using them feels
        calm — not the complexity underneath. Seven projects, one throughline.
      </p>
    </Reveal>
  );
}

/** Pinned section: vertical scroll drives the track horizontally. */
function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(1);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setRange(
        Math.max(1, trackRef.current.scrollWidth - window.innerWidth + 96)
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);
  const ghostX = useTransform(scrollYProgress, [0, 1], [0, range * 0.35]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `calc(100vh + ${range}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Ghost word drifting the opposite way */}
        <motion.span
          aria-hidden="true"
          style={{ x: ghostX }}
          className="text-outline pointer-events-none absolute top-6 left-[-5vw] select-none font-display text-[24vh] font-extrabold uppercase leading-none opacity-60"
        >
          Selected Work
        </motion.span>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-start gap-14 pl-6 pr-24 sm:gap-20 sm:pl-16"
        >
          {projects.map((project, i) => (
            <div key={project.slug} className={i % 2 === 1 ? "mt-16" : ""}>
              <ProjectCard project={project} index={i} horizontal />
            </div>
          ))}
          {/* End card */}
          <a
            href="https://www.behance.net/markmenezes2"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Behance ↗"
            className="mt-24 flex shrink-0 items-center gap-4 self-center"
          >
            <span className="font-serif text-4xl italic text-gold sm:text-5xl">
              more on Behance
            </span>
            <span aria-hidden="true" className="text-4xl text-gold">
              ↗
            </span>
          </a>
        </motion.div>

        {/* Progress counter */}
        <ProgressCounter progress={scrollYProgress} />
      </div>
    </div>
  );
}

function ProgressCounter({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [idx, setIdx] = useState(1);
  useEffect(
    () =>
      progress.on("change", (v) => {
        setIdx(Math.min(projects.length, Math.max(1, Math.round(v * projects.length + 0.5))));
      }),
    [progress]
  );
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-8 left-6 flex items-center gap-3 font-mono text-xs text-dim sm:left-16"
    >
      <span className="text-gold">{String(idx).padStart(2, "0")}</span>
      <span className="h-px w-10 bg-gold/40" />
      <span>{String(projects.length).padStart(2, "0")}</span>
    </div>
  );
}

export default function Work() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<"vertical" | "horizontal">("vertical");

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setMode(mq.matches ? "horizontal" : "vertical");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduced]);

  return (
    <section id="work" aria-label="Selected work">
      <div className="px-6 pt-28 sm:px-16 sm:pt-36">
        <Header />
      </div>

      {mode === "horizontal" ? (
        <HorizontalGallery />
      ) : (
        <div className="mt-16 flex flex-col gap-20 px-6 pb-24 sm:px-16">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={0.05}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
