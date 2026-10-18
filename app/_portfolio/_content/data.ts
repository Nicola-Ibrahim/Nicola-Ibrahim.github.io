export const skillGroups = [
  {
    title: 'Backend',
    skills: [
      { name: 'Python', icon: 'devicon-python-plain colored', color: '#3776ab' },
      { name: 'FastAPI', icon: 'devicon-fastapi-plain colored', color: '#05998b' },
      { name: 'Django', icon: 'devicon-django-plain', color: '#2ba977' },
      { name: 'REST APIs', icon: 'fas fa-code', color: '#4ade80' },
    ],
  },
  {
    title: 'Data & ML',
    skills: [
      { name: 'Data-driven modeling', icon: 'fas fa-microchip', color: '#5eead4' },
      { name: 'Pandas', icon: 'devicon-pandas-plain', color: '#64b5f6' },
      { name: 'NumPy', icon: 'devicon-numpy-plain', color: '#4dabcf' },
      { name: 'SciPy', icon: 'fas fa-chart-line', color: '#5eead4' },
      { name: 'PyTorch', icon: 'devicon-pytorch-plain colored', color: '#ee4c2c' },
    ],
  },
  {
    title: 'Cloud & delivery',
    skills: [
      { name: 'AWS', icon: 'devicon-amazonwebservices-plain colored', color: '#ff9900' },
      { name: 'Azure', icon: 'devicon-azure-plain colored', color: '#0078d4' },
      { name: 'Docker & Compose', icon: 'devicon-docker-plain colored', color: '#2496ed' },
      { name: 'CI/CD', icon: 'fas fa-arrows-rotate', color: '#2dd4bf' },
      { name: 'GitHub Actions', icon: 'devicon-github-original colored', color: '#ffffff' },
    ],
  },
  {
    title: 'Data stores',
    skills: [
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', color: '#336791' },
      { name: 'Redis', icon: 'devicon-redis-plain colored', color: '#dc382d' },
      { name: 'ORMs', icon: 'fas fa-cubes', color: '#009688' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', icon: 'devicon-html5-plain colored', color: '#e34c26' },
      { name: 'CSS', icon: 'devicon-css3-plain colored', color: '#264de4' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored', color: '#f7df1e' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored', color: '#3178c6' },
      { name: 'Next.js', icon: 'devicon-nextjs-plain colored', color: '#ffffff' },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored', color: '#06b6d4' },
    ],
  },
  {
    title: 'Engineering practices',
    skills: [
      { name: 'Domain-Driven Design', icon: 'fas fa-diagram-project', color: '#4ade80' },
      { name: 'System Architecture', icon: 'fas fa-layer-group', color: '#009688' },
      { name: 'System Optimization', icon: 'fas fa-gauge-high', color: '#2dd4bf' },
      { name: 'Git', icon: 'devicon-git-plain colored', color: '#f05032' },
      { name: 'Observability', icon: 'fas fa-chart-line', color: '#5eead4' },
      { name: 'PyTest', icon: 'fas fa-vial', color: '#00ccb8' },
      { name: 'Agile', icon: 'fas fa-people-group', color: '#00acc1' },
    ],
  },
];

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
