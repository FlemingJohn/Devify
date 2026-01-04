
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, MoreHorizontal, Play, UserCircle, Search, X, ChevronDown, Flag, Share2, SkipBack, SkipForward, Repeat, Shuffle, ArrowUp, ExternalLink, Github, Info } from 'lucide-react';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import ProjectRow from './components/ProjectRow';
import { askGeminiAboutDeveloper } from './services/geminiService';
import { DEVELOPER_INFO, PROJECTS, EXPERIENCES, TECHNICAL_SKILLS } from './constants';
import { Project, ViewType } from './types';

// Moved outside to prevent recreation on every render
const ProjectDetailsModal: React.FC<{ project: Project; onClose: () => void; onPlay: (p: Project) => void }> = ({ project, onClose, onPlay }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#181818] w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5 animate-lyrics-appear">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="w-full md:w-2/5 aspect-square md:aspect-auto bg-[#282828]">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col">
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1DB954] mb-2 block">Featured Project</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 leading-none">{project.title}</h2>
            <p className="text-[#b3b3b3] font-medium">{project.tech.join(' • ')}</p>
          </div>
          
          <div className="flex-1 mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">About the Project</h3>
            <p className="text-lg text-white leading-relaxed font-light">
              {project.longDescription || project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-auto">
            <button 
              onClick={() => {
                onPlay(project);
                onClose();
              }}
              className="bg-[#1DB954] hover:scale-105 active:scale-95 text-black font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2"
            >
              <Play size={20} fill="currentColor" />
              Play Project
            </button>
            
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border border-[#b3b3b3] hover:border-white text-white font-bold py-3 px-6 rounded-full transition-all flex items-center gap-2"
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            )}
            
            {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border border-[#b3b3b3] hover:border-white text-white font-bold py-3 px-6 rounded-full transition-all flex items-center gap-2"
              >
                <Github size={20} />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LyricsView: React.FC<{ project: Project | null; setView: (v: ViewType) => void }> = ({ project, setView }) => {
  if (!project) return null;
  const lines = project.description.split('. ').filter(l => l.length > 0);

  return (
    <div className="absolute inset-0 z-[110] overflow-y-auto animate-lyrics-appear bg-[#8c6d3e] p-6 md:p-10 flex flex-col">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#8c6d3e]/80 backdrop-blur-md py-2 z-10">
        <button onClick={() => setView(ViewType.ARTIST)} className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <ChevronDown size={28} />
        </button>
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Playing Project</span>
          <span className="text-sm font-bold">{project.title}</span>
          <span className="text-xs opacity-80">{DEVELOPER_INFO.name}</span>
        </div>
        <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <Flag size={20} />
        </button>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full pt-10">
        <div className="space-y-6 md:space-y-10">
          {lines.map((line, idx) => (
            <p 
              key={idx} 
              className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black leading-tight hover:opacity-70 transition-all cursor-default select-none"
            >
              {line}{line.endsWith('.') ? '' : '.'}
            </p>
          ))}
        </div>
        
        <div className="mt-20 opacity-40 text-xs font-bold uppercase tracking-wider">
          Licensed and provided by Devify Tech
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-[#8c6d3e] to-transparent pt-10 pb-6 w-full max-w-2xl mx-auto">
        <div className="w-full h-1 bg-black/20 rounded-full mb-4 relative overflow-hidden group cursor-pointer">
          <div className="absolute left-0 top-0 bottom-0 bg-white w-1/3"></div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold">1:24</span>
          <span className="text-[10px] font-bold">{project.duration}</span>
        </div>
        <div className="flex items-center justify-around w-full max-w-sm mx-auto">
           <Shuffle size={20} className="opacity-70" />
           <SkipBack size={28} fill="currentColor" />
           <div className="bg-white text-[#8c6d3e] p-5 rounded-full shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-transform">
             <Play size={32} fill="currentColor" />
           </div>
           <SkipForward size={28} fill="currentColor" />
           <Share2 size={20} className="opacity-70 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const BioView: React.FC<{ setView: (v: ViewType) => void }> = ({ setView }) => {
  const bioLines = DEVELOPER_INFO.bio.split('. ').filter(l => l.length > 0);

  return (
    <div className="absolute inset-0 z-[110] overflow-y-auto animate-lyrics-appear bg-[#1e3264] p-6 md:p-10 flex flex-col">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#1e3264]/80 backdrop-blur-md py-2 z-10">
        <button onClick={() => setView(ViewType.ARTIST)} className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <ChevronDown size={28} />
        </button>
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Playing Story</span>
          <span className="text-sm font-bold">About Me</span>
          <span className="text-xs opacity-80">{DEVELOPER_INFO.name}</span>
        </div>
        <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <Info size={20} />
        </button>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full pt-10">
        <div className="space-y-6 md:space-y-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter">The Liner Notes.</h2>
          {bioLines.map((line, idx) => (
            <p 
              key={idx} 
              className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white/90 leading-tight hover:text-white transition-all cursor-default select-none"
            >
              {line}{line.endsWith('.') ? '' : '.'}
            </p>
          ))}
        </div>
        
        <div className="mt-20 opacity-40 text-xs font-bold uppercase tracking-wider text-white">
          Verified Developer Biography • {DEVELOPER_INFO.name}
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-[#1e3264] to-transparent pt-10 pb-6 w-full max-w-2xl mx-auto">
        <div className="w-full h-1 bg-white/20 rounded-full mb-4 relative overflow-hidden group cursor-pointer">
          <div className="absolute left-0 top-0 bottom-0 bg-white w-2/3"></div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold text-white">2:45</span>
          <span className="text-[10px] font-bold text-white">4:00</span>
        </div>
        <div className="flex items-center justify-around w-full max-w-sm mx-auto text-white">
           <Shuffle size={20} className="opacity-70" />
           <SkipBack size={28} fill="currentColor" />
           <div className="bg-white text-[#1e3264] p-5 rounded-full shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-transform">
             <Play size={32} fill="currentColor" />
           </div>
           <SkipForward size={28} fill="currentColor" />
           <Share2 size={20} className="opacity-70 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewType>(ViewType.ARTIST);
  const [activeProject, setActiveProject] = useState<Project | null>(PROJECTS[0]);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<Project | null>(null);
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 2200);
    const hideTimer = setTimeout(() => setIsLoading(false), 3000);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollY = scrollContainerRef.current.scrollTop;
      const opacity = Math.min(scrollY / 300, 1);
      setHeaderOpacity(opacity);
      setShowScrollTop(scrollY > 400);
    }
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsAiLoading(true);
    setAiResponse(null);
    const result = await askGeminiAboutDeveloper(searchQuery);
    setAiResponse(result);
    setIsAiLoading(false);
  };

  const playProject = (project: Project) => {
    setActiveProject(project);
    // Switch to lyrics view for immersion
    setView(ViewType.LYRICS);
  };

  const showAboutMe = () => {
    setView(ViewType.BIO);
  };

  if (isLoading) {
    return (
      <div 
        className={`fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center transition-all duration-700 spotify-ease
        ${isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}
      >
        <div className="absolute w-[400px] h-[400px] bg-[#1DB954]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="flex flex-col items-center gap-8 relative z-10 animate-spotify-intro">
            <svg viewBox="0 0 24 24" className="w-28 h-28 fill-current text-[#1DB954]">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.216.354-.675.465-1.028.249-2.858-1.746-6.457-2.141-10.697-1.173-.405.092-.812-.162-.905-.568-.092-.405.162-.812.568-.905 4.63-1.059 8.604-.601 11.813 1.358.353.216.464.675.249 1.028v.011zm1.472-3.257c-.272.443-.853.585-1.296.313-3.272-2.012-8.259-2.593-12.127-1.417-.5.152-1.029-.133-1.181-.633-.152-.5.133-1.029.633-1.181 4.417-1.339 9.904-.684 13.662 1.63.443.272.585.853.313 1.296l-.004-.008zm.126-3.4c-3.924-2.331-10.39-2.546-14.161-1.402-.602.183-1.241-.167-1.424-.769-.183-.602.167-1.241.769-1.424 4.331-1.314 11.464-1.054 15.996 1.634.542.321.721 1.024.4 1.566-.321.542-1.024.721-1.566.4l-.014-.005z"/>
            </svg>
            <div className="flex flex-col items-center">
                <span className="text-4xl font-black tracking-tighter text-white">Devify</span>
                <div className="mt-10 flex gap-2">
                    <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} setView={setView} />
        
        <main className="flex-1 relative overflow-hidden flex flex-col">
          {currentView === ViewType.LYRICS && <LyricsView project={activeProject} setView={setView} />}
          {currentView === ViewType.BIO && <BioView setView={setView} />}
          {selectedProjectDetails && <ProjectDetailsModal project={selectedProjectDetails} onClose={() => setSelectedProjectDetails(null)} onPlay={playProject} />}

          <header 
            className="absolute top-0 right-0 left-0 h-16 z-50 flex items-center justify-between px-8 transition-colors duration-300"
            style={{ backgroundColor: `rgba(18, 18, 18, ${headerOpacity})` }}
          >
            <div className="flex items-center gap-4">
              <button className="bg-black/70 p-1 rounded-full text-white/50 hover:text-white transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button className="bg-black/70 p-1 rounded-full text-white/50 hover:text-white transition-colors">
                <ChevronRight size={24} />
              </button>
              {headerOpacity > 0.8 && (
                <div className="flex items-center gap-2 animate-fade-in duration-500">
                    <span className="text-xl font-bold">{DEVELOPER_INFO.name}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 bg-black/70 hover:bg-[#282828] transition-colors p-[2px] pr-2 rounded-full cursor-pointer group">
              <div className="bg-[#535353] p-1 rounded-full group-hover:scale-105 transition-transform">
                <UserCircle size={24} className="text-white" />
              </div>
              <span className="text-sm font-bold">{DEVELOPER_INFO.name}</span>
              <ChevronRight size={16} className="rotate-90" />
            </div>
          </header>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto relative"
          >
            {/* Scroll to top button */}
            <button 
              onClick={scrollToTop}
              className={`fixed bottom-28 right-8 z-[60] bg-[#1DB954] text-black p-3 rounded-full shadow-2xl transition-all duration-300 transform ${showScrollTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-50 pointer-events-none'} hover:scale-110 active:scale-95`}
            >
              <ArrowUp size={24} strokeWidth={3} />
            </button>

            {/* View Mapping */}
            {(currentView === ViewType.ARTIST || currentView === ViewType.HOME) && (
              <>
                <div 
                  className="relative h-[400px] flex items-end p-8 bg-gradient-to-b from-[#404040] to-[#121212]"
                  style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(18,18,18,1)), url(${DEVELOPER_INFO.profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center 20%' }}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={24} className="text-[#3d91f4]" fill="#ffffff" />
                      <span className="text-sm font-medium">Verified Artist</span>
                    </div>
                    <h1 className="text-7xl lg:text-8xl font-black tracking-tighter mb-4">{DEVELOPER_INFO.name}</h1>
                    <span className="text-base font-semibold">{DEVELOPER_INFO.monthlyListeners} monthly visitors</span>
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-b from-[#121212] to-black">
                  <div className="flex items-center gap-8 mb-8">
                    <button 
                      onClick={showAboutMe}
                      className="bg-[#1DB954] hover:scale-105 transition-transform p-4 rounded-full text-black shadow-lg"
                    >
                      <Play size={28} fill="currentColor" />
                    </button>
                    <button 
                      onClick={showAboutMe}
                      className="border border-[#878787] hover:border-white hover:scale-105 text-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      About
                    </button>
                    <MoreHorizontal size={32} className="text-[#b3b3b3] hover:text-white cursor-pointer transition-colors" />
                  </div>

                  {/* Popular Projects */}
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Popular Projects</h2>
                    <div className="flex flex-col">
                      {PROJECTS.map((project, idx) => (
                        <ProjectRow 
                          key={project.id} 
                          index={idx} 
                          project={project} 
                          onPlay={playProject} 
                          isActive={activeProject?.id === project.id}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Technical Skills Section */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Technical Skills</h2>
                        <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">Browse All</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                      {TECHNICAL_SKILLS.map(skill => (
                        <div 
                          key={skill.name} 
                          style={{ backgroundColor: skill.color }}
                          className="relative aspect-square rounded-lg p-4 overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-105 shadow-xl"
                        >
                          <span className="text-xl md:text-2xl font-bold text-white tracking-tight break-words pr-4">
                            {skill.name}
                          </span>
                          <div className="absolute -bottom-2 -right-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
                            <skill.icon 
                                size={100} 
                                className="text-black/20 rotate-[25deg] transform-gpu"
                                strokeWidth={1.5}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Collections */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold hover:underline cursor-pointer">Featured Collections</h2>
                        <span className="text-sm font-bold text-[#b3b3b3] hover:underline cursor-pointer">Show all</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {PROJECTS.map(project => (
                            <div 
                              key={project.id} 
                              onClick={() => setSelectedProjectDetails(project)}
                              className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
                            >
                                <div className="relative aspect-square mb-4 shadow-xl">
                                    <img src={project.imageUrl} className="w-full h-full object-cover rounded shadow-md" alt={project.title} />
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        playProject(project);
                                      }}
                                      className={`absolute bottom-2 right-2 bg-[#1DB954] p-3 rounded-full text-black shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 ${activeProject?.id === project.id ? 'opacity-100 translate-y-0' : ''}`}
                                    >
                                        <Play size={20} fill="currentColor" />
                                    </button>
                                </div>
                                <p className={`font-bold truncate ${activeProject?.id === project.id ? 'text-[#1DB954]' : 'text-white'}`}>{project.title}</p>
                                <p className="text-sm text-[#b3b3b3] line-clamp-2 mt-1">{project.description}</p>
                            </div>
                        ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div className="col-span-1 lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">About</h2>
                        <div 
                          onClick={showAboutMe}
                          className="relative group overflow-hidden rounded-lg aspect-video bg-[#282828] cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
                        >
                            <img src={DEVELOPER_INFO.profileImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Bio" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                                <p className="text-lg leading-relaxed font-medium mb-4 max-w-lg">
                                    {DEVELOPER_INFO.bio}
                                </p>
                                <div className="flex items-center gap-2">
                                     <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md">
                                        <img src={DEVELOPER_INFO.profileImage} alt="mini" />
                                     </div>
                                     <span className="font-bold">By {DEVELOPER_INFO.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Appears On</h2>
                        <div className="space-y-4">
                            {EXPERIENCES.map(exp => (
                                <div key={exp.id} className="bg-[#181818] p-4 rounded-lg flex items-center gap-4 hover:bg-[#282828] hover:scale-[1.02] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
                                    <div className="relative overflow-hidden rounded shadow-md">
                                        <img src={exp.imageUrl} className="w-16 h-16 rounded group-hover:scale-110 transition-transform duration-500" alt={exp.company} />
                                    </div>
                                    <div>
                                        <p className="font-bold group-hover:text-[#1DB954] transition-colors">{exp.role}</p>
                                        <p className="text-sm text-[#b3b3b3]">{exp.company} • {exp.period}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>

                  <footer className="pt-20 pb-10 border-t border-[#282828] flex flex-wrap gap-12 text-sm text-[#b3b3b3]">
                    <div className="flex flex-col gap-4">
                        <p className="text-white font-bold">Links</p>
                        <a href="#" className="hover:text-white transition-colors hover:underline">GitHub</a>
                        <a href="#" className="hover:text-white transition-colors hover:underline">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors hover:underline">Twitter</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-white font-bold">Tech Stack</p>
                        <p className="hover:text-white transition-colors cursor-default">React</p>
                        <p className="hover:text-white transition-colors cursor-default">Node.js</p>
                        <p className="hover:text-white transition-colors cursor-default">Python</p>
                    </div>
                    <div className="flex-1 flex justify-end items-end">
                        <p>© 2024 {DEVELOPER_INFO.name}</p>
                    </div>
                  </footer>
                </div>
              </>
            )}

            {currentView === ViewType.SEARCH && (
              <div className="p-8 pt-24 animate-fade-in">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">AI Portfolio Search</h1>
                    <form onSubmit={handleSearch} className="relative group mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50 group-focus-within:text-[#1DB954] transition-colors" size={20} />
                        <input 
                            type="text" 
                            placeholder="Ask me anything about my projects or skills..."
                            className="w-full bg-white text-black py-3 pl-12 pr-4 rounded-full font-medium focus:outline-none focus:ring-4 focus:ring-[#1DB954]/20 transition-all shadow-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    <div className="bg-[#181818] rounded-xl p-8 min-h-[300px] shadow-2xl border border-white/5">
                        {isAiLoading ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-[#b3b3b3]">
                                <div className="w-8 h-8 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
                                <p className="animate-pulse">Asking my AI twin...</p>
                            </div>
                        ) : aiResponse ? (
                            <div className="prose prose-invert max-w-none animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <p className="text-lg leading-relaxed text-white">
                                    {aiResponse}
                                </p>
                            </div>
                        ) : (
                            <div className="text-center text-[#b3b3b3] py-20">
                                <Search size={64} className="mx-auto mb-4 opacity-20" />
                                <p className="text-xl font-bold">Discover my potential through search</p>
                                <p className="text-sm mt-2 italic">Try: "What projects use React?" or "Tell me about Tech Giant Inc experience"</p>
                            </div>
                        )}
                    </div>
                </div>
              </div>
            )}
            
            {currentView === ViewType.LIBRARY && (
                 <div className="p-8 pt-24 animate-fade-in">
                     <h1 className="text-3xl font-bold mb-8">Your Library</h1>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {PROJECTS.map((project) => (
                            <div 
                              key={project.id} 
                              onClick={() => setSelectedProjectDetails(project)}
                              className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer group"
                            >
                                <div className="relative aspect-square mb-4 shadow-2xl">
                                    <img src={project.imageUrl} className="w-full h-full object-cover rounded shadow" alt={project.title} />
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        playProject(project);
                                      }}
                                      className={`absolute bottom-2 right-2 bg-[#1DB954] p-3 rounded-full text-black shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${activeProject?.id === project.id ? 'opacity-100 translate-y-0' : ''}`}
                                    >
                                        <Play size={20} fill="currentColor" />
                                    </button>
                                </div>
                                <p className={`font-bold truncate ${activeProject?.id === project.id ? 'text-[#1DB954]' : 'text-white'}`}>{project.title}</p>
                                <p className="text-sm text-[#b3b3b3]">By {DEVELOPER_INFO.name}</p>
                            </div>
                        ))}
                     </div>
                 </div>
            )}
          </div>
        </main>
      </div>

      <PlayerBar 
        currentProject={activeProject} 
        currentView={currentView}
        setView={setView}
      />
    </div>
  );
};

export default App;
