
import React from 'react';
import { GLOBAL_ACHIEVEMENTS } from '../constants';

const AchievementWall: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 py-8">
            {GLOBAL_ACHIEVEMENTS.map((ach) => (
                <div
                    key={ach.id}
                    className="group relative perspective-1000"
                >
                    <div className="relative bg-[#181818] p-6 rounded-xl border border-white/5 transition-all duration-500 transform-gpu group-hover:rotate-y-12 group-hover:rotate-x-12 group-hover:scale-105 group-hover:shadow-[20px_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                        {/* Gloss Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        {/* Record Disc Mockup */}
                        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-tr from-gray-400 to-gray-100 shadow-2xl relative flex items-center justify-center p-1 overflow-hidden group-hover:rotate-[360deg] transition-transform duration-[4s] linear infinite">
                            <div className="absolute inset-0 bg-[repeating-conic-gradient(from_0deg,#0000_0deg_10deg,#ffffff11_10deg_20deg)] opacity-30" />
                            <div className="w-12 h-12 rounded-full bg-[#121212] z-10 flex items-center justify-center border-4 border-gray-300">
                                <ach.icon size={20} className="text-gray-300" />
                            </div>
                        </div>

                        <div className="text-center relative z-10">
                            <h3 className="font-black text-lg md:text-xl mb-1 text-white tracking-tight">{ach.title}</h3>
                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-[#b3b3b3] mb-4">{ach.issuer} • {ach.date}</p>
                            <div className="h-px w-12 bg-[#1DB954] mx-auto mb-4" />
                            <p className="text-xs text-[#b3b3b3] leading-relaxed line-clamp-2">{ach.description}</p>
                        </div>

                        {/* Platinum Glow */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-[#1DB954]/10 transition-colors" />
                    </div>
                </div>
            ))}
            <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-12 { transform: rotateY(12deg); }
        .rotate-x-12 { transform: rotateX(-12deg); }
      `}</style>
        </div>
    );
};

export default AchievementWall;
