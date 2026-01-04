
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  duration: string;
  imageUrl: string;
  link?: string;
  stars?: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  imageUrl: string;
}

export enum ViewType {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  LIBRARY = 'LIBRARY',
  ARTIST = 'ARTIST',
  LYRICS = 'LYRICS'
}
