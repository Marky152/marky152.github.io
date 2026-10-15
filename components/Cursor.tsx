"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: small gold dot + trailing ring. Over elements tagged
 * [data-cursor="<label>"] it inflates into a gold badge showing the label.
 * Fine pointers only; disabled under reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    let raf = 0;
    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let ringScale = 1;
    let targetScale = 1;
    let label = "";

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const el = e.target as HTMLElement;
      const tagged = el.closest("[data-cursor]") as HTMLElement | null;
      const interactive = el.closest("a, button");
      const nextLabel = tagged?.dataset.cursor ?? "";
      if (nextLabel !== label && labelRef.current) {
        labelRef.current.textContent = nextLabel;
        label = nextLabel;
      }
      targetScale = nextLabel ? 5.2 : interactive ? 2.2 : 1;
    };

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      ringScale += (targetScale - ringScale) * 0.14;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${ringScale > 3 ? 0 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.backgroundColor =
          ringScale > 3 ? "rgba(231,174,86,0.95)" : "rgba(231,174,86,0)";
      }
      if (labelRef.current) {
        labelRef.current.style.opacity = ringScale > 4 ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        data-cursor-dot
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2.5 w-2.5 rounded-full bg-gold"
      />
      <div
        ref={ringRef}
        data-cursor-ring
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] flex h-9 w-9 items-center justify-center rounded-full border border-gold/60"
      >
        <span
          ref={labelRef}
          className="font-mono text-[5px] font-bold uppercase tracking-widest text-[#0E0D0C]"
        />
      </div>
    </>
  );
}
