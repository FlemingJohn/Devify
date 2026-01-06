
import { Project, Experience, TourDate, MerchItem } from './types';
import { Code2, Database, Globe, Layers, Cpu, Smartphone, Cloud, Terminal } from 'lucide-react';

export const DEVELOPER_INFO = {
  name: "Alex Jean",
  role: "Full Stack Engineer",
  monthlyListeners: "892,301",
  verified: true,
  bio: "Full stack engineer specializing in React, Node.js, and AI integration. Building high-performance web applications with a focus on UI/UX and scalable architectures.",
  profileImage: "https://picsum.photos/id/64/800/800",
  artistPick: {
    projectId: "1",
    comment: "My latest work on high-scale commerce. Pushing the boundaries of Next.js performance!"
  }
};

export const TOUR_DATES: TourDate[] = [
  { date: "NOW", event: "Available for Hire", location: "Global / Remote", link: "mailto:alex@example.com" },
  { date: "OCT 12", event: "React Advanced Conf", location: "London, UK", link: "https://react-advanced.com" },
  { date: "DEC 05", event: "Open Source Summit", location: "Tokyo, JP", link: "https://events.linuxfoundation.org" }
];

export const MERCH: MerchItem[] = [
  { id: "m1", name: "Professional Resume", type: "PDF", imageUrl: "https://picsum.photos/id/20/300/300", price: "FREE" },
  { id: "m2", name: "Full Portfolio Deck", type: "SLIDES", imageUrl: "https://picsum.photos/id/30/300/300", price: "FREE" },
  { id: "m3", name: "Developer Stickers", type: "PHYSICAL", imageUrl: "https://picsum.photos/id/40/300/300", price: "$0.00" }
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
    imageUrl: "https://picsum.photos/id/1/600/600",
    stars: 2400,
    demoUrl: "https://example.com/demo1",
    repoUrl: "https://github.com/alexjean/titan",
    color: "#503750"
  },
  {
    id: "2",
    title: "AI Chat Interface",
    description: "Gemini-powered chatbot with real-time streaming and context awareness.",
    longDescription: "This advanced AI assistant leverages the Gemini Pro model to provide intelligent, context-aware responses in real-time. Built with a robust WebSocket layer for streaming text generation, it includes features like persistent conversation history, file attachment parsing, and custom persona configuration. Perfect for developers needing a plug-and-play AI interface.",
    tech: ["React", "Gemini API", "Socket.io", "Node.js"],
    duration: "4:20",
    imageUrl: "https://picsum.photos/id/2/600/600",
    stars: 1800,
    demoUrl: "https://example.com/demo2",
    repoUrl: "https://github.com/alexjean/ai-chat",
    color: "#1e3264"
  },
  {
    id: "3",
    title: "Crypto Dashboard",
    description: "Real-time visualization of market data using D3.js and WebSockets.",
    longDescription: "A comprehensive financial dashboard that visualizes real-time cryptocurrency trends across multiple exchanges. Using high-performance D3.js rendering, the app handles thousands of data points per second with smooth transitions. It includes a custom technical analysis toolkit and personalized alert systems driven by background worker processes.",
    tech: ["D3.js", "TypeScript", "Vite", "Redis"],
    duration: "2:15",
    imageUrl: "https://picsum.photos/id/3/600/600",
    stars: 950,
    demoUrl: "https://example.com/demo3",
    repoUrl: "https://github.com/alexjean/crypto-dash",
    color: "#006450"
  },
  {
    id: "4",
    title: "Social Media Engine",
    description: "Scalable backend architecture for a distributed social platform.",
    longDescription: "The engine behind a distributed social network that handles millions of requests daily. It utilizes a microservices architecture with Redis for caching and pub/sub messaging. The system implements complex graph relationships for user feeds, high-concurrency notification delivery, and distributed asset storage with automated CDN purging.",
    tech: ["Node.js", "Redis", "PostgreSQL", "Docker"],
    duration: "5:10",
    imageUrl: "https://picsum.photos/id/4/600/600",
    stars: 3200,
    demoUrl: "https://example.com/demo4",
    repoUrl: "https://github.com/alexjean/social-engine",
    color: "#af2896"
  }
];
