import { ReactNode } from 'react';

export interface TaskLink {
  label: string;
  url: string;
}

export interface Task {
  id: string;
  title: string;
  shortDesc: string;
  details: string;
  prompt?: string;
  image?: string;
  customUI?: ReactNode; // Support for custom injected React elements
  links?: TaskLink[];
}

export interface Category {
  id: string;
  title: string;
  icon: string; // Icon identifier
  tasks: Task[];
}

export interface Roadmap {
  id: string;
  title: string;
  icon: string; // Icon identifier
  description: string;
  categories: Category[];
}

export type RoadmapsData = Record<string, Roadmap>;
