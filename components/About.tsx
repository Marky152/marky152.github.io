"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Timeline from "./Timeline";
import Reveal from "./Reveal";

const stats = [
  { value: "3.85 / 4.0", label: "GPA, M.S. UX at ASU", rotate: "-rotate-2" },
  {
    value: "Nasdaq · Times Square",
    label: "On national TV with the Arrive AI exec team at the bell-ringing",
    rotate: "rotate-1",
  },
  {
    value: "Intern → full-time",
    label: "Hired back by Arrive AI to design autonomous delivery",
    rotate: "-rotate-1",
  },
];

const tools = [
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "InDesign",
  "Lightroom",
  "Miro",
  "Sketch",
];

const craft = [
  "User research",
  "Information architecture",
  "User flows",
  "Wireframing",
  "Prototyping",
  "Design systems",
  "WCAG accessibility",
];

function Portrait() {
  const [hovered, setHovered] = useState(false);
  const [primaryFailed, setPrimaryFailed] = useState(false);
  const [secondaryFailed, setSecondaryFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 3]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const showSecondary = hovered && !secondaryFailed;

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { rotate, y }}
      data-cursor={secondaryFailed ? undefined : "Hi ✳"}
      className="relative mx-auto w-full max-w-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {primaryFailed ? (
        <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl border hairline bg-gradient-to-br from-panel2 via-panel to-[#2b2113]">
          <span className="font-display text-7xl font-extrabold text-gold/70">
            MM<span className="text-gold">.</span>
          </span>
        </div>
      ) : (
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border hairline">
          <Image
            src="/img/mark-primary.jpg"
            alt="Mark Menezes, three-quarter profile portrait at ASU graduation"
            fill
            sizes="(max-width: 768px) 92vw, 384px"
            className={`object-cover transition-opacity duration-500 ${showSecondary ? "opacity-0" : "opacity-100"}`}
            onError={() => setPrimaryFailed(true)}
          />
          {!secondaryFailed && (
            <Image
              src="/img/mark-secondary.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 92vw, 384px"
              className={`object-cover transition-opacity duration-500 ${showSecondary ? "opacity-100" : "opacity-0"}`}
              onError={() => setSecondaryFailed(true)}
            />
          )}
        </div>
      )}
      {/* Taped label */}
      <span
        aria-hidden="true"
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rotate-[-2deg] rounded-md bg-gold px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#0E0D0C] shadow-lg"
      >
        that&apos;s me ✳
      </span>
    </motion.div>
  );
}

export default function About() {
  const ghostRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ghostRef,
    offset: ["start end", "end start"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], [80, -220]);

  return (
    <section
      id="about"
      ref={ghostRef}
      aria-label="About Mark"
      className="relative overflow-hidden px-6 py-28 sm:px-16 sm:py-36"
    >
      {/* Drifting ghost word */}
      <motion.span
        aria-hidden="true"
        style={reduced ? undefined : { x: ghostX }}
        className="text-outline pointer-events-none absolute right-0 top-10 select-none font-display text-[18vw] font-extrabold uppercase leading-none opacity-50"
      >
        About
      </motion.span>

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">
            02 / The Person
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl">
            The messy part is{" "}
            <span className="font-serif normal-case italic text-gold">
              the fun part.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-dim sm:text-base">
            The interfaces are the output. Here&apos;s the person — and the path —
            behind them.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 items-start gap-16 md:grid-cols-12">
          <div className="md:col-span-5 md:sticky md:top-28">
            <Portrait />
          </div>

          <div className="md:col-span-7">
            <Reveal>
              <p className="font-display text-xl font-semibold leading-relaxed text-ink sm:text-2xl">
                I design at the messy intersection of real-time operations, AI
                tooling, and human needs — and my job is to make the result
                feel{" "}
                <span className="font-serif italic text-gold">effortless.</span>
              </p>
              <p className="mt-6 leading-relaxed text-dim">
                My foundation is research: a B.Des in User Experience from
                Symbiosis Institute of Design, then client and agency work
                across Dubai and Doha — corporate homepages, a waterpark, an
                investment group. Real clients, real constraints, real
                deadlines.
              </p>
              <p className="mt-5 leading-relaxed text-dim">
                A Master&apos;s at Arizona State University brought me to the
                US, an internship brought me to Arrive AI, and Arrive AI
                brought me back full-time — where I now design and operate
                autonomous mailbox and delivery systems. Watching a real-time
                system succeed or fail in front of you is the fastest design
                education there is.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-12 flex flex-wrap gap-5">
                {stats.map((stat) => (
                  <div
                    key={stat.value}
                    className={`${stat.rotate} max-w-[220px] rounded-xl border hairline bg-panel/70 px-5 py-4 transition-transform duration-300 hover:rotate-0 hover:scale-105`}
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-lg font-bold text-gold">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-dim">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h3 className="mb-10 font-mono text-xs uppercase tracking-[0.3em] text-dim">
              The path so far
            </h3>
            <Timeline />
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.1}>
            <h3 className="mb-10 font-mono text-xs uppercase tracking-[0.3em] text-dim">
              Tools & craft
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {tools.map((tool, i) => (
                <span
                  key={tool}
                  className={`rounded-full border hairline px-4 py-2 font-display text-sm font-semibold text-dim transition-all duration-300 hover:border-gold hover:text-gold ${
                    i % 3 === 0 ? "rotate-1" : i % 3 === 1 ? "-rotate-1" : ""
                  }`}
                >
                  {tool}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {craft.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-panel px-4 py-2 text-sm text-dim"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
