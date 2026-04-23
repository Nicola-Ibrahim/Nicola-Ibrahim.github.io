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
  Sparkles,
  Activity,
  Workflow,
  Send,
  Zap,
  Anchor,
  FlaskConical,
  Gauge,
  List,
  TreePine,
  Share2,
  Hash,
  PlayCircle,
  FileText,
  GitFork,
  Copy,
  Check,
  ChevronDown,
  ChevronUp
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
  | 'sparkles'
  | 'activity'
  | 'workflow'
  | 'send'
  | 'zap'
  | 'anchor'
  | 'flask-conical'
  | 'gauge'
  | 'list'
  | 'tree'
  | 'share-2'
  | 'hash'
  | 'play-circle'
  | 'file-text'
  | 'git-fork' 
  | 'copy' 
  | 'check'
  | 'chevron-down'
  | 'chevron-up';

const iconMap: Record<IconName, React.ElementType> = {
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
  'activity': Activity,
  'workflow': Workflow,
  'send': Send,
  'zap': Zap,
  'anchor': Anchor,
  'flask-conical': FlaskConical,
  'gauge': Gauge,
  'list': List,
  'tree': TreePine,
  'share-2': Share2,
  'hash': Hash,
  'play-circle': PlayCircle,
  'file-text': FileText,
  'git-fork': GitFork,
  'copy': Copy,
  'check': Check,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
};

export function getIcon(name: string, className: string = "w-6 h-6"): ReactNode {
  const IconComponent = iconMap[name as IconName] || Terminal;
  return <IconComponent className={className} />;
}
