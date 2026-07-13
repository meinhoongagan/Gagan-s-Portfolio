import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

const LenisContext = createContext(null);

/**
 * Drives the whole page with Lenis's rAF loop. Under prefers-reduced-motion
 * it never instantiates Lenis at all — native scroll takes over and
 * useLenis() consumers fall back to window.scrollTo.
 */
export function SmoothScrollProvider({ children }) {
  const shouldReduceMotion = useReducedMotion();
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(instance);

    const raf = (time) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      instance.destroy();
      setLenis(null);
    };
  }, [shouldReduceMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
