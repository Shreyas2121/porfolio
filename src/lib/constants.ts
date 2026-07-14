export type ProjectImage = { src: string; alt: string };

export type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  stack: string[];
};

export type CaseStudy = {
  title: string;
  context: string;
  summary: string;
  role: string;
  challenge: string;
  outcome: string;
  stack: string[];
  accent: "violet" | "emerald" | "amber";
  icon: "architecture" | "realtime" | "reliability";
  images?: ProjectImage[];
};

export type IndependentProject = {
  title: string;
  context: string;
  description: string;
  highlights: string[];
  stack: string[];
  repository: string;
  demo?: string;
  images?: ProjectImage[];
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Unified multi-sport architecture",
    context: "Octalogic Tech - B2B sports data",
    summary:
      "A shared platform for managing events, participants, scores, markets and odds across seven-plus combat sports.",
    role:
      "Owned the PostgreSQL and TypeORM data model, unified NestJS APIs and shared React interfaces using a sport-type discriminator.",
    challenge:
      "Replace separate sport schemas and duplicated frontend and backend implementations without losing sport-specific behaviour.",
    outcome:
      "Reduced duplicated code by approximately 80% and shortened new-sport onboarding from weeks to days.",
    stack: ["TypeScript", "NestJS", "React", "PostgreSQL", "TypeORM"],
    accent: "violet",
    icon: "architecture",
  },
  {
    title: "Real-time table tennis integration",
    context: "Octalogic Tech - End-to-end integration",
    summary:
      "A complete Major League Table Tennis data pipeline from paginated provider APIs to live trading workflows.",
    role:
      "Built API ingestion, transactional schedule and score synchronisation, selection settlement, publishing flows and the WebSocket-powered React interface.",
    challenge:
      "Model a multi-round match format while keeping live scores, line-ups, odds and downstream publishing consistent.",
    outcome:
      "Delivered a complete near-real-time workflow that traders can operate from schedule ingestion through live settlement.",
    stack: ["NestJS", "React", "PostgreSQL", "Socket.IO", "Zustand", "Axios"],
    accent: "emerald",
    icon: "realtime",
  },
  {
    title: "Resilient external data services",
    context: "Octalogic Tech - Reliability engineering",
    summary:
      "Authentication, caching and recovery patterns for rate-limited or temporarily unavailable external sports-data providers.",
    role:
      "Implemented OAuth 2.0 token management with memory and Redis caching, concurrency control, pre-expiry refresh and rate-aware retries; also built heartbeat-triggered resynchronisation.",
    challenge:
      "Prevent duplicate authentication, race conditions and stale downstream state during concurrent requests and provider failures.",
    outcome:
      "Reduced authentication requests by approximately 95% and automated recovery paths that previously required manual intervention.",
    stack: ["OAuth 2.0", "Redis", "NestJS", "Cron", "Axios", "PostgreSQL"],
    accent: "amber",
    icon: "reliability",
  },
];

export const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Octalogic Tech",
    location: "Panaji, Goa",
    period: "May 2025 - Present",
    summary:
      "Building real-time B2B sports-data and odds products with ownership across data modelling, external integrations, backend services and operational interfaces.",
    achievements: [
      "Architected a shared PostgreSQL and TypeORM model for 7+ combat sports, reducing duplicated code by approximately 80%.",
      "Built the Major League Table Tennis integration end to end, including data ingestion, transactional live-score sync, settlement, publishing and a WebSocket-powered trading UI.",
      "Implemented OAuth 2.0 token management with in-memory and Redis caching, concurrency control and rate-aware retries, reducing authentication requests by approximately 95%.",
      "Optimised a real-time Formula 1 trading grid for 20+ drivers and 5+ market types using Zustand, Socket.IO, memoisation and granular rendering.",
    ],
    stack: ["TypeScript", "NestJS", "React", "PostgreSQL", "Redis", "TypeORM", "WebSockets"],
  },
  {
    title: "Full Stack Developer",
    company: "Bluestream.io",
    location: "Panaji, Goa",
    period: "May 2024 - May 2025",
    summary:
      "Delivered customer and operations workflows across e-commerce, pet-care and restaurant-analytics products.",
    achievements: [
      "Built admin, checkout, appointment and interactive dashboard features using React, Node.js, PostgreSQL and MongoDB.",
      "Contributed across API integration, state management and Docker-based delivery workflows.",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "MongoDB", "TanStack Query", "Docker"],
  },
  {
    title: "Jr. Software Developer",
    company: "Umang",
    location: "Panaji, Goa",
    period: "Mar 2023 - Apr 2024",
    summary:
      "Built and maintained healthcare and business applications while collaborating directly with international clients.",
    achievements: [
      "Developed healthcare workflows with CodeIgniter, PHP, REST APIs and SQL.",
      "Automated cron-based processes, PDF and Excel generation, and OAuth 2.0 email integration.",
    ],
    stack: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "REST APIs", "Linux"],
  },
  {
    title: "Associate Software Engineer",
    company: "Infuse Consulting",
    location: "Panaji, Goa",
    period: "Sep 2022 - Feb 2023",
    summary:
      "Completed project-based engineering training across development, automation and software quality.",
    achievements: [
      "Worked with Python, Flask and Selenium across development and automated-testing exercises.",
      "Practised API, performance and manual testing with Jenkins, Git and AWS fundamentals.",
    ],
    stack: ["Python", "Flask", "Selenium", "Jenkins", "Git", "API testing"],
  },
];

export const skillGroups = [
  {
    label: "Core and frontend",
    items: ["TypeScript", "JavaScript", "React", "TanStack Query", "Zustand", "Redux Toolkit", "Material UI", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["NestJS", "Node.js", "Express", "REST APIs", "WebSockets", "Socket.IO", "OAuth 2.0", "Cron jobs"],
  },
  {
    label: "Data and architecture",
    items: ["PostgreSQL", "Redis", "MongoDB", "TypeORM", "Data modelling", "Transactions", "Caching", "External integrations"],
  },
  {
    label: "Delivery and quality",
    items: ["Docker", "AWS SQS", "Git", "Jest", "Playwright", "Linux", "CI/CD", "Postman"],
  },
];

export const independentProjects: IndependentProject[] = [
  {
    title: "StayMate",
    context: "Full-stack rental marketplace",
    description:
      "A role-aware marketplace spanning property discovery, booking, payments, host operations, administration and authenticated real-time messaging.",
    highlights: [
      "Stripe test-mode checkout with webhook-driven booking confirmation",
      "Guest, host and admin workflows with role-aware access",
      "Geospatial discovery and booking-linked Socket.IO conversations",
    ],
    stack: ["NestJS", "React", "PostgreSQL", "TypeORM", "Stripe", "Socket.IO", "TanStack Query"],
    repository: "https://github.com/Shreyas2121/stay-mate",
    demo: "https://stay-mate-three.vercel.app/",
  },
  {
    title: "Workforce Operations",
    context: "Multi-tenant scheduling platform",
    description:
      "An organisation-scoped workforce system for staff, teams, shifts, recurring availability, time-off approvals and auditable operational changes.",
    highlights: [
      "Admin, manager and worker permissions with tenant-scoped data",
      "Assignment rules for capacity, overlap, availability and approved leave",
      "Audit history and guarded demo bootstrap tooling",
    ],
    stack: ["NestJS", "React", "PostgreSQL", "TypeORM", "TanStack Start", "TanStack Query"],
    repository: "https://github.com/Shreyas2121/operations-manage",
    demo: "https://operations-manage.vercel.app/",
  },
];
