
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, MoreHorizontal, Play, UserCircle, Search as SearchIcon, X, Share2, Trophy, Sparkles, History, Clock, Mic2, MapPin, ExternalLink, Volume2, ShoppingBag, Calendar, ListMusic, Info, Heart, ArrowRight, Zap, Star } from 'lucide-react';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import ProjectRow from './components/ProjectRow';
import { DEVELOPER_INFO, PROJECTS, TECHNICAL_SKILLS, TOUR_DATES, MERCH, EXPERIENCES, HACKATHONS, SOCIAL_LINKS, GLOBAL_ACHIEVEMENTS } from './constants';
import { Project, Experience, ViewType, Hackathon } from './types';


const RECENTLY_PLAYED_KEY = 'devify_recently_played';



// Search View Component
const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="p-4 md:p-8 pt-20 md:pt-24 animate-fade-in pb-32">
      <div className="max-w-3xl mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Browse by Genre</h1>
        <div className="relative group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3b3b3] group-focus-within:text-white transition-colors" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full bg-[#242424] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] text-white rounded-full py-3 px-12 md:px-14 outline-none transition-all border border-transparent focus:border-white/20 text-sm md:text-base"
          />
        </div>
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {TECHNICAL_SKILLS.map(skill => (
          <div key={skill.name} className="aspect-square relative rounded-lg overflow-hidden cursor-pointer group" style={{ backgroundColor: skill.color }}>
            <h3 className="absolute top-3 left-3 md:top-4 md:left-4 text-xl md:text-2xl font-black text-white">{skill.name}</h3>
            <skill.icon size={48} className="absolute bottom-[-5%] right-[-5%] rotate-[25deg] text-white/20 group-hover:scale-110 transition-transform md:w-16 md:h-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Immersive Lyrics View
const LyricsView: React.FC<{ project: Project | null; setView: (v: ViewType) => void }> = ({ project, setView }) => {
  if (!project) return null;
  const lines = (project.longDescription || project.description).split('. ').filter(l => l.trim() !== '');
  return (
    <div className="absolute inset-0 z-[150] flex flex-col p-6 md:p-12 overflow-y-auto animate-fade-in spotify-ease" style={{ background: `linear-gradient(to bottom, ${project.color || '#282828'} 0%, #121212 100%)` }}>
      <div className="max-w-4xl mx-auto w-full pt-16 md:pt-24 pb-48">
        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12 animate-lyrics-appear">
          <img src={project.imageUrl} className="w-16 h-16 md:w-20 md:h-20 rounded shadow-2xl" alt={project.title} />
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-white">{project.title}</h2>
            <p className="text-lg md:text-xl font-bold text-white/60">{project.tech.join(', ')}</p>
          </div>
        </div>
        <div className="space-y-6 md:space-y-8">
          {lines.map((line, i) => (
            <p key={i} className="text-3xl md:text-6xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight animate-lyrics-appear" style={{ animationDelay: `${i * 0.15}s` }}>
              {line}{line.endsWith('.') ? '' : '.'}
            </p>
          ))}
        </div>
      </div>
      <button onClick={() => setView(ViewType.ARTIST)} className="fixed top-4 right-4 md:top-8 md:right-8 z-[160] p-2 md:p-3 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors">
        <X className="w-8 h-8 md:w-10 md:h-10" />
      </button>
    </div>
  );
};

// Immersive Wrapped View
const WrappedView: React.FC<{ setView: (v: ViewType) => void }> = ({ setView }) => {
  const [step, setStep] = useState(0);
  const stats = useMemo(() => {
    const techCounts: Record<string, number> = {};
    PROJECTS.forEach(p => p.tech.forEach(t => techCounts[t] = (techCounts[t] || 0) + 1));
    const topTech = Object.entries(techCounts).sort((a, b) => b[1] - a[1])[0][0];
    const topProject = [...PROJECTS].sort((a, b) => (b.stars || 0) - (a.stars || 0))[0];
    return { topTech, topProject };
  }, []);
  useEffect(() => {
    const timer = setInterval(() => { setStep(s => (s < 3 ? s + 1 : s)); }, 4000);
    return () => clearInterval(timer);
  }, []);
  const backgrounds = ['linear-gradient(135deg, #1e3264 0%, #ff4632 100%)', 'linear-gradient(135deg, #af2896 0%, #509bf5 100%)', 'linear-gradient(135deg, #006450 0%, #ffc864 100%)', 'linear-gradient(135deg, #eb1e32 0%, #8d67ab 100%)'];
  return (
    <div className="absolute inset-0 z-[200] flex flex-col items-center justify-center p-6 md:p-8 transition-all duration-1000 spotify-ease overflow-hidden" style={{ background: backgrounds[step] }}>
      <button onClick={() => setView(ViewType.HOME)} className="absolute top-4 right-4 md:top-8 md:right-8 z-[210] p-2 hover:bg-white/10 rounded-full text-white transition-colors">
        <X className="w-8 h-8 md:w-10 md:h-10" />
      </button>
      <div className="w-full max-w-4xl flex flex-col items-center text-center animate-lyrics-appear">
        {step === 0 && (
          <div className="space-y-4 md:space-y-6">
            <Sparkles className="mx-auto mb-6 md:mb-8 animate-pulse text-white w-20 h-20 md:w-32 md:h-32" />
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-white uppercase italic">Your 2024<br />Wrapped</h2>
            <p className="text-lg md:text-xl font-bold text-white/80 uppercase tracking-widest">A journey through your code</p>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4 md:space-y-6 animate-fade-in">
            <p className="text-lg md:text-2xl font-bold text-white/80 uppercase tracking-widest">You were inseparable from</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase">{stats.topTech}</h2>
            <p className="text-lg md:text-xl font-bold text-white/60">It dominated your commits this year.</p>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6 md:space-y-8 animate-fade-in flex flex-col items-center">
            <p className="text-lg md:text-2xl font-bold text-white/80 uppercase tracking-widest">Your Top Track Was</p>
            <div className="relative group">
              <img src={stats.topProject.imageUrl} className="w-48 h-48 md:w-80 md:h-80 rounded-lg shadow-2xl mb-4 md:mb-6 border-4 border-white/20 object-cover" alt="Top Project" />
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-[#1DB954] p-3 md:p-4 rounded-full shadow-xl">
                <Trophy className="text-white w-6 h-6 md:w-10 md:h-10" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-6xl font-black text-white mb-2">{stats.topProject.title}</h2>
              <p className="text-lg md:text-xl font-bold text-white/80 italic">Played over {stats.topProject.stars} times (stars)</p>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-6 md:space-y-10 animate-fade-in">
            <p className="text-lg md:text-2xl font-bold text-white/80 uppercase tracking-widest">Your Developer Persona is</p>
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-white uppercase bg-white text-black px-4 md:px-6 py-2 rotate-[-2deg] inline-block mb-6 md:mb-10">The Full-Stack Alchemist</h2>
            <p className="text-lg md:text-xl font-bold text-white/90 max-w-lg mx-auto leading-relaxed">You turn raw logic into gold. Your code is efficient, scalable, and beautifully designed.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-8 md:mt-12 px-6">
              <button className="bg-white text-black font-bold py-3 md:py-4 px-8 md:px-10 rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <Share2 size={20} /> Share Result
              </button>
              <button onClick={() => setView(ViewType.HOME)} className="bg-transparent border-2 border-white text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full hover:bg-white/10 transition-colors">Go Home</button>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-12 flex gap-3">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-10 md:w-12 bg-white' : 'w-3 md:w-4 bg-white/30'}`} />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewType>(ViewType.ARTIST);
  const [activeProject, setActiveProject] = useState<Project | null>(PROJECTS[0]);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState<Project | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyPlayedIds, setRecentlyPlayedIds] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);


  const artistPickProject = useMemo(() => PROJECTS.find(p => p.id === DEVELOPER_INFO.artistPick.projectId), []);

  useEffect(() => {
    const saved = localStorage.getItem(RECENTLY_PLAYED_KEY);
    if (saved) { try { setRecentlyPlayedIds(JSON.parse(saved)); } catch (e) { console.error(e); } }
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const addToRecentlyPlayed = (id: string) => {
    setRecentlyPlayedIds(prev => {
      const filtered = prev.filter(pId => pId !== id);
      const updated = [id, ...filtered].slice(0, 10);
      localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => { if (activeProject) addToRecentlyPlayed(activeProject.id); }, [activeProject?.id]);

  const handleScroll = () => { if (scrollContainerRef.current) setHeaderOpacity(Math.min(scrollContainerRef.current.scrollTop / 300, 1)); };

  const handlePlayProject = (project: Project) => {
    setActiveProject(project);
    setView(ViewType.LYRICS);
  };



  if (isLoading) return (
    <div className="h-screen bg-black flex items-center justify-center animate-fade-in">
      <svg viewBox="0 0 24 24" className="w-16 h-16 md:w-20 md:h-20 fill-current text-[#1DB954] animate-pulse">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.216.354-.675.465-1.028.249-2.858-1.746-6.457-2.141-10.697-1.173-.405.092-.812-.162-.905-.568-.092-.405.162-.812.568-.905 4.63-1.059 8.604-.601 11.813 1.358.353.216.464.675.249 1.028v.011zm1.472-3.257c-.272.443-.853.585-1.296.313-3.272-2.012-8.259-2.593-12.127-1.417-.5.152-1.029-.133-1.181-.633-.152-.5.133-1.029.633-1.181 4.417-1.339 9.904-.684 13.662 1.63.443.272.585.853.313 1.296l-.004-.008zm.126-3.4c-3.924-2.331-10.39-2.546-14.161-1.402-.602.183-1.241-.167-1.424-.769-.183-.602.167-1.241.769-1.424 4.331-1.314 11.464-1.054 15.996 1.634.542.321.721 1.024.4 1.566-.321.542-1.024.721-1.566.4l-.014-.005z" />
      </svg>
    </div>
  );


  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans relative">
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <Sidebar currentView={currentView} setView={setView} />

        <main className="flex-1 relative overflow-hidden flex flex-col">
          {currentView === ViewType.WRAPPED && <WrappedView setView={setView} />}
          {currentView === ViewType.LYRICS && <LyricsView project={activeProject} setView={setView} />}
          {currentView === ViewType.SEARCH && <SearchView />}

          {/* Experience Tracklist Modal */}
          {selectedExperience && (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl animate-fade-in overflow-y-auto">
              <div className="bg-[#181818] w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-white/5 relative">
                <div className="relative min-h-[16rem] md:h-64 flex flex-col md:flex-row items-center md:items-end p-6 md:p-8 text-center md:text-left" style={{ background: `linear-gradient(rgba(0,0,0,0), rgba(24,24,24,1)), ${selectedExperience.color || '#282828'}` }}>
                  <img src={selectedExperience.imageUrl} className="w-40 h-40 md:w-48 md:h-48 rounded shadow-2xl md:mr-8 mb-4 md:mb-0 object-cover" />
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-widest mb-2">Album</span>
                    <h2 className="text-3xl md:text-6xl font-black mb-2 md:mb-4 tracking-tight leading-none">{selectedExperience.company}</h2>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold">
                      <img src={DEVELOPER_INFO.profileImage} className="w-6 h-6 rounded-full object-cover" />
                      <span>{DEVELOPER_INFO.name} • {selectedExperience.period}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedExperience(null)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"><X size={28} /></button>
                </div>
                <div className="p-4 md:p-8">
                  <div className="flex items-center justify-center md:justify-start gap-6 mb-6 md:mb-8">
                    <button className="bg-[#1DB954] hover:scale-105 active:scale-95 transition-transform p-4 rounded-full text-black shadow-xl"><Play size={24} fill="currentColor" /></button>
                    <button className="text-[#b3b3b3] hover:text-white transition-colors"><Heart size={32} /></button>
                    <button className="text-[#b3b3b3] hover:text-white transition-colors"><MoreHorizontal size={32} /></button>
                  </div>
                  <div className="grid grid-cols-[32px_1fr_80px] md:grid-cols-[32px_1fr_120px] gap-4 text-[#b3b3b3] px-2 md:px-4 py-2 border-b border-white/10 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <span>#</span>
                    <span>Title</span>
                    <span className="text-right">Impact</span>
                  </div>
                  <div className="space-y-1 overflow-y-auto max-h-[300px] md:max-h-[400px]">
                    {selectedExperience.achievements.map((ach, i) => (
                      <div key={i} className="grid grid-cols-[32px_1fr_80px] md:grid-cols-[32px_1fr_120px] gap-4 px-2 md:px-4 py-2 rounded-md hover:bg-white/5 group transition-colors cursor-default">
                        <span className="text-[#b3b3b3] group-hover:hidden text-xs md:text-sm">{i + 1}</span>
                        <Play size={10} fill="currentColor" className="hidden group-hover:block text-white mt-1" />
                        <span className="text-white font-medium text-xs md:text-sm line-clamp-1">{ach.title}</span>
                        <span className="text-[#b3b3b3] text-right text-[10px] md:text-xs pt-0.5">{ach.impact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedProjectDetails && (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-fade-in">
              <div className="bg-[#181818] w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl scale-[0.5] animate-[spotify-modal-open_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] origin-center opacity-0 overflow-y-auto max-h-screen">
                <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8">
                  <img src={selectedProjectDetails.imageUrl} className="w-full md:w-64 aspect-square rounded-lg shadow-2xl object-cover" />
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-white/10 rounded">Project Detail</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 tracking-tight leading-tight">{selectedProjectDetails.title}</h2>
                      <p className="text-[#b3b3b3] text-sm md:text-lg leading-relaxed mb-6 md:mb-8">{selectedProjectDetails.longDescription}</p>
                      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                        {selectedProjectDetails.tech.map(t => (
                          <span key={t} className="text-[10px] md:text-xs font-bold bg-[#282828] text-white px-2 md:px-3 py-1 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <button onClick={() => { handlePlayProject(selectedProjectDetails); setSelectedProjectDetails(null); }} className="w-full sm:w-auto bg-[#1DB954] hover:scale-105 active:scale-95 transition-transform text-black font-black px-8 md:px-10 py-3 md:py-4 rounded-full flex items-center justify-center gap-2">
                        <Play fill="black" size={18} /> Play Project
                      </button>
                      <button onClick={() => setSelectedProjectDetails(null)} className="text-white hover:text-[#b3b3b3] font-bold px-4 py-2">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <header className="absolute top-0 right-0 left-0 h-14 md:h-16 z-50 flex items-center justify-between px-4 md:px-8 transition-colors duration-300" style={{ backgroundColor: `rgba(18, 18, 18, ${headerOpacity})` }}>
            <div className="flex items-center gap-2 md:gap-4">
              <button className="bg-black/70 p-1.5 rounded-full text-white/50 hover:text-white transition-colors"><ChevronLeft size={20} /></button>
              <button className="bg-black/70 p-1.5 rounded-full text-white/50 hover:text-white transition-colors hidden sm:block"><ChevronRight size={20} /></button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(link => (
                  <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="text-[#b3b3b3] hover:text-white transition-all hover:scale-110" title={link.platform}>
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-black/70 hover:bg-[#282828] transition-colors p-[2px] pr-2 rounded-full cursor-pointer">
                <img src={DEVELOPER_INFO.profileImage} className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover" />
                <span className="text-xs md:text-sm font-bold truncate max-w-[80px] sm:max-w-none">{DEVELOPER_INFO.name}</span>
              </div>
            </div>
          </header>

          <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto scroll-smooth">
            {(currentView === ViewType.HOME || currentView === ViewType.ARTIST) && (
              <>
                <div className="relative h-[300px] md:h-[400px] flex items-end p-4 md:p-8" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(18,18,18,1)), url(${DEVELOPER_INFO.profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="flex flex-col gap-2 relative z-10 w-full">
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        <CheckCircle2 size={18} className="text-[#3d91f4]" fill="white" />
                        <span className="text-[10px] md:text-sm font-medium">Verified Developer</span>
                      </div>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-2 md:mb-4 leading-none">{DEVELOPER_INFO.name}</h1>
                    <span className="text-xs md:text-base font-semibold text-white/80">{DEVELOPER_INFO.monthlyListeners} monthly visitors</span>
                  </div>
                </div>

                <div className="p-4 md:p-8 space-y-12 md:space-y-16 pb-48 md:pb-32 bg-gradient-to-b from-[#181818] to-black">
                  <div className="flex items-center gap-4 md:gap-6">
                    <button onClick={() => activeProject && handlePlayProject(activeProject)} className="bg-[#1DB954] hover:scale-105 active:scale-95 transition-transform p-3 md:p-4 rounded-full text-black shadow-xl"><Play size={24} fill="currentColor" className="md:w-7 md:h-7" /></button>
                    <button onClick={() => setView(ViewType.WRAPPED)} className="bg-gradient-to-tr from-[#ff00d4] to-[#00f2ff] px-4 md:px-6 py-1.5 md:py-2 rounded-full text-white text-xs md:text-sm font-bold animate-pulse hover:scale-105 transition-transform">2024 Wrapped</button>
                    <button className="text-[#b3b3b3] hover:text-white transition-colors"><MoreHorizontal size={24} className="md:w-8 md:h-8" /></button>
                  </div>

                  {/* Artist Pick */}
                  {artistPickProject && (
                    <div className="space-y-4">
                      <h2 className="text-xl md:text-2xl font-bold">Artist Pick</h2>
                      <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer max-w-xl" onClick={() => setSelectedProjectDetails(artistPickProject)}>
                        <img src={artistPickProject.imageUrl} className="w-20 h-20 md:w-24 md:h-24 rounded shadow-xl object-cover" alt="Artist Pick" />
                        <div className="flex flex-col justify-center gap-1">
                          <div className="flex items-center gap-2">
                            <img src={DEVELOPER_INFO.profileImage} className="w-4 h-4 md:w-5 md:h-5 rounded-full object-cover" />
                            <span className="text-[10px] md:text-xs font-medium text-[#b3b3b3]">Posted by {DEVELOPER_INFO.name}</span>
                          </div>
                          <h3 className="text-base md:text-xl font-bold">{artistPickProject.title}</h3>
                          <p className="text-xs md:text-sm text-[#b3b3b3] italic line-clamp-2">"{DEVELOPER_INFO.artistPick.comment}"</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Experience Discography */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 hover:underline cursor-pointer">Discography</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                      {EXPERIENCES.map(exp => (
                        <div
                          key={exp.id}
                          onClick={() => setSelectedExperience(exp)}
                          className="bg-[#181818] p-3 md:p-4 rounded-lg hover:bg-[#282828] cursor-pointer group transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1"
                        >
                          <div className="relative mb-3 md:mb-4 overflow-hidden rounded-md">
                            <img
                              src={exp.imageUrl}
                              className="aspect-square rounded-md shadow-xl mb-0 object-cover group-hover:scale-105 transition-transform duration-500"
                              alt={exp.company}
                            />
                            <div className="absolute bottom-2 right-2 bg-[#1DB954] p-2 md:p-3 rounded-full text-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-150 shadow-xl hidden md:block">
                              <ListMusic className="w-4 h-4 md:w-5 md:h-5" fill="black" />
                            </div>
                          </div>
                          <p className="font-bold text-sm md:text-base truncate group-hover:text-[#1DB954] transition-colors duration-300">{exp.company}</p>
                          <p className="text-[10px] md:text-sm text-[#b3b3b3]">{exp.period} • Album</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Global Achievements - Updated Section */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 hover:underline cursor-pointer">Platinum Accolades</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                      {GLOBAL_ACHIEVEMENTS.map(ach => (
                        <div
                          key={ach.id}
                          className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-white/5 to-transparent border border-white/5 hover:bg-white/10 transition-all group"
                        >
                          <div className="bg-[#1DB954]/10 p-3 rounded-lg text-[#1DB954] group-hover:scale-110 transition-transform">
                            <ach.icon size={24} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-sm md:text-base truncate text-white">{ach.title}</span>
                            <span className="text-[10px] text-[#b3b3b3] uppercase font-black tracking-widest">{ach.issuer} • {ach.date}</span>
                            <p className="text-[10px] text-[#b3b3b3] mt-1 line-clamp-1">{ach.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hackathons - Appears On / Collaborative Compilations */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 hover:underline cursor-pointer">Appears On (Hackathons)</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                      {HACKATHONS.map(hack => (
                        <div
                          key={hack.id}
                          className="bg-[#181818] p-3 md:p-4 rounded-lg hover:bg-[#282828] cursor-pointer group transition-all duration-300"
                        >
                          <div className="relative mb-3 md:mb-4 overflow-hidden rounded-md">
                            <img
                              src={hack.imageUrl}
                              className="aspect-square rounded-md shadow-xl mb-0 object-cover group-hover:scale-105 transition-transform duration-500"
                              alt={hack.name}
                            />
                            <div className="absolute top-2 left-2 bg-[#1DB954]/90 backdrop-blur-sm p-1.5 rounded-full text-black shadow-lg">
                              <Zap size={14} fill="black" />
                            </div>
                          </div>
                          <p className="font-bold text-sm md:text-base truncate">{hack.name}</p>
                          <p className="text-[10px] md:text-sm text-[#b3b3b3] truncate">{hack.projectBuilt}</p>
                          <p className="text-[10px] md:text-xs font-bold text-[#1DB954] mt-1 uppercase tracking-wider">{hack.award || 'Participant'}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 hover:underline cursor-pointer">Popular Tracks</h2>
                    <div className="flex flex-col">
                      {PROJECTS.map((project, idx) => (
                        <ProjectRow key={project.id} index={idx} project={project} onPlay={handlePlayProject} isActive={activeProject?.id === project.id} />
                      ))}
                    </div>
                  </div>

                  {/* On Tour */}
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight">On Tour</h2>
                      <p className="text-[#b3b3b3] text-xs md:text-sm mt-1">Based on your location</p>
                    </div>
                    <div className="flex flex-col">
                      {TOUR_DATES.map((tour, idx) => {
                        const dateParts = tour.date.split(' ');
                        const month = dateParts[0];
                        const day = dateParts[1] || tour.date;
                        return (
                          <div key={idx} className="flex items-center gap-4 md:gap-8 py-4 px-2 md:px-4 hover:bg-white/5 rounded-lg transition-all group border-b border-white/5 last:border-0">
                            <div className="flex flex-col items-center min-w-[40px] md:min-w-[48px]">
                              <span className="text-[10px] md:text-xs font-bold text-[#b3b3b3] uppercase tracking-widest">{month === "NOW" ? "LIVE" : month}</span>
                              <span className="text-xl md:text-2xl font-black text-white leading-none">{day === "NOW" ? <Calendar size={18} className="mt-1 md:w-5 md:h-5" /> : day}</span>
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm md:text-lg group-hover:text-[#1DB954] transition-colors truncate">{tour.event}</span>
                                {tour.date === "NOW" && <span className="text-[8px] md:text-[10px] font-bold bg-[#1DB954]/20 text-[#1DB954] px-1.5 py-0.5 rounded uppercase tracking-wider">Nearby</span>}
                              </div>
                              <div className="flex items-center gap-1 text-[#b3b3b3] text-[10px] md:text-sm font-medium truncate"><MapPin size={10} className="md:w-3 md:h-3" /><span>{tour.location}</span></div>
                            </div>
                            <a href={tour.link} target="_blank" rel="noreferrer" className="shrink-0 border border-[#727272] group-hover:border-white hover:scale-105 transition-all px-3 md:px-5 py-1.5 md:py-2 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest text-white">Tickets</a>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Merch */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <ShoppingBag className="text-[#1DB954] w-5 h-5 md:w-6 md:h-6" />
                      <h2 className="text-xl md:text-2xl font-bold">Developer Merch</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                      {MERCH.map(item => (
                        <div key={item.id} className="bg-[#181818] p-3 md:p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group relative">
                          <img src={item.imageUrl} className="aspect-square rounded mb-3 md:mb-4 shadow-xl object-cover" />
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-sm md:text-base truncate">{item.name}</span>
                            <span className="text-[10px] md:text-xs text-[#b3b3b3] uppercase tracking-wider">{item.type}</span>
                            <span className="text-xs md:text-sm font-bold text-[#1DB954] mt-1 md:mt-2">{item.price}</span>
                          </div>
                          <button className="absolute bottom-16 right-4 md:right-6 p-2 md:p-3 rounded-full bg-[#1DB954] text-black shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hidden md:block"><ShoppingBag className="w-4 h-4 md:w-5 md:h-5" fill="black" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </>
            )}

            {currentView === ViewType.LIBRARY && (
              <div className="p-4 md:p-8 pt-20 md:pt-24 space-y-8 md:space-y-12 pb-32">
                <h1 className="text-2xl md:text-3xl font-bold">Your Library</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {PROJECTS.map(p => (
                    <div key={p.id} onClick={() => setSelectedProjectDetails(p)} className="bg-[#181818] p-3 md:p-4 rounded-lg hover:bg-[#282828] cursor-pointer group">
                      <img src={p.imageUrl} className="aspect-square rounded mb-3 md:mb-4 object-cover" />
                      <p className="font-bold text-sm md:text-base truncate">{p.title}</p>
                      <p className="text-[10px] md:text-sm text-[#b3b3b3]">Project • {p.tech[0]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <PlayerBar currentProject={activeProject} currentView={currentView} setView={setView} />
      <style>{`
        @keyframes spotify-modal-open { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
