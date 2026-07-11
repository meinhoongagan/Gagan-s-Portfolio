import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

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
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-fuchsia-500 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

/** Small spring-based scale interaction for buttons/links — press feel. */
export const tapScale = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
};
