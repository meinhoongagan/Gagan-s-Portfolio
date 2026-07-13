import { lazy, Suspense } from "react";
import { AmbientBackground } from "./components/AmbientBackground.jsx";
import { Grain } from "./components/Grain.jsx";
import { CustomCursor } from "./components/Cursor.jsx";
import { Nav } from "./components/Nav.jsx";
import { Hero } from "./components/Hero.jsx";
import { Footer } from "./components/Footer.jsx";
import { ScrollProgressBar } from "./components/Motion.jsx";

// Everything below the fold is code-split: keeps the initial JS payload
// small so it doesn't compete with Hero (the LCP candidate) for parse time.
const About = lazy(() => import("./components/About.jsx").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("./components/Skills.jsx").then((m) => ({ default: m.Skills })));
const Experience = lazy(() => import("./components/Experience.jsx").then((m) => ({ default: m.Experience })));
const Projects = lazy(() => import("./components/Projects.jsx").then((m) => ({ default: m.Projects })));
const Education = lazy(() => import("./components/Education.jsx").then((m) => ({ default: m.Education })));
const Contact = lazy(() => import("./components/Contact.jsx").then((m) => ({ default: m.Contact })));

export default function GaganPortfolio() {
  return (
    <div className="font-sans bg-surface-0 text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:bg-accent-strong focus:text-white"
      >
        Skip to content
      </a>
      <AmbientBackground />
      <Grain />
      <CustomCursor />
      <ScrollProgressBar />
      <Nav />
      <main id="main">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
