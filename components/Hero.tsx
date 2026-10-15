"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

const PORTRAIT = "/img/mark-cutout.png";

/**
 * Minimal landing: the isolated portrait sits in black & white. A glassy bubble
 * follows the pointer with spring physics and reveals the original colour.
 *
 * Registration is exact because there is only ONE positioned image (the colour
 * base). A greyscale copy sits directly on top and is punched through by a
 * moving radial mask, so the "reveal" is literally the same pixels showing
 * through a hole — the image never shifts and no edge can bleed.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [interactive, setInteractive] = useState(false);
  const [active, setActive] = useState(false);
  const [radius, setRadius] = useState(70);
  const [moved, setMoved] = useState(false);
  const initedRef = useRef(false);

  // Raw pointer position (relative to the stage), smoothed into a springy bubble.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 15, mass: 1.05 });
  const sy = useSpring(my, { stiffness: 150, damping: 15, mass: 1.05 });

  // Hole radius opens/closes as the pointer enters/leaves.
  const holeR = useMotionValue(0);
  const holeInner = useTransform(holeR, (v) => v * 0.78);
  const maskImage = useMotionTemplate`radial-gradient(circle at ${sx}px ${sy}px, transparent ${holeInner}px, black ${holeR}px)`;

  // Velocity drives a jelly stretch on the glass rim; springs give it wobble.
  const vx = useVelocity(sx);
  const vy = useVelocity(sy);
  const clamp = (n: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, n));
  const stretchXraw = useTransform([vx, vy], ([x, y]: number[]) =>
    1 + clamp((Math.abs(x) - Math.abs(y)) / 2600, -0.22, 0.22)
  );
  const stretchYraw = useTransform([vx, vy], ([x, y]: number[]) =>
    1 + clamp((Math.abs(y) - Math.abs(x)) / 2600, -0.22, 0.22)
  );
  const spring = { stiffness: 190, damping: 11, mass: 0.6 };
  const scaleX = useSpring(stretchXraw, spring);
  const scaleY = useSpring(stretchYraw, spring);

  // Glass rim / lens position (top-left of the circle).
  const lensX = useTransform(sx, (v) => v - radius);
  const lensY = useTransform(sy, (v) => v - radius);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) return;
    setInteractive(true);

    const measure = () => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRadius(Math.max(44, Math.min(78, r.width * 0.11)));
      if (!initedRef.current) {
        initedRef.current = true;
        mx.jump(r.width / 2);
        my.jump(r.height * 0.32);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduced, mx, my]);

  // Open / close the reveal hole smoothly.
  useEffect(() => {
    const controls = animate(holeR, active ? radius : 0, {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [active, radius, holeR]);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!interactive || !stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
      if (!moved) setMoved(true);
    },
    [interactive, moved, mx, my]
  );

  const onEnter = () => {
    setActive(true);
    document.body.classList.add("bubble-cursor");
  };
  const onLeave = () => {
    setActive(false);
    document.body.classList.remove("bubble-cursor");
  };

  useEffect(() => () => document.body.classList.remove("bubble-cursor"), []);

  return (
    <section
      ref={sectionRef}
      aria-label="Mark Menezes — Product / UX Designer"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-16"
    >
      {/* Giant outlined surname — graphic, not really "text" */}
      <span
        aria-hidden="true"
        className="text-outline pointer-events-none absolute bottom-[4vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap font-display text-[26vw] font-extrabold uppercase leading-none opacity-[0.13]"
      >
        Menezes
      </span>

      {/* Soft gold aura behind the figure */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(231,174,86,0.18), transparent 62%)",
        }}
      />

      {/* Portrait stage */}
      <motion.div
        ref={stageRef}
        initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 h-[82vh] max-h-[860px] w-auto"
        style={{ aspectRatio: "1004 / 1600" }}
      >
        {/* Colour base — never moves */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PORTRAIT}
          alt="Mark Menezes"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-contain object-bottom"
        />

        {/* Greyscale copy on top, with a moving hole punched through it */}
        {interactive && (
          <motion.img
            src={PORTRAIT}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{
              WebkitMaskImage: maskImage,
              maskImage,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
            className="absolute inset-0 h-full w-full select-none object-contain object-bottom [filter:grayscale(1)_contrast(1.05)_brightness(0.96)]"
          />
        )}

        {/* Glass bubble rim with jelly physics */}
        {interactive && (
          <motion.div
            aria-hidden="true"
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              x: lensX,
              y: lensY,
              width: radius * 2,
              height: radius * 2,
              scaleX,
              scaleY,
            }}
            className="pointer-events-none absolute left-0 top-0 z-30 rounded-full"
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                boxShadow:
                  "inset 0 0 16px rgba(255,255,255,0.28), inset 0 -10px 22px rgba(231,174,86,0.22), 0 6px 28px rgba(0,0,0,0.32)",
                border: "1px solid rgba(255,255,255,0.35)",
                background:
                  "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.28), rgba(255,255,255,0.03) 44%, transparent 62%)",
              }}
            />
            <span className="absolute left-[26%] top-[22%] h-2 w-2 rounded-full bg-white/70 blur-[1px]" />
            <span className="absolute bottom-[26%] right-[24%] h-1 w-1 rounded-full bg-white/40 blur-[1px]" />
          </motion.div>
        )}
      </motion.div>

      {/* --- minimal text --- */}

      <motion.span
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute left-5 top-1/2 z-30 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-[0.4em] text-faint sm:block"
      >
        Product / UX Designer
      </motion.span>

      <motion.p
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.7 }}
        className="absolute bottom-7 left-5 z-30 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-dim sm:left-8 sm:text-xs"
      >
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
        Open to full-time · US
      </motion.p>

      <motion.a
        href="#work"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.8 }}
        className="fill-link absolute bottom-7 right-5 z-30 border-b border-gold/40 pb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-dim sm:right-8 sm:text-xs"
      >
        Scroll ↓
      </motion.a>

      {interactive && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: moved ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-[13vh] left-1/2 z-30 -translate-x-1/2 font-serif text-base italic text-faint"
        >
          ( move to reveal )
        </motion.span>
      )}
    </section>
  );
}
