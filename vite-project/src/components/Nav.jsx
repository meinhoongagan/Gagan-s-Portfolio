import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars -- used throughout JSX as <motion.div>, <motion.button>, etc.
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLenis } from "../lib/SmoothScroll.jsx";
import { navLinks } from "../data.jsx";

export function Nav() {
  const lenis = useLenis();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const sections = document.querySelectorAll("section[id]");
      let current = "";

      setScrolled(y > 40);
      setVisible(y < lastScrollY.current || y < 80);
      lastScrollY.current = y;

      sections.forEach((section) => {
        if (y >= section.offsetTop - 200) {
          current = section.getAttribute("id");
        }
      });

      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    if (lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.2 });
    } else {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      style={{ transform: visible ? "translateY(0)" : "translateY(-110%)" }}
      className={`fixed top-0 inset-x-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out border-b ${
        scrolled ? "bg-surface-0/70 backdrop-blur-xl border-line" : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="font-display font-bold text-lg text-ink tracking-tight shrink-0"
          data-cursor-hover
        >
          GS<span className="text-accent-soft">.</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.section}
              onClick={() => scrollToSection(link.section)}
              aria-current={activeSection === link.section ? "true" : undefined}
              data-cursor-hover
              className={`relative px-3.5 py-2 text-[13.5px] font-semibold rounded-full transition-colors duration-200 ${
                activeSection === link.section ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {activeSection === link.section && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/8 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="/Gagan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="font-semibold text-[13px] text-surface-0 no-underline rounded-full px-[18px] py-[9px] shadow-[0_4px_20px_rgba(139,92,246,0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(139,92,246,0.5)]"
            style={{ background: "linear-gradient(135deg, var(--color-grad-from), var(--color-grad-to))" }}
          >
            Resume
          </a>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            data-cursor-hover
            className="text-ink-soft hover:text-ink focus:outline-none p-1"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-surface-0/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
              className="flex flex-col items-center gap-2"
            >
              {navLinks.map((link) => (
                <motion.button
                  key={link.section}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollToSection(link.section)}
                  aria-current={activeSection === link.section ? "true" : undefined}
                  className={`font-display px-6 py-3 text-2xl font-medium tracking-tight transition-colors ${
                    activeSection === link.section ? "text-accent-soft" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.a
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                href="/Gagan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 font-semibold text-sm text-surface-0 no-underline rounded-full px-6 py-3"
                style={{ background: "linear-gradient(135deg, var(--color-grad-from), var(--color-grad-to))" }}
              >
                Resume
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
