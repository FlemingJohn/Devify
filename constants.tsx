
import { Project, Experience } from './types';
import { Code2, Database, Globe, Layers, Cpu, Smartphone, Cloud, Terminal } from 'lucide-react';

export const DEVELOPER_INFO = {
  name: "Alex Jean",
  role: "Full Stack Engineer",
  monthlyListeners: "892,301",
  verified: true,
  bio: "Full stack engineer specializing in React, Node.js, and AI integration. Building high-performance web applications with a focus on UI/UX and scalable architectures.",
  profileImage: "https://picsum.photos/id/64/800/800",
};

export const TECHNICAL_SKILLS = [
  { name: "Frontend", icon: Globe, color: "#8d67ab" }, // Purple
  { name: "React", icon: Code2, color: "#e8115b" }, // Pink/Red
  { name: "Backend", icon: Terminal, color: "#1e3264" }, // Deep Blue
  { name: "Cloud", icon: Cloud, color: "#006450" }, // Dark Green
  { name: "Database", icon: Database, color: "#e1118c" }, // Magenta
  { name: "Architecture", icon: Layers, color: "#503750" }, // Plum
  { name: "Mobile", icon: Smartphone, color: "#af2896" }, // Violet
  { name: "AI & ML", icon: Cpu, color: "#1DB954" }, // Spotify Green
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "E-Commerce Titan",
    description: "A high-performance storefront built with Next.js and Stripe integration.",
    tech: ["Next.js", "Tailwind", "Stripe"],
    duration: "3:45",
    imageUrl: "https://picsum.photos/id/1/300/300",
    stars: 2400
  },
  {
    id: "2",
    title: "AI Chat Interface",
    description: "Gemini-powered chatbot with real-time streaming and context awareness.",
    tech: ["React", "Gemini API", "Socket.io"],
    duration: "4:20",
    imageUrl: "https://picsum.photos/id/2/300/300",
    stars: 1800
  },
  {
    id: "3",
    title: "Crypto Dashboard",
    description: "Real-time visualization of market data using D3.js and WebSockets.",
    tech: ["D3.js", "TypeScript", "Vite"],
    duration: "2:15",
    imageUrl: "https://picsum.photos/id/3/300/300",
    stars: 950
  },
  {
    id: "4",
    title: "Social Media Engine",
    description: "Scalable backend architecture for a distributed social platform.",
    tech: ["Node.js", "Redis", "PostgreSQL"],
    duration: "5:10",
    imageUrl: "https://picsum.photos/id/4/300/300",
    stars: 3200
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    company: "Tech Giant Inc.",
    role: "Senior Software Engineer",
    period: "2021 - Present",
    description: "Leading frontend architecture and mentoring junior developers.",
    imageUrl: "https://picsum.photos/id/5/100/100"
  },
  {
    id: "exp2",
    company: "Creative Studio",
    role: "Frontend Developer",
    period: "2019 - 2021",
    description: "Built interactive web experiences for global brands.",
    imageUrl: "https://picsum.photos/id/6/100/100"
  },
  {
    id: "exp3",
    company: "Startup Hub",
    role: "Full Stack Intern",
    period: "2018 - 2019",
    description: "Full stack development using MERN stack.",
    imageUrl: "https://picsum.photos/id/7/100/100"
  }
];
