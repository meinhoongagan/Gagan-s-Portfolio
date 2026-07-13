import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars -- used throughout JSX as <motion.div>, <motion.button>, etc.
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Two-piece custom cursor (dot + trailing ring), mix-blend-difference so it
 * reads on any background. Only mounts on fine-pointer devices with motion
 * allowed — touch/coarse pointers and prefers-reduced-motion get the native
 * cursor untouched.
 */
export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !shouldReduceMotion);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("cursor-none-fine");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      setHovering(!!e.target.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      document.documentElement.classList.remove("cursor-none-fine");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 rounded-full bg-ink mix-blend-difference"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99] rounded-full border border-ink mix-blend-difference"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 52 : 28,
          height: hovering ? 52 : 28,
          opacity: hovering ? 0.7 : 0.35,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      />
    </>
  );
}
