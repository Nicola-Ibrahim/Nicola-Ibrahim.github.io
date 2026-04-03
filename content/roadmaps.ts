import { RoadmapsData } from '../types';

export const roadmapsData: RoadmapsData = {
  ai_agents: {
    id: 'ai_agents',
    title: 'AI Agent Skills (Antigravity)',
    icon: 'Cpu',
    description: 'A comprehensive collection of prompt templates to configure specialized AI agent skills. Copy these prompts directly into your agent framework.',
    categories: [
      {
        id: 'ai_1',
        title: 'Category 1: Frontend & UI Skills',
        icon: 'Layout',
        tasks: [
          {
            id: 'ai_tsk1',
            title: '1. Brand Identity & UI Enforcer',
            shortDesc: 'Ensure your AI always aligns with brand visual guides and framework constraints.',
            details: 'This skill forces the AI to check mockups and wireframes in the resources folder before writing frontend code.\n\n- **Visual Guide Analysis:** Prevents generic or mismatched UI generation by reviewing design files.\n- **Brand Alignment:** Enforces a specific tone, brand voice, and CSS framework rules.\n- **Standardization:** Automatically generates an ideal component boilerplate matching reference images.',
            prompt: `Create a universal Brand Identity skill. Set up the directory .agent/skills/brand-identity/ with scripts/, resources/, and examples/ folders.
In SKILL.md, add the frontmatter name: enforce-brand-identity and description: Use this skill whenever I ask you to build a new UI component or update the frontend.
Add a strict rule: You must analyze the visual guides in the resources/ folder (like mockups or wireframes) before writing code. Enforce a [Insert Tone] brand voice. For UI code, strictly use [Insert Framework, e.g., Next.js/Tailwind] and align with the provided reference images. Finally, create examples/ideal_component.[ext] showing a perfect boilerplate component.`
          },
          {
            id: 'ai_tsk2',
            title: '2. Accessibility Auditor',
            shortDesc: 'Turn your agent into a strict WCAG 2.1 AA auditor.',
            details: 'Automates deep accessibility checks using standard CLI tools (like axe-core).\n\n- **WCAG 2.1 AA:** Enforces strict adherence to modern accessibility standards.\n- **Semantic Checks:** Reviews ARIA labels, HTML semantics, and keyboard navigability.\n- **Color Contrast:** Prevents hard-to-read color combinations automatically.',
            prompt: `Create an Accessibility Auditor skill. Set up the directory .agent/skills/accessibility-auditor/ with standard subfolders.
In SKILL.md, add name: audit-accessibility and description: Trigger this when I ask to check UI for accessibility, screen reader support, or WCAG compliance.
Instruct the agent to act as a strict WCAG 2.1 AA auditor. It should review UI components for proper ARIA labels, semantic HTML, keyboard navigability, and color contrast. Create a bash script in scripts/run_a11y_check.sh that utilizes standard accessibility CLI tools (like axe-core) if available. Create resources/a11y_checklist.md with common pitfalls to avoid.`
          },
          {
            id: 'ai_tsk3',
            title: '3. Component Storyteller',
            shortDesc: 'Automatically generate Storybook documentation for UI components.',
            details: 'Instructs the agent to isolate UI components and generate comprehensive documentation workflows.\n\n- **Isolated Storybook:** Generates independent \`Component.stories.tsx\` files.\n- **State Coverage:** Automatically covers the default state and all edge-case variants.\n- **Formatting Consistency:** Follows your exact preferred boilerplate for documentation.',
            prompt: `Create a Component Storyteller skill. Set up the directory .agent/skills/component-storyteller/ with standard subfolders.
In SKILL.md, add name: generate-component-stories and description: Trigger this when I ask to document a UI component or write a Storybook file.
Instruct the agent to read the target UI component and generate isolated documentation or stories (e.g., Component.stories.tsx). It must include the default state and all edge-case variants. Create an example in examples/button_story.[ext] demonstrating the exact format I prefer for component documentation.`
          }
        ]
      },
      {
        id: 'ai_2',
        title: 'Category 2: Core Development Skills',
        icon: 'Code2',
        tasks: [
          {
            id: 'ai_tsk4',
            title: '4. The Feature Builder',
            shortDesc: 'Safe scaffolding for new features based on architecture rules.',
            details: 'A constrained skill that ensures the AI reads architecture rules before writing, preventing unexpected overwrites.\n\n- **Rule Enforcement:** Always reads \`architecture_rules.md\` first.\n- **Safe Scaffolding:** Strictly forbidden from modifying existing files without asking.\n- **Boilerplate Scripts:** Uses scripts to generate standard module folders rapidly.',
            prompt: `Create a Feature Builder skill. Set up the directory .agent/skills/feature-builder/ with standard subfolders.
In SKILL.md, add name: feature-builder and description: Trigger this when I ask you to write new features, scaffold files, or generate database models.
Add a strict rule: Always read resources/architecture_rules.md before writing code. Never modify existing files without asking; only scaffold new ones. Create a script in scripts/scaffold.sh that generates standard boilerplate for a new [Insert Framework] module. Create examples/standard_feature.[ext] to show the required folder structure for a new feature.`
          },
          {
            id: 'ai_tsk5',
            title: '5. The Bug Hunter (Read-Only)',
            shortDesc: 'A read-only diagnostic skill to trace stack traces and errors.',
            details: 'A critical safety pattern: creating an agent persona that is explicitly forbidden from modifying code while diagnosing severe errors.\n\n- **Read-Only Constraint:** Guarantees the agent will not rewrite code unexpectedly during a panic.\n- **Stack Trace Analysis:** Searches the codebase for the failing function via grepping.\n- **Step-by-Step Fixes:** Outputs clear explanations and proposed fixes for a human to review.',
            prompt: `Create a Bug Hunter skill. Set up the directory .agent/skills/bug-hunter/ with standard subfolders.
In SKILL.md, add name: bug-hunter and description: Trigger this when I paste an error log, stack trace, or ask why the app is crashing.
Emphasize a strict safety constraint: This is a read-only diagnostic skill. Do NOT rewrite code. Instead, read the error, search the codebase for the failing function, and output a step-by-step explanation of the failure and a proposed fix. Create a script in scripts/search_logs.sh that utilizes grep to find exact error strings in the project.`
          },
          {
            id: 'ai_tsk6',
            title: '6. The Code Reviewer',
            shortDesc: 'An automated senior developer to check for anti-patterns and secrets.',
            details: 'Sets up linting rules and teaches the agent to look for anti-patterns before code is merged.\n\n- **Senior Developer Persona:** Reviews, refactors, and optimizes newly written code.\n- **Security Checks:** Actively scans for hardcoded secrets and DRY (Don\'t Repeat Yourself) violations.\n- **Efficiency Audits:** Identifies missing types and inefficient loops.',
            prompt: `Create a Code Reviewer skill. Set up the directory .agent/skills/code-reviewer/ with standard subfolders.
In SKILL.md, add name: code-reviewer and description: Trigger this when I ask you to review, refactor, or optimize newly written code.
Instruct the agent to act as a senior [Insert Language] developer. It must check for hardcoded secrets, DRY violations, missing types, and inefficient loops. Create resources/clean_code_guidelines.md listing project-specific linting rules. Create a script in scripts/run_linter.sh that executes the project's standard formatting tool.`
          },
          {
            id: 'ai_tsk7',
            title: '7. The Test Writer',
            shortDesc: 'Generate robust unit and edge-case tests automatically.',
            details: 'Forces the agent to adhere to a specific testing framework and mandates aggressive test coverage.\n\n- **Happy Path & Edge Cases:** Requires at least two edge-case tests per function to prevent fragile passing.\n- **Mocking Rules:** Instructs the agent not to mock database calls unless explicitly told.\n- **Structured Output:** Enforces output via an ideal test boilerplate file.',
            prompt: `Create a Test Writer skill. Set up the directory .agent/skills/test-writer/ with standard subfolders.
In SKILL.md, add name: test-writer and description: Trigger this when I ask you to write unit tests, integration tests, or improve test coverage.
Instruct the agent to always use [Insert Testing Framework, e.g., PyTest/Jest]. It must write one 'happy path' test and at least two edge-case tests per function. Do not mock database calls unless told to. Create an example in examples/perfect_test.[ext] showing exactly how to structure the test file.`
          }
        ]
      },
      {
        id: 'ai_3',
        title: 'Category 3: DevOps & Workflow Skills',
        icon: 'GitBranch',
        tasks: [
          {
            id: 'ai_tsk8',
            title: '8. The Git Manager',
            shortDesc: 'Automate Conventional Commits and rich PR summaries.',
            details: 'Teaches the AI to read git diffs safely and generate highly consistent workflow messaging.\n\n- **Conventional Commits:** Enforces strict \`feat:\`, \`fix:\`, \`chore:\` formatting.\n- **Safe Diffing:** Uses scripts to safely extract codebase changes without altering git history.\n- **Rich Summaries:** Auto-fills "What Changed" and "How to Test" PR markdown templates.',
            prompt: `Create a Git Manager skill. Set up the directory .agent/skills/git-manager/ with standard subfolders.
In SKILL.md, add name: git-manager and description: Trigger this when I ask to write a commit message, document a git diff, or write a Pull Request summary.
Instruct the agent to use Conventional Commits (feat:, fix:, chore:, etc.). Create a script in scripts/get_diff.sh that safely runs git diff. In examples/pr_template.md, provide the exact Markdown template the agent should fill out when summarizing code changes (including 'What Changed' and 'How to Test' sections).`
          },
          {
            id: 'ai_tsk9',
            title: '9. The Deployment Manager',
            shortDesc: 'Local build runner with strict production deployment safeguards.',
            details: 'An agent designed to run CI checks locally and verify builds, with a hardcoded rule requiring human confirmation.\n\n- **Local Verification:** Executes standard build commands to catch compilation errors early.\n- **Aggressive Guardrails:** Hardcoded rule requiring explicit confirmation before pushing to prod.\n- **Deployment Prep:** Packages the application safely for release pipelines.',
            prompt: `Create a Deployment Manager skill. Set up the directory .agent/skills/deployment-manager/ with standard subfolders.
In SKILL.md, add name: deployment-manager and description: Trigger this when I ask to build the app, run the CI pipeline locally, or prepare for release.
Instruct the agent to execute the standard build commands for [Insert Stack]. Add a strict safety constraint: It must always ask for explicit confirmation before triggering any deployment to a production environment. Create a script in scripts/run_build.sh that runs the local build and checks for standard compilation errors.`
          },
          {
            id: 'ai_tsk10',
            title: '10. The Database Migrator',
            shortDesc: 'Scaffold schema changes safely with data-loss warnings.',
            details: 'Provides the agent with ORM conventions and mandates aggressive warnings for destructive actions.\n\n- **Data Loss Warnings:** Boldly warns if a migration risks dropping tables or deleting data.\n- **Naming Conventions:** Enforces snake_case or camelCase matching your specific ORM.\n- **Safe Scaffolding:** Uses automated scripts to generate the migration file without auto-applying it.',
            prompt: `Create a Database Migrator skill. Set up the directory .agent/skills/database-migrator/ with standard subfolders.
In SKILL.md, add name: database-migrator and description: Trigger this when I ask to change the database schema, add a table, or run migrations.
Add a critical safety rule: The agent must boldly warn the user if a migration involves dropping a table or deleting data. Instruct it to use [Insert ORM, e.g., Prisma, SQLAlchemy] conventions. Create resources/schema_rules.md explaining naming conventions (e.g., snake_case for columns). Create a script in scripts/generate_migration.sh to scaffold the file.`
          }
        ]
      },
      {
        id: 'ai_4',
        title: 'Category 4: Documentation & Knowledge Skills',
        icon: 'FileText',
        tasks: [
          {
            id: 'ai_tsk11',
            title: '11. The Docs Generator',
            shortDesc: 'Automatically keep your READMEs and OpenAPI specs up to date.',
            details: 'Teaches the AI to read source code routes and output structured markdown documentation.\n\n- **Auto-Updating:** Keeps READMEs and inline comments perfectly in sync with codebase changes.\n- **API Formatting:** Formats outputs strictly to standards like OpenAPI or Swagger.\n- **Clear Layouts:** Follows an example route documentation template to ensure consistency.',
            prompt: `Create a Docs Generator skill. Set up the directory .agent/skills/docs-generator/ with standard subfolders.
In SKILL.md, add name: docs-generator and description: Trigger this when I ask you to update the README, generate API documentation, or write inline comments.
Instruct the agent to read the source code and generate clear, markdown-formatted documentation. For APIs, it should format outputs to match [Insert Standard, e.g., OpenAPI/Swagger]. Create an example in examples/api_endpoint_doc.md showing how a standard route should be documented.`
          },
          {
            id: 'ai_tsk12',
            title: '12. The Architecture Mapper',
            shortDesc: 'Read-only mapping tool to generate Mermaid.js system diagrams.',
            details: 'A powerful architectural tool that scans folder trees and builds visual dependency graphs.\n\n- **Read-Only Scanning:** Safely maps dependencies without modifying core files.\n- **Mermaid.js Output:** Generates beautiful visual diagrams of your system architecture.\n- **Smart Filtering:** Automatically ignores \`node_modules\` or \`venv\` directories.',
            prompt: `Create an Architecture Mapper skill. Set up the directory .agent/skills/architecture-mapper/ with standard subfolders.
In SKILL.md, add name: architecture-mapper and description: Trigger this when I ask you to explain the codebase, map out dependencies, or visualize the system architecture.
Instruct the agent to act as a system architect. It is a read-only skill that scans directory structures and outputs Mermaid.js diagrams or Markdown tree structures. Create a script in scripts/map_directory.sh that outputs the current folder tree, ignoring node_modules or .venv.`
          }
        ]
      }
    ]
  },
  devops: {
    id: 'devops',
    title: 'DevOps & CI/CD Syllabus',
    icon: 'Terminal',
    description: 'A comprehensive, interactive guide focusing on Python, Docker, and GitHub Actions.',
    categories: [
      {
        id: 'c1',
        title: 'Chapter 1: Introduction to CI/CD and GitHub Actions',
        icon: 'BookOpen',
        tasks: [
          { 
            id: 'd1', 
            title: 'What is CI/CD?', 
            shortDesc: 'The core philosophy behind modern software delivery.',
            details: 'Before CI/CD, teams would code in isolation for weeks, leading to "Merge Hell" when combining their work. Deployments were manual, stressful, and heavily prone to human error.\n\n**The Solution: CI/CD**\n\n- **Continuous Integration (CI):** Every time a developer pushes code, an automated server builds the app and runs unit tests. It acts as a gatekeeper, preventing broken code from entering the main branch.\n- **Continuous Delivery (CD):** Once code passes CI, it is automatically packaged and staged for release. A human just clicks "Approve" to deploy.\n- **Continuous Deployment (CD):** Takes it a step further—every change that passes tests goes straight to live users automatically, with no human intervention.\n- **The Impact:** You stop deploying massive, risky updates once a month and start deploying tiny, safe, easily revertible changes ten times a day.',
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
          }
        ]
      }
    ]
  },
  backend: {
    id: 'backend',
    title: 'Backend Architecture Syllabus',
    icon: 'Database',
    description: 'Designing robust APIs, Databases, and High-Performance Systems.',
    categories: [
      {
        id: 'b2',
        title: 'Module 2: Pub/Sub & Async Messaging',
        icon: 'Waypoints',
        tasks: [
          { 
            id: 'bk2_0', 
            title: '1. Sync vs Async vs Parallelism', 
            shortDesc: 'Understanding execution models: Blocking, Concurrency, and CPU-bound math.',
            details: 'Understanding the difference between blocking, concurrent, and parallel execution is crucial for backend performance.\n\n- **Synchronous (Sync):** One task at a time. Blocking.\n- **Asynchronous (Async):** Juggling multiple tasks by never wasting time waiting for I/O.\n- **Parallelism:** Executing multiple tasks simultaneously on separate CPU cores.',
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 'bk2_0b',
            title: '2. Deep Dive: Inside the Event Loop',
            shortDesc: 'A step-by-step interactive look at how Coroutines achieve massive concurrency.',
            details: 'The magic of asynchronous programming is that the computer never waits. Interact with the visualization below to step through exactly how it works.',
          }
        ]
      }
    ]
  }
};
