
import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const LOG_MESSAGES = [
    "System initialized. Checking frequencies...",
    "Loading fullstack rhythms into buffer...",
    "Synthesizing high-performance API endpoints...",
    "Deploying Docker containers to the rhythm...",
    "Database synchronized. Latency: 12ms.",
    "New commit detected on main stage...",
    "Compiling CSS harmonies...",
    "Vite HMR ready. All systems hot.",
    "Alex Jean entering the booth...",
    "Scanning projects for platinum potential...",
    "Scaling infrastructure to 10k monthly visitors...",
    "Optimizing React hooks for maximum groove..."
];

const LiveSetConsole: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([LOG_MESSAGES[0]]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const next = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
                return [...prev, next].slice(-8);
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-card rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            <div className="bg-[#181818] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <Terminal size={14} className="text-[#1DB954]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#b3b3b3]">Live Set Console</span>
                <div className="flex gap-1.5 ml-auto">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-[#1DB954]" />
                </div>
            </div>
            <div
                ref={scrollRef}
                className="p-4 h-48 overflow-y-auto font-mono text-[11px] leading-relaxed bg-black/40 backdrop-blur-md"
            >
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-2 mb-1 animate-fade-in">
                        <span className="text-[#1DB954] shrink-0">[$]</span>
                        <span className="text-[#b3b3b3]">{log}</span>
                    </div>
                ))}
                <div className="flex gap-2 items-center">
                    <span className="text-[#1DB954] shrink-0">[$]</span>
                    <div className="w-2 h-4 bg-[#1DB954] animate-pulse" />
                </div>
            </div>
        </div>
    );
};

export default LiveSetConsole;
