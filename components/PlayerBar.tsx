
import React from 'react';
import { Play, SkipBack, SkipForward, Repeat, Shuffle, Mic2, LayoutList, Laptop, Volume2, Maximize2, ExternalLink } from 'lucide-react';
import { Project, ViewType } from '../types';

interface PlayerBarProps {
  currentProject: Project | null;
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ currentProject, currentView, setView }) => {
  const toggleLyrics = () => {
    if (currentView === ViewType.LYRICS) {
      setView(ViewType.ARTIST);
    } else {
      setView(ViewType.LYRICS);
    }
  };

  return (
    <div className="fixed bottom-16 md:static md:bottom-auto left-2 right-2 md:left-0 md:right-0 h-14 md:h-24 bg-[#121212] md:bg-black border md:border-t border-white/10 md:border-[#282828] rounded-lg md:rounded-none px-2 md:px-4 flex items-center justify-between z-[110] md:z-[100] shadow-2xl md:shadow-none">
      {/* Left: Track Info */}
      <div className="flex items-center gap-3 md:gap-4 w-[60%] md:w-[30%]">
        {currentProject ? (
          <>
            <img src={currentProject.imageUrl} alt={currentProject.title} className="w-10 h-10 md:w-14 md:h-14 rounded shadow-lg object-cover" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs md:text-sm font-semibold text-white hover:underline cursor-pointer truncate">{currentProject.title}</span>
              <span className="text-[10px] md:text-[11px] text-[#b3b3b3] hover:underline cursor-pointer truncate">{currentProject.tech.join(', ')}</span>
            </div>
            {/* Feature 4: Reactive Visualizer */}
            <div className="flex items-end gap-[2px] h-4 mb-1 shrink-0">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] bg-[#1DB954] animate-visualizer"
                  style={{ animationDelay: `${i * 0.15}s`, animationDuration: `${0.6 + Math.random() * 0.4}s` }}
                />
              ))}
            </div>
            <ExternalLink size={14} className="hidden md:block text-[#b3b3b3] hover:text-white cursor-pointer ml-2" />

          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-[#282828] rounded"></div>
            <div className="flex flex-col gap-1">
              <div className="w-16 md:w-24 h-2 md:h-3 bg-[#282828] rounded"></div>
              <div className="w-12 md:w-16 h-1.5 md:h-2 bg-[#282828] rounded"></div>
            </div>
          </div>
        )}
      </div>

      {/* Center: Playback Controls (Hidden on small mobile, simplified on tablets) */}
      <div className="hidden md:flex flex-col items-center gap-2 max-w-[40%] w-full">
        <div className="flex items-center gap-6 text-[#b3b3b3]">
          <Shuffle size={16} className="hover:text-white cursor-pointer" />
          <SkipBack size={20} className="hover:text-white fill-current cursor-pointer" />
          <div className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform cursor-pointer">
            <Play size={20} fill="currentColor" />
          </div>
          <SkipForward size={20} className="hover:text-white fill-current cursor-pointer" />
          <Repeat size={16} className="hover:text-white cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 w-full px-4">
          <span className="text-[11px] text-[#b3b3b3]">0:00</span>
          <div className="h-1 bg-[#4d4d4d] rounded-full flex-1 relative group overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 bg-white group-hover:bg-[#1DB954] w-[30%] transition-all"></div>
          </div>
          <span className="text-[11px] text-[#b3b3b3]">{currentProject?.duration || "0:00"}</span>
        </div>
      </div>

      {/* Mobile Right: Just Play/Pause */}
      <div className="md:hidden flex items-center pr-2">
        <div className="text-white p-2 rounded-full active:scale-95 transition-transform cursor-pointer">
          <Play size={24} fill="currentColor" />
        </div>
      </div>

      {/* Right: Tools (Hidden on mobile) */}
      <div className="hidden md:flex items-center justify-end gap-3 w-[30%] text-[#b3b3b3]">
        <Mic2
          size={16}
          onClick={toggleLyrics}
          className={`cursor-pointer transition-colors ${currentView === ViewType.LYRICS ? 'text-[#1DB954]' : 'hover:text-white'}`}
        />
        <LayoutList size={16} className="hover:text-white cursor-pointer" />
        <Laptop size={16} className="hover:text-white cursor-pointer" />
        <div className="flex items-center gap-2 group">
          <Volume2 size={16} className="hover:text-white cursor-pointer" />
          <div className="w-20 lg:w-24 h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
            <div className="h-full bg-white group-hover:bg-[#1DB954] w-2/3"></div>
          </div>
        </div>
        <Maximize2 size={16} className="hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default PlayerBar;
