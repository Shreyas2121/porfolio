import {
  SiMongodb,
  SiMysql,
  SiTypescript,
  SiNextdotjs,
  SiPhp,
  SiDocker,
  SiGooglecloud,
  SiPostgresql,
  SiLinux,
  SiCodeigniter,
  SiGit,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiHtml5,
  SiCss3,
  SiRedux,
  SiTailwindcss,
  SiSelenium,
  SiPostman,
  SiWordpress,
  SiFigma,
  SiVsco,
} from "react-icons/si";
export const skills = [
  { name: "React", icon: SiReact, value: 90 },
  { name: "TypeScript", icon: SiTypescript, value: 80 },
  { name: "Node.js", icon: SiNodedotjs, value: 70 },
  { name: "Express.js", icon: SiExpress, value: 70 },
  { name: "Next.js", icon: SiNextdotjs, value: 70 },
  { name: "SQL", icon: SiMysql, value: 70 },
  { name: "PHP", icon: SiPhp, value: 80 },
  { name: "CodeIgniter", icon: SiCodeigniter, value: 70 },
  { name: "HTML5", icon: SiHtml5, value: 90 },
  { name: "CSS3", icon: SiCss3, value: 85 },
  { name: "Tailwind CSS", icon: SiTailwindcss, value: 70 },
  { name: "Redux Toolkit", icon: SiRedux, value: 70 },
];

export const tools = [
  { name: "Git", icon: SiGit, value: 80 },
  { name: "MySQL", icon: SiMysql, value: 80 },
  { name: "Google Cloud", icon: SiGooglecloud, value: 30 },
  { name: "Linux", icon: SiLinux, value: 40 },
  { name: "Docker", icon: SiDocker, value: 40 },
  { name: "PostgreSQL", icon: SiPostgresql, value: 70 },
  { name: "MongoDB", icon: SiMongodb, value: 60 },
  { name: "VS Code", icon: SiVsco, value: 90 },
  { name: "Postman", icon: SiPostman, value: 70 },
  { name: "Selenium", icon: SiSelenium, value: 40 },
  { name: "WordPress", icon: SiWordpress, value: 60 },
  { name: "Figma", icon: SiFigma, value: 50 },
];

export const experiences = [
  {
    title: "Full Stack Developer",
    company: "Bluestream.io",
    location: "Panaji, Goa",
    dates: {
      start: "2024-05-01",
      end: null, // Represents "Present"
    },
    description: [
      "Led the frontend architecture and development of a new e-commerce platform and admin panel from scratch, utilizing React, Zustand, and React Query for robust state management and optimized data fetching; also contributed to backend API integration (Node.js, Express.js).",
      "Engineered role-specific portals (admin, veterinarian, groomer) for a comprehensive pet care management system using React and Redux Toolkit, featuring data dashboards, interactive charts, and extensive operational tools, including some backend (Node.js, PostgreSQL) support.",
      "Developed the complete frontend from Figma designs for a restaurant analytics dashboard using React, Recharts, and Tailwind CSS, implementing interactive data visualizations (sales, product trends), a custom date-range picker, and responsive PDF report generation.",
      "Administered Linux-based VPS environments, managed Docker containerization, configured Jenkins CI/CD pipelines, and handled domain management, significantly enhancing deployment workflows and system reliability.",
      "Provided essential maintenance and bug fixes for a complex legacy PHP advertisement management platform and developed/launched 2-3 client websites using WordPress.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB", // Confirm if still used extensively or primarily PostgreSQL
      "PostgreSQL",
      "Redux Toolkit",
      "Zustand",
      "React Query",
      "TypeScript", // You mentioned this in your resume summary, ensure it's used here if so
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Recharts",
      "Figma",
      "Docker",
      "Jenkins",
      "Linux",
      "VPS Management",
      "Git",
      "PHP",
      "WordPress",
      "RESTful APIs",
    ],
  },
  {
    title: "Jr. Software Developer",
    company: "Umang",
    location: "Panaji, Goa",
    dates: {
      start: "2023-03-01",
      end: "2024-04-30",
    },
    description: [
      "Spearheaded the end-to-end development of a responsive patient record management system for nurses using CodeIgniter and PHP, ensuring data privacy and meeting strict project deadlines in direct collaboration with a Dutch-based client.",
      "Enhanced and maintained a diverse portfolio of web applications (e-commerce, dental software, analytics dashboards) by developing new features and resolving bugs in core PHP, HTML, CSS, and JavaScript.",
      "Engineered RESTful APIs for streamlined data exchange and optimized application performance through complex SQL query design and database management.",
      "Automated critical backend processes, including data synchronization across Linux servers and routine data management via cron job scripts, and integrated PDF/Excel generation and OAuth 2.0 email services.",
    ],
    technologies: [
      "CodeIgniter",
      "PHP",
      "MySQL", // Assuming SQL was primarily MySQL, specify if otherwise
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "RESTful APIs",
      "SQL",
      "Git",
      "Linux Server",
      "Cron Jobs",
      "OAuth 2.0",
      "Client Communication",
    ],
  },
  {
    title: "Associate Software Engineer in Test", // Or "Software Engineering Trainee" if you prefer to emphasize training
    company: "Infuse Consulting Ltd.",
    location: "Panaji, Goa",
    dates: {
      start: "2022-09-01",
      end: "2023-02-28",
    },
    description: [
      "Completed an intensive training program focused on software development and testing principles, covering Python, Flask, Ruby, and Selenium.",
      "Gained foundational knowledge in CI/CD methodologies (Jenkins, Git) and AWS cloud concepts through structured learning modules and hands-on exercises.",
      "Participated in practical training exercises involving test case design, automation scripting fundamentals (Selenium), manual testing techniques, performance testing basics, and API testing concepts.",
    ],
    technologies: [
      "Python",
      "Flask",
      "Ruby",
      "Selenium",
      "Jenkins",
      "Git",
      "AWS",
      "Testing Principles",
      "API Testing Concepts",
    ],
  },
];

