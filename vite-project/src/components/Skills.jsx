import { useState } from "react";
import { Reveal } from "./Motion.jsx";
import { skills } from "../data.jsx";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(null);

  const allPills = skills.flatMap((cat, ci) =>
    cat.items.map((label, pi) => {
      const seedY = ((ci * 7 + pi * 3) % 5) - 2;
      return { label, category: cat.category, seedY, key: `${cat.category}-${label}` };
    })
  );

  return (
    <section id="skills" className="max-w-6xl mx-auto px-[6vw] pt-20 pb-32">
      <div className="mb-12">
        <div className="font-display text-[15px] uppercase tracking-[0.12em] text-accent-soft font-semibold mb-3.5">
          04 — Skills
        </div>
        <h2 className="font-display font-semibold tracking-[-0.02em]" style={{ fontSize: "clamp(30px, 3.6vw, 46px)" }}>
          The toolkit
        </h2>
      </div>

      <Reveal className="flex flex-wrap gap-2.5 mb-10">
        {skills.map((cat) => {
          const isActive = activeCategory === cat.category;
          return (
            <button
              key={cat.category}
              onClick={() => setActiveCategory((c) => (c === cat.category ? null : cat.category))}
              data-cursor-hover
              className="font-sans text-[13.5px] font-bold rounded-full px-[18px] py-[10px] border transition-all duration-300 ease-out"
              style={
                isActive
                  ? {
                      color: "var(--color-surface-0)",
                      background: "linear-gradient(135deg, var(--color-grad-from), var(--color-grad-to))",
                      borderColor: "transparent",
                    }
                  : {
                      color: "var(--color-ink-soft)",
                      background: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(255,255,255,0.1)",
                    }
              }
            >
              {cat.category}
            </button>
          );
        })}
      </Reveal>

      <Reveal delay={0.1} className="flex flex-wrap gap-3">
        {allPills.map((pill) => {
          const dim = activeCategory && activeCategory !== pill.category;
          return (
            <span
              key={pill.key}
              className="text-sm font-semibold rounded-full px-[18px] py-[10px] border transition-all duration-400 ease-out cursor-default"
              style={{
                color: dim ? "var(--color-ink-faint)" : "var(--color-ink)",
                background: dim ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.055)",
                borderColor: dim ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)",
                transform: dim ? "translateY(0) scale(0.96)" : `translateY(${pill.seedY}px)`,
                opacity: dim ? 0.45 : 1,
              }}
              onMouseEnter={(e) => {
                if (dim) return;
                e.currentTarget.style.borderColor = "rgba(167,139,250,0.5)";
                e.currentTarget.style.background = "rgba(139,92,246,0.12)";
                e.currentTarget.style.transform = `translateY(${pill.seedY - 3}px)`;
              }}
              onMouseLeave={(e) => {
                if (dim) return;
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.055)";
                e.currentTarget.style.transform = `translateY(${pill.seedY}px)`;
              }}
            >
              {pill.label}
            </span>
          );
        })}
      </Reveal>
    </section>
  );
}
