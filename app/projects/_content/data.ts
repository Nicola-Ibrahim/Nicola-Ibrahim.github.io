type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string | null;
  icon: string;
  demoUrl: string | null;
  githubUrls: { label: string; url: string }[];
  caseStudyUrl: string | null;
  note: string;
};

export const projects: Project[] = [
  {
    title: 'Tracing Objectives Backwards',
    category: 'AI / Optimization',
    description: 'A Python and FastAPI project that searches for possible input settings given a target result. NumPy and SciPy support the search, which other applications can access through an API.',
    tags: ['Python', 'FastAPI', 'NumPy', 'SciPy', 'Docker'],
    image: '/images/projects/trace_engine.png',
    icon: 'fas fa-diagram-project',
    demoUrl: 'https://tracing-objectives-backwards-frontend.onrender.com/',
    githubUrls: [
      { label: 'Backend', url: 'https://github.com/Nicola-Ibrahim/Tracing-Objectives-Backwards-backend' },
      { label: 'Frontend', url: 'https://github.com/Nicola-Ibrahim/Tracing-Objectives-Backwards-front' },
    ],
    caseStudyUrl: '/projects/tracing-objectives-backwards',
    note: '',
  },
  {
    title: 'LLM-Driven Algorithm Design',
    category: 'AI / Optimization research',
    description: 'Harnessing LLMs for automated algorithm design: generating and improving Python optimization algorithms, then benchmarking them against classical optimizers on BBOB problems with configurable noise.',
    tags: ['Python', 'LLMs', 'BBOB', 'SQLite'],
    image: null,
    icon: 'fas fa-brain',
    demoUrl: null,
    githubUrls: [{ label: 'Repository', url: 'https://github.com/Nicola-Ibrahim/AAD_LLM' }],
    caseStudyUrl: '/projects/aad-llm',
    note: '',
  },
  {
    title: 'Document Q&A with RAG',
    category: 'AI / Information retrieval',
    description: 'A planned exploration of retrieval-augmented generation (RAG): retrieving relevant document passages to support LLM answers.',
    tags: ['Retrieval', 'LLMs'],
    image: null,
    icon: 'fas fa-book-open',
    demoUrl: null,
    githubUrls: [],
    caseStudyUrl: null,
    note: '',
  },
  /* Keep these case studies available; re-enable them when ready to feature them.
  {
    title: 'Bot System',
    category: 'AI integration / Backend',
    description: 'A FastAPI prototype for calling several AI providers through one API. Adapters bring their different responses into a common format.',
    tags: ['FastAPI', 'LLM APIs', 'PostgreSQL', 'Docker'],
    image: null,
    icon: 'fas fa-robot',
    demoUrl: null,
    githubUrls: [{ label: 'Repository', url: 'https://github.com/Nicola-Ibrahim/Bot-Chatting' }],
    caseStudyUrl: '/projects/bot-system',
    note: 'Architecture prototype',
  },
  {
    title: 'IAM Identity Service',
    category: 'Backend / Identity',
    description: 'A Django REST Framework project that brings login, JWT handling, and logout into one service for other applications to use.',
    tags: ['Django', 'JWT', 'Python'],
    image: null,
    icon: 'fas fa-shield-halved',
    demoUrl: null,
    githubUrls: [{ label: 'Repository', url: 'https://github.com/Nicola-Ibrahim/User-Authenticator' }],
    caseStudyUrl: '/projects/iam-identity-service',
    note: 'Concept project',
  },
  */
];
