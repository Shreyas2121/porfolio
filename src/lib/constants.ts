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
  icon: "commerce" | "care" | "analytics";
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Commerce platform and operations suite",
    context: "Professional work - E-commerce",
    summary: "A storefront and admin platform covering catalogue, checkout, payments and order operations.",
    role: "Owned the frontend architecture and supported API integration and deployment.",
    challenge: "Keep complex product options, cart state and server data predictable.",
    outcome: "Delivered a responsive customer journey and a central operations surface.",
    stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Node.js", "PostgreSQL"],
    accent: "violet",
    icon: "commerce",
  },
  {
    title: "Multi-role pet care platform",
    context: "Professional work - SaaS operations",
    summary: "Connected portals and workflows for administrators, veterinarians and groomers.",
    role: "Built role-specific interfaces and contributed to Node.js and PostgreSQL flows.",
    challenge: "Make complex permissions and operational data clear for different users.",
    outcome: "Shipped focused tools while keeping workflows consistent across the product.",
    stack: ["React", "Redux Toolkit", "Node.js", "PostgreSQL", "REST APIs"],
    accent: "emerald",
    icon: "care",
  },
  {
    title: "Restaurant intelligence dashboard",
    context: "Professional work - Analytics",
    summary: "A responsive product for exploring sales, trends and custom reporting periods.",
    role: "Translated Figma designs into the complete frontend and reporting workflow.",
    challenge: "Present dense data clearly across screen sizes and exported PDF reports.",
    outcome: "Delivered interactive visualisations, flexible filters and consistent exports.",
    stack: ["React", "TypeScript", "Recharts", "Tailwind CSS", "PDF generation"],
    accent: "amber",
    icon: "analytics",
  },
];

export const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Bluestream.io",
    location: "Panaji, Goa",
    period: "May 2024 - Present",
    summary: "Shipping commerce, operations and analytics products from frontend architecture through deployment.",
    achievements: [
      "Led frontend architecture for a new e-commerce platform and admin panel.",
      "Developed multi-role portals and data-heavy business dashboards.",
      "Contributed to APIs and improved Docker, Jenkins and Linux delivery workflows.",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Jenkins"],
  },
  {
    title: "Jr. Software Developer",
    company: "Umang",
    location: "Panaji, Goa",
    period: "Mar 2023 - Apr 2024",
    summary: "Delivered and maintained business-critical applications with direct client collaboration.",
    achievements: [
      "Built a responsive patient-record system end to end with CodeIgniter and PHP.",
      "Developed REST APIs, SQL queries and integrations across several web products.",
      "Automated recurring data workflows with Linux scripts and cron jobs.",
    ],
    stack: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "REST APIs", "Linux"],
  },
  {
    title: "Associate Software Engineer in Test",
    company: "Infuse Consulting Ltd.",
    location: "Panaji, Goa",
    period: "Sep 2022 - Feb 2023",
    summary: "Built a foundation in software quality, automation and continuous delivery.",
    achievements: [
      "Created test cases and automation exercises using Python, Flask, Ruby and Selenium.",
      "Practised API, performance and manual testing with Jenkins and Git.",
    ],
    stack: ["Python", "Selenium", "Flask", "Jenkins", "Git", "API testing"],
  },
];

export const skillGroups = [
  { label: "Core", items: ["TypeScript", "JavaScript", "PHP", "SQL", "HTML", "CSS"] },
  { label: "Frontend", items: ["React", "Next.js", "TanStack Query", "Redux Toolkit", "Zustand", "Tailwind CSS"] },
  { label: "Backend and data", items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MySQL", "MongoDB", "CodeIgniter"] },
  { label: "Delivery and quality", items: ["Docker", "Jenkins", "Linux", "Git", "Selenium", "Postman", "Google Cloud"] },
];

export const independentProjects = [
  {
    title: "Food Delivery Platform",
    description: "Full-stack ordering with product customisation, coupons, delivery validation, payments and an admin dashboard.",
    stack: ["React", "Node.js", "PostgreSQL", "Drizzle ORM", "Razorpay"],
    repository: "https://github.com/Shreyas2121/pizza-store",
  },
  {
    title: "Event Ticketing System",
    description: "Event booking with OTP verification, purchase limits, payments, QR tickets and administration.",
    stack: ["Next.js", "Express", "PostgreSQL", "Drizzle ORM", "Zustand"],
    repository: "https://github.com/Shreyas2121/event_fiesta",
    demo: "https://eventfe.vercel.app/",
  },
];
