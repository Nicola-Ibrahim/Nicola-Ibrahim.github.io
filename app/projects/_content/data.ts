export const projects = [
  {
    title: 'Tracing Objectives Backwards',
    category: 'Backend / Optimization',
    description: 'A FastAPI project that works backward from a target result to possible input settings. Python, NumPy, and SciPy support the search, and an API makes it available to other software.',
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
