import { Code, Server, Monitor, Database, Layers, Cloud, BookOpen, GraduationCap, Sparkles } from "lucide-react";

// Navigation links, ordered to match the numbered section flow
export const navLinks = [
  { name: "About", section: "about" },
  { name: "Experience", section: "experience" },
  { name: "Projects", section: "projects" },
  { name: "Skills", section: "skills" },
  { name: "Education", section: "education" },
  { name: "Contact", section: "contact" },
];

// Rotating hero role titles
export const heroRoles = [
  "AI Platform Engineer",
  "Backend Systems Engineer",
  "Distributed Systems Engineer",
  "Full-Stack Product Engineer",
];

// Primary six — the ordered, numbered project list
export const projects = [
  {
    id: "gap",
    name: "GAP",
    subtitle: "Generative AI Platform",
    tagline:
      "A modular platform separating agent orchestration, RAG, memory, tool integrations, and evaluation into reusable components — so new AI features compose existing infrastructure instead of rebuilding from zero.",
    tags: ["Agent Orchestration", "RAG", "Evaluation", "Memory"],
    metric: null,
    github: null,
    highlights: null,
  },
  {
    id: "gcp-agent",
    name: "GCP Resource Efficiency Agent",
    subtitle: "Reactive intelligence, built on GAP",
    tagline:
      "Continuously scans GCP projects, ranks optimization opportunities by savings, effort, and risk, and surfaces them in Slack with evidence — turning cloud waste into prioritized weekly action.",
    tags: ["AI Agents", "GCP", "Slack", "FinOps"],
    metric: "Reactive → proactive",
    github: null,
    highlights: null,
  },
  {
    id: "pnyx",
    name: "Pnyx",
    subtitle: "Real-Time Meeting Intelligence Platform",
    tagline:
      "An AI meeting co-pilot that joins calls, transcribes in real time, and turns conversation into notes worth reading — with a tiered RAG chatbot over the current meeting or your entire meeting history.",
    tags: ["FastAPI", "Celery", "Redis", "WebSockets"],
    metric: "60% fewer tokens · <2s latency",
    github: "https://github.com/meinhoongagan/Pnyx",
    highlights: [
      "Hierarchical retrieval scoping context to meeting, workspace, and cross-meeting layers instead of full history search — cut token consumption by 60%",
      "Asynchronous execution via Celery + Redis decouples long-running AI work from the request path, streaming transcription over WebSockets at sub-2-second latency",
      "Notes pipeline: topic segmentation → fact extraction → meeting-type-aware synthesis",
      "Tiered RAG chat: current topic → current meeting → linked meetings → workspace-wide vector search",
      "Opt-in zero-knowledge end-to-end encryption for meeting content",
      "Native desktop app (Tauri) with system tray, notifications, and OS-level auth deep links",
    ],
  },
  {
    id: "agentarena",
    name: "AgentArena",
    subtitle: "Distributed Agent Evaluation Framework",
    tagline:
      "A distributed, parallelized benchmark architecture with blind, contamination-safe LLM judging — evaluating coding agents against a real codebase instead of trusting public leaderboards.",
    tags: ["Distributed Systems", "LLM Judging", "Benchmarking"],
    metric: "Hours → 30 min",
    github: "https://github.com/meinhoongagan/AgentArena",
    highlights: [
      "Distributed, parallelized benchmark architecture — cut evaluation time from hours to under 30 minutes",
      "Blind LLM judging with contamination-safe evaluation, sourcing real task context instead of static datasets",
      "Retrospective vs. prospective grounding as a built-in contamination measurement",
      "Async \"mailbox\" dispatch pattern for orchestration platforms with no sync response API",
      "Four-dimension rubric: Coverage, Precision, Accuracy (conditional on repo selection), Actionability",
    ],
  },
  {
    id: "scheduling",
    name: "Appointment Scheduling SaaS",
    subtitle: "Full Stack Platform",
    tagline:
      "A full-stack appointment booking system with separate backend and frontend, designed for efficient multi-tenant scheduling and user management.",
    tags: ["Go", "Fiber", "GORM", "React", "TypeScript"],
    metric: null,
    github: "https://github.com/meinhoongagan/Appointment-App",
    demo: "https://appointment-app-fe.vercel.app",
    highlights: null,
  },
  {
    id: "chess",
    name: "Chess Platform",
    subtitle: "Real-Time Multiplayer Web App",
    tagline:
      "A real-time multiplayer chess platform using WebSockets for low-latency game-state sync, with Stockfish-powered move validation and AI opponents.",
    tags: ["Python", "FastAPI", "WebSockets", "React", "TypeScript", "Stockfish AI"],
    metric: null,
    github: "https://github.com/meinhoongagan/Chess",
    demo: "https://chess-eta-gules.vercel.app",
    image: "https://res.cloudinary.com/dsqjkanzd/image/upload/f_auto,q_auto,w_700,c_limit/v1747120827/chess_qivann.png",
    highlights: null,
  },
];

