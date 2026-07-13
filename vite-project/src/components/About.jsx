// eslint-disable-next-line no-unused-vars -- used throughout JSX as <motion.div>, <motion.button>, etc.
import { motion } from "motion/react";
import { Reveal, CountUp } from "./Motion.jsx";

export function About() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-[6vw] md:px-[6vw]"
      style={{ paddingTop: "min(18vh, 180px)", paddingBottom: "120px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] gap-16">
        <Reveal y={28}>
          <motion.div
            className="relative w-[84px] h-[84px] mb-7"
            whileHover={{ scale: 1.04, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute -inset-1.5 rounded-full blur-md" style={{ background: "linear-gradient(135deg, var(--color-grad-from)33, var(--color-grad-to)22)" }} />
            <img
              src="https://res.cloudinary.com/dsqjkanzd/image/upload/f_auto,q_auto,w_300,c_limit/v1746945342/x_prof_fmhhao.png"
              alt="Gagan Sharma"
              loading="lazy"
              decoding="async"
              className="relative w-[84px] h-[84px] rounded-full object-cover border border-white/10"
            />
          </motion.div>
          <div className="font-display text-[15px] uppercase tracking-[0.12em] text-accent-soft font-semibold mb-5">
            01 — About
          </div>
          <h2
            className="font-display font-semibold tracking-[-0.02em] leading-[1.08]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Systems that reduce cost, latency, and guesswork —<span className="text-ink-faint"> by design.</span>
          </h2>
        </Reveal>

        <Reveal y={28} delay={0.1}>
          <p className="text-[19px] leading-[1.85] text-ink-soft mb-7">
            Software engineer specializing in AI infrastructure, distributed systems, and production AI platforms. Focused on architecting systems where retrieval, execution, and orchestration decisions directly reduce latency, cut inference cost, and improve reliability at scale.
          </p>

          <div className="grid grid-cols-2 gap-px rounded-[20px] overflow-hidden bg-white/8 mt-10 mb-10">
            <div className="bg-surface-1 p-7">
              <div
                className="font-display font-bold text-[38px] bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, var(--color-grad-from), var(--color-grad-to))" }}
              >
                <CountUp value={60} suffix="%" />
              </div>
              <div className="text-sm text-ink-muted mt-1.5">reduction in AI inference cost</div>
            </div>
            <div className="bg-surface-1 p-7">
              <div
                className="font-display font-bold text-[38px] bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, var(--color-grad-from), var(--color-grad-to))" }}
              >
                <CountUp value={30} suffix=" min" />
              </div>
              <div className="text-sm text-ink-muted mt-1.5">multi-hour evals, compressed</div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xs font-semibold mb-4 text-accent-soft uppercase tracking-[0.15em]">Achievements</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-ink-soft text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-soft mr-3 shrink-0" />
                2nd Runner-up, WWF Hackathon 2024
              </li>
              <li className="flex items-center text-ink-soft text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-soft mr-3 shrink-0" />
                Winner, Internal Hackathons 2023 &amp; 2024
              </li>
              <li className="flex items-center text-ink-soft text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-soft mr-3 shrink-0" />
                Solved 350+ DSA problems on LeetCode and GFG
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
