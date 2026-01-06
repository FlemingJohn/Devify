
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, MoreHorizontal, Play, UserCircle, Search as SearchIcon, X, Share2, Trophy, Sparkles, History, Clock, Mic2, MapPin, ExternalLink, Volume2, ShoppingBag, Calendar, ListMusic, Info, Heart, ArrowRight } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import ProjectRow from './components/ProjectRow';
import { DEVELOPER_INFO, PROJECTS, TECHNICAL_SKILLS, TOUR_DATES, MERCH, EXPERIENCES } from './constants';
import { Project, Experience, ViewType } from './types';
import { askGeminiAboutDeveloper } from './services/geminiService';

const RECENTLY_PLAYED_KEY = 'devify_recently_played';

// Audio decoding helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Search View Component
const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    const response = await askGeminiAboutDeveloper(query);
    setAiResponse(response);
    setIsSearching(false);
  };

  return (
    <div className="p-8 pt-24 animate-fade-in">
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl font-bold mb-6">Search the Dev Brain</h1>
        <form onSubmit={handleAiSearch} className="relative group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3b3b3] group-focus-within:text-white transition-colors" size={24} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything (e.g., 'What is Alex's stack?')" 
            className="w-full bg-[#242424] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] text-white rounded-full py-3 px-14 outline-none transition-all border border-transparent focus:border-white/20"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#1DB954] text-black p-1.5 rounded-full hover:scale-105 transition-transform">
             <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {isSearching && (
        <div className="flex items-center gap-3 text-[#b3b3b3] animate-pulse">
          <Sparkles size={20} />
          <span>Gemini is thinking...</span>
        </div>
      )}

      {aiResponse && !isSearching && (
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 animate-slide-up-fade">
          <div className="flex items-center gap-2 mb-4 text-[#1DB954]">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">AI Recommendation</span>
          </div>
          <p className="text-lg text-white leading-relaxed">{aiResponse}</p>
        </div>
      )}

      {!aiResponse && !isSearching && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TECHNICAL_SKILLS.map(skill => (
            <div key={skill.name} className="aspect-square relative rounded-lg overflow-hidden cursor-pointer group" style={{ backgroundColor: skill.color }}>
               <h3 className="absolute top-4 left-4 text-2xl font-black text-white">{skill.name}</h3>
               <skill.icon size={64} className="absolute bottom-[-10%] right-[-10%] rotate-[25deg] text-white/20 group-hover:scale-110 transition-transform" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Immersive Lyrics View
const LyricsView: React.FC<{ project: Project | null; setView: (v: ViewType) => void }> = ({ project, setView }) => {
  if (!project) return null;
  const lines = (project.longDescription || project.description).split('. ').filter(l => l.trim() !== '');
  return (
    <div className="absolute inset-0 z-[150] flex flex-col p-12 overflow-y-auto animate-fade-in spotify-ease" style={{ background: `linear-gradient(to bottom, ${project.color || '#282828'} 0%, #121212 100%)` }}>
      <div className="max-w-4xl mx-auto w-full pt-24 pb-48">
        <div className="flex items-center gap-6 mb-12 animate-lyrics-appear">
          <img src={project.imageUrl} className="w-20 h-20 rounded shadow-2xl" alt={project.title} />
          <div>
            <h2 className="text-4xl font-black text-white">{project.title}</h2>
            <p className="text-xl font-bold text-white/60">{project.tech.join(', ')}</p>
          </div>
        </div>
        <div className="space-y-8">
          {lines.map((line, i) => (
            <p key={i} className="text-4xl md:text-6xl font-black text-white/30 hover:text-white transition-all duration-500 cursor-default leading-tight animate-lyrics-appear" style={{ animationDelay: `${i * 0.15}s` }}>
              {line}{line.endsWith('.') ? '' : '.'}
            </p>
          ))}
        </div>
      </div>
      <button onClick={() => setView(ViewType.ARTIST)} className="fixed top-8 right-8 z-[160] p-3 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors">
        <X size={32} />
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
    <div className="absolute inset-0 z-[200] flex flex-col items-center justify-center p-8 transition-all duration-1000 spotify-ease overflow-hidden" style={{ background: backgrounds[step] }}>
      <button onClick={() => setView(ViewType.HOME)} className="absolute top-8 right-8 z-[210] p-2 hover:bg-white/10 rounded-full text-white transition-colors">
        <X size={32} />
      </button>
      <div className="w-full max-w-4xl flex flex-col items-center text-center animate-lyrics-appear">
        {step === 0 && (
          <div className="space-y-6">
            <Sparkles size={80} className="mx-auto mb-8 animate-pulse text-white" />
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic">Your 2024<br/>Wrapped</h2>
            <p className="text-xl font-bold text-white/80 uppercase tracking-widest">A journey through your code</p>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <p className="text-2xl font-bold text-white/80 uppercase tracking-widest">You were inseparable from</p>
            <h2 className="text-8xl md:text-9xl font-black tracking-tighter text-white uppercase">{stats.topTech}</h2>
            <p className="text-xl font-bold text-white/60">It dominated your commits this year.</p>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-8 animate-fade-in flex flex-col items-center">
            <p className="text-2xl font-bold text-white/80 uppercase tracking-widest">Your Top Track Was</p>
            <div className="relative group">
              <img src={stats.topProject.imageUrl} className="w-64 h-64 md:w-80 md:h-80 rounded-lg shadow-2xl mb-6 border-4 border-white/20" alt="Top Project" />
              <div className="absolute -top-4 -right-4 bg-[#1DB954] p-4 rounded-full shadow-xl">
                <Trophy size={32} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-2">{stats.topProject.title}</h2>
              <p className="text-xl font-bold text-white/80 italic">Played over {stats.topProject.stars} times (stars)</p>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-10 animate-fade-in">
            <p className="text-2xl font-bold text-white/80 uppercase tracking-widest">Your Developer Persona is</p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase bg-white text-black px-6 py-2 rotate-[-2deg] inline-block mb-10">The Full-Stack Alchemist</h2>
            <p className="text-xl font-bold text-white/90 max-w-lg mx-auto leading-relaxed">You turn raw logic into gold. Your code is efficient, scalable, and beautifully designed.</p>
            <div className="flex gap-4 justify-center mt-12">
              <button className="bg-white text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform flex items-center gap-2">
                <Share2 size={20} /> Share Result
              </button>
              <button onClick={() => setView(ViewType.HOME)} className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-colors">Go Home</button>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-12 flex gap-3">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-12 bg-white' : 'w-4 bg-white/30'}`} />
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
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
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

  const handlePlayGreeting = async () => {
    if (isPlayingTTS) return;
    setIsPlayingTTS(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Say cheerfully: Hey there! I'm Alex Jean, a full stack engineer. Welcome to my portfolio. Feel free to explore my latest projects and tracks. Thanks for stopping by!`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: { responseModalities: [Modality.AUDIO], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } } },
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
        const source = outputAudioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(outputAudioContext.destination);
        source.onended = () => setIsPlayingTTS(false);
        source.start();
      } else { setIsPlayingTTS(false); }
    } catch (err) { console.error(err); setIsPlayingTTS(false); }
  };

  if (isLoading) return <div className="h-screen bg-black flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden font-sans">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentView={currentView} setView={setView} />
        
        <main className="flex-1 relative overflow-hidden flex flex-col">
          {currentView === ViewType.WRAPPED && <WrappedView setView={setView} />}
          {currentView === ViewType.LYRICS && <LyricsView project={activeProject} setView={setView} />}
          {currentView === ViewType.SEARCH && <SearchView />}
          
          {/* Experience Tracklist Modal */}
          {selectedExperience && (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-8 bg-black/90 backdrop-blur-xl animate-fade-in">
              <div className="bg-[#181818] w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border border-white/5">
                <div className="relative h-64 flex items-end p-8" style={{ background: `linear-gradient(rgba(0,0,0,0), rgba(24,24,24,1)), ${selectedExperience.color || '#282828'}` }}>
                  <img src={selectedExperience.imageUrl} className="w-48 h-48 rounded shadow-2xl mr-8 object-cover" />
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-widest mb-2">Album</span>
                    <h2 className="text-6xl font-black mb-4 tracking-tight">{selectedExperience.company}</h2>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <img src={DEVELOPER_INFO.profileImage} className="w-6 h-6 rounded-full object-cover" />
                      <span>{DEVELOPER_INFO.name} • {selectedExperience.period} • {selectedExperience.achievements.length} tracks</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedExperience(null)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={32} /></button>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-6 mb-8">
                    <button className="bg-[#1DB954] hover:scale-105 transition-transform p-4 rounded-full text-black shadow-xl"><Play size={24} fill="currentColor" /></button>
                    <button className="text-[#b3b3b3] hover:text-white transition-colors"><Heart size={32} /></button>
                    <button className="text-[#b3b3b3] hover:text-white transition-colors"><MoreHorizontal size={32} /></button>
                  </div>
                  <div className="grid grid-cols-[32px_1fr_120px] gap-4 text-[#b3b3b3] px-4 py-2 border-b border-white/10 text-xs font-bold uppercase tracking-widest mb-4">
                    <span>#</span>
                    <span>Title</span>
                    <span className="text-right">Impact</span>
                  </div>
                  <div className="space-y-1 overflow-y-auto max-h-[300px]">
                    {selectedExperience.achievements.map((ach, i) => (
                      <div key={i} className="grid grid-cols-[32px_1fr_120px] gap-4 px-4 py-2 rounded-md hover:bg-white/5 group transition-colors cursor-default">
                        <span className="text-[#b3b3b3] group-hover:hidden">{i + 1}</span>
                        <Play size={12} fill="currentColor" className="hidden group-hover:block text-white mt-1" />
                        <span className="text-white font-medium">{ach.title}</span>
                        <span className="text-[#b3b3b3] text-right text-sm">{ach.impact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedProjectDetails && (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-8 bg-black/80 backdrop-blur-md animate-fade-in">
              <div className="bg-[#181818] w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl scale-[0.5] animate-[spotify-modal-open_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] origin-center opacity-0">
                 <div className="flex flex-col md:flex-row p-8 gap-8">
                    <img src={selectedProjectDetails.imageUrl} className="w-full md:w-64 aspect-square rounded-lg shadow-2xl object-cover" />
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                           <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-white/10 rounded">Project Detail</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{selectedProjectDetails.title}</h2>
                        <p className="text-[#b3b3b3] text-lg leading-relaxed mb-8">{selectedProjectDetails.longDescription}</p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {selectedProjectDetails.tech.map(t => (
                            <span key={t} className="text-xs font-bold bg-[#282828] text-white px-3 py-1 rounded-full">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => { handlePlayProject(selectedProjectDetails); setSelectedProjectDetails(null); }} className="bg-[#1DB954] hover:scale-105 active:scale-95 transition-transform text-black font-black px-10 py-4 rounded-full flex items-center gap-2">
                          <Play fill="black" size={20} /> Play Project
                        </button>
                        <button onClick={() => setSelectedProjectDetails(null)} className="text-white hover:text-[#b3b3b3] font-bold px-4 py-2">Close</button>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          <header className="absolute top-0 right-0 left-0 h-16 z-50 flex items-center justify-between px-8 transition-colors duration-300" style={{ backgroundColor: `rgba(18, 18, 18, ${headerOpacity})` }}>
            <div className="flex items-center gap-4">
              <button className="bg-black/70 p-1 rounded-full text-white/50 hover:text-white transition-colors"><ChevronLeft size={24} /></button>
              <button className="bg-black/70 p-1 rounded-full text-white/50 hover:text-white transition-colors"><ChevronRight size={24} /></button>
            </div>
            <div className="flex items-center gap-2 bg-black/70 hover:bg-[#282828] transition-colors p-[2px] pr-2 rounded-full cursor-pointer">
              <img src={DEVELOPER_INFO.profileImage} className="w-7 h-7 rounded-full object-cover" />
              <span className="text-sm font-bold">{DEVELOPER_INFO.name}</span>
            </div>
          </header>

          <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto">
            {(currentView === ViewType.HOME || currentView === ViewType.ARTIST) && (
              <>
                <div className="relative h-[400px] flex items-end p-8" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(18,18,18,1)), url(${DEVELOPER_INFO.profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <div className="flex flex-col gap-2 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={24} className="text-[#3d91f4]" fill="white" />
                            <span className="text-sm font-medium">Verified Developer</span>
                        </div>
                        <button onClick={handlePlayGreeting} className={`flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all ${isPlayingTTS ? 'animate-pulse text-[#1DB954]' : ''}`}>
                            <Volume2 size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">{isPlayingTTS ? 'Speaking...' : 'Listen to Greeting'}</span>
                        </button>
                    </div>
                    <h1 className="text-8xl font-black tracking-tighter mb-4">{DEVELOPER_INFO.name}</h1>
                    <span className="text-base font-semibold">{DEVELOPER_INFO.monthlyListeners} monthly visitors</span>
                  </div>
                </div>

                <div className="p-8 space-y-16 pb-32 bg-gradient-to-b from-[#181818] to-black">
                  <div className="flex items-center gap-6">
                    <button onClick={() => activeProject && handlePlayProject(activeProject)} className="bg-[#1DB954] hover:scale-105 transition-transform p-4 rounded-full text-black shadow-xl"><Play size={28} fill="currentColor" /></button>
                    <button onClick={() => setView(ViewType.WRAPPED)} className="bg-gradient-to-tr from-[#ff00d4] to-[#00f2ff] px-6 py-2 rounded-full text-white font-bold animate-pulse hover:scale-105 transition-transform">2024 Wrapped is here</button>
                    <button className="text-[#b3b3b3] hover:text-white transition-colors"><MoreHorizontal size={32} /></button>
                  </div>

                  {/* Artist Pick */}
                  {artistPickProject && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Artist Pick</h2>
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer max-w-xl" onClick={() => setSelectedProjectDetails(artistPickProject)}>
                            <img src={artistPickProject.imageUrl} className="w-24 h-24 rounded shadow-xl object-cover" alt="Artist Pick" />
                            <div className="flex flex-col justify-center gap-1">
                                <div className="flex items-center gap-2">
                                    <img src={DEVELOPER_INFO.profileImage} className="w-5 h-5 rounded-full object-cover" />
                                    <span className="text-xs font-medium text-[#b3b3b3]">Posted by {DEVELOPER_INFO.name}</span>
                                </div>
                                <h3 className="text-xl font-bold">{artistPickProject.title}</h3>
                                <p className="text-sm text-[#b3b3b3] italic line-clamp-2">"{DEVELOPER_INFO.artistPick.comment}"</p>
                            </div>
                        </div>
                    </div>
                  )}

                  {/* Experience Discography */}
                  <div>
                    <h2 className="text-2xl font-bold mb-6 hover:underline cursor-pointer">Discography</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                      {EXPERIENCES.map(exp => (
                        <div key={exp.id} onClick={() => setSelectedExperience(exp)} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] cursor-pointer group transition-all duration-300">
                          <div className="relative mb-4">
                            <img src={exp.imageUrl} className="aspect-square rounded shadow-xl mb-4 object-cover" />
                            <div className="absolute bottom-2 right-2 bg-[#1DB954] p-3 rounded-full text-black opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                              <ListMusic size={20} fill="black" />
                            </div>
                          </div>
                          <p className="font-bold truncate">{exp.company}</p>
                          <p className="text-sm text-[#b3b3b3]">{exp.period} • Album</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-6 hover:underline cursor-pointer">Popular Tracks</h2>
                    <div className="flex flex-col">
                      {PROJECTS.map((project, idx) => (
                        <ProjectRow key={project.id} index={idx} project={project} onPlay={handlePlayProject} isActive={activeProject?.id === project.id} />
                      ))}
                    </div>
                  </div>

                  {/* On Tour */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">On Tour</h2>
                      <p className="text-[#b3b3b3] text-sm mt-1">Based on your location</p>
                    </div>
                    <div className="flex flex-col">
                      {TOUR_DATES.map((tour, idx) => {
                        const dateParts = tour.date.split(' ');
                        const month = dateParts[0];
                        const day = dateParts[1] || tour.date;
                        return (
                          <div key={idx} className="flex items-center gap-8 py-4 px-4 hover:bg-white/5 rounded-lg transition-all group border-b border-white/5 last:border-0">
                            <div className="flex flex-col items-center min-w-[48px]">
                              <span className="text-xs font-bold text-[#b3b3b3] uppercase tracking-widest">{month === "NOW" ? "LIVE" : month}</span>
                              <span className="text-2xl font-black text-white leading-none">{day === "NOW" ? <Calendar size={20} className="mt-1" /> : day}</span>
                            </div>
                            <div className="flex flex-col flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-lg group-hover:text-[#1DB954] transition-colors">{tour.event}</span>
                                {tour.date === "NOW" && <span className="text-[10px] font-bold bg-[#1DB954]/20 text-[#1DB954] px-1.5 py-0.5 rounded uppercase tracking-wider">Nearby</span>}
                              </div>
                              <div className="flex items-center gap-1 text-[#b3b3b3] text-sm font-medium"><MapPin size={12} /><span>{tour.location}</span></div>
                            </div>
                            <a href={tour.link} target="_blank" rel="noreferrer" className="border border-[#727272] group-hover:border-white hover:scale-105 transition-all px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest text-white">Find Tickets</a>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Merch */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                        <ShoppingBag size={24} className="text-[#1DB954]" />
                        <h2 className="text-2xl font-bold">Developer Merch</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {MERCH.map(item => (
                            <div key={item.id} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group relative">
                                <img src={item.imageUrl} className="aspect-square rounded mb-4 shadow-xl object-cover" />
                                <div className="flex flex-col"><span className="font-bold truncate">{item.name}</span><span className="text-xs text-[#b3b3b3] uppercase tracking-wider">{item.type}</span><span className="text-sm font-bold text-[#1DB954] mt-2">{item.price}</span></div>
                                <button className="absolute bottom-16 right-6 p-3 rounded-full bg-[#1DB954] text-black shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all"><ShoppingBag size={20} fill="black" /></button>
                            </div>
                        ))}
                    </div>
                  </div>

                  {/* About / Bio Section */}
                  <div className="pt-24 pb-12">
                    <h2 className="text-2xl font-bold mb-6">About</h2>
                    <div className="relative h-[600px] rounded-xl overflow-hidden group cursor-pointer">
                      <img src={DEVELOPER_INFO.profileImage} className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                        <div className="bg-[#3d91f4] w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-pulse">
                          <CheckCircle2 size={40} className="text-white" fill="white" />
                        </div>
                        <h3 className="text-5xl font-black text-white mb-6 max-w-2xl leading-tight">Verified Developer {DEVELOPER_INFO.name}</h3>
                        <p className="text-xl font-bold text-white/90 max-w-3xl line-clamp-3 leading-relaxed mb-8">{DEVELOPER_INFO.bio}</p>
                        <div className="flex items-center gap-6 text-white">
                           <div className="flex flex-col">
                              <span className="text-4xl font-black">1.2M+</span>
                              <span className="text-xs font-bold uppercase tracking-widest text-white/60">Lines of Code</span>
                           </div>
                           <div className="h-10 w-px bg-white/20"></div>
                           <div className="flex flex-col">
                              <span className="text-4xl font-black">500+</span>
                              <span className="text-xs font-bold uppercase tracking-widest text-white/60">GitHub Stars</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )}

            {currentView === ViewType.LIBRARY && (
              <div className="p-8 pt-24 space-y-12 pb-24">
                <h1 className="text-3xl font-bold">Your Library</h1>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {PROJECTS.map(p => (
                    <div key={p.id} onClick={() => setSelectedProjectDetails(p)} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] cursor-pointer group">
                        <img src={p.imageUrl} className="aspect-square rounded mb-4 object-cover" />
                        <p className="font-bold truncate">{p.title}</p>
                        <p className="text-sm text-[#b3b3b3]">Project • {p.tech[0]}</p>
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
      `}</style>
    </div>
  );
};

export default App;
