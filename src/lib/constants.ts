import { pizzaStore } from "@/lib/pizza-store";
import { archboard } from "@/lib/archboard";

export type ProjectCover = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type ProjectScreenshot = ProjectCover & {
  id: string;
  type: "screenshot";
  section: "gallery" | "workflows" | "decisions";
  order?: number;
};

export type ProjectDiagram = ProjectCover & {
  id: string;
  type: "diagram";
  section: "architecture" | "workflows" | "decisions";
  order?: number;
  explanation: string;
  expandedSrc?: string;
  expanded?: Pick<ProjectCover, "src" | "alt" | "width" | "height">;
  legend?: { symbol: string; meaning: string }[];
};

export type ProjectVideo = {
  id: string;
  type: "video";
  section: "walkthrough";
  order?: number;
  youtubeId: string;
  src?: never;
  poster: string;
  width: number;
  height: number;
  title: string;
  caption: string;
  duration: string;
  steps: string[];
  transcript?: string;
};

export type ProjectMedia = ProjectScreenshot | ProjectDiagram | ProjectVideo;

export type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  stack: string[];
  selectedWork?: {
    title: string;
    description: string;
    slug?: string;
  }[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  context: string;
  summary: string;
  role: string;
  challenge: string;
  outcome: string;
  stack: string[];
  accent: "violet" | "emerald" | "amber";
  icon: "architecture" | "realtime" | "reliability";
  cover?: ProjectCover;
  media?: ProjectMedia[];
};