export interface Project {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  technologyStack: Record<string, string[]>;
  challenges: string[];
  demoLink?: string;
  repository: string;
  videoLink?: string;
  futureImprovements: string[];
}

export const projects: Project[] = [
  {
    title: "Food Delivery Platform",
    tagline:
      "End-to-end food ordering with product customization, coupon integration, and secure Razorpay payments",
    description:
      "A comprehensive food ordering application designed to deliver a seamless food delivery experience. The platform enables users to browse a diverse menu, customize food items with add-on options, apply coupons, and complete orders through an integrated checkout flow. With support for both cash-on-delivery and online payments via Razorpay, the system also manages user profiles, addresses, and delivery zones, ensuring that only serviceable areas are accepted.",
    features: [
      "Product Browsing & Customization: Browse food items by category or menu, with robust customization options for add-ons.",
      "Cart & Order Management: Create, update, and remove items from a cart that provides a clear order summary before checkout.",
      "Secure Payment Integration: Process payments securely using Razorpay, supporting both online payments and cash-on-delivery.",
      "User Profile & Address Management: Manage personal details and delivery addresses, with delivery zone validation to ensure serviceability.",
      "Coupon & Discount Support: Apply discount coupons during checkout to offer dynamic pricing.",
      "Responsive & Modern UI: Built with Tailwind CSS and Mantine components for a polished, mobile-friendly experience.",
      "Admin Panel: Manage products, orders, and coupons from a centralized dashboard. View real-time analytics for revenue and orders, update order statuses, and oversee customization groups.",
    ],
    technologyStack: {
      Frontend: [
        "React",
        "Tailwind CSS",
        "Mantine",
        "TanStack Query",
        "Zustand",
      ],
      Backend: ["Node.js", "Express", "Drizzle ORM", "PostgreSQL"],
      Payments: ["Razorpay"],
      Utilities: [
        "Zod (for schema validation)",
        "asyncHandler (for error handling)",
        "Git (for development and deployment)",
      ],
    },
    challenges: [
      "Implementing dynamic product customization and merging custom options with the base product.",
      "Ensuring smooth checkout flows with Razorpay integration and handling various payment methods.",
      "Managing state efficiently with TanStack Query and Zustand to provide real-time updates and caching.",
      "Validating delivery zones based on pincode to ensure serviceability.",
      "Designing a responsive, modern UI that works seamlessly across devices.",
      "Building an admin panel that can handle product updates, order tracking, and coupon management in real time.",
    ],
    repository: "https://github.com/Shreyas2121/pizza-store",
    futureImprovements: [
      "Enhance admin panel with advanced analytics and order tracking filters.",
      "Improve performance optimizations and state synchronization for large datasets.",
    ],
    videoLink: "https://www.youtube.com/embed/_mc_m6CcBdM",
  },

  {
    title: "Event Ticketing System",
    tagline: "Streamlined event browsing, ticket purchasing, and management",
    description:
      "The Event Ticketing System is a web-based application designed to simplify the process of browsing, purchasing, and managing event tickets. Users can easily view available events, purchase tickets by providing their contact details, and retrieve their previously purchased tickets using their contact information. The system ensures fair access to tickets by enforcing purchase limits per user and generates unique QR codes for each ticket to facilitate secure entry at events.",
    features: [
      "Browse available events and purchase tickets via contact details",
      "Retrieve previously purchased tickets using email/phone",
      "Unique QR codes for secure entry",
      "Purchase limits to prevent overbooking",
      "OTP-based user verification (email/SMS)",
      "Integration with Razorpay for secure payments",
      "Cancel or manage events (admin functionality)",
    ],
    technologyStack: {
      Frontend: ["Next.js", "DaisyUI", "Zustand", "TanStack Query"],
      Backend: ["Node.js", "Express.js"],
      Database: ["PostgreSQL", "Drizzle ORM"],
    },
    challenges: [
      "Ensuring concurrency for ticket availability",
      "Implementing secure OTP-based user verification",
      "Generating and validating unique QR codes",
      "Integrating Razorpay for online payments",
      "Maintaining robust admin controls for events",
    ],

    demoLink: "https://eventfe.vercel.app/",

    repository: "https://github.com/Shreyas2121/event_fiesta",

    futureImprovements: [
      "Add advanced analytics & reporting for event organizers",
      "Support additional payment providers (e.g., PayPal, Stripe)",
      "Enhance UI with more dynamic dashboards",
      "Add real-time notifications (e.g., WebSockets) for ticket updates",
    ],
  },
];
