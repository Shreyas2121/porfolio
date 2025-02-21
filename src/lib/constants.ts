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
