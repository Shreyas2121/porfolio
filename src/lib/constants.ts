export type ProjectImage = { src: string; alt: string };

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
  }[];
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
  slug: string;
  title: string;
  context: string;
  description: string;
  highlights: string[];
  stack: string[];
  repository: string;
  demo?: string;
  images?: ProjectImage[];
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
  limitations: string[];
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
    selectedWork: [
      {
        title: "Shared combat-sports architecture",
        description:
          "Consolidated seven-plus sports into shared PostgreSQL schemas, TypeORM entities, NestJS services and React interfaces using a sport-type discriminator.",
      },
      {
        title: "Major League Table Tennis",
        description:
          "Owned the integration from paginated external APIs and transactional synchronisation through live scores, settlement, publishing and the trader-facing interface.",
      },
      {
        title: "External API reliability",
        description:
          "Designed memory and Redis token caching, concurrency control, pre-expiry refresh and rate-aware retry behaviour for OAuth-protected providers.",
      },
      {
        title: "Data quality and recovery",
        description:
          "Built configuration-driven odds validation and heartbeat-triggered resynchronisation to prevent invalid data and recover from downstream outages.",
      },
      {
        title: "Real-time trading performance",
        description:
          "Collaborated on an F1 trading grid with granular Socket.IO updates and Zustand stores to keep dense, frequently changing market data responsive.",
      },
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
  {
    slug: "chaibook-lm",
    title: "Chaibook LM",
    context: "AI-powered research workspace",
    description:
      "A multi-notebook research assistant that indexes five source types and produces streamed, evidence-grounded answers with inspectable citations.",
    highlights: [
      "Notebook-scoped hybrid retrieval across PDF, text, website, YouTube and VTT sources",
      "Retry-safe background indexing with OpenAI embeddings and PostgreSQL pgvector",
      "Server-controlled citations that open the supporting page, passage, section or timestamp",
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
      "Chaibook LM turns each notebook into an isolated knowledge base. It extracts and chunks five source types, creates embeddings in a retry-safe background pipeline, combines vector and full-text retrieval, and streams answers grounded only in retrieved evidence. Every citation is mapped by the server to a real source chunk and can be inspected at its original location.",
    users: [
      {
        role: "Researchers and students",
        capabilities:
          "Organise source material into separate notebooks, ask cross-source questions and inspect the exact evidence behind each answer.",
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
          "Notebook-filtered hybrid search feeds bounded evidence to a streaming answer service, while server-owned chunk mappings keep citations traceable and authorized.",
        technologies: ["PostgreSQL", "pgvector", "Drizzle ORM", "Vercel AI SDK"],
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
    ],
    limitations: [
      "Conversation context is currently session-bound and is cleared when the page is refreshed.",
      "Scanned and image-only PDFs are not supported because OCR is not yet implemented.",
      "YouTube indexing depends on accessible captions and may require the configured transcript provider.",
    ],
  },
  {
    slug: "staymate",
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
  {
    slug: "workforce-operations",
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
    problem:
      "Shift-based organisations need more than a calendar: schedules must respect team boundaries, worker availability, approved leave, role permissions, capacity and overlapping assignments while keeping operational changes traceable.",
    solution:
      "Workforce Operations is a tenant-scoped scheduling platform where administrators configure organisations and teams, managers operate team schedules, and workers manage availability and time-off requests. Business constraints are enforced by the API rather than left to the interface.",
    users: [
      {
        role: "Administrators",
        capabilities:
          "Create teams and staff, assign users to teams and inspect organisation-wide operations and audit history.",
      },
      {
        role: "Managers",
        capabilities:
          "Manage workers in their team, create shifts, assign or remove workers and review time-off requests.",
      },
      {
        role: "Workers",
        capabilities:
          "View assigned shifts, maintain recurring availability and submit or track time-off requests.",
      },
    ],
    architecture: [
      {
        layer: "Frontend",
        details:
          "Server-rendered React application with route-level role surfaces, shared data components and a startup gate for a sleeping API.",
        technologies: ["React 19", "TanStack Start", "TanStack Router", "TanStack Query", "Tailwind CSS"],
      },
      {
        layer: "Backend",
        details:
          "Organisation-aware NestJS modules for authentication, users, teams, shifts, availability, leave and audit logging.",
        technologies: ["NestJS", "TypeScript", "JWT", "Role guards", "Swagger"],
      },
      {
        layer: "Data and deployment",
        details:
          "Relational organisation and scheduling model deployed as independently hosted frontend and API services.",
        technologies: ["PostgreSQL", "TypeORM", "Neon", "Render", "Vercel"],
      },
    ],
    decisions: [
      {
        title: "Server-enforced scheduling rules",
        description:
          "Assignment checks cover team membership, worker role, duplicates, capacity, overlap, availability and approved leave before state changes are accepted.",
      },
      {
        title: "Organisation-scoped access",
        description:
          "Tenant context and role guards constrain data access so users operate only within their organisation and permitted team scope.",
      },
      {
        title: "Auditable operations",
        description:
          "Important administrative and scheduling changes create audit records for operational visibility.",
      },
      {
        title: "Protected demo bootstrap",
        description:
          "Fresh deployments can create controlled demonstration data through explicitly enabled, key-protected setup tools.",
      },
    ],
    limitations: [
      "Shift swaps and real-time schedule updates are not currently implemented.",
      "Optimistic concurrency and idempotent write handling remain future reliability improvements.",
      "Production schema evolution should replace development-time TypeORM synchronisation with migrations.",
    ],
  },
  {
    slug: "food-delivery-platform",
    title: "Food Delivery Platform",
    context: "Full-stack ordering and operations",
    description:
      "A complete food-ordering product with configurable menu items, cart and coupon flows, serviceable delivery zones, Razorpay payments and an administration dashboard.",
    highlights: [
      "Product customisation through configurable add-on groups",
      "Online Razorpay payments and cash-on-delivery checkout",
      "Admin workflows for products, coupons, orders and operational analytics",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Drizzle ORM",
      "TanStack Query",
      "Zustand",
      "Razorpay",
    ],
    repository: "https://github.com/Shreyas2121/pizza-store",
    problem:
      "Food ordering becomes difficult to model when products have optional add-ons, discounts depend on checkout state, delivery is limited by service area, and payments must stay aligned with order status. Administrators also need one place to operate the catalogue and incoming orders.",
    solution:
      "The platform connects a responsive customer storefront to a Node.js API and PostgreSQL database. Customers can configure products, manage a cart, apply coupons, validate delivery addresses and choose online payment or cash on delivery, while administrators operate products, orders and promotions.",
    users: [
      {
        role: "Customers",
        capabilities:
          "Browse the menu, customise products, manage cart items, apply coupons, save delivery addresses and complete online or cash-on-delivery checkout.",
      },
      {
        role: "Administrators",
        capabilities:
          "Manage products, customisation groups, coupons and orders, update fulfilment status and review revenue and order information.",
      },
    ],
    architecture: [
      {
        layer: "Frontend",
        details:
          "Responsive React storefront and administration interface with separate server-state and client-state responsibilities.",
        technologies: [
          "React",
          "Tailwind CSS",
          "Mantine",
          "TanStack Query",
          "Zustand",
        ],
      },
      {
        layer: "Backend",
        details:
          "Express API covering catalogue, customisation, carts, coupons, customer addresses, delivery validation, orders and payment workflows.",
        technologies: ["Node.js", "Express", "Zod", "REST APIs"],
      },
      {
        layer: "Data and payments",
        details:
          "Relational product and ordering data with Razorpay integration for online checkout and support for cash-on-delivery orders.",
        technologies: ["PostgreSQL", "Drizzle ORM", "Razorpay"],
      },
    ],
    decisions: [
      {
        title: "Composable product customisation",
        description:
          "Add-on groups are modelled separately from base products so customers can build valid item configurations without duplicating catalogue entries.",
      },
      {
        title: "Separate server and cart state",
        description:
          "TanStack Query manages API-backed data and cache invalidation, while Zustand handles immediate customer cart interactions.",
      },
      {
        title: "Delivery-zone validation",
        description:
          "Checkout validates the customer address against supported pincodes before an order can be placed.",
      },
      {
        title: "Multiple payment paths",
        description:
          "The order workflow supports both Razorpay checkout and cash on delivery while retaining a shared order-management model.",
      },
    ],
    limitations: [
      "The project does not currently provide a maintained public live demo.",
      "Advanced delivery tracking and real-time customer notifications remain future improvements.",
      "Administrative analytics can be expanded with deeper filtering and longer-term reporting.",
    ],
  },
];
