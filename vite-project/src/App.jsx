import React from 'react';
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars -- used throughout JSX as <motion.div>, <motion.button>, etc.
import { motion } from "motion/react";
import { Menu, X, ArrowRight, ExternalLink, Github, Linkedin, MessageSquare, Code, Server, Monitor, Database, Layers, Cloud, BookOpen, GraduationCap, Mail, Phone, Calendar, Star, Sparkles } from "lucide-react";
import emailjs from '@emailjs/browser';
import { Reveal, StaggerGroup, StaggerItem, SpotlightCard, ScrollProgressBar, tapScale } from "./components/Motion";

export default function GaganPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    message: '',
    success: null
  });

  // Effect for detecting active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";

      // Update scrolled state for navbar styling
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: "Home", section: "hero" },
    { name: "About", section: "about" },
    { name: "Skills", section: "skills" },
    { name: "Experience", section: "experience" },
    { name: "Projects", section: "projects" },
    { name: "Education", section: "education" },
    { name: "Contact", section: "contact" },
  ];

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission with EmailJS
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, message: '', success: null });

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        loading: false,
        message: 'Please fill out all fields.',
        success: false
      });
      return;
    }

    // EmailJS configuration from environment variables
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateIDToOwner = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_TO_OWNER;
    const templateIDToSender = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_TO_SENDER;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;

    // Send email to owner
    emailjs.send(serviceID, templateIDToOwner, {
      name: formData.name,
      email: formData.email,
      message: formData.message
    }, userID)
      .then(() => {
        // Send confirmation email to sender
        return emailjs.send(serviceID, templateIDToSender, {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }, userID);
      })
      .then(() => {
        setFormStatus({
          loading: false,
          message: 'Message sent successfully! You will receive a confirmation email shortly.',
          success: true
        });
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setFormStatus({
          loading: false,
          message: 'Failed to send message. Please try again later.',
          success: false
        });
      });
  };

  // Featured projects — the two most substantial, current bodies of work
  const featuredProjects = [
    {
      title: "Pnyx",
      tagline: "AI meeting co-pilot",
      description: "An AI meeting co-pilot that joins calls for you. A bot joins Zoom/Meet/Teams directly (or the desktop app captures room-mic audio for in-person meetings), transcribes in real time across languages, and turns the conversation into notes worth reading — not a raw transcript dump. A RAG chatbot answers questions about the current meeting or your entire meeting history, and an optional live AI participant can flag unresolved questions or missing decisions as the meeting happens.",
      highlights: [
        "Hierarchical retrieval scoping context to meeting, workspace, and cross-meeting layers instead of full history search — cut token consumption by 60%",
        "Asynchronous execution via Celery + Redis decouples long-running AI work from the request path, streaming transcription over WebSockets at sub-2-second latency",
        "Notes pipeline: topic segmentation → fact extraction → meeting-type-aware synthesis",
        "Tiered RAG chat: current topic → current meeting → linked meetings → workspace-wide vector search",
        "Opt-in zero-knowledge end-to-end encryption for meeting content",
        "Native desktop app (Tauri) with system tray, notifications, and OS-level auth deep links",
      ],
      stack: ["FastAPI", "PostgreSQL", "pgvector", "Celery", "Redis", "React", "Tauri", "TypeScript"],
      Github: "https://github.com/meinhoongagan/Pnyx",
    },
    {
      title: "AgentArena",
      tagline: "Coding agent evaluation pipeline",
      description: "A methodology and pipeline for evaluating coding agents — Claude Code, Codex, and others — against a real codebase instead of trusting public leaderboards. The core problem it solves is contamination: an agent with repo search can sometimes find and reproduce an existing fix without actually reasoning about the problem. The pipeline runs tasks in both a retrospective mode (ground truth already exists) and a prospective mode (ground truth extracted only after the real fix ships), and treats the score gap between the two as a direct contamination measurement.",
      highlights: [
        "Distributed, parallelized benchmark architecture — cut evaluation time from hours to under 3 minutes",
        "Blind LLM judging with contamination-safe evaluation, sourcing real task context instead of static datasets",
        "Retrospective vs. prospective grounding as a built-in contamination measurement",
        "Async \"mailbox\" dispatch pattern for orchestration platforms with no sync response API",
        "Four-dimension rubric: Coverage, Precision, Accuracy (conditional on repo selection), Actionability",
      ],
      stack: ["Python", "LLM Evaluation", "GitHub API", "Async Pipelines"],
      Github: "https://github.com/meinhoongagan/AgentArena",
    },
  ];

  // Other projects
  const projects = [
    {
      title: "Chess Multiplayer Game",
      description: "A real-time multiplayer chess platform, featuring seamless gameplay and responsive design.",
      stack: ["Python", "FastAPI", "WebSockets", "React", "TypeScript", "Stockfish AI"],
      image: "https://res.cloudinary.com/dsqjkanzd/image/upload/v1747120827/chess_qivann.png",
      Github: "https://github.com/meinhoongagan/Chess",
      demo: "https://chess-eta-gules.vercel.app"
    },
    {
      title: "Climate Change App",
      description: "An interactive web application to visualize climate change data, promoting awareness through dynamic charts and user-friendly interfaces.",
      stack: ["React", "Node.js", "Express", "MongoDB", "D3.js"],
      image: "https://res.cloudinary.com/dsqjkanzd/image/upload/v1747120909/Screenshot_2025-05-13_125043_atajgo.png",
      Github: "https://github.com/meinhoongagan/Climate-change-app",
      demo: "https://climate-change-app.vercel.app"
    },
    {
      title: "Appointment App",
      description: "A full-stack appointment booking system with separate backend and frontend, designed for efficient scheduling and user management.",
      stack: ["Go", "Fiber", "GORM", "React", "TypeScript"],
      image: "/appointment-app.png",
      Github: "https://github.com/meinhoongagan/Appointment-App",
      demo: "https://appointment-app-fe.vercel.app"
    }
  ];

  const educationData = [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'University Institute of Technology, Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal',
      duration: 'November 2022 - July 2026 (Expected)',
      cgpa: '7.3',
      coursework: ['Data Structures', 'Algorithms', 'Databases', 'Web Development'],
      icon: <GraduationCap size={24} />,
    },
    {
      degree: '12th Grade (Senior Secondary)',
      institution: 'Deepmala Pagarani Sanskar School',
      duration: 'Year of Completion: 2022',
      percentage: '89%',
      icon: <BookOpen size={24} />,
    },
    {
      degree: '10th Grade (Secondary)',
      institution: 'Om Vidya Mandir Higher Secondary School',
      duration: 'Year of Completion: 2020',
      percentage: '89%',
      icon: <BookOpen size={24} />,
    },
  ];

  // Skills data
  const skills = [
    {
      category: 'Languages',
      icon: <Code size={22} />,
      items: ['Python', 'Go', 'JavaScript', 'TypeScript', 'Java'],
    },
    {
      category: 'AI Engineering',
      icon: <Sparkles size={22} />,
      items: ['RAG', 'AI Agents', 'Agent Orchestration', 'Vector Search', 'LLM APIs', 'Prompt Engineering'],
    },
    {
      category: 'Backend',
      icon: <Server size={22} />,
      items: ['FastAPI', 'Django', 'Node.js', 'Express', 'REST APIs', 'WebSockets', 'Microservices'],
    },
    {
      category: 'Distributed Systems',
      icon: <Layers size={22} />,
      items: ['Event-Driven Architecture', 'Celery', 'Kafka', 'Concurrency', 'Load Balancing', 'System Design'],
    },
    {
      category: 'Databases',
      icon: <Database size={22} />,
      items: ['PostgreSQL', 'pgvector', 'MongoDB', 'MySQL', 'Redis'],
    },
    {
      category: 'Cloud & DevOps',
      icon: <Cloud size={22} />,
      items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'GitHub Actions', 'Linux', 'Nginx'],
    },
    {
      category: 'Frontend',
      icon: <Monitor size={22} />,
      items: ['React', 'TypeScript', 'Tailwind CSS'],
    },
  ];

  // Experience data
  const experiences = [
    {
      role: "Software Engineer, AI Platform",
      company: "Appointy",
      period: "Oct 2025 - Jul 2026",
      responsibilities: [
        "Architected GAP (Generative AI Platform), a modular platform separating agent orchestration, RAG, memory, tool integrations, and evaluation into reusable components — letting new applications compose existing infrastructure instead of rebuilding from scratch.",
        "Built the GCP Resource Efficiency Agent on top of GAP: a reactive layer answering natural-language questions about infrastructure cost and utilization with grounded explanations instead of raw dashboards.",
        "Designed a proactive layer that continuously scans GCP projects, ranks optimization opportunities by savings/effort/risk, and surfaces them in Slack — shifting infra management from reactive investigation to prioritized weekly reports."
      ]
    },
    {
      role: "Backend Developer Intern",
      company: "Digital Live 24",
      period: "Feb 2025 - Jul 2025",
      responsibilities: [
        "Consolidated core booking and content-management workflows on FlyShuttle and Digital Signage onto a backend architecture built for transactional integrity, letting both platforms scale without service disruption.",
        "Decoupled notification and data-sync operations through an event-driven architecture, isolating failures instead of letting delays cascade across unrelated transactions.",
        "Centralized role-based access control and optimized the slowest API paths, improving both security posture and response times as usage scaled."
      ]
    },
    {
      role: "Backend Developer Intern",
      company: "Katyayani Organics",
      period: "Sep 2024 - Feb 2025",
      responsibilities: [
        "Unified procurement, inventory, QC, and production tracking — previously disconnected manual processes — onto a single backend platform with a shared data model.",
        "Improved API performance by 30%, giving cross-functional teams one consistent source of truth for decision-making."
      ]
    }
  ];

  return (
    <div className="font-sans bg-neutral-950 text-neutral-100">
      <ScrollProgressBar />
      {/* Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-neutral-950/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold tracking-tight text-white">
            Gagan<span className="text-violet-400">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`relative px-3 py-1.5 text-sm rounded-full ${
                  activeSection === link.section
                    ? "text-white font-medium"
                    : "text-neutral-400 hover:text-white"
                } transition-colors duration-200`}
              >
                {activeSection === link.section && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-violet-600/80 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-950/95 backdrop-blur-md py-2 px-4 border-t border-white/5">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`block w-full text-left py-2.5 px-4 text-sm ${
                  activeSection === link.section
                    ? "text-violet-400 font-medium bg-white/5"
                    : "text-neutral-400 hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        {/* Subtle floating background accents */}
        <motion.div
          className="absolute top-1/3 right-0 w-[32rem] h-[32rem] bg-violet-600/10 rounded-full blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[24rem] h-[24rem] bg-fuchsia-600/5 rounded-full blur-[100px]"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          <div className="md:w-3/5 mb-12 md:mb-0">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-sm"
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              Open to freelance &amp; full-time work
            </motion.div>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-tight"
            >
              Gagan Sharma
            </motion.h1>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl font-medium text-violet-300 mb-6"
            >
              Software engineer specializing in AI infrastructure and distributed systems
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-400 mb-8 leading-relaxed max-w-xl"
            >
              I architect systems where retrieval, execution, and orchestration decisions
              directly reduce latency, cut inference cost, and improve reliability at
              scale — including a 60% reduction in AI inference cost and compressing
              multi-hour evaluation cycles to under 3 minutes through distributed
              execution. Currently building{" "}
              <span className="text-neutral-200">GAP</span>, a generative AI platform at
              Appointy, and shipping <span className="text-neutral-200">Pnyx</span> and{" "}
              <span className="text-neutral-200">AgentArena</span> on the side.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                {...tapScale}
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 bg-violet-600 text-white text-sm font-medium rounded-md hover:bg-violet-500 transition-colors duration-200 flex items-center"
              >
                View Projects
                <ArrowRight size={16} className="ml-2" />
              </motion.button>
              <motion.button
                {...tapScale}
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 border border-white/15 text-neutral-200 text-sm font-medium rounded-md hover:bg-white/5 transition-colors duration-200"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </div>
          <motion.div
            className="md:w-2/5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative w-full max-w-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500/70"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/70"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
                </div>
                <pre className="text-xs md:text-sm text-neutral-400 font-mono leading-relaxed overflow-x-auto">
<span className="text-violet-400">const</span> engineer = {"{"}
{"\n  "}stack: [<span className="text-emerald-400">'Go'</span>, <span className="text-emerald-400">'Python'</span>, <span className="text-emerald-400">'TypeScript'</span>],
{"\n  "}focus: <span className="text-emerald-400">'distributed systems, AI agents'</span>,
{"\n  "}shipping: [<span className="text-emerald-400">'Pnyx'</span>, <span className="text-emerald-400">'AgentArena'</span>],
{"\n"}{"}"};
                </pre>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <Reveal as="h2" className="text-3xl font-bold mb-16 text-center text-white">
            About Me
          </Reveal>
          <div className="md:flex md:items-center md:gap-12">
            <Reveal className="md:w-1/3 mb-8 md:mb-0 flex justify-center" y={0}>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.03, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src="https://res.cloudinary.com/dsqjkanzd/image/upload/v1746945342/x_prof_fmhhao.png"
                  alt="Gagan Sharma"
                  className="rounded-2xl shadow-2xl w-56 h-56 object-cover border border-white/10"
                />
              </motion.div>
            </Reveal>
            <Reveal className="md:w-2/3" delay={0.15}>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Software engineer specializing in AI infrastructure, distributed systems, and production AI platforms. I focus on architecting systems where retrieval, execution, and orchestration decisions directly reduce latency, cut inference cost, and improve reliability at scale.
              </p>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                At Appointy, I'm building GAP — a modular generative AI platform separating agent orchestration, RAG, memory, tool integrations, and evaluation into reusable components — and the GCP Resource Efficiency Agent built on top of it. Outside of work, I build Pnyx (real-time meeting intelligence) and AgentArena (a coding-agent evaluation pipeline). Solved 350+ DSA problems on LeetCode and GFG along the way.
              </p>
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 text-violet-400 uppercase tracking-wide">Achievements</h3>
                <ul className="space-y-2.5">
                  <li className="flex items-center text-neutral-300 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400 mr-3"></span>
                    2nd Runner-up, WWF Hackathon 2024
                  </li>
                  <li className="flex items-center text-neutral-300 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400 mr-3"></span>
                    Winner, Internal Hackathons 2023 &amp; 2024
                  </li>
                  <li className="flex items-center text-neutral-300 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400 mr-3"></span>
                    Solved 350+ DSA problems on LeetCode and GFG
                  </li>
                </ul>
              </div>
              <div className="flex items-center space-x-6 mt-6">
                <a href="/Gagan_Resume.pdf" className="text-violet-400 hover:text-violet-300 flex items-center text-sm font-medium">
                  Download Resume <ArrowRight size={16} className="ml-1" />
                </a>
                <div className="flex space-x-3">
                  <a href="https://github.com/meinhoongagan" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/gagan-sharma-6b27a2244/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://leetcode.com/u/gagan-sharma/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                    <Code size={20} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <Reveal as="h2" className="text-3xl font-bold mb-16 text-center text-white">
            Technical Skills
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((skillCategory, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <SpotlightCard className="bg-white/[0.03] p-6 rounded-xl border border-white/10 hover:border-violet-500/40 transition-colors duration-200 h-full">
                    <div className="flex items-center mb-4">
                      <span className="text-violet-400 mr-3">{skillCategory.icon}</span>
                      <h3 className="text-base font-semibold text-white">{skillCategory.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.items.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-white/5 text-neutral-300 rounded-md text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <Reveal as="h2" className="text-3xl font-bold mb-16 text-center text-white">
            Work Experience
          </Reveal>
          <StaggerGroup className="max-w-3xl mx-auto space-y-6">
            {experiences.map((exp, index) => (
              <StaggerItem key={index}>
                <SpotlightCard className="bg-white/[0.03] p-6 rounded-xl border border-white/10 hover:border-violet-500/40 transition-colors duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-white">{exp.role} · <span className="text-violet-300">{exp.company}</span></h3>
                    <span className="text-xs font-medium text-neutral-400 px-2.5 py-1 rounded-full bg-white/5">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start text-neutral-400 text-sm">
                        <span className="mr-2 text-violet-400 mt-1">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <Reveal as="h2" className="text-3xl font-bold mb-4 text-center text-white">
            Featured Projects
          </Reveal>
          <Reveal as="p" delay={0.1} className="text-neutral-400 text-center max-w-xl mx-auto mb-14 text-sm">
            The two most substantial things I've shipped recently.
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
            {featuredProjects.map((project, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="h-full"
                >
                  <SpotlightCard className="bg-white/[0.03] rounded-2xl border border-white/10 p-8 hover:border-violet-500/40 transition-colors duration-200 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <Star size={14} className="text-violet-400 fill-violet-400" />
                      <span className="text-xs font-semibold text-violet-400 uppercase tracking-wide">{project.tagline}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">{project.description}</p>
                    <ul className="space-y-2 mb-6">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start text-neutral-300 text-sm">
                          <span className="mr-2 text-violet-400 mt-1">›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-white/5 text-neutral-300 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <motion.a
                      {...tapScale}
                      href={project.Github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 transition-colors duration-200 rounded-md px-4 py-2.5 w-fit"
                    >
                      <Github size={16} className="mr-2" /> View on GitHub
                    </motion.a>
                  </SpotlightCard>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal as="h3" className="text-xl font-semibold mb-10 text-center text-white">Other Projects</Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="h-full">
                  <div className="bg-white/[0.03] rounded-xl overflow-hidden border border-white/10 hover:border-violet-500/40 transition-colors duration-200 group h-full flex flex-col">
                    <div className="relative h-40 overflow-hidden bg-white/[0.03]">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code size={32} className="text-neutral-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-base font-semibold text-white">{project.title}</h3>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-neutral-400 text-sm mb-4 h-16 overflow-hidden">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.stack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-white/5 text-neutral-400 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mt-auto">
                        <a
                          href={project.Github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-400 hover:text-violet-300 flex items-center text-sm font-medium transition-colors w-fit"
                        >
                          <Github size={15} className="mr-2" /> View Code
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400 hover:text-violet-300 flex items-center text-sm font-medium transition-colors w-fit"
                          >
                            <ExternalLink size={15} className="mr-2" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <Reveal as="h2" className="text-3xl font-bold mb-16 text-center text-white">
            Education
          </Reveal>
          <StaggerGroup className="max-w-3xl mx-auto space-y-6">
            {educationData.map((edu, index) => (
              <StaggerItem key={index}>
                <SpotlightCard className="bg-white/[0.03] p-7 rounded-xl border border-white/10 hover:border-violet-500/40 transition-colors duration-200">
                  <div className="flex items-center mb-3">
                    <span className="text-violet-400 mr-3">{edu.icon}</span>
                    <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                  </div>
                  <p className="text-neutral-300 font-medium text-sm">{edu.institution}</p>
                  <p className="text-neutral-500 text-sm mb-3">{edu.duration}</p>
                  {edu.cgpa && (
                    <p className="text-neutral-300 text-sm mb-3">
                      <strong className="text-violet-400">CGPA:</strong> {edu.cgpa}
                    </p>
                  )}
                  {edu.percentage && (
                    <p className="text-neutral-300 text-sm mb-3">
                      <strong className="text-violet-400">Percentage:</strong> {edu.percentage}
                    </p>
                  )}
                  {edu.coursework && (
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="px-2.5 py-1 bg-white/5 text-neutral-300 rounded-md text-xs font-medium"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative border-t border-white/5">
        <div className="container mx-auto px-6">
          <Reveal as="h2" className="text-3xl font-bold mb-16 text-center text-white">
            Get In Touch
          </Reveal>
          <div className="md:flex md:space-x-8 max-w-4xl mx-auto">
            <Reveal className="md:w-1/2 mb-8 md:mb-0">
              <form onSubmit={handleFormSubmit} className="bg-white/[0.03] p-8 rounded-xl border border-white/10">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-neutral-300 text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-neutral-500 text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-neutral-300 text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-neutral-500 text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-neutral-300 text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-neutral-500 text-sm"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>
                {formStatus.message && (
                  <p className={`mb-4 text-center text-sm ${formStatus.success ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formStatus.message}
                  </p>
                )}
                <motion.button
                  {...(formStatus.loading ? {} : tapScale)}
                  type="submit"
                  disabled={formStatus.loading}
                  className={`w-full py-3 rounded-md flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                    formStatus.loading
                      ? 'bg-white/10 text-neutral-500 cursor-not-allowed'
                      : 'bg-violet-600 text-white hover:bg-violet-500'
                  }`}
                >
                  {formStatus.loading ? 'Sending...' : 'Send Message'}
                  {!formStatus.loading && <MessageSquare size={16} className="ml-2" />}
                </motion.button>
              </form>
            </Reveal>
            <Reveal delay={0.15} className="md:w-1/2">
              <div className="bg-white/[0.03] p-8 rounded-xl border border-white/10 h-full">
                <h3 className="text-base font-semibold mb-6 text-white">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail size={18} className="text-violet-400 mr-4 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-neutral-300 mb-1">Email</p>
                      <a href="mailto:gagansharma3002@gmail.com" className="text-violet-300 hover:text-violet-200 transition-colors text-sm">
                        gagansharma3002@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone size={18} className="text-violet-400 mr-4 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-neutral-300 mb-1">Phone</p>
                      <a href="tel:+919644365693" className="text-violet-300 hover:text-violet-200 transition-colors text-sm">
                        +91 9644365693
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Calendar size={18} className="text-violet-400 mr-4 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-neutral-300 mb-1">Availability</p>
                      <p className="text-neutral-400 text-sm">Open to freelance projects and full-time opportunities. Let's discuss how I can contribute to your team or project!</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-300 mb-3">Connect</p>
                    <div className="flex space-x-3">
                      <a href="https://github.com/meinhoongagan" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10">
                        <Github size={18} />
                      </a>
                      <a href="https://www.linkedin.com/in/gagan-sharma-6b27a2244" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10">
                        <Linkedin size={18} />
                      </a>
                      <a href="https://leetcode.com/u/gagan-sharma" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10">
                        <Code size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 text-neutral-400 py-8 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="mb-1 text-sm text-neutral-300">© {new Date().getFullYear()} Gagan Sharma. All rights reserved.</p>
              <p className="text-xs text-neutral-500">Software engineer specializing in AI infrastructure and distributed systems</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/meinhoongagan/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/gagan-sharma-6b27a2244/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://leetcode.com/u/gagan-sharma/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Code size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
