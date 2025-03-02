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
];

export const tools = [
  { name: "Git", icon: SiGit, value: 80 },
  { name: "MySQL", icon: SiMysql, value: 80 },
  { name: "Google Cloud", icon: SiGooglecloud, value: 30 },
  { name: "Linux", icon: SiLinux, value: 40 },
  { name: "Docker", icon: SiDocker, value: 40 },
  { name: "PostgreSQL", icon: SiPostgresql, value: 70 },
  { name: "MongoDB", icon: SiMongodb, value: 60 },
];

export const experiences = [
  {
    title: "Associate Software Engineer in Test",
    company: "Infuse Consulting Ltd.",
    location: "Panaji, Goa",
    dates: {
      start: "2022-09-01",
      end: "2023-02-28",
    },
    description: [
      "Developed proficiency in Ruby, Python, Flask, Selenium, CI/CD tools (Jenkins, Git), and cloud deployment (AWS) through hands-on training and project implementation.",
      "Completed rigorous training in software testing principles, including performance testing, test case design, and quality assurance processes (ISO).",
      "Gained hands-on experience in Selenium, Automation, Manual, Performance, and API Testing.",
    ],
    technologies: [
      "Ruby",
      "Python",
      "Flask",
      "Selenium",
      "Jenkins",
      "Git",
      "AWS",
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
      "Developed and maintained healthcare-focused web applications using CodeIgniter, PHP, HTML, CSS, JavaScript, and Bootstrap, prioritizing data privacy and accuracy.",
      "Optimized application performance by designing complex SQL queries and building RESTful APIs, utilizing Postman for testing.",
      "Fixed problems and added new features to PHP projects, delivering them on time and making clients happy.",
      "Automated tasks using cron job scripts and enhanced user experience with PDF/Excel generation, email integration (including OAuth 2), and responsive UI design.",
    ],
    technologies: [
      "CodeIgniter",
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "SQL",
      "RESTful APIs",
      "Postman",
      "cron job scripts",
      "OAuth 2",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Bluestream.io",
    location: "Panaji, Goa",
    dates: {
      start: "2024-05-01",
      end: null, // Or "Present" if you prefer
    },
    description: [
      "Built and maintained scalable web applications using React, Node.js, MongoDB, and PostgreSQL, focusing on e-commerce platforms (with admin panels) and pet care systems (appointment booking and admin management). Utilized global state management with Redux Toolkit/Zustand and React Query for efficient data handling.",
      "Designed visually appealing and responsive dashboards for restaurant analytics using Recharts, React, and Tailwind CSS, delivering user-friendly experiences with interactive charts.",
      "Gained hands-on experience with Docker, Linux, and VPS management, while supporting and maintaining legacy PHP applications alongside modern systems.",
    ],
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Redux Toolkit",
      "Zustand",
      "React Query",
      "Recharts",
      "Tailwind CSS",
      "Docker",
      "Linux",
      "PHP",
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
