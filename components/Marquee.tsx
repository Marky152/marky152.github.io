"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { marqueeItems } from "@/lib/projects";

function Row({
  items,
  direction,
  outline,
}: {
  items: string[];
  direction: 1 | -1;
  outline?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let offset = 0;
    let speed = 1.1;
    let targetSpeed = 1.1;
    let half = track.scrollWidth / 2;

    const onResize = () => (half = track.scrollWidth / 2);

    const tick = () => {
      speed += (targetSpeed - speed) * 0.05;
      offset -= speed * direction;
      if (direction === 1 && -offset >= half) offset += half;
      if (direction === -1 && offset >= 0) offset -= half;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    if (direction === -1) offset = -half;

    const slow = () => (targetSpeed = 0.05);
    const resume = () => (targetSpeed = 1.1);

    const parent = track.parentElement!;
    parent.addEventListener("mouseenter", slow);
    parent.addEventListener("mouseleave", resume);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mouseenter", slow);
      parent.removeEventListener("mouseleave", resume);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, direction]);

  const doubled = [...items, ...items];

  if (reduced) {
    return (
      <p className="px-6 py-2 text-center font-mono text-sm uppercase tracking-[0.2em] text-dim">
        {items.join(" · ")}
      </p>
    );
  }

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center whitespace-nowrap"
          >
            <span
              className={`px-5 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl ${
                outline ? "text-outline" : "text-ink"
              }`}
            >
              {item}
            </span>
            <span aria-hidden="true" className="text-3xl text-gold sm:text-4xl">
              ✳
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two opposing rows of giant type. Both ease to near-stop on hover. */
export default function Marquee() {
  const half = Math.ceil(marqueeItems.length / 2);
  return (
    <section
      aria-label="Focus areas"
      className="space-y-4 border-y hairline py-10 sm:py-14"
    >
      <p className="mb-2 px-6 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-faint sm:mb-4">
        Fluent in
      </p>
      <Row items={marqueeItems.slice(0, half)} direction={1} />
      <Row items={marqueeItems.slice(half)} direction={-1} outline />
    </section>
  );
}