export type IndependentProject = {
  slug: string;
  title: string;
  context: string;
  description: string;
  highlights: string[];
  stack: string[];
  repository: string;
  demo?: string;
  cover?: ProjectCover;
  media?: ProjectMedia[];
  problem: string;
  solution: string;
  users: {
    role: string;
    capabilities: string;
  }[];
  architecture: {
    layer: string;
    details: string;
    technologies: string[];
  }[];
  decisions: {
    title: string;
    description: string;
  }[];
  workflows?: { title: string; description: string }[];
  evidence?: { title: string; description: string; href: string; label: string }[];
  limitations: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "unified-multi-sport-architecture",
    title: "Unified multi-sport architecture",
    cover: {
      src: "/projects/multi-sport-cover.svg",
      alt: "Seven-plus combat sports share a sport-type data model, NestJS APIs and React interfaces.",
      width: 960,
      height: 600,
      caption: "Shared architecture · reconstructed overview",
    },
    context: "Octalogic Tech - B2B sports data",
    media: [{
      id: "shared-sports-model",
      type: "diagram",
      section: "architecture",
      src: "/projects/multi-sport-cover.svg",
      alt: "Seven-plus sports use a sport-type discriminator with shared PostgreSQL entities, NestJS APIs and React interfaces.",
      width: 960,
      height: 600,
      caption: "Shared multi-sport model - reconstructed overview",
      explanation: "A sport-type discriminator preserves sport-specific behaviour within shared entities for events, participants, scores, markets and odds. NestJS services and React interfaces reuse that common structure. This is a reconstructed overview based on the case study, rather than an internal system diagram.",
    }],
    summary:
      "A shared data model and application architecture that replaced separate combat-sport implementations and made new sports easier to onboard.",
    role:
      "Owned the consolidation across PostgreSQL schemas, TypeORM entities, NestJS APIs and React interfaces. Introduced sport-scoped shared entities, extended the model for team-based competition, and removed legacy schemas and application references after migration. Applied the same consolidation approach to the High Limit Racing migration into shared motorsports infrastructure.",
    challenge:
      "Each sport had its own schema, endpoints and interface code, making routine changes repetitive and onboarding expensive. The shared design needed to preserve sport-specific scoring and market behaviour, accommodate team participation and migrate existing data without leaving competing implementations behind.",
    outcome:
      "Reduced duplicated code by approximately 80% across seven-plus combat sports and shortened new-sport onboarding from weeks to days. Extended the platform for team-based competition and completed legacy-schema cleanup, reducing the number of implementations the team needed to maintain.",
    stack: ["TypeScript", "NestJS", "React", "PostgreSQL", "TypeORM"],
    accent: "violet",
    icon: "architecture",
  },
  {
    slug: "real-time-table-tennis-integration",
    cover: {
      src: "/projects/table-tennis-cover.svg",
      alt: "Provider schedules and scores flow through transactional synchronisation to live trading and settlement workflows.",
      width: 960,
      height: 600,
      caption: "Live match workflow · reconstructed overview",
    },
    title: "Real-time table tennis integration",
    context: "Octalogic Tech - End-to-end integration",
    summary:
      "An end-to-end Major League Table Tennis integration connecting external schedules and point-level scores to trading, settlement and sportsbook delivery.",
    role:
      "Owned the integration from provider API clients and relational modelling through transactional synchronization, round-level markets, selection settlement and the React trading interface. Continued ownership after launch with event-loading improvements, point-level statistics, faster live-data delivery and downstream market-mapping fixes.",
    challenge:
      "Represent singles, doubles and golden-game rounds while keeping lineups, game scores, market periods and settlement consistent. Repeated provider polling needed to preserve related records transactionally, avoid unnecessary writes and publish the correct round and participant information downstream.",
    outcome:
      "Delivered a connected workflow from schedule ingestion to live trading and settlement. Added score-diff checks to skip unchanged writes, expanded point-level data coverage and resolved post-launch loading and sportsbook-mapping issues.",
    stack: ["NestJS", "React", "PostgreSQL", "Socket.IO", "Zustand", "Axios"],
    accent: "emerald",
    icon: "realtime",
  },
  {
    slug: "resilient-external-data-services",
    cover: {
      src: "/projects/provider-reliability-cover.svg",
      alt: "Concurrent requests share memory and Redis token caching, with pre-expiry refresh, rate-aware retries and heartbeat-triggered resynchronisation.",
      width: 960,
      height: 600,
      caption: "Provider reliability patterns · reconstructed overview",
    },
    title: "Resilient external data services",
    context: "Octalogic Tech - Reliability engineering",
    summary:
      "Provider integration and recovery patterns that reduce repeated authentication, reject invalid odds and keep downstream sports data current.",
    role:
      "Designed the lacrosse API authentication layer with in-memory and Redis token caching, shared in-flight authentication and rate-aware retries. Built configuration-driven odds validation, heartbeat-triggered downstream resynchronization and change detection that skips unchanged sportsbook updates.",
    challenge:
      "Concurrent requests could duplicate authentication, model odds could reference missing or inactive entities, and downstream outages could leave consumers stale. Recovery needed to respect provider limits, distinguish authentication failures from transient errors and avoid sending unchanged data on every sync cycle.",
    outcome:
      "Reduced unnecessary authentication requests by approximately 95%. Added configurable validation across 14+ sports, automated downstream resynchronization after heartbeat recovery and reduced redundant sportsbook pushes through state-change detection.",
    stack: ["OAuth 2.0", "Redis", "NestJS", "Cron", "Axios", "PostgreSQL", "AWS SQS"],
    accent: "amber",
    icon: "reliability",
  },
  {
    slug: "prediction-market-trading-platform",
    title: "Live prediction-market intelligence",
    context: "Octalogic Tech - Full-stack product ownership",
    summary:
      "A Polymarket integration that gives traders live executions, market activity, outcome-exposure estimates and price-level breakdowns alongside internal odds.",
    role:
      "Owned the integration from API exploration and database design to the trade poller, in-memory aggregation, Redis recovery snapshots and authenticated Socket.IO gateway. Built the React trade ticker, markets board and interactive price ladders, then added automated market discovery, settlement synchronization and provider-failure handling.",
    challenge:
      "Turn inconsistent external metadata and frequent trade updates into a useful trading view without writing every aggregate change to PostgreSQL. The integration also needed to match external markets to internal events conservatively, respect manual deactivations, recover running totals after restarts and stop tracking completed markets.",
    outcome:
      "Delivered a two-second polling pipeline with deduplication, in-memory volume and outcome-exposure calculations, Redis snapshots and room-scoped price-ladder subscriptions. Automated matching uses name-confidence thresholds and date checks; virtualized, bounded ticker rows keep client state controlled. Added rate-limit backoff, settlement-driven cache eviction and focused tests for aggregation, discovery, API serialization and lifecycle behaviour.",
    stack: ["TypeScript", "NestJS", "React", "PostgreSQL", "TypeORM", "Redis", "Socket.IO", "Material UI", "Jest"],
    accent: "emerald",
    icon: "realtime",
  },
];

