import { Reveal } from "./Motion.jsx";
import { educationData } from "../data.jsx";

export function Education() {
  return (
    <section id="education" className="max-w-6xl mx-auto px-[6vw] pb-32">
      <div className="mb-10">
        <h2 className="font-display text-[15px] uppercase tracking-[0.12em] text-accent-soft font-semibold mb-3.5">
          05 — Education
        </h2>
      </div>

      <div className="flex flex-col">
        {educationData.map((edu) => (
          <Reveal
            key={edu.degree}
            className="border-t border-white/8 py-9 flex flex-wrap items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-accent-soft">{edu.icon}</span>
                <h3 className="font-display text-2xl font-semibold">{edu.degree}</h3>
              </div>
              <div className="text-[15px] text-ink-soft font-medium">{edu.institution}</div>
              {edu.coursework && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {edu.coursework.map((course) => (
                    <span key={course} className="text-xs font-semibold text-ink-muted bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                      {course}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              <div className="text-[15px] text-ink-muted font-medium">{edu.duration}</div>
              {edu.cgpa && <div className="text-sm text-ink-faint mt-1">CGPA {edu.cgpa}</div>}
              {edu.percentage && <div className="text-sm text-ink-faint mt-1">{edu.percentage}</div>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
