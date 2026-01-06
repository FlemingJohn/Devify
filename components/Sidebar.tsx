
import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, Bookmark, Sparkles } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const NavItem = ({ icon: Icon, label, view }: { icon: any, label: string, view: ViewType }) => (
    <button
      onClick={() => setView(view)}
      className={`flex items-center gap-4 px-6 py-2 transition-colors duration-200 w-full text-left
        ${currentView === view ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
    >
      <Icon size={24} />
      <span className="font-bold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="w-64 bg-black h-full flex flex-col pt-6 shrink-0">
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 text-white">
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-[#1DB954]">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.216.354-.675.465-1.028.249-2.858-1.746-6.457-2.141-10.697-1.173-.405.092-.812-.162-.905-.568-.092-.405.162-.812.568-.905 4.63-1.059 8.604-.601 11.813 1.358.353.216.464.675.249 1.028v.011zm1.472-3.257c-.272.443-.853.585-1.296.313-3.272-2.012-8.259-2.593-12.127-1.417-.5.152-1.029-.133-1.181-.633-.152-.5.133-1.029.633-1.181 4.417-1.339 9.904-.684 13.662 1.63.443.272.585.853.313 1.296l-.004-.008zm.126-3.4c-3.924-2.331-10.39-2.546-14.161-1.402-.602.183-1.241-.167-1.424-.769-.183-.602.167-1.241.769-1.424 4.331-1.314 11.464-1.054 15.996 1.634.542.321.721 1.024.4 1.566-.321.542-1.024.721-1.566.4l-.014-.005z"/>
            </svg>
            <span className="text-2xl font-black tracking-tighter">Devify</span>
        </div>
      </div>

      <nav className="mb-8">
        <NavItem icon={Home} label="Home" view={ViewType.HOME} />
        <NavItem icon={Search} label="Search" view={ViewType.SEARCH} />
        <NavItem icon={Library} label="Your Library" view={ViewType.LIBRARY} />
        <button
          onClick={() => setView(ViewType.WRAPPED)}
          className={`flex items-center gap-4 px-6 py-2 mt-4 transition-all duration-300 w-full text-left group
            ${currentView === ViewType.WRAPPED ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
        >
          <div className="bg-gradient-to-tr from-[#ff00d4] to-[#00f2ff] p-1 rounded shadow-lg group-hover:scale-110 transition-transform">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-sm">2024 Wrapped</span>
        </button>
      </nav>

      <div className="px-6 mb-4">
        <button className="flex items-center gap-4 text-[#b3b3b3] hover:text-white transition-colors duration-200 py-2 w-full">
          <div className="bg-[#b3b3b3] p-1 rounded-sm text-black">
            <PlusSquare size={16} />
          </div>
          <span className="font-bold text-sm">Create Playlist</span>
        </button>
        <button className="flex items-center gap-4 text-[#b3b3b3] hover:text-white transition-colors duration-200 py-2 w-full">
          <div className="bg-gradient-to-br from-[#450af5] to-[#c4efd9] p-1 rounded-sm text-white">
            <Heart size={16} fill="currentColor" />
          </div>
          <span className="font-bold text-sm">Liked Songs</span>
        </button>
      </div>

      <div className="border-t border-[#282828] mx-6 py-4 overflow-y-auto flex-1">
        <p className="text-[11px] text-[#b3b3b3] uppercase tracking-widest font-bold mb-4">PLAYLISTS</p>
        <ul className="space-y-3 text-sm text-[#b3b3b3] font-medium">
          <li className="hover:text-white cursor-pointer">React Masterpieces</li>
          <li className="hover:text-white cursor-pointer">Backend Grooves</li>
          <li className="hover:text-white cursor-pointer">Open Source Hits</li>
          <li className="hover:text-white cursor-pointer">Design Systems Vol.1</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
