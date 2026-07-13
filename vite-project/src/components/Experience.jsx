import { useRef } from "react";
// eslint-disable-next-line no-unused-vars -- used throughout JSX as <motion.div>, <motion.button>, etc.
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { Reveal } from "./Motion.jsx";
import { experiences } from "../data.jsx";

export function Experience() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <section id="experience" className="max-w-6xl mx-auto px-[6vw] pt-20 pb-32">
      <div className="mb-16">
        <div className="font-display text-[15px] uppercase tracking-[0.12em] text-accent-soft font-semibold mb-3.5">
          02 — Experience
        </div>
        <h2
          className="font-display font-semibold tracking-[-0.02em]"
          style={{ fontSize: "clamp(30px, 3.6vw, 46px)" }}
        >
          Where the work happened
        </h2>
      </div>

      <div ref={containerRef} className="relative pl-9">
        <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-white/8 rounded" aria-hidden="true" />
        {!shouldReduceMotion && (
          <motion.div
            className="absolute left-[5px] top-1.5 w-px origin-top rounded"
            style={{
              scaleY: lineScale,
              height: "calc(100% - 0.75rem)",
              background: "linear-gradient(var(--color-grad-from), var(--color-grad-to))",
            }}
            aria-hidden="true"
          />
        )}

        <div>
          {experiences.map((exp, i) => (
            <Reveal
              key={`${exp.company}-${exp.role}`}
              className="relative"
              style={{ marginBottom: i === experiences.length - 1 ? 0 : "56px" }}
            >
              <span
                className="absolute -left-9 top-2 h-3 w-3 rounded-full bg-surface-0 border-2"
                style={{ borderColor: "#8b7bf7", boxShadow: "0 0 0 4px var(--color-surface-0)" }}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2.5">
                <h3 className="font-display text-[22px] font-semibold">
                  {exp.role} <span className="text-ink-faint font-normal"> · {exp.company}</span>
                </h3>
                <div className="text-[13px] text-ink-muted font-semibold tracking-[0.02em]">
                  {exp.period} — {exp.location}
                </div>
              </div>
              {exp.project && (
                <div className="text-sm font-semibold mb-3" style={{ color: "var(--color-grad-from)" }}>
                  {exp.project}
                </div>
              )}
              {exp.bullets.map((b, bi) => (
                <p key={bi} className="text-[15.5px] leading-[1.75] text-ink-soft mb-3 max-w-[820px]">
                  {b}
                </p>
              ))}
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12.5px] font-semibold text-ink-muted bg-white/5 border border-white/8 px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
