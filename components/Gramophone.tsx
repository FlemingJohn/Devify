
import React, { useState } from 'react';

const Gramophone: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div
            className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group h-48 md:h-64 flex items-center justify-center bg-black/20"
            onMouseEnter={() => setIsPlaying(true)}
            onMouseLeave={() => setIsPlaying(false)}
        >
            {/* Decorative Title */}
            <div className="absolute top-4 left-4 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#b3b3b3]">Vintage Player v1.0</span>
            </div>

            <div className="relative w-48 h-48 md:w-64 md:h-64 scale-75 md:scale-100">
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    {/* Wooden Base */}
                    <rect x="80" y="280" width="240" height="40" rx="10" fill="#3D2B1F" />
                    <rect x="90" y="260" width="220" height="20" fill="#5D3F2E" />

                    {/* Platter (The spinning part) */}
                    <g
                        className={isPlaying ? "animate-spin-organic" : "transition-transform duration-[2000ms] ease-out-back"}
                        style={{
                            transformOrigin: '200px 240px',
                            animationPlayState: isPlaying ? 'running' : 'paused'
                        }}
                    >
                        <circle cx="200" cy="240" r="100" fill="#121212" stroke="#282828" strokeWidth="2" />
                        <circle cx="200" cy="240" r="95" fill="none" stroke="#ffffff08" strokeWidth="1" />
                        <circle cx="200" cy="240" r="85" fill="none" stroke="#ffffff08" strokeWidth="1" />
                        <circle cx="200" cy="240" r="75" fill="none" stroke="#ffffff08" strokeWidth="1" />
                        <circle cx="200" cy="240" r="65" fill="none" stroke="#ffffff08" strokeWidth="1" />
                        {/* Record Label */}
                        <circle cx="200" cy="240" r="30" fill="#1DB954" />
                        <circle cx="200" cy="240" r="5" fill="#000" />
                    </g>

                    {/* Gramophone Horn (Brass) */}
                    <g className={isPlaying ? "animate-horn-vibrate" : "animate-horn-breathe"}>
                        <path d="M300 280 L350 150 Q360 100 300 80 Q200 60 150 120 Q100 180 150 220" fill="none" stroke="#C5A059" strokeWidth="12" strokeLinecap="round" />
                        <path d="M315 260 L355 155 Q365 110 310 90 Q220 70 170 125 Q130 175 165 205" fill="#D4AF37" />
                        <ellipse cx="140" cy="140" rx="60" ry="80" fill="#B8860B" transform="rotate(-30 140 140)" />
                        <ellipse cx="135" cy="135" rx="50" ry="70" fill="#D4AF37" transform="rotate(-30 135 135)" />
                    </g>

                    {/* Needle Arm */}
                    <g
                        className="transition-transform ease-[cubic-bezier(0.175,0.885,0.32,1.275)] duration-700"
                        style={{
                            transform: isPlaying ? 'rotate(24deg)' : 'rotate(0deg)',
                            transformOrigin: '320px 240px'
                        }}
                    >
                        <rect x="240" y="235" width="80" height="8" rx="4" fill="#666" />
                        <rect x="235" y="233" width="12" height="12" rx="2" fill="#B3B3B3" />
                        <path d="M235 240 L220 255" stroke="#B3B3B3" strokeWidth="3" />
                        <circle cx="320" cy="240" r="12" fill="#333" stroke="#555" strokeWidth="1" />
                    </g>
                </svg>

                {/* Musical Note Particles - Targeted from Horn */}
                {isPlaying && (
                    <div className="absolute top-[15%] left-[10%] w-32 h-32 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-[#1DB954] text-xl animate-float-note-targeted opacity-0"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    animationDelay: `${i * 0.7}s`
                                }}
                            >
                                {['♪', '♫', '♬', '♩'][i % 4]}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
        @keyframes float-note-targeted {
          0% { transform: translate(0, 0) scale(0.5) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-80px, -120px) scale(1.5) rotate(45deg); opacity: 0; }
        }
        .animate-float-note-targeted {
          animation: float-note-targeted 4s ease-out infinite;
        }
        @keyframes horn-vibrate {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(1px, -1px) scale(1.005); }
          50% { transform: translate(-1px, 1px) scale(0.998); }
          75% { transform: translate(1px, 1px) scale(1.002); }
        }
        .animate-horn-vibrate {
          transform-origin: 300px 280px;
          animation: horn-vibrate 0.15s linear infinite;
        }
        @keyframes horn-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-horn-breathe {
          transform-origin: 300px 280px;
          animation: horn-breathe 4s ease-in-out infinite;
        }
        @keyframes spin-organic {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-organic {
          animation: spin-organic 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .ease-out-back {
          transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>

        </div>
    );
};

export default Gramophone;
