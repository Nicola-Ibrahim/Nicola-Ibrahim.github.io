import React, { ReactNode } from 'react';
import { 
  GitBranch, 
  Cloud, 
  Server, 
  Network, 
  Terminal,
  BookOpen,
  Code2,
  Box,
  Layers,
  ShieldCheck,
  Waypoints,
  Layout,
  Database,
  Cpu,
  Target,
  Sparkles
} from 'lucide-react';

export type IconName = 
  | 'git-branch' 
  | 'cloud' 
  | 'server' 
  | 'network' 
  | 'terminal' 
  | 'book-open' 
  | 'code2' 
  | 'box' 
  | 'layers' 
  | 'shield-check' 
  | 'waypoints' 
  | 'layout' 
  | 'database' 
  | 'cpu'
  | 'target'
  | 'sparkles';

const iconMap: Record<IconName, any> = {
  'git-branch': GitBranch,
  'cloud': Cloud,
  'server': Server,
  'network': Network,
  'terminal': Terminal,
  'book-open': BookOpen,
  'code2': Code2,
  'box': Box,
  'layers': Layers,
  'shield-check': ShieldCheck,
  'waypoints': Waypoints,
  'layout': Layout,
  'database': Database,
  'cpu': Cpu,
  'target': Target,
  'sparkles': Sparkles,
};

export function getIcon(name: string, className: string = "w-6 h-6"): ReactNode {
  const IconComponent = iconMap[name as IconName] || Terminal;
  return <IconComponent className={className} />;
}