export const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Octalogic Tech",
    location: "Panaji, Goa",
    period: "May 2025 - Present",
    summary:
      "Own full-stack features for a B2B sports-data and trading platform, from shared data models and provider integrations to live trader interfaces and downstream publishing. Carry work through design, implementation and post-launch reliability improvements across combat sports, motorsports and prediction markets.",
    achievements: [
      "Consolidated 7+ combat sports into shared PostgreSQL schemas, NestJS APIs and React interfaces, reducing duplicated code by approximately 80% and new-sport onboarding from weeks to days. Delivered the High Limit Racing migration into shared motorsports infrastructure and removed retired schemas and code paths.",
      "Built the Polymarket integration end to end: a two-second trade poller, in-memory volume and outcome-exposure aggregation, Redis recovery snapshots, authenticated Socket.IO feeds and React trading screens with a virtualized ticker and interactive price ladders.",
      "Automated prediction-market discovery using conservative name matching and date checks, while preserving manual deactivations. Hardened polling and settlement with deduplication, rate-limit backoff, cache eviction and focused regression tests.",
      "Owned the Major League Table Tennis integration from external APIs and transactional score synchronization to round-level settlement, sportsbook publishing and the React trading interface. Continued delivery with point-level statistics, loading improvements and downstream market-mapping fixes.",
      "Reduced unnecessary provider authentication calls by approximately 95% through in-memory and Redis caching with shared in-flight requests. Built configurable odds validation across 14+ sports, heartbeat-based recovery and change detection to avoid redundant downstream pushes.",
      "Extended shared sports models for team-based competition and built configurable combat-sports auto-publishing. Collaborated with the frontend lead on the F1 trading grid, using granular Socket.IO updates and Zustand state to handle 20+ drivers across multiple live markets.",
    ],
    selectedWork: [
      {
        title: "Shared combat-sports architecture",
        slug: "unified-multi-sport-architecture",
        description:
          "Replaced separate sport implementations with shared entities, APIs and interfaces, then extended the model for team participation and completed legacy-schema cleanup.",
      },
      {
        title: "Polymarket trading intelligence",
        slug: "prediction-market-trading-platform",
        description:
          "Delivered the external-data pipeline, live aggregation, automated market matching and trader-facing ticker, markets board and price ladders as one full-stack feature.",
      },
      {
        title: "Major League Table Tennis",
        slug: "real-time-table-tennis-integration",
        description:
          "Connected schedules, lineups and game scores to trading and settlement, with continued ownership of performance, point-level data and sportsbook compatibility after launch.",
      },
      {
        title: "External API reliability",
        slug: "resilient-external-data-services",
        description:
          "Designed cache-backed authentication and recovery paths that handle concurrency, provider limits and downstream failures without relying on manual intervention.",
      },
      {
        title: "Data quality and publishing automation",
        description:
          "Built database-configured validation for model odds and per-sport, per-tour auto-publishing, connecting accepted data to existing sportsbook delivery and live trader status updates.",
      },
      {
        title: "Live trading interfaces",
        description:
          "Collaborated on the F1 trading frontend with the frontend lead. Current work includes the curling Day Board redesign; per-match save queues, acknowledged writes and offline edit buffering remain ongoing work.",
      },
    ],
    stack: ["TypeScript", "NestJS", "React", "PostgreSQL", "Redis", "TypeORM", "Socket.IO", "Zustand", "AWS SQS", "Jest"],
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
    selectedWork: [
      {
        title: "Commerce platform",
        description:
          "Led frontend architecture for a new storefront and administration system covering catalogue, customisation, checkout, payments, coupons and orders.",
      },
      {
        title: "Pet-care operations",
        description:
          "Built role-specific portals and dashboards for administrators, veterinarians and groomers with supporting Node.js and PostgreSQL work.",
      },
      {
        title: "Restaurant analytics",
        description:
          "Translated Figma designs into responsive charts, date-range workflows and downloadable reporting interfaces.",
      },
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
    selectedWork: [
      {
        title: "Healthcare records",
        description:
          "Delivered a responsive patient-record workflow with CodeIgniter and PHP while working directly with a Netherlands-based client.",
      },
      {
        title: "Business integrations",
        description:
          "Developed REST APIs, complex SQL queries, scheduled server synchronisation and document-generation workflows.",
      },
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
    selectedWork: [
      {
        title: "Engineering foundations",
        description:
          "Completed practical development and testing exercises covering automation, API testing, performance fundamentals and continuous integration.",
      },
    ],
    stack: ["Python", "Flask", "Selenium", "Jenkins", "Git", "API testing"],
  },
];

