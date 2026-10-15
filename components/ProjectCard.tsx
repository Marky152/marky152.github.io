"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

/**
 * One project. `horizontal` cards live inside the pinned scroll track;
 * vertical cards stack on touch/small screens and under reduced motion.
 */
export default function ProjectCard({
  project,
  index,
  horizontal = false,
}: {
  project: Project;
  index: number;
  horizontal?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const tilt = index % 2 === 0 ? "md:rotate-[0.6deg]" : "md:-rotate-[0.6deg]";
  const hasLink = Boolean(project.url);

  // Internal work links nowhere; render a static wrapper instead of an anchor.
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? {
        href: project.url,
        target: "_blank",
        rel: "noopener noreferrer",
        "data-cursor": "View ↗",
        "aria-label": `${project.title} — view case study on Behance`,
      }
    : {};

  return (
    <article
      className={`group relative shrink-0 ${
        horizontal ? `w-[78vw] max-w-[560px] ${tilt}` : "w-full"
      }`}
    >
      {/* Giant numeral overlapping the card */}
      <span
        aria-hidden="true"
        className="text-outline-gold pointer-events-none absolute -top-[0.55em] left-[-0.08em] z-10 select-none font-display text-[7rem] font-extrabold leading-none sm:text-[9rem]"
      >
        {project.num}
      </span>

      <Wrapper {...wrapperProps} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border hairline bg-panel">
          {imgFailed ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-panel2 via-panel to-[#2b2113] p-6">
              <span className="font-display text-4xl font-extrabold uppercase leading-none text-gold/70 sm:text-5xl">
                {project.title}
              </span>
            </div>
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} — case study cover`}
              fill
              sizes="(max-width: 768px) 92vw, 560px"
              className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.06] group-hover:rotate-[0.5deg]"
              onError={() => setImgFailed(true)}
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0E0D0C]/60 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-20"
          />
          {/* Tag chips over the image */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#0E0D0C]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#F3ECE0] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-gold sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-dim">
            {project.role}
            {project.company && (
              <span className="text-faint"> · {project.company}</span>
            )}
          </p>
          <p className="mt-2.5 font-mono text-xs leading-relaxed text-gold">
            ✳ {project.metric}
          </p>
          {project.note && (
            <p className="mt-1 font-serif text-sm italic text-faint">
              {project.note}
            </p>
          )}
        </div>
      </Wrapper>
    </article>
  );
}
