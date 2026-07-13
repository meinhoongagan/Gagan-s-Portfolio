/**
 * Fixed, whole-viewport gradient mesh behind all content. Pure CSS keyframe
 * animation (transform/opacity only, GPU-composited) — no JS mousemove cost,
 * and frozen globally by the prefers-reduced-motion rule in index.css.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-surface-0">
      <div className="absolute -top-1/3 -right-1/4 h-[46rem] w-[46rem] rounded-full bg-accent/10 blur-[130px] animate-drift-a" />
      <div className="absolute -bottom-1/4 -left-1/4 h-[38rem] w-[38rem] rounded-full bg-plum/[0.06] blur-[120px] animate-drift-b" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,var(--color-surface-0)_72%)]" />
    </div>
  );
}
