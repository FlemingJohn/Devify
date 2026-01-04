
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
    <div className="h-24 bg-black border-t border-[#282828] px-4 flex items-center justify-between z-[100]">
      {/* Left: Track Info */}
      <div className="flex items-center gap-4 w-[30%]">
        {currentProject ? (
          <>
            <img src={currentProject.imageUrl} alt={currentProject.title} className="w-14 h-14 rounded shadow-lg" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white hover:underline cursor-pointer">{currentProject.title}</span>
              <span className="text-[11px] text-[#b3b3b3] hover:underline cursor-pointer">{currentProject.tech.join(', ')}</span>
            </div>
            <ExternalLink size={16} className="text-[#b3b3b3] hover:text-white cursor-pointer ml-2" />
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#282828] rounded"></div>
            <div className="flex flex-col gap-1">
                <div className="w-24 h-3 bg-[#282828] rounded"></div>
                <div className="w-16 h-2 bg-[#282828] rounded"></div>
            </div>
          </div>
        )}
      </div>

      {/* Center: Playback Controls */}
      <div className="flex flex-col items-center gap-2 max-w-[40%] w-full">
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

      {/* Right: Tools */}
      <div className="flex items-center justify-end gap-3 w-[30%] text-[#b3b3b3]">
        <Mic2 
          size={16} 
          onClick={toggleLyrics}
          className={`cursor-pointer transition-colors ${currentView === ViewType.LYRICS ? 'text-[#1DB954]' : 'hover:text-white'}`} 
        />
        <LayoutList size={16} className="hover:text-white cursor-pointer" />
        <Laptop size={16} className="hover:text-white cursor-pointer" />
        <div className="flex items-center gap-2 group">
          <Volume2 size={16} className="hover:text-white cursor-pointer" />
          <div className="w-24 h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
             <div className="h-full bg-white group-hover:bg-[#1DB954] w-2/3"></div>
          </div>
        </div>
        <Maximize2 size={16} className="hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default PlayerBar;
