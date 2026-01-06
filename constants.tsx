
import { Project, Experience, TourDate, MerchItem } from './types';
import { Code2, Database, Globe, Layers, Cpu, Smartphone, Cloud, Terminal } from 'lucide-react';

export const DEVELOPER_INFO = {
  name: "Alex Jean",
  role: "Full Stack Engineer",
  monthlyListeners: "892,301",
  verified: true,
  bio: "Full stack engineer specializing in React, Node.js, and AI integration. Building high-performance web applications with a focus on UI/UX and scalable architectures. I believe code is poetry and performance is the rhythm that keeps users engaged.",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  artistPick: {
    projectId: "1",
    comment: "My latest work on high-scale commerce. Pushing the boundaries of Next.js performance!"
  }
};

export const TOUR_DATES: TourDate[] = [
  { date: "NOW", event: "Available for Hire", location: "Global / Remote", link: "mailto:alex@example.com" },
  { date: "OCT 12", event: "React Advanced Conf", location: "London, UK", link: "#" },
  { date: "DEC 05", event: "Open Source Summit", location: "Tokyo, JP", link: "#" }
];

export const MERCH: MerchItem[] = [
  { id: "m1", name: "Professional Resume", type: "PDF", imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=300&auto=format&fit=crop", price: "FREE" },
  { id: "m2", name: "Full Portfolio Deck", type: "SLIDES", imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=300&auto=format&fit=crop", price: "FREE" },
  { id: "m3", name: "Business Card Concept", type: "PNG", imageUrl: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=300&auto=format&fit=crop", price: "$0.00" }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "e1",
    company: "TechGiant Corp",
    role: "Senior Frontend Engineer",
    period: "2021 - Present",
    description: "Leading the core UI team for the main consumer application.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
    color: "#1e3264",
    achievements: [
      { title: "Reduced bundle size by 45% using code-splitting", impact: "High" },
      { title: "Implemented a design system used by 50+ engineers", impact: "Massive" },
      { title: "Mentored 10+ junior developers into mid-level roles", impact: "Core" }
    ]
  },
  {
    id: "e2",
    company: "StartupFlow",
    role: "Full Stack Developer",
    period: "2019 - 2021",
    description: "Early employee responsible for the initial product launch.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda5366391?q=80&w=400&auto=format&fit=crop",
    color: "#eb1e32",
    achievements: [
      { title: "Built the MVP from scratch in 3 months", impact: "High" },
      { title: "Integrated Stripe for all platform payments", impact: "Critical" },
      { title: "Scaled DB to handle 100k concurrent users", impact: "Scalable" }
    ]
  },
  {
    id: "e3",
    company: "Creative Logic",
    role: "Web Developer Intern",
    period: "2018 - 2019",
    description: "Learning the ropes and shipping small features.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop",
    color: "#af2896",
    achievements: [
      { title: "Migrated legacy jQuery code to modern React", impact: "Modern" },
      { title: "Fixed over 200+ bug tickets in 6 months", impact: "Stable" }
    ]
  }
];

export const TECHNICAL_SKILLS = [
  { name: "Frontend", icon: Globe, color: "#e8115b" },
  { name: "React", icon: Code2, color: "#1e3264" },
  { name: "Backend", icon: Terminal, color: "#8d67ab" },
  { name: "Cloud", icon: Cloud, color: "#006450" },
  { name: "Database", icon: Database, color: "#e1118c" },
  { name: "Architecture", icon: Layers, color: "#503750" },
  { name: "Mobile", icon: Smartphone, color: "#af2896" },
  { name: "AI & ML", icon: Cpu, color: "#1DB954" },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "E-Commerce Titan",
    description: "A high-performance storefront built with Next.js and Stripe integration.",
    longDescription: "Titan is a next-generation e-commerce platform designed for massive scale. It features a custom-built headless CMS, lightning-fast edge rendering via Next.js, and a fully integrated global payment flow using Stripe's latest APIs. The architecture focuses on accessibility, performance (99+ Lighthouse scores), and seamless mobile experiences.",
    tech: ["Next.js", "Tailwind", "Stripe", "PostgreSQL"],
    duration: "3:45",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600&auto=format&fit=crop",
    stars: 2400,
    demoUrl: "#",
    repoUrl: "#",
    color: "#503750"
  },
  {
    id: "2",
    title: "AI Chat Interface",
    description: "Gemini-powered chatbot with real-time streaming and context awareness.",
    longDescription: "This advanced AI assistant leverages the Gemini Pro model to provide intelligent, context-aware responses in real-time. Built with a robust WebSocket layer for streaming text generation, it includes features like persistent conversation history, file attachment parsing, and custom persona configuration. Perfect for developers needing a plug-and-play AI interface.",
    tech: ["React", "Gemini API", "Socket.io", "Node.js"],
    duration: "4:20",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop",
    stars: 1800,
    demoUrl: "#",
    repoUrl: "#",
    color: "#1e3264"
  },
  {
    id: "3",
    title: "Crypto Dashboard",
    description: "Real-time visualization of market data using D3.js and WebSockets.",
    longDescription: "A comprehensive financial dashboard that visualizes real-time cryptocurrency trends across multiple exchanges. Using high-performance D3.js rendering, the app handles thousands of data points per second with smooth transitions. It includes a custom technical analysis toolkit and personalized alert systems driven by background worker processes.",
    tech: ["D3.js", "TypeScript", "Vite", "Redis"],
    duration: "2:15",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop",
    stars: 950,
    demoUrl: "#",
    repoUrl: "#",
    color: "#006450"
  },
  {
    id: "4",
    title: "Social Media Engine",
    description: "Scalable backend architecture for a distributed social platform.",
    longDescription: "The engine behind a distributed social network that handles millions of requests daily. It utilizes a microservices architecture with Redis for caching and pub/sub messaging. The system implements complex graph relationships for user feeds, high-concurrency notification delivery, and distributed asset storage with automated CDN purging.",
    tech: ["Node.js", "Redis", "PostgreSQL", "Docker"],
    duration: "5:10",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop",
    stars: 3200,
    demoUrl: "#",
    repoUrl: "#",
    color: "#af2896"
  }
];
