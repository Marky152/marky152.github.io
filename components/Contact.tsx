"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const word = "LET'S TALK";

/** Each letter lifts and tilts on hover — the headline itself is the toy. */
function PlayfulHeadline() {
  const reduced = useReducedMotion();
  return (
    <span aria-label={word} role="text" className="inline-block">
      {word.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} className="inline-block w-[0.35em]" />
        ) : (
          <motion.span
            key={i}
            aria-hidden="true"
            className="inline-block cursor-default"
            whileHover={
              reduced
                ? undefined
                : {
                    y: -22,
                    rotate: i % 2 === 0 ? -8 : 8,
                    scale: 1.12,
                    color: "#E7AE56",
                  }
            }
            transition={{ type: "spring", stiffness: 320, damping: 14 }}
          >
            {ch}
          </motion.span>
        )
      )}
    </span>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden border-t hairline px-6 py-28 text-center sm:px-16 sm:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-gold">
            03 / The Invitation
          </p>
          <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-dim sm:text-base">
            You&apos;ve seen the work and the path. The rest is just a
            conversation.
          </p>
          <h2 className="font-display text-[13vw] font-extrabold leading-[0.95] tracking-tight sm:text-8xl">
            <PlayfulHeadline />
          </h2>
          <p className="mx-auto mt-6 font-serif text-2xl italic text-dim sm:text-3xl">
            let&apos;s build something that just works.
          </p>
          <p className="mx-auto mt-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">
            Open to full-time product & UX roles in the US
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href="mailto:markmenezes.2000@gmail.com"
            data-cursor="Say hi ✳"
            className="fill-link mt-12 inline-block border-b-2 border-gold pb-2 font-display text-xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            markmenezes.2000@gmail.com
          </a>

          <div className="mt-12 flex items-center justify-center gap-10">
            <a
              href="https://www.linkedin.com/in/mark-mark-62a5a9171"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-dim transition-colors hover:text-gold"
            >
              LinkedIn ↗
            </a>
            <span aria-hidden="true" className="text-gold">
              ✳
            </span>
            <a
              href="https://www.behance.net/markmenezes2"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-dim transition-colors hover:text-gold"
            >
              Behance ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
