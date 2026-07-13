import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValue,
  useInView,
  animate,
} from "motion/react";

/**
 * Fades + slides an element in once it scrolls into view.
 * Respects prefers-reduced-motion by skipping the animation entirely.
 */
export function Reveal({ children, delay = 0, y = 24, className = "", as = "div", ...props }) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (shouldReduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Staggers the reveal of its direct children as a group scrolls into view.
 * Children should be wrapped individually with <motion.div variants={staggerItem} />
 * — use the exported `staggerItem` variant, or just use <StaggerItem>.
 */
export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function StaggerGroup({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainerVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * Wraps a card and renders a soft radial glow that follows the cursor,
 * only visible on hover. Pure CSS-variable updates on mousemove — cheap,
 * no re-renders.
 */
export function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group/spotlight relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(167,139,250,0.12), transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}

/** Thin fixed progress bar at the top of the page, tracking scroll position. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-plum origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

/** Small spring-based scale interaction for buttons/links — press feel. */
export const tapScale = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
};

/**
 * Pulls its children toward the cursor within a small radius, spring-back on
 * leave — the "magnetic button" feel. No-op wrapper under reduced motion.
 */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animates a number from 0 to `value` once scrolled into view. Pass the
 * qualifier (e.g. "% less inference cost") as `suffix` so the count never
 * loses its meaning — this renders the digits, not the claim.
 */
export function CountUp({ value, suffix = "", prefix = "", duration = 1.4, className = "" }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/**
 * Crossfades through a list of words on an interval. Shows only the first
 * word, statically, under reduced motion.
 */
export function RotatingWords({ words, interval = 2600, className = "", style }) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [shouldReduceMotion, words.length, interval]);

  if (shouldReduceMotion) {
    return (
      <span className={className} style={style}>
        {words[0]}
      </span>
    );
  }

  // className/style land on the inner element that actually holds the text
  // glyphs — a gradient text-clip effect only clips against an element's own
  // text, so it has to sit on the same node as the word, not the wrapper.
  return (
    <span className="relative inline-grid">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`col-start-1 row-start-1 whitespace-nowrap ${className}`}
          style={style}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
