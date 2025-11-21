
import { Job, UserProfile } from './types';

export const MOCK_USER: UserProfile = {
  name: "",
  email: "",
  phone: "",
  skills: ["React", "Next.js", "TypeScript", "System Design", "Cloud Architecture"],
  experience: "5 years senior engineering experience."
};

// REALISTIC IT ROLES
const TITLES = [
  "Senior Full Stack Developer", 
  "Lead SDET (Automation)", 
  "Scrum Master", 
  "Principal Frontend Engineer", 
  "Cloud DevOps Architect", 
  "React Native Developer", 
  "Senior Backend Engineer (Go/Rust)", 
  "Product Owner", 
  "Machine Learning Engineer", 
  "Cyber Security Analyst", 
  "QA Automation Lead", 
  "Data Engineer",
  "Site Reliability Engineer (SRE)",
  "iOS Developer (Swift)"
];

// GENERIC BUT PROFESSIONAL TECH COMPANY NAMES
const COMPANIES = [
  "TechFlow Systems", "DataScale Corp", "CloudMatrix", "DevPoint Solutions", 
  "NexGen Analytics", "CyberSphere", "GlobalTech Nodes", "CodeBase Inc.", 
  "Visionary Logic", "SoftCore Dynamics", "Peak Performance", "Quantum Soft"
];

// LOCATIONS RESTRICTED TO REMOTE USA/TR
const LOCATIONS = [
  "Remote (USA)", 
  "Remote (USA)", 
  "Remote (USA)", 
  "Remote (Turkey)", 
  "Remote (Turkey)"
];

// SALARY RANGE $70k - $140k
const SALARIES = [
  "$70,000/yr", 
  "$85,000/yr", 
  "$90,000/yr", 
  "$105,000/yr", 
  "$115,000/yr", 
  "$125,000/yr", 
  "$130,000/yr", 
  "$140,000/yr"
];

// REALISTIC DESCRIPTIONS
const DESCRIPTIONS = [
  "We are looking for an expert to lead the migration from monolith to microservices using AWS and Kubernetes.",
  "Design and implement scalable UI components with React, Next.js and Tailwind CSS. Performance is key.",
  "Manage sprint cycles, facilitate daily stand-ups, and unblock development teams in a fast-paced agile environment.",
  "Build robust automated testing frameworks using Selenium and Cypress. Zero-bug tolerance policy.",
  "Develop high-performance RESTful APIs and handle database optimizations for millions of daily requests.",
  "Take ownership of the product roadmap, prioritizing features that drive maximum user retention and revenue.",
  "Implement CI/CD pipelines and manage cloud infrastructure. Terraform and Docker experience required.",
  "Secure our fintech platform against advanced threats and conduct regular penetration testing."
];

const COLORS = ['#00ff9d', '#8b5cf6', '#ff0055', '#3b82f6', '#facc15', '#f97316'];

// Generate 40 Jobs with Realistic Data
export const ALL_JOBS: Job[] = Array.from({ length: 40 }).map((_, i) => {
  const title = TITLES[Math.floor(Math.random() * TITLES.length)];
  const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
  
  // Generate a consistent abstract logo based on company name
  const logoSeed = company.replace(/\s/g, '') + i;

  return {
    id: `job-${i}`,
    title: title,
    company: company,
    salary: SALARIES[Math.floor(Math.random() * SALARIES.length)],
    type: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
    // Using a different unsplash source or specific category for more "tech/corporate" feel abstract images
    logo: `https://picsum.photos/seed/${logoSeed}/100/100`, 
    description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
    requirements: ['React', 'AWS', 'Agile', 'Python', 'Docker', 'K8s', 'TypeScript'].sort(() => 0.5 - Math.random()).slice(0, 4),
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  };
});

export const TERMINAL_LOGS = [
  "Initializing connection to secure servers...",
  "Bypassing firewall...",
  "Access granted.",
  "Encrypting user identity...",
  "Parsing semantic structure...",
  "Identifying skill vectors...",
  "Comparing against 50,000+ job descriptions...",
  "Optimizing keyword density...",
  "Bypassing ATS filters...",
  "Refining narrative arc...",
  "Injecting psychological triggers...",
  "Optimization Complete: 98% Match Potential."
];

export const HOW_IT_WORKS_STEPS = [
  {
    title: "We Don't Apply. We Hunt.",
    desc: "Traditional applying is for sheep. Our algorithms aggressively target hiring manager inboxes, bypassing the HR trash can."
  },
  {
    title: "Semantic Optimization",
    desc: "We rewrite your profile for every single swipe. The AI tailors your pitch to trigger psychological compliance in the reader."
  },
  {
    title: "The Protocol",
    desc: "Swipe Right to save. Swipe Up to generate a 'Hook'. We guarantee an interview in 30 days or the service is free."
  },
  {
    title: "Payment on Success",
    desc: "No upfront fees. We only eat when you eat. 25% of your first salary is the price of admission to the elite tier."
  }
];
