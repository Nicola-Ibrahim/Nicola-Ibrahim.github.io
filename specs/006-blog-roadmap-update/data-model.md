# Data Model: Blog Roadmap

## Types & Interfaces

The roadmap uses static typed datasets that bundle interactive components alongside metadata.
This file will be stored in `content/roadmaps.tsx` since it requires React JSX to function.

```typescript
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
  customUI?: ReactNode; // Supports injected React components (e.g. flowcharts, steppers)
  links?: TaskLink[];
}

export interface Category {
  id: string;
  title: string;
  icon: ReactNode; // Supports injected Lucide-react components or spans
  tasks: Task[];
}

export interface Roadmap {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  categories: Category[];
}

export type RoadmapsData = Record<string, Roadmap>;
```

## Data Management
Because these structures explicitly require `ReactNode` bindings instead of pure JSON, the object graph must be served directly to Client Components or processed during static generation within the Next.js runtime environment. It is strongly advised NOT to serialize this data out to an external Database without first decoupling the `customUI` property hooks.
