# Data Model: Interactive Blog

*Note: This feature is primarily frontend logic, but defines static state structures for the interactive diagrams.*

## Interfaces (From `blog.html`)

```typescript
interface TaskLink {
  label: string;
  url: string;
}

interface Task {
  id: string;
  title: string;
  shortDesc: string;
  details: string;
  prompt?: string;
  image?: string;
  customUI?: ReactNode; 
  links?: TaskLink[];
}

interface Category {
  id: string;
  title: string;
  icon: ReactNode;
  tasks: Task[];
}

interface Roadmap {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  categories: Category[];
}

type RoadmapsData = Record<string, Roadmap>;
```

These interfaces should ideally be extracted into `types/index.ts` or kept locally within the new Blog/Roadmap route if only used there.