export const education = {
  qualification: "B.E. in Information Technology",
  institution: "Padre Conceicao College of Engineering",
  period: "2018 - 2022",
  result: "70%",
};

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
  pizzaStore,
  archboard,
  {
    slug: "citeleaf",
    media: [{
      id: "notebook-evidence-flow",
      type: "diagram",
      section: "architecture",
      src: "/projects/citeleaf-cover.svg",
      alt: "PDF and text documents, websites, YouTube captions and VTT transcripts feed notebook-scoped hybrid retrieval and inspectable citations.",
      width: 960,
      height: 600,
      caption: "Notebook-scoped evidence flow - illustrated overview",
      explanation: "Sources are extracted, chunked and indexed within an isolated notebook. Vector and full-text retrieval select bounded evidence for an answer; the server maps each citation to a real retrieved source chunk. Saved conversations retain citation snapshots so the evidence remains inspectable.",
    }],
    cover: {
      src: "/projects/citeleaf-cover.svg",
      alt: "Citeleaf brings documents, websites and video transcripts into a notebook to produce answers with inspectable source citations.",
      width: 960,
      height: 600,
      caption: "Research evidence flow · illustrated overview",
    },
    title: "Citeleaf",
    context: "AI-powered research workspace",
    description:
      "A multi-notebook research assistant that indexes five source types, produces cited answers, persists conversations and generates evidence-grounded learning roadmaps from selected YouTube sources.",
    highlights: [
      "Notebook-scoped hybrid retrieval across PDF, text, website, YouTube and VTT sources",
      "Persistent notebook conversations with durable message states and citation snapshots",
      "Playlist-aware YouTube ingestion and personalised roadmaps grounded in selected transcripts",
      "Immutable roadmap versions with verified timestamps, progress tracking and retry-safe generation",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Drizzle ORM",
      "Supabase",
      "Inngest",
      "OpenAI",
      "LangChain",
    ],
    repository: "https://github.com/Shreyas2121/chaibook-lm",
    demo: "https://chaibook-lm-three.vercel.app/",
    problem:
      "General-purpose AI chat makes it difficult to verify where an answer came from, while research material is often fragmented across documents, websites, videos and transcripts. A useful research assistant must retrieve only relevant evidence, preserve its location and prevent information from leaking between notebooks.",
    solution:
      "Citeleaf turns each notebook into an isolated knowledge base. It extracts and chunks five source types, creates embeddings in a retry-safe background pipeline, combines vector and full-text retrieval, and streams answers grounded only in retrieved evidence. Every citation is mapped by the server to a real source chunk and remains inspectable across conversations. Users can also import YouTube playlists and generate persistent learning roadmaps whose lessons link back to server-verified transcript evidence.",
    users: [
      {
        role: "Researchers and students",
        capabilities:
          "Organise source material into separate notebooks, ask cross-source questions, inspect answer evidence and generate structured learning roadmaps from selected videos.",
      },
      {
        role: "Knowledge workers",
        capabilities:
          "Index documents, websites, captioned videos and transcripts, then explore them through grounded questions and follow-ups.",
      },
    ],
    architecture: [
      {
        layer: "Application and identity",
        details:
          "Next.js workspace with Google sign-in, server-rendered notebook routes and owner-scoped application services.",
        technologies: ["Next.js 16", "React 19", "Supabase Auth", "Tailwind CSS"],
      },
      {
        layer: "Ingestion pipeline",
        details:
          "Retryable background jobs extract, normalise, chunk and embed five source types before atomically activating a new index generation.",
        technologies: ["Inngest", "LangChain", "OpenAI embeddings", "Supabase Storage"],
      },
      {
        layer: "Retrieval and citations",
        details:
          "Notebook-filtered hybrid search feeds bounded evidence to a streaming answer service, while persistent conversations and server-owned citation snapshots keep answers traceable across reloads and source re-indexing.",
        technologies: ["PostgreSQL", "pgvector", "Drizzle ORM", "Vercel AI SDK"],
      },
      {
        layer: "Learning roadmap pipeline",
        details:
          "Two-pass structured generation builds persistent roadmap versions from explicitly selected ready videos, verifies cited chunks server-side and preserves the active plan when regeneration fails.",
        technologies: ["OpenAI", "Inngest", "Zod", "PostgreSQL"],
      },
    ],
    decisions: [
      {
        title: "Evidence-bound answers",
        description:
          "The model receives a bounded set of retrieved chunks and returns an explicit insufficient-evidence response when the notebook cannot support an answer.",
      },
      {
        title: "Server-controlled provenance",
        description:
          "Citation labels are assigned to real retrieved chunks by the server, preserving source and locator metadata instead of asking the model to invent references.",
      },
      {
        title: "Generation-based indexing",
        description:
          "Re-indexing writes a new source generation and activates it atomically so failed retries cannot mix partial or duplicate vectors into retrieval.",
      },
      {
        title: "Isolation and defensive ingestion",
        description:
          "Owner and notebook predicates protect relational and vector queries, while remote fetching validates DNS and redirects and bounds content, time and response size.",
      },
      {
        title: "Versioned, evidence-grounded roadmaps",
        description:
          "Roadmaps use immutable versions and server-verified evidence snapshots so lessons remain traceable, progress survives regeneration and failed jobs cannot replace the active plan.",
      },
    ],
    limitations: [
      "Scanned and image-only PDFs are not supported because OCR is not yet implemented.",
      "YouTube indexing depends on accessible captions and may require the configured transcript provider.",
    ],
  },
  {
    slug: "staymate",
    media: [{
      id: "booking-state-flow",
      type: "diagram",
      section: "architecture",
      src: "/projects/staymate-cover.svg",
      alt: "Property discovery leads to Stripe test checkout and webhook-confirmed bookings, followed by host operations and booking-linked messages.",
      width: 960,
      height: 600,
      caption: "Booking state connects payment and communication - illustrated overview",
      explanation: "Guests discover listings and initiate Stripe test-mode checkout. The backend confirms booking state through the payment webhook rather than a browser redirect. Confirmed booking relationships then determine messaging access while hosts operate reservations and availability.",
    }],
    cover: {
      src: "/projects/staymate-cover.svg",
      alt: "StayMate connects guest discovery and checkout to webhook-confirmed bookings, host operations and booking-linked messaging.",
      width: 960,
      height: 600,
      caption: "Booking workflow · illustrated overview",
    },
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
    problem:
      "Rental marketplaces coordinate discovery, availability, payments and communication across guests, hosts and platform administrators. The challenge was to model those connected workflows as one coherent product instead of a collection of disconnected CRUD screens.",
    solution:
      "StayMate combines a role-aware NestJS API with a React client for property discovery, Stripe checkout, host operations, platform administration and authenticated real-time conversations. Booking state connects the payment, availability and messaging domains.",
    users: [
      {
        role: "Guests",
        capabilities:
          "Discover and save listings, inspect property details, complete Stripe test checkout, manage trips and message hosts after a confirmed booking.",
      },
      {
        role: "Hosts",
        capabilities:
          "Apply for verification, create and manage listings, control availability, review reservations, communicate with guests and inspect earnings.",
      },
      {
        role: "Administrators",
        capabilities:
          "Review host applications, manage coupons, inspect listing bookings and coordinate payout workflows.",
      },
    ],
    architecture: [
      {
        layer: "Frontend",
        details:
          "Route-driven React application with feature modules, server-state caching, session state, responsive UI primitives and map-based discovery.",
        technologies: ["React 19", "Vite", "TanStack Router", "TanStack Query", "Zustand", "Leaflet"],
      },
      {
        layer: "Backend",
        details:
          "Modular NestJS API with domain boundaries for users, listings, bookings, payments, messaging, wishlists and administration.",
        technologies: ["NestJS", "TypeScript", "JWT", "Socket.IO", "Swagger"],
      },
      {
        layer: "Data and integrations",
        details:
          "Relational booking data with external services for payment processing, media storage and real-time delivery.",
        technologies: ["PostgreSQL", "TypeORM", "Stripe", "Cloudinary"],
      },
    ],
    decisions: [
      {
        title: "Webhook-driven booking confirmation",
        description:
          "Stripe checkout initiates payment, while the webhook-driven backend flow confirms booking state instead of trusting a browser redirect.",
      },
      {
        title: "Booking-linked conversations",
        description:
          "Messaging is associated with confirmed booking relationships so real-time communication follows product authorization rules.",
      },
      {
        title: "Role-aware product surfaces",
        description:
          "Guest, host and administrator capabilities are separated through backend guards and purpose-built frontend routes.",
      },
      {
        title: "Feature-oriented frontend",
        description:
          "Discovery, booking, host, admin and messaging code is grouped around product domains rather than generic component categories.",
      },
    ],
    limitations: [
      "Stripe operates in test mode and the project does not claim production payment traffic.",
      "Development environments currently use TypeORM schema synchronisation; production evolution should use migrations.",
      "Automated coverage should be expanded around payment authorization, booking conflicts and webhook replay scenarios.",
    ],
  },
];
