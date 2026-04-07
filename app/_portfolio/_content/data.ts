export const skills = [
  // DevOps & Cloud
  { name: "AWS", icon: "devicon-amazonwebservices-plain colored", color: "#ff9900", category: "devops-cloud" },
  { name: "Azure", icon: "devicon-azure-plain colored", color: "#0078d4", category: "devops-cloud" },
  { name: "Docker & Compose", icon: "devicon-docker-plain colored", color: "#2496ed", category: "devops-cloud" },
  { name: "CI/CD", icon: "fas fa-arrows-rotate", color: "#2dd4bf", category: "devops-cloud" },
  { name: "GitHub Actions", icon: "devicon-github-original colored", color: "#ffffff", category: "devops-cloud" },
  { name: "GitLab CI", icon: "devicon-gitlab-plain colored", color: "#e24329", category: "devops-cloud" },

  // Backend
  { name: "Python", icon: "devicon-python-plain colored", color: "#3776ab", category: "backend" },
  { name: "FastAPI", icon: "devicon-fastapi-plain colored", color: "#05998b", category: "backend" },
  { name: "Django", icon: "devicon-django-plain", color: "#2ba977", category: "backend" },
  { name: "RESTful APIs", icon: "fas fa-code", color: "#4ade80", category: "backend" },

  // Database
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", color: "#336791", category: "database" },
  { name: "Relational Databases (SQL)", icon: "fas fa-database", color: "#4479A1", category: "database" },
  { name: "ORMs (SQLAlchemy, etc.)", icon: "fas fa-cubes", color: "#009688", category: "database" },
  { name: "Redis", icon: "devicon-redis-plain colored", color: "#dc382d", category: "database" },

  // Data & AI
  { name: "Data-Driven Modeling", icon: "fas fa-microchip", color: "#5eead4", category: "data-ai" },
  { name: "Pandas", icon: "devicon-pandas-plain", color: "#64b5f6", category: "data-ai" },
  { name: "NumPy", icon: "devicon-numpy-plain", color: "#4dabcf", category: "data-ai" },
  { name: "PyTorch", icon: "devicon-pytorch-plain colored", color: "#ee4c2c", category: "data-ai" },

  // Frontend (Supporting)
  { name: "Next.js", icon: "devicon-nextjs-plain colored", color: "#ffffff", category: "frontend" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored", color: "#06b6d4", category: "frontend" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored", color: "#3178c6", category: "frontend" },

  // Other & Skills
  { name: "Domain-Driven Design (DDD)", icon: "fas fa-diagram-project", color: "#4ade80", category: "other-skills" },
  { name: "System Architecture / Microservices", icon: "fas fa-layer-group", color: "#009688", category: "other-skills" },
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
    description: "An inverse exploration system for high-dimensional design problems. The backend engine maps complex target outcomes back to feasible input parameters using advanced search algorithms and data-driven models.",
    tags: ["Distributed Search", "Python", "System Optimization"],
    image: "/images/projects/trace_engine.png",
    demoUrl: "https://tracing-objectives-backwards.vercel.app/",
    githubUrl: "https://github.com/Nicola-Ibrahim/Tracing-Objectives-Backwards",
    highlightColor: "primary"
  },
  {
    title: "Enterprise Bot System",
    category: "Backend / Infrastructure / DDD",
    description: "A modular messaging infrastructure built with FastAPI following Domain-Driven Design principles. The system implements a robust service layer and a containerized deployment strategy for scalable bot management.",
    tags: ["FastAPI", "PostgreSQL", "Docker Architecture"],
    image: null,
    icon: "fas fa-server",
    githubUrl: "https://github.com/Nicola-Ibrahim/Bot-Chatting",
    highlightColor: "secondary"
  },
  {
    title: "IAM Identity Service",
    category: "Security / Identity Management",
    description: "A secure identity and access management service using Django REST Framework and JWT. Focused on session persistence, token lifecycle management, and implementing standard security protocols for internal services.",
    tags: ["Django", "IAM", "Security Standards"],
    image: null,
    icon: "fas fa-shield-alt",
    githubUrl: "https://github.com/Nicola-Ibrahim/User-Authenticator",
    highlightColor: "accent"
  }
];
