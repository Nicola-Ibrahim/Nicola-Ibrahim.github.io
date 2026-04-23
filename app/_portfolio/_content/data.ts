export const skills = [
  // DevOps & Cloud
  { name: "AWS", icon: "devicon-amazonwebservices-plain colored", color: "#ff9900", category: "devops-cloud" },
  { name: "Azure", icon: "devicon-azure-plain colored", color: "#0078d4", category: "devops-cloud" },
  { name: "Docker & Compose", icon: "devicon-docker-plain colored", color: "#2496ed", category: "devops-cloud" },
  { name: "CI/CD", icon: "fas fa-arrows-rotate", color: "#2dd4bf", category: "devops-cloud" },
  { name: "GitHub Actions", icon: "devicon-github-original colored", color: "#ffffff", category: "devops-cloud" },
  // { name: "GitLab CI", icon: "devicon-gitlab-plain colored", color: "#e24329", category: "devops-cloud" },

  // Backend
  { name: "Python", icon: "devicon-python-plain colored", color: "#3776ab", category: "backend" },
  { name: "FastAPI", icon: "devicon-fastapi-plain colored", color: "#05998b", category: "backend" },
  { name: "Django", icon: "devicon-django-plain", color: "#2ba977", category: "backend" },
  { name: "RESTful APIs", icon: "fas fa-code", color: "#4ade80", category: "backend" },

  // Database
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", color: "#336791", category: "database" },
  { name: "ORMs", icon: "fas fa-cubes", color: "#009688", category: "database" },
  { name: "Redis", icon: "devicon-redis-plain colored", color: "#dc382d", category: "database" },

  // Data & AI
  { name: "Data-Driven Modeling", icon: "fas fa-microchip", color: "#5eead4", category: "data-ai" },
  { name: "Pandas", icon: "devicon-pandas-plain", color: "#64b5f6", category: "data-ai" },
  { name: "NumPy", icon: "devicon-numpy-plain", color: "#4dabcf", category: "data-ai" },
  { name: "PyTorch", icon: "devicon-pytorch-plain colored", color: "#ee4c2c", category: "data-ai" },

  // Frontend (Supporting)
  { name: "HTML", icon: "devicon-html5-plain colored", color: "#e34c26", category: "frontend" },
  { name: "CSS", icon: "devicon-css3-plain colored", color: "#264de4", category: "frontend" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored", color: "#f7df1e", category: "frontend" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored", color: "#3178c6", category: "frontend" },
  { name: "Next.js", icon: "devicon-nextjs-plain colored", color: "#ffffff", category: "frontend" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored", color: "#06b6d4", category: "frontend" },

  // Other & Skills
  { name: "Domain-Driven Design", icon: "fas fa-diagram-project", color: "#4ade80", category: "other-skills" },
  { name: "System Architecture", icon: "fas fa-layer-group", color: "#009688", category: "other-skills" },
  { name: "System Optimization", icon: "fas fa-gauge-high", color: "#2dd4bf", category: "other-skills" },
  { name: "Git & Version Control", icon: "devicon-git-plain colored", color: "#f05032", category: "other-skills" },
  { name: "Observability", icon: "fas fa-chart-line", color: "#5eead4", category: "other-skills" },
  { name: "PyTest", icon: "fas fa-vial", color: "#00ccb8", category: "other-skills" },
  { name: "Agile", icon: "fas fa-people-group", color: "#00acc1", category: "other-skills" },
];

export const projects = [
  {
    title: "Tracing Objectives Backwards",
    category: "System Optimization / Research",
    description: "Solving the inverse engineering problem through geometric search and mathematical modeling. The engine maps target outcomes back to feasible parameters using a high-dimensional search layer, containerized and deployed with modern CI/CD.",
    tags: ["Python", "FastAPI", "DDD", "Docker", "CI/CD"],
    image: "/images/projects/trace_engine.png",
    demoUrl: "https://tracing-objectives-backwards-frontend.onrender.com/",
    githubUrls: [
      { label: "Backend", url: "https://github.com/Nicola-Ibrahim/Tracing-Objectives-Backwards-backend" },
      { label: "Frontend", url: "https://github.com/Nicola-Ibrahim/Tracing-Objectives-Backwards-front" }
    ],
    caseStudyUrl: "/projects/tracing-objectives-backwards",
    icon: null,
    highlightColor: "primary"
  },
/*
  {
    title: "Bot System",
    category: "Backend / Infrastructure / DDD",
    description: "A unified multi-LLM orchestration backend built with FastAPI and Domain-Driven Design. It concurrently routes and aggregates responses from various AI providers through a modular service architecture.",
    tags: ["FastAPI", "DDD", "Docker", "PostgreSQL"],
    image: null,
    icon: "fas fa-server",
    githubUrls: [
      { label: "Code", url: "https://github.com/Nicola-Ibrahim/Bot-Chatting" }
    ],
    caseStudyUrl: "/projects/bot-system",
    highlightColor: "secondary"
  },
  {
    title: "IAM Identity Service",
    category: "Security / Identity Management",
    description: "A centralized Identity and Access Management service built with Django and JWT. Focused on stateless token lifecycle management, secure session termination, and establishing standard security protocols.",
    tags: ["Django", "JWT", "Python"],
    image: null,
    icon: "fas fa-shield-alt",
    githubUrls: [
      { label: "Code", url: "https://github.com/Nicola-Ibrahim/User-Authenticator" }
    ],
    caseStudyUrl: "/projects/iam-identity-service",
    highlightColor: "accent"
  }
*/
];