// Kept from the previous site, not part of the design's numbered six
export const otherProjects = [
  {
    title: "Climate Change App",
    description: "An interactive web application to visualize climate change data, promoting awareness through dynamic charts and user-friendly interfaces.",
    stack: ["React", "Node.js", "Express", "MongoDB", "D3.js"],
    Github: "https://github.com/meinhoongagan/Climate-change-app",
    demo: "https://climate-change-app.vercel.app",
  },
];

export const educationData = [
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
export const skills = [
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
    category: 'Frontend',
    icon: <Monitor size={22} />,
    items: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Cloud & DevOps',
    icon: <Cloud size={22} />,
    items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'GitHub Actions', 'Linux', 'Nginx'],
  },
];

// Experience data
export const experiences = [
  {
    role: "Software Engineer (AI Platform)",
    company: "Appointy",
    period: "Oct 2025 – Jul 2026",
    location: "Onsite",
    project: "GAP — Generative AI Platform",
    bullets: [
      "Every new AI feature risked re-solving the same problems — retrieval, context management, tool access, and evaluation — from scratch, with no standard way to catch quality regressions before production. Architected a modular platform separating agent orchestration, RAG, memory, tool integrations, and evaluation into reusable components, letting new applications — including the GCP Resource Efficiency Agent — compose existing infrastructure and validate output against defined criteria instead of rebuilding and re-testing from zero.",
      "Cloud teams lacked a reliable way to identify unused, underutilized, and overutilized GCP resources across projects. Built a reactive intelligence layer on top of GAP that retrieves infrastructure history and answers natural-language questions — why costs rose, which resources are underutilized, how this week compares to last — with grounded explanations instead of raw charts.",
      "Cost and capacity issues were typically discovered only after waste had already accumulated. Designed a proactive layer that continuously scans configured GCP projects, ranks optimization opportunities by estimated savings, effort, and risk, and surfaces them directly in Slack with supporting evidence — shifting infrastructure management from reactive investigation to prioritized, actionable weekly reports.",
    ],
    tags: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Docker", "WebSockets"],
  },
  {
    role: "Backend Developer Intern",
    company: "Digital Live 24",
    period: "Feb 2025 – Jul 2025",
    location: "Remote",
    project: null,
    bullets: [
      "Growing booking and content-management volume on the FlyShuttle and Digital Signage platforms exposed the limits of ad hoc backend logic under production load. Consolidated core workflows onto a backend architecture built for transactional integrity, allowing both platforms to scale with customer demand without service disruption.",
      "Notification and data-sync operations were tightly coupled to the main request cycle, so a delay in one workflow risked cascading failures across unrelated transactions. Decoupled these operations through an event-driven architecture to isolate failures, improving platform reliability under concurrent load.",
      "Inconsistent access control and slow endpoints limited how much traffic the platforms could serve reliably, capping growth. Centralized role-based access control and optimized the slowest API paths, improving both security posture and response times as customer usage scaled.",
    ],
    tags: ["Node.js", "Express", "Django", "Kafka", "Docker", "RBAC"],
  },
  {
    role: "Backend Developer Intern",
    company: "Katyayani Organics",
    period: "Sep 2024 – Feb 2025",
    location: "Hybrid",
    project: null,
    bullets: [
      "Procurement, inventory, QC, and production tracking ran across disconnected manual processes, slowing cross-team visibility and decision-making. Unified these workflows onto a single backend platform with a shared data model, improving API performance by 30% and giving teams one consistent source of truth.",
    ],
    tags: ["FastAPI", "PostgreSQL"],
  },
];
