// eslint-disable-next-line no-unused-vars -- used throughout JSX as <motion.div>, <motion.button>, etc.
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Magnetic, RotatingWords, tapScale } from "./Motion.jsx";
import { useLenis } from "../lib/SmoothScroll.jsx";
import { heroRoles } from "../data.jsx";

function FloatingShapes() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const el = ref.current;
    if (!el) return;

    let frame = null;
    const handleMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty("--tilt-x", `${relX * 10}px`);
        el.style.setProperty("--tilt-y", `${relY * 10}px`);
        frame = null;
      });
    };

    el.addEventListener("mousemove", handleMove, { passive: true });
    return () => el.removeEventListener("mousemove", handleMove);
  }, [shouldReduceMotion]);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute top-[14%] right-[8%] h-[220px] w-[220px] rounded-full border border-white/6 animate-float-y"
        style={{ transform: "translate(var(--tilt-x, 0), var(--tilt-y, 0))" }}
      />
      <div
        className="absolute top-[60%] right-[20%] h-2.5 w-2.5 rounded-full bg-accent-soft animate-float-y2"
        style={{ boxShadow: "0 0 24px 6px rgba(167,139,250,0.6)" }}
      />
      <div
        className="absolute top-[22%] left-[10%] h-[120px] w-[120px] rounded-[30px] border border-white/5 animate-spin-slow"
        style={{ transform: "translate(calc(var(--tilt-x, 0) * -1), calc(var(--tilt-y, 0) * -1)) rotate(18deg)" }}
      />
      <div
        className="absolute bottom-[12%] left-[6%] h-1.5 w-1.5 rounded-full bg-[#818cf8] animate-float-y"
        style={{ boxShadow: "0 0 20px 6px rgba(129,140,248,0.5)", animationDelay: "1s" }}
      />
    </div>
  );
}

export function Hero() {
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const el = sectionRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    // Direct style mutation via ref, not React state — this fires on every
    // mousemove, and routing it through setState would re-render the whole
    // Hero subtree on every animation frame while the cursor moves.
    let frame = null;
    const handleMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        glow.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(139,92,246,0.16), transparent 55%)`;
        frame = null;
      });
    };

    el.addEventListener("mousemove", handleMove, { passive: true });
    return () => el.removeEventListener("mousemove", handleMove);
  }, [shouldReduceMotion]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    if (lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.2 });
    } else {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-[6vw] overflow-hidden"
    >
      {!shouldReduceMotion && (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: "radial-gradient(600px circle at 50% 35%, rgba(139,92,246,0.16), transparent 55%)",
          }}
        />
      )}
      <FloatingShapes />

      <div className="relative z-[2] max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 mb-7"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 10px 2px rgba(52,211,153,0.6)" }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0.4, 1] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[13px] tracking-[0.08em] uppercase text-ink-muted font-semibold">
            Open to opportunities · Bhopal, India
          </span>
        </motion.div>

        {/* Headline and role rotator animate position only (not opacity) — this
            text is the likely LCP element, and Chrome only counts an element
            as "painted" once its opacity leaves 0. */}
        <motion.h1
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-ink tracking-[-0.03em] leading-[0.98] mb-5"
          style={{ fontSize: "clamp(48px, 8.5vw, 118px)" }}
        >
          Gagan Sharma
        </motion.h1>

        <motion.div
          initial={{ y: 18 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden mb-8 leading-[1.3]"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", height: "1.3em" }}
        >
          <RotatingWords
            words={heroRoles}
            className="font-display font-medium bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, var(--color-grad-from), var(--color-grad-to))",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[640px] text-lg leading-[1.7] text-ink-soft mb-11"
        >
          Software engineer specializing in AI infrastructure, distributed systems, and production AI
          platforms — where retrieval, execution, and orchestration decisions directly cut latency and
          cost at scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 flex-wrap"
        >
          <Magnetic strength={0.28}>
            <motion.button
              {...tapScale}
              onClick={() => scrollToSection("projects")}
              data-cursor-hover
              className="inline-flex items-center font-semibold text-[15px] text-surface-0 rounded-full px-[30px] py-[17px] shadow-[0_10px_40px_-8px_rgba(139,92,246,0.55)]"
              style={{ background: "linear-gradient(135deg, var(--color-grad-from), var(--color-grad-to))" }}
            >
              View Work <span className="ml-2 inline-block translate-y-px">→</span>
            </motion.button>
          </Magnetic>
          <a
            href="mailto:gagansharma3002@gmail.com"
            data-cursor-hover
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink-soft no-underline px-[26px] py-[15px] rounded-full border border-white/12 transition-colors duration-300 hover:bg-white/6 hover:border-white/24"
          >
            gagansharma3002@gmail.com
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[11px] tracking-[0.1em] uppercase text-ink-muted">Scroll</span>
        <div className="w-px h-9" style={{ background: "linear-gradient(var(--color-grad-from), transparent)" }} />
      </div>
    </section>
  );
}
