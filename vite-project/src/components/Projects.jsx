// eslint-disable-next-line no-unused-vars -- used throughout JSX as <motion.div>, <motion.button>, etc.
import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./Motion.jsx";
import { projects, otherProjects } from "../data.jsx";

function ProjectRow({ proj, index }) {
  const hasDepth = !!proj.highlights;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="group flex flex-wrap items-start gap-7 p-9 rounded-3xl border border-white/8 transition-colors duration-500"
      style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))" }}
    >
      <div className="font-display text-[15px] font-bold text-ink-faint min-w-[50px]">{index}</div>

      <div className="flex-1 min-w-[260px]">
        <div className="flex items-center gap-3 flex-wrap mb-1.5">
          <h3 className="font-display text-[26px] font-semibold tracking-[-0.01em]">{proj.name}</h3>
          {hasDepth && (
            <span
              className="text-[11px] font-bold uppercase tracking-[0.06em] text-surface-0 px-2.5 py-1 rounded-full"
              style={{ background: "linear-gradient(135deg, var(--color-grad-from), var(--color-grad-to))" }}
            >
              In depth
            </span>
          )}
        </div>
        <div className="text-[13.5px] font-semibold mb-3.5" style={{ color: "var(--color-grad-from)" }}>
          {proj.subtitle}
        </div>
        <p className="text-[15.5px] leading-[1.7] text-ink-soft mb-4.5 max-w-[560px]">{proj.tagline}</p>

        {hasDepth && (
          <div className="grid transition-[grid-template-rows] duration-500 ease-luxe grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] max-md:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <ul className="space-y-2 mb-4 mt-1">
                {proj.highlights.map((h, i) => (
                  <li key={i} className="flex items-start text-ink-soft text-sm">
                    <span className="mr-2 text-accent-soft mt-1">›</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-5">
          {proj.tags.map((tag) => (
            <span key={tag} className="text-[12.5px] font-semibold text-ink-muted bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4.5 flex-wrap">
          {proj.github && (
            <a
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="text-[14.5px] font-bold text-ink no-underline inline-flex items-center gap-2 hover:text-accent-soft transition-colors"
            >
              <Github size={15} /> GitHub ↗
            </a>
          )}
          {proj.demo && (
            <a
              href={proj.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="text-[13.5px] font-semibold text-ink-muted no-underline inline-flex items-center gap-2 hover:text-ink transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>

      {proj.metric && (
        <div className="text-right min-w-[150px]">
          <div className="font-display text-[19px] font-bold text-ink">{proj.metric}</div>
        </div>
      )}
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-[6vw] pt-20 pb-32">
      <div className="mb-16">
        <div className="font-display text-[15px] uppercase tracking-[0.12em] text-accent-soft font-semibold mb-3.5">
          03 — Projects
        </div>
        <h2
          className="font-display font-semibold tracking-[-0.02em] max-w-[720px]"
          style={{ fontSize: "clamp(30px, 3.6vw, 46px)" }}
        >
          Six problems, six systems built to solve them
        </h2>
      </div>

      <StaggerGroup className="flex flex-col gap-6">
        {projects.map((proj, i) => (
          <StaggerItem key={proj.id}>
            <ProjectRow proj={proj} index={String(i + 1).padStart(2, "0")} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {otherProjects.length > 0 && (
        <Reveal className="mt-10 pt-8 border-t border-white/8">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint mb-4">Also built</div>
          <div className="flex flex-col gap-4">
            {otherProjects.map((proj) => (
              <div key={proj.title} className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-display text-base font-semibold text-ink">{proj.title}</span>
                  <span className="text-sm text-ink-muted">{proj.description}</span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <a
                    href={proj.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="text-[13.5px] font-semibold text-ink-muted no-underline hover:text-ink transition-colors"
                  >
                    GitHub ↗
                  </a>
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="text-[13.5px] font-semibold text-ink-muted no-underline hover:text-ink transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}
