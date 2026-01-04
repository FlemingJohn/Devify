
import React from 'react';
import { Play, Heart } from 'lucide-react';
import { Project } from '../types';

interface ProjectRowProps {
  index: number;
  project: Project;
  onPlay: (project: Project) => void;
  isActive: boolean;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ index, project, onPlay, isActive }) => {
  return (
    <div 
        onClick={() => onPlay(project)}
        className="group flex items-center px-4 py-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
    >
      <div className="w-8 flex justify-center text-[#b3b3b3] text-sm">
        <span className="group-hover:hidden">{index + 1}</span>
        <Play size={12} fill="currentColor" className="hidden group-hover:block text-white" />
      </div>
      
      <div className="flex items-center gap-3 flex-1 ml-4">
        <img src={project.imageUrl} alt={project.title} className="w-10 h-10 rounded shadow" />
        <div className="flex flex-col">
          <span className={`text-sm font-medium ${isActive ? 'text-[#1DB954]' : 'text-white'}`}>
            {project.title}
          </span>
          <span className="text-xs text-[#b3b3b3] line-clamp-1">{project.description}</span>
        </div>
      </div>

      <div className="w-40 text-sm text-[#b3b3b3] hidden md:block">
        {project.stars?.toLocaleString()} stars
      </div>

      <div className="flex items-center gap-4 text-[#b3b3b3]">
        <Heart size={16} className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity" />
        <span className="text-xs w-8">{project.duration}</span>
      </div>
    </div>
  );
};

export default ProjectRow;
