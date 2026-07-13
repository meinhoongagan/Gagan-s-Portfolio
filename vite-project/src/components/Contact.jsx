import { Github, Linkedin, Code } from "lucide-react";
import { Reveal, Magnetic, tapScale } from "./Motion.jsx";
// eslint-disable-next-line no-unused-vars -- used throughout JSX as <motion.div>, <motion.button>, etc.
import { motion } from "motion/react";

export function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-[6vw] pt-15 pb-24 relative">
      <Reveal
        className="rounded-[32px] text-center relative overflow-hidden border border-white/8"
        style={{
          padding: "min(10vw, 80px) 6vw",
          background: "radial-gradient(120% 140% at 50% 0%, #17131f 0%, #0b0b0f 60%)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -top-[30%] left-[20%] w-[340px] h-[340px] rounded-full blur-[10px] animate-pulse-glow"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)" }}
        />
        <div className="relative z-[2]">
          <div className="font-display text-[15px] uppercase tracking-[0.12em] text-accent-soft font-semibold mb-5">
            06 — Contact
          </div>
          <h2
            className="font-display font-semibold tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(32px, 6vw, 64px)" }}
          >
            Let&apos;s build something worth shipping.
          </h2>
          <p className="text-[17px] text-ink-soft max-w-[520px] mx-auto mb-10">
            Open to new roles and collaborations in AI infrastructure and backend engineering.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Magnetic strength={0.28}>
              <motion.a
                {...tapScale}
                href="mailto:gagansharma3002@gmail.com"
                data-cursor-hover
                className="inline-flex items-center font-semibold text-[15px] text-surface-0 no-underline rounded-full px-[30px] py-[17px] shadow-[0_10px_40px_-8px_rgba(139,92,246,0.55)]"
                style={{ background: "linear-gradient(135deg, var(--color-grad-from), var(--color-grad-to))" }}
              >
                Email Me →
              </motion.a>
            </Magnetic>
            <a
              href="tel:+919644365693"
              data-cursor-hover
              className="text-[14.5px] font-semibold text-ink-soft no-underline px-6 py-[15px] border border-white/12 rounded-full"
            >
              +91 96443 65693
            </a>
          </div>
          <div className="flex items-center justify-center gap-7 mt-11 flex-wrap">
            <a
              href="https://www.linkedin.com/in/gagan-sharma-6b27a2244/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted no-underline hover:text-ink transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href="https://github.com/meinhoongagan"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted no-underline hover:text-ink transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="https://leetcode.com/u/gagan-sharma/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-muted no-underline hover:text-ink transition-colors"
            >
              <Code size={16} /> LeetCode
            </a>
            <a
              href="/Gagan_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="text-sm font-semibold no-underline"
              style={{ color: "var(--color-grad-from)" }}
            >
              Download Resume
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
