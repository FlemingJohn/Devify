
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  duration: string;
  imageUrl: string;
  link?: string;
  stars?: number;
  demoUrl?: string;
  repoUrl?: string;
  color?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  imageUrl: string;
  achievements: Achievement[];
  color?: string;
}

export interface Achievement {
  title: string;
  impact: string; // e.g., "3:45" impact score or duration
}

export interface TourDate {
  date: string;
  event: string;
  location: string;
  link: string;
}

export interface MerchItem {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  price: string;
}

export enum ViewType {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  LIBRARY = 'LIBRARY',
  ARTIST = 'ARTIST',
  LYRICS = 'LYRICS',
  BIO = 'BIO',
  WRAPPED = 'WRAPPED',
  DISCOGRAPHY = 'DISCOGRAPHY'
}
