import React, { ReactNode } from 'react';
import { 
  GitBranch, 
  Cloud, 
  Server, 
  Network, 
  Terminal,
  ChevronDown,
  BookOpen,
  Code2,
  Box,
  Layers,
  ShieldCheck,
  Waypoints,
  ExternalLink,
  Target,
  Cpu,
  Sparkles,
  Copy,
  Check,
  Layout,
  Database,
  FileText
} from 'lucide-react';

import AsyncDecisionFlowchart from '@/app/roadmap/_components/AsyncDecisionFlowchart';
import ThreadsVsCoroutines from '@/app/roadmap/_components/ThreadsVsCoroutines';
import EventLoopStepper from '@/app/roadmap/_components/EventLoopStepper';
import NotificationStrategies from '@/app/roadmap/_components/NotificationStrategies';

// --- Types & Interfaces ---
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
  customUI?: ReactNode;
  links?: TaskLink[];
}

export interface Category {
  id: string;
  title: string;
  icon: ReactNode;
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

// --- Reusable Image Constants ---
const IMG_CODE = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
const IMG_SERVER = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80";
const IMG_ABSTRACT = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
const IMG_DOCKER = "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80";
const IMG_DATA = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80";
const IMG_ALGO = "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80";
const IMG_GRAPH = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
const IMG_SEARCH = "https://images.unsplash.com/photo-1461301214746-1e109215d6d3?auto=format&fit=crop&w=800&q=80";
const IMG_STACK = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80";
const IMG_TREE = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80";
const IMG_BACKTRACK = "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=800&q=80";
const IMG_BINARY = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80";
const IMG_MATRIX = "https://images.unsplash.com/photo-1506456181741-94576307775a?auto=format&fit=crop&w=800&q=80";
const IMG_NETWORK = "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80";
const IMG_QUEUE = "https://images.unsplash.com/photo-1587293852726-6947ddc8cb65?auto=format&fit=crop&w=800&q=80";
const IMG_BROADCAST = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80";
const IMG_MONOLITH = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80";
const IMG_SERVERLESS = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80";
const IMG_LOAD_BALANCER = "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80";
const IMG_DESIGN = "https://images.unsplash.com/photo-1507238692062-5409ee580cfa?auto=format&fit=crop&w=800&q=80";

export const roadmapsData: RoadmapsData = {
  ai_agents: {
    id: 'ai_agents',
    title: 'AI Agent Skills (Antigravity)',
    icon: <Cpu className="w-5 h-5" />,
    description: 'A comprehensive collection of prompt templates to configure specialized AI agent skills. Copy these prompts directly into your agent framework.',
    categories: [
      {
        id: 'ai_1',
        title: 'Category 1: Frontend & UI Skills',
        icon: <Layout className="w-6 h-6 text-pink-500" />,
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
            details: 'Instructs the agent to isolate UI components and generate comprehensive documentation workflows.\n\n- **Isolated Storybook:** Generates independent `Component.stories.tsx` files.\n- **State Coverage:** Automatically covers the default state and all edge-case variants.\n- **Formatting Consistency:** Follows your exact preferred boilerplate for documentation.',
            prompt: `Create a Component Storyteller skill. Set up the directory .agent/skills/component-storyteller/ with standard subfolders.
In SKILL.md, add name: generate-component-stories and description: Trigger this when I ask to document a UI component or write a Storybook file.
Instruct the agent to read the target UI component and generate isolated documentation or stories (e.g., Component.stories.tsx). It must include the default state and all edge-case variants. Create an example in examples/button_story.[ext] demonstrating the exact format I prefer for component documentation.`
          }
        ]
      },
      {
        id: 'ai_2',
        title: 'Category 2: Core Development Skills',
        icon: <Code2 className="w-6 h-6 text-indigo-500" />,
        tasks: [
          {
            id: 'ai_tsk4',
            title: '4. The Feature Builder',
            shortDesc: 'Safe scaffolding for new features based on architecture rules.',
            details: 'A constrained skill that ensures the AI reads architecture rules before writing, preventing unexpected overwrites.\n\n- **Rule Enforcement:** Always reads `architecture_rules.md` first.\n- **Safe Scaffolding:** Strictly forbidden from modifying existing files without asking.\n- **Boilerplate Scripts:** Uses scripts to generate standard module folders rapidly.',
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
        icon: <GitBranch className="w-6 h-6 text-emerald-500" />,
        tasks: [
          {
            id: 'ai_tsk8',
            title: '8. The Git Manager',
            shortDesc: 'Automate Conventional Commits and rich PR summaries.',
            details: 'Teaches the AI to read git diffs safely and generate highly consistent workflow messaging.\n\n- **Conventional Commits:** Enforces strict `feat:`, `fix:`, `chore:` formatting.\n- **Safe Diffing:** Uses scripts to safely extract codebase changes without altering git history.\n- **Rich Summaries:** Auto-fills "What Changed" and "How to Test" PR markdown templates.',
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
        icon: <FileText className="w-6 h-6 text-yellow-500" />,
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
            details: 'A powerful architectural tool that scans folder trees and builds visual dependency graphs.\n\n- **Read-Only Scanning:** Safely maps dependencies without modifying core files.\n- **Mermaid.js Output:** Generates beautiful visual diagrams of your system architecture.\n- **Smart Filtering:** Automatically ignores `node_modules` or `venv` directories.',
            prompt: `Create an Architecture Mapper skill. Set up the directory .agent/skills/architecture-mapper/ with standard subfolders.
In SKILL.md, add name: architecture-mapper and description: Trigger this when I ask you to explain the codebase, map out dependencies, or visualize the system architecture.
Instruct the agent to act as a system architect. It is a read-only skill that scans directory structures and outputs Mermaid.js diagrams or Markdown tree structures. Create a script in scripts/map_directory.sh that outputs the current folder tree, ignoring node_modules or .venv.`
          }
        ]
      }
    ]
  },
  algorithms: {
    id: 'algorithms',
    title: 'Algorithms & Data Structures',
    icon: <Waypoints className="w-5 h-5" />,
    description: 'A comprehensive interview prep guide. Master problem-solving patterns (AlgoExpert/NeetCode style) to ace technical interviews.',
    categories: [
      {
        id: 'algo_1',
        title: 'Module 1: Arrays, Strings & Searching',
        icon: <Layers className="w-6 h-6 text-indigo-500" />,
        tasks: [
          { 
            id: 'a1', 
            title: 'Arrays, Strings & Hash Maps', 
            shortDesc: 'The foundation of O(1) lookups and data manipulation.',
            details: 'Hash maps trade space for time, giving you O(1) lookups. This is usually the first optimization step in brute-force O(N^2) array problems.\n\n- **Frequency Counters:** Count occurrences of elements to quickly solve anagram or duplicate problems.\n- **Prefix Sums:** Pre-calculate running totals to optimize subarray computations.\n- **Index Mapping:** Store elements alongside their indices for fast retrieval (e.g., Two Sum).',
            image: IMG_CODE,
            links: [
              { label: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
              { label: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/" },
              { label: "Contains Duplicate", url: "https://leetcode.com/problems/contains-duplicate/" },
              { label: "Group Anagrams", url: "https://leetcode.com/problems/group-anagrams/" },
              { label: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/" }
            ]
          },
          { 
            id: 'a2', 
            title: 'Two Pointers & Sliding Window', 
            shortDesc: 'Optimizing O(N^2) nested loops into O(N) linear time.',
            details: 'Two Pointers are used when traversing sorted arrays or finding pairs. Sliding Window is a subset used to find contiguous subarrays.\n\n- **Opposite Ends:** Move left and right pointers inward to find pairs (e.g., Valid Palindrome).\n- **Sliding Window:** Expand the window by moving the right pointer, and shrink it by moving the left pointer.\n- **Optimization:** Converts nested O(N^2) loops into linear O(N) time.',
            image: IMG_ABSTRACT,
            links: [
              { label: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome/" },
              { label: "3Sum", url: "https://leetcode.com/problems/3sum/" },
              { label: "Container With Most Water", url: "https://leetcode.com/problems/container-with-most-water/" },
              { label: "Best Time to Buy & Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
              { label: "Longest Substring Without Repeating", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" }
            ]
          },
          { 
            id: 'a2b', 
            title: 'Binary Search', 
            shortDesc: 'Divide and conquer in O(log N) time on sorted data.',
            details: 'Binary search isn\'t just for finding elements in a sorted array; it\'s a powerful divide-and-conquer strategy.\n\n- **O(log N) Time:** Slashes search space in half at every step.\n- **Search on Answer:** Used to find optimal solutions in a range (e.g., Koko Eating Bananas).\n- **Key Challenge:** Identifying the monotonic property and managing left/right pointer edge cases.',
            image: IMG_SEARCH,
            links: [
              { label: "Binary Search", url: "https://leetcode.com/problems/binary-search/" },
              { label: "Search a 2D Matrix", url: "https://leetcode.com/problems/search-a-2d-matrix/" },
              { label: "Koko Eating Bananas", url: "https://leetcode.com/problems/koko-eating-bananas/" },
              { label: "Find Minimum in Rotated Sorted Array", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" }
            ]
          }
        ]
      },
      {
        id: 'algo_2',
        title: 'Module 2: Linear Data Structures',
        icon: <GitBranch className="w-6 h-6 text-emerald-500" />,
        tasks: [
          { 
            id: 'a2c', 
            title: 'Stacks & Queues', 
            shortDesc: 'LIFO and FIFO structures, including the Monotonic Stack pattern.',
            details: 'Stacks (Last-In-First-Out) are crucial for parsing, while Queues (First-In-First-Out) manage sequences.\n\n- **Parsing & State:** Stacks are perfect for validating parentheses or evaluating Reverse Polish Notation.\n- **Monotonic Stacks:** Maintain strictly increasing or decreasing elements to find the "next greater element" in O(N) time.\n- **Queues:** Used for BFS and managing sequential processing.',
            image: IMG_STACK,
            links: [
              { label: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/" },
              { label: "Min Stack", url: "https://leetcode.com/problems/min-stack/" },
              { label: "Evaluate Reverse Polish Notation", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
              { label: "Daily Temperatures (Monotonic)", url: "https://leetcode.com/problems/daily-temperatures/" }
            ]
          },
          { 
            id: 'a3', 
            title: 'Linked Lists', 
            shortDesc: 'Mastering node manipulation, dummy nodes, and slow/fast pointers.',
            details: 'Linked lists test your ability to manage references and memory pointers without losing data.\n\n- **Dummy Nodes:** An essential trick to cleanly handle edge cases (like modifying the head of the list).\n- **Tortoise and Hare:** Using a fast (2x) and slow (1x) pointer to detect cycles or find the middle element.\n- **In-Place Reversal:** Carefully swapping `.next` pointers without allocating new memory.',
            image: IMG_DATA,
            links: [
              { label: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
              { label: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
              { label: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/" },
              { label: "Remove Nth Node From End", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" }
            ]
          }
        ]
      },
      {
        id: 'algo_3',
        title: 'Module 3: Trees, Tries & Heaps',
        icon: <Box className="w-6 h-6 text-yellow-500" />,
        tasks: [
          { 
            id: 'a4', 
            title: 'Binary Trees & BSTs', 
            shortDesc: 'Unlocking the power of Recursion and Depth-First Search (DFS).',
            details: 'Trees are inherently recursive data structures. Binary Search Trees (BST) add the property that left children are smaller, right are larger.\n\n- **DFS Traversals:** Master Pre-order, In-order, and Post-order recursive visits.\n- **The Call Stack:** Understand how data flows UP the recursive stack (return values) and DOWN (parameters).\n- **BFS Level Order:** Using a Queue to process a tree layer by layer.',
            image: IMG_TREE,
            links: [
              { label: "Invert Binary Tree", url: "https://leetcode.com/problems/invert-binary-tree/" },
              { label: "Maximum Depth", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
              { label: "Same Tree", url: "https://leetcode.com/problems/same-tree/" },
              { label: "Lowest Common Ancestor", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
              { label: "Binary Tree Level Order Traversal (BFS)", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" }
            ]
          },
          { 
            id: 'a4b', 
            title: 'Heaps & Priority Queues', 
            shortDesc: 'Maintaining running minimums and maximums in O(1) time.',
            details: 'Heaps are complete binary trees that satisfy the heap property, used to quickly fetch the largest or smallest element.\n\n- **O(1) Min/Max Access:** Instantly retrieve the highest priority element.\n- **Top K Problems:** The most efficient way to find the Kth largest element in a stream.\n- **Running Medians:** Using a Max-Heap and Min-Heap together to track medians dynamically.',
            image: IMG_ALGO,
            links: [
              { label: "Kth Largest Element in a Stream", url: "https://leetcode.com/problems/kth-largest-element-in-a-stream/" },
              { label: "Last Stone Weight", url: "https://leetcode.com/problems/last-stone-weight/" },
              { label: "Task Scheduler", url: "https://leetcode.com/problems/task-scheduler/" },
              { label: "Find Median from Data Stream", url: "https://leetcode.com/problems/find-median-from-data-stream/" }
            ]
          },
          { 
            id: 'a4c', 
            title: 'Tries (Prefix Trees)', 
            shortDesc: 'Tree-like structures for hyper-efficient string matching.',
            details: 'Tries store characters in nodes, making them incredibly fast for word validation and prefix searches.\n\n- **O(L) Time Complexity:** Searches take time proportional to the length of the word (L), not the number of words.\n- **Autocomplete Systems:** The foundational data structure behind search bar suggestions.\n- **Efficient Storage:** Shares common prefixes to save memory compared to Hash Sets.',
            image: IMG_DATA,
            links: [
              { label: "Implement Trie (Prefix Tree)", url: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
              { label: "Design Add and Search Words", url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
              { label: "Word Search II", url: "https://leetcode.com/problems/word-search-ii/" }
            ]
          }
        ]
      },
      {
        id: 'algo_4',
        title: 'Module 4: Backtracking & Graphs',
        icon: <Network className="w-6 h-6 text-purple-500" />,
        tasks: [
          { 
            id: 'a4d', 
            title: 'Backtracking', 
            shortDesc: 'Exploring all possibilities and abandoning dead ends.',
            details: 'Backtracking explores all possibilities by aggressively pruning dead ends via recursion.\n\n- **The Core Pattern:** Make a choice, recurse, then *undo* the choice (backtrack) to explore the next path.\n- **Combinatorics:** Essential for generating all combinations, permutations, or subsets.\n- **Pruning:** Adding conditions to stop recursing early when a path is guaranteed to fail.',
            image: IMG_BACKTRACK,
            links: [
              { label: "Subsets", url: "https://leetcode.com/problems/subsets/" },
              { label: "Combination Sum", url: "https://leetcode.com/problems/combination-sum/" },
              { label: "Permutations", url: "https://leetcode.com/problems/permutations/" },
              { label: "Word Search", url: "https://leetcode.com/problems/word-search/" }
            ]
          },
          { 
            id: 'a5', 
            title: 'Graphs & Union Find', 
            shortDesc: 'Navigating nodes, edges, islands, and shortest paths.',
            details: 'Graphs represent relationships between entities using nodes and edges.\n\n- **Breadth-First Search (BFS):** Uses a Queue. Ideal for finding the shortest path in unweighted graphs.\n- **Depth-First Search (DFS):** Uses a Stack or recursion. Ideal for exhaustive searches and island counting.\n- **Union Find (Disjoint Set):** An advanced structure perfect for grouping connected components or detecting cycles.',
            image: IMG_GRAPH,
            links: [
              { label: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/" },
              { label: "Clone Graph", url: "https://leetcode.com/problems/clone-graph/" },
              { label: "Course Schedule (Topological Sort)", url: "https://leetcode.com/problems/course-schedule/" },
              { label: "Redundant Connection (Union Find)", url: "https://leetcode.com/problems/redundant-connection/" }
            ]
          },
          { 
            id: 'a5b', 
            title: 'Advanced Graphs (Shortest Path)', 
            shortDesc: 'Dijkstra\'s, Bellman-Ford, and Minimum Spanning Trees.',
            details: 'Advanced graphs deal with weighted edges where simple BFS/DFS isn\'t enough to find the cheapest route.\n\n- **Dijkstra\'s Algorithm:** Uses a Min-Heap to find the shortest path in graphs with positive weights.\n- **Bellman-Ford:** Capable of finding shortest paths even with negative edge weights.\n- **Minimum Spanning Trees:** Kruskal\'s or Prim\'s algorithms connect all nodes with minimal total cost.',
            image: IMG_NETWORK,
            links: [
              { label: "Network Delay Time (Dijkstra)", url: "https://leetcode.com/problems/network-delay-time/" },
              { label: "Cheapest Flights Within K Stops", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
              { label: "Min Cost to Connect All Points (MST)", url: "https://leetcode.com/problems/min-cost-to-connect-all-points/" }
            ]
          }
        ]
      },
      {
        id: 'algo_5',
        title: 'Module 5: Optimization & Logic',
        icon: <Target className="w-6 h-6 text-rose-500" />,
        tasks: [
          { 
            id: 'a6', 
            title: 'Dynamic Programming (1D & 2D)', 
            shortDesc: 'Trading space for time by caching overlapping subproblems.',
            details: 'Dynamic Programming solves complex problems by caching the results of overlapping subproblems.\n\n- **Memoization (Top-Down):** Start with a recursive tree and cache the results to prevent duplicate work.\n- **Tabulation (Bottom-Up):** Build the solution iteratively using an array or matrix.\n- **Identifying DP:** Look for questions asking for the "maximum/minimum" or "number of ways" involving overlapping decisions.',
            image: IMG_ABSTRACT,
            links: [
              { label: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
              { label: "Coin Change", url: "https://leetcode.com/problems/coin-change/" },
              { label: "House Robber", url: "https://leetcode.com/problems/house-robber/" },
              { label: "Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
              { label: "Unique Paths (2D)", url: "https://leetcode.com/problems/unique-paths/" }
            ]
          },
          { 
            id: 'a7', 
            title: 'Greedy Algorithms & Intervals', 
            shortDesc: 'Making locally optimal choices to find a global optimum.',
            details: 'Greedy algorithms pick the best immediate option without looking ahead, hoping it leads to a global optimum.\n\n- **Local Optimums:** Making the most profitable choice at the current step.\n- **Interval Scheduling:** Heavily used for sorting intervals by start or end times to find overlaps.\n- **The Challenge:** Proving mathematically that the greedy choice will not trap you in a sub-optimal solution.',
            image: IMG_CODE,
            links: [
              { label: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/" },
              { label: "Jump Game", url: "https://leetcode.com/problems/jump-game/" },
              { label: "Merge Intervals", url: "https://leetcode.com/problems/merge-intervals/" },
              { label: "Non-overlapping Intervals", url: "https://leetcode.com/problems/non-overlapping-intervals/" }
            ]
          }
        ]
      },
      {
        id: 'algo_6',
        title: 'Module 6: Math, Geometry & Bit Manipulation',
        icon: <Terminal className="w-6 h-6 text-slate-500" />,
        tasks: [
          { 
            id: 'a8', 
            title: 'Bit Manipulation', 
            shortDesc: 'Working directly with binary representations for extreme optimization.',
            details: 'Bitwise operations are executed directly by the CPU ALU, making them incredibly fast and memory efficient.\n\n- **XOR Magic:** `x ^ x = 0`. Incredibly powerful for finding unique, non-repeating elements.\n- **Shifting:** `<<` and `>>` physically move bits to multiply or divide by 2 instantly.\n- **Masking:** Using AND (`&`) operators to count the number of 1s or isolate specific bits.',
            image: IMG_BINARY,
            links: [
              { label: "Single Number", url: "https://leetcode.com/problems/single-number/" },
              { label: "Number of 1 Bits", url: "https://leetcode.com/problems/number-of-1-bits/" },
              { label: "Reverse Bits", url: "https://leetcode.com/problems/reverse-bits/" },
              { label: "Missing Number", url: "https://leetcode.com/problems/missing-number/" }
            ]
          },
          { 
            id: 'a9', 
            title: 'Math & Matrix Simulation', 
            shortDesc: '2D grid simulation, spiral traversals, and basic number theory.',
            details: 'Matrix problems often test your ability to simulate a specific physical process or navigate coordinates.\n\n- **Grid Simulation:** Rotating 2D arrays in-place or executing spiral traversals.\n- **Boundary Tracking:** Keeping strict track of top, bottom, left, and right bounds during loops.\n- **Number Theory:** Handling modular arithmetic or tricky edge cases with 32-bit integer overflows.',
            image: IMG_MATRIX,
            links: [
              { label: "Rotate Image", url: "https://leetcode.com/problems/rotate-image/" },
              { label: "Spiral Matrix", url: "https://leetcode.com/problems/spiral-matrix/" },
              { label: "Set Matrix Zeroes", url: "https://leetcode.com/problems/set-matrix-zeroes/" },
              { label: "Happy Number", url: "https://leetcode.com/problems/happy-number/" }
            ]
          }
        ]
      }
    ]
  },
  devops: {
    id: 'devops',
    title: 'DevOps & CI/CD Syllabus',
    icon: <Terminal className="w-5 h-5" />,
    description: 'A comprehensive, interactive guide focusing on Python, Docker, and GitHub Actions.',
    categories: [
      {
        id: 'c1',
        title: 'Chapter 1: Introduction to CI/CD and GitHub Actions',
        icon: <BookOpen className="w-6 h-6 text-blue-500" />,
        tasks: [
          { 
            id: 'd1', 
            title: 'What is CI/CD?', 
            shortDesc: 'The core philosophy behind modern software delivery.',
            details: 'Before CI/CD, teams would code in isolation for weeks, leading to "Merge Hell" when combining their work. Deployments were manual, stressful, and heavily prone to human error.\n\n**The Solution: CI/CD**\n\n- **Continuous Integration (CI):** Every time a developer pushes code, an automated server builds the app and runs unit tests. It acts as a gatekeeper, preventing broken code from entering the main branch.\n- **Continuous Delivery (CD):** Once code passes CI, it is automatically packaged and staged for release. A human just clicks "Approve" to deploy.\n- **Continuous Deployment (CD):** Takes it a step further—every change that passes tests goes straight to live users automatically, with no human intervention.\n- **The Impact:** You stop deploying massive, risky updates once a month and start deploying tiny, safe, easily revertible changes ten times a day.',
            image: IMG_ABSTRACT
          },
          { 
            id: 'd2', 
            title: 'Introduction to GitHub Actions', 
            shortDesc: 'Native automation directly inside your code repository.',
            details: 'Historically, your code lived in Git, but your automation lived on a completely separate server. This caused a disconnect between the code and the pipeline that deployed it.\n\n**The Concept**\n\n- **Native Integration:** GitHub Actions brings the CI/CD pipeline directly into your repository. Your pipeline is just another file (`.github/workflows/main.yml`) that lives alongside your application code.\n- **Infrastructure as Code:** Because the pipeline is defined in YAML and version-controlled, you can review changes to your deployment process exactly like you review a code Pull Request.\n- **Event-Driven Execution:** Workflows don\'t just trigger on pushes. You can trigger them when an issue is opened, a comment is made, or a release is tagged.',
            image: IMG_CODE
          },
          { 
            id: 'd3', 
            title: 'How GitHub Actions compares to others', 
            shortDesc: 'GitHub Actions vs GitLab CI, Jenkins, and CircleCI.',
            details: 'Understanding the broader ecosystem helps you architect the right solution for your company size.\n\n**The Comparisons**\n\n- **Jenkins:** The grandfather of CI/CD. It is incredibly powerful but requires a dedicated DevOps engineer just to maintain the Jenkins master/worker servers. GitHub Actions eliminates this overhead since it is fully managed (SaaS).\n- **GitLab CI:** Very similar to GitHub Actions. It popularized the YAML-in-repo approach. However, GitHub Actions currently has a massive edge due to its open-source "Marketplace."\n- **The Marketplace Advantage:** Instead of writing complex bash scripts to install Node.js or configure AWS, you can just use `actions/setup-node` built by the community. It turns complex scripting into simple plug-and-play blocks.',
            image: IMG_SERVER
          }
        ]
      },
      {
        id: 'c2',
        title: 'Chapter 2: Core Concepts of GitHub Actions',
        icon: <Layers className="w-6 h-6 text-indigo-500" />,
        tasks: [
          { 
            id: 'd4', 
            title: 'Workflows, Jobs, and Steps', 
            shortDesc: 'The hierarchy of GitHub Actions architecture.',
            details: 'To write efficient pipelines, you must understand the structural hierarchy of GitHub Actions.\n\n**The Anatomy of a Pipeline**\n\n- **Workflow:** The top-level automation process defined in a single YAML file (e.g., "Build and Deploy to Prod").\n- **Job:** A Workflow contains one or more Jobs. **Crucial detail:** Jobs run in parallel by default, and each Job spins up on a completely fresh, isolated Virtual Machine.\n- **Step:** A Job contains a sequence of Steps. These run sequentially on the same VM. A Step can either be a simple shell command (`run: npm test`) or a pre-built Action (`uses: actions/checkout@v3`).',
            image: IMG_DATA
          },
          { 
            id: 'd5', 
            title: 'Executing Workflows Manually', 
            shortDesc: 'Using the workflow_dispatch event trigger.',
            details: 'Not every script should run automatically on a git push. Sometimes you need a literal button in the UI to trigger an operational task.\n\n**The `workflow_dispatch` Trigger**\n\n- **Manual Execution:** Adding `on: workflow_dispatch` to your YAML allows team members to run the pipeline directly from the "Actions" tab in GitHub.\n- **Dynamic Inputs:** You can configure this trigger to ask the user for inputs before running. For example, a dropdown menu asking "Which environment do you want to deploy to? (Dev/Staging/Prod)".\n- **Use Cases:** Perfect for manual database migrations, rollback scripts, or triggering heavy data-processing jobs on demand.',
            image: IMG_CODE
          },
          { 
            id: 'd6', 
            title: 'Dependencies between jobs (needs)', 
            shortDesc: 'Creating sequential stages in your pipeline.',
            details: 'Because Jobs run in parallel by default, a basic pipeline will try to deploy your code at the exact same time it runs your tests. This will break your deployment.\n\n**Orchestrating the Flow**\n\n- **The `needs` Keyword:** By adding `needs: [test_job]` to your `deploy_job`, you force the deployment to wait. It will only execute if the tests pass successfully.\n- **Creating Stages:** This is how you map out traditional delivery pipelines: Build -> Test -> Deploy Staging -> Deploy Prod.\n- **Matrix Builds:** You can use jobs to run tests in parallel across different OS versions (Ubuntu, Windows) or Python versions (3.9, 3.10), drastically reducing total CI time.',
            image: IMG_ABSTRACT
          },
          { 
            id: 'd7', 
            title: 'Environment Variables & Secrets', 
            shortDesc: 'Safely handling API keys and passwords.',
            details: 'Hardcoding database passwords or AWS keys into your source code is the fastest way to get your company hacked. Pipelines need a way to access credentials safely.\n\n**Secure Configuration**\n\n- **GitHub Secrets:** A secure vault in your repository settings. You store the actual password here, and reference it in your code using `${{ secrets.DB_PASSWORD }}`.\n- **Log Masking:** If your script accidentally tries to print a secret to the console (`echo $DB_PASSWORD`), GitHub intercepts it and prints `***` instead, preventing leaks in the public logs.\n- **Environment Variables (`env`):** Used for non-sensitive data (like `NODE_ENV=production` or `LOG_LEVEL=debug`). You can set them at the Workflow level, Job level, or Step level depending on scope.',
            image: IMG_SERVER
          }
        ]
      },
      {
        id: 'c3',
        title: 'Chapter 3: Architecture & Runners',
        icon: <Server className="w-6 h-6 text-emerald-500" />,
        tasks: [
          { 
            id: 'd12', 
            title: 'GitHub-hosted vs. Self-hosted Runners', 
            shortDesc: 'Where does your automation actually run?',
            details: 'When GitHub Actions runs a job, it needs a physical computer (a Runner) to execute your scripts. You have two choices.\n\n**1. GitHub-Hosted Runners**\n\n- **How it works:** GitHub provides fresh, ephemeral Virtual Machines (Ubuntu, Windows, macOS). When the job finishes, the VM is immediately destroyed.\n- **Pros/Cons:** Zero maintenance, completely free for public repos. However, they have limited CPU/RAM and cannot access your private corporate intranet (VPNs/VPCs).\n\n**2. Self-Hosted Runners**\n\n- **How it works:** You install the GitHub Runner agent on your own servers (like an AWS EC2 instance or an on-premise rack).\n- **Pros/Cons:** You have total control over the hardware (e.g., attaching powerful GPUs for AI training) and they sit safely behind your corporate firewall. The downside is you are responsible for updating and securing the server.',
            image: IMG_SERVER
          },
          { 
            id: 'd15', 
            title: 'Running Jobs inside Docker Containers', 
            shortDesc: 'Ensuring absolute consistency using the container directive.',
            details: 'The classic developer problem: "The pipeline passes on GitHub, but the code fails in production." This happens because the GitHub Ubuntu runner might have different system libraries than your production server.\n\n**The Container Solution**\n\n- **The `container:` Directive:** Instead of running commands directly on the Ubuntu VM, you can instruct GitHub to pull a specific Docker image and run all steps *inside* that container.\n- **Absolute Consistency:** If production runs `python:3.10-slim`, your CI pipeline runs inside the exact same `python:3.10-slim` image. No surprises.\n- **Tooling Isolation:** Prevents conflicts. You don\'t need to install Python, Node, and Java on the host machine; the container brings exactly the tools it needs.',
            image: IMG_DOCKER
          }
        ]
      },
      {
        id: 'c4',
        title: 'Chapter 4: Real-Life Pipeline for Python',
        icon: <Code2 className="w-6 h-6 text-yellow-500" />,
        tasks: [
          { 
            id: 'd19', 
            title: 'Marketplace Actions: setup-python', 
            shortDesc: 'The fastest way to install Python environments.',
            details: 'Setting up programming languages manually using bash scripts (`apt-get install python3`) is slow and prone to breaking when OS mirrors go down.\n\n**The Marketplace Advantage**\n\n- **`actions/setup-python`:** This official action instantly provisions exact Python versions (e.g., `3.11.2`) using pre-compiled binaries cached by GitHub.\n- **Matrix Testing:** You can easily pass a list of versions to test your code against multiple Python environments simultaneously.\n- **Dependency Caching:** It has built-in support for `pip`, `pipenv`, and `poetry`. With one flag, it automatically caches your downloaded packages to drastically speed up future pipeline runs.',
            image: IMG_CODE
          },
          { 
            id: 'd21', 
            title: 'Running Linters & Formatters', 
            shortDesc: 'Enforcing code quality with Ruff and Black.',
            details: 'Running unit tests is computationally expensive. You don\'t want to waste 5 minutes running tests just to find out a developer forgot a trailing comma or left an unused import.\n\n**The Shift-Left Philosophy**\n\n- **Fail Fast:** Place code formatting (Black) and linting (Ruff/Flake8) as the very first steps in your CI pipeline.\n- **Enforcing Standards:** If `black --check .` detects poorly formatted code, the pipeline crashes instantly. This removes subjective arguments in Code Reviews—the CI pipeline becomes the bad guy.\n- **Speed:** Tools like Ruff are written in Rust and can lint thousands of lines of Python in milliseconds.',
            image: IMG_DATA
          },
          { 
            id: 'd23', 
            title: 'Building & Pushing Docker Images', 
            shortDesc: 'Packaging your Python app into a portable artifact.',
            details: 'Once the code is tested and linted, it needs to be packaged into an immutable artifact that can be deployed anywhere.\n\n**The Build and Push Workflow**\n\n- **Compilation:** The pipeline executes `docker build` to package your Python code, system dependencies, and runtime into a single container.\n- **Dynamic Tagging:** Never use the `latest` tag in CI. Instead, use the `github.sha` (the unique Git commit hash) as the image tag. If commit `a1b2c3d` is deployed, you know exactly what code is running in production.\n- **Registry:** The `docker/build-push-action` securely logs in and pushes the resulting image to the GitHub Container Registry (GHCR) or Docker Hub, making it ready for deployment.',
            image: IMG_DOCKER
          }
        ]
      },
      {
        id: 'c5',
        title: 'Chapter 5: Optimization & Multi-Stage',
        icon: <Box className="w-6 h-6 text-purple-500" />,
        tasks: [
          { 
            id: 'd28', 
            title: 'Configuring Dependency Caching', 
            shortDesc: 'Slashing build times from minutes to seconds.',
            details: 'A fresh GitHub Runner starts completely empty. If your Python project requires `numpy` and `pandas`, the runner will waste 2 minutes downloading them from the internet on every single push.\n\n**The Caching Strategy**\n\n- **How it works:** Using the `actions/cache` step, you tell GitHub to zip up your `~/.cache/pip` folder at the end of a successful run and save it to an internal server.\n- **Cache Keys:** The cache is saved under a unique key based on the hash of your `requirements.txt`. If your requirements don\'t change, the key matches.\n- **The Restoration:** On the next workflow run, GitHub instantly injects the zipped folder back into the runner. The `pip install` command finishes in 2 seconds instead of 2 minutes.',
            image: IMG_ABSTRACT
          },
          { 
            id: 'd31', 
            title: 'Manual Approvals & Environments', 
            shortDesc: 'Adding human gates before production.',
            details: 'While Continuous Deployment (auto-shipping to prod) is the dream, most enterprise companies require strict governance and human oversight before affecting live users.\n\n**GitHub Environments**\n\n- **Protection Rules:** You can create an Environment called "Production" in your repository settings and assign specific team members as "Required Reviewers."\n- **The Pause:** In your YAML, you add `environment: production` to your deployment job. When the pipeline reaches this job, it completely suspends execution.\n- **The Gate:** An authorized manager receives a notification, reviews the staging tests, and clicks "Approve" in the UI. Only then does the deployment job execute.',
            image: IMG_SERVER
          }
        ]
      },
      {
        id: 'c7',
        title: 'Chapter 7: Kubernetes Deployment',
        icon: <Cloud className="w-6 h-6 text-cyan-500" />,
        tasks: [
          { 
            id: 'd40', 
            title: 'OIDC Authentication', 
            shortDesc: 'Connecting to AWS/GCP without long-lived passwords.',
            details: 'Historically, to deploy to AWS, you had to generate a permanent AWS IAM Access Key and paste it into GitHub Secrets. If a rogue employee or hacker extracted that key, they owned your entire cloud infrastructure.\n\n**The OIDC Revolution**\n\n- **Identity Federation:** OpenID Connect (OIDC) establishes a mathematical trust relationship between your GitHub repo and your Cloud Provider (AWS/GCP/Azure).\n- **No Stored Secrets:** You no longer store any passwords or access keys in GitHub.\n- **Short-Lived Tokens:** When the workflow runs, GitHub proves its identity to AWS. AWS dynamically generates a temporary token that expires in 15 minutes. The deployment finishes, the token dies, and the attack vector is completely eliminated.',
            image: IMG_SERVER
          },
          { 
            id: 'd41', 
            title: 'Deploying with kubectl & Helm', 
            shortDesc: 'Applying manifests to your K8s cluster.',
            details: 'Once authenticated, the pipeline must instruct the Kubernetes cluster to start using the newly built Docker image.\n\n**The Deployment Process**\n\n- **Context Switching:** The runner uses the cloud credentials to securely connect to the cluster API (e.g., AWS EKS or GCP GKE).\n- **Manifest Updates:** Using tools like `kubectl` or `Helm`, the pipeline updates the deployment manifest to point to the new image tag (the Git Commit Hash).\n- **Zero Downtime Rollouts:** Kubernetes takes over, spinning up new Pods with the new image, waiting for them to pass Health Checks, and then gracefully terminating the old Pods. Traffic is never dropped.',
            image: IMG_DATA
          }
        ]
      }
    ]
  },
  cloud: {
    id: 'cloud',
    title: 'Cloud Engineering Syllabus',
    icon: <Cloud className="w-5 h-5" />,
    description: 'Mastering AWS Infrastructure, Infrastructure as Code, and Cloud Native Patterns.',
    categories: [
      {
        id: 'cl_compute',
        title: 'Module 1: Compute & Hosting Paradigms',
        icon: <Server className="w-6 h-6 text-blue-500" />,
        tasks: [
          {
            id: 'cld_comp1',
            title: '1. Serverful (VPS / Bare Metal)',
            shortDesc: 'Raw virtual machines where you control the OS, runtime, and security.',
            details: 'Virtual Private Servers (VPS) or Infrastructure as a Service (IaaS) gives you a raw virtual machine (like AWS EC2 or a DigitalOcean Droplet). You are handed a Linux terminal and full root access.\n\n**The Concept**\n\n- **Full Control:** You choose the OS, install the runtime, manage security patches, and configure the firewalls.\n- **Always On:** You pay a fixed monthly rate 24/7, regardless of whether you have 0 users or 10,000 users.\n\n**When to use it**\n\n- **Predictable Workloads:** If you have constant, heavy traffic, a VPS is significantly cheaper per compute-hour than Serverless or PaaS.\n- **Custom Dependencies:** You need to install low-level C++ libraries, custom network drivers, or specialized monitoring daemons.\n- **Legacy Systems:** Older monoliths that aren\'t containerized often require a traditional server environment.\n\n**When NOT to use it**\n\n- **Small Teams:** If you don\'t have a dedicated DevOps engineer, maintaining security patches and configuring Load Balancers manually is a massive time sink.\n- **Unpredictable Traffic:** You either over-provision (wasting money on idle servers) or under-provision (your site crashes during a traffic spike).',
            image: IMG_SERVER
          },
          {
            id: 'cld_comp2',
            title: '2. PaaS (The "Sweet Spot")',
            shortDesc: 'Platform as a Service. Bring your code, and the cloud handles the infrastructure.',
            details: 'Platform as a Service (PaaS) represents the "Sweet Spot" for most modern development teams (e.g., Heroku, Render, Vercel, AWS AppRunner).\n\n**The Concept**\n\n- **Bring Your Own Code:** You simply connect your GitHub repo or push a Docker container. The platform handles the OS, load balancing, SSL certificates, and zero-downtime deployments.\n- **The Sweet Spot:** It abstracts away the headache of Linux administration while still keeping your application running 24/7 like a normal server.\n\n**When to use it**\n\n- **Startups & Small Teams:** When your primary goal is shipping product features fast, not managing infrastructure.\n- **Standard Architectures:** Perfect for standard REST APIs, SSR frameworks (Next.js), and typical background worker queues.\n- **Easy Scaling:** Need more power? Just drag a slider in the UI to add more instances behind their managed load balancer.\n\n**When NOT to use it**\n\n- **Massive Scale (Cost):** The convenience comes at a premium. At massive enterprise scale, PaaS compute costs can be 2x to 5x higher than managing your own raw VPS instances.\n- **Extreme Customization:** You cannot access the underlying host OS. If you need weird network routing or custom kernel modules, PaaS will block you.',
            image: IMG_ABSTRACT
          },
          {
            id: 'cld_comp3',
            title: '3. Serverless (FaaS)',
            shortDesc: 'Ephemeral, event-driven compute scaling from zero to thousands instantly.',
            details: 'Serverless (Function as a Service / FaaS) fundamentally changes how compute is billed and executed (e.g., AWS Lambda, Google Cloud Functions).\n\n**The Concept**\n\n- **Event-Driven:** Your code only runs in response to a trigger (an HTTP request, a file uploaded to a bucket, or a cron schedule).\n- **Pay Per Millisecond:** You are billed exactly for the execution time. If no one visits your site, your bill is literally $0.00.\n- **Infinite Scaling:** The cloud provider spins up thousands of parallel instances instantly to handle sudden spikes.\n\n**When to use it**\n\n- **Unpredictable/Bursty Traffic:** E-commerce sites during Black Friday, or ticket sales. It scales from 0 to 10,000 requests per second instantly without crashing.\n- **Glue Code & Background Jobs:** Perfect for tasks like "Resize this image when it\'s uploaded" or "Send an email when a record hits the queue."\n\n**When NOT to use it**\n\n- **Constant, High Traffic:** If a function runs constantly 24/7, Serverless becomes significantly more expensive than a standard VPS.\n- **Long-Running Processes:** Cloud functions typically have a hard timeout limit (e.g., 15 minutes). You cannot run a 3-hour video encoding job on a single Lambda.\n- **Low Latency / Real-Time:** Suffer from "Cold Starts." If a function hasn\'t run recently, it takes a few seconds to boot up the container, making it poor for real-time multiplayer gaming.',
            image: IMG_SERVERLESS
          }
        ]
      },
      {
        id: 'cl1',
        title: 'Module 2: Infrastructure as Code (Terraform)',
        icon: <Layers className="w-6 h-6 text-orange-500" />,
        tasks: [
          { 
            id: 'cld1', 
            title: 'Declarative Cloud Provisioning', 
            shortDesc: 'Replacing manual UI clicks with readable code.',
            details: 'Replacing manual UI clicks with readable, version-controlled code.\n\n- **Declarative Syntax:** You declare *what* you want in HashiCorp Configuration Language (HCL), and Terraform figures out *how* to build it.\n- **Version Control:** Infrastructure can be peer-reviewed and tracked in Git just like application code.\n- **Idempotency:** Running the code multiple times only applies the necessary changes (the diff).',
            image: IMG_CODE
          }
        ]
      }
    ]
  },
  backend: {
    id: 'backend',
    title: 'Backend Architecture Syllabus',
    icon: <Database className="w-5 h-5" />,
    description: 'Designing robust APIs, Databases, and High-Performance Systems.',
    categories: [
      {
        id: 'b1',
        title: 'Module 1: API Design & Security',
        icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
        tasks: [
          { 
            id: 'bk1', 
            title: 'JWT Authentication', 
            shortDesc: 'Stateless, cryptographically secure user sessions and secure storage.',
            details: 'JSON Web Tokens (JWT) provide stateless, cryptographically secure user sessions for modern APIs. Instead of storing session IDs in a database, the server issues a signed token containing user claims.\n\n**Why is it Stateless?**\n\n- **No Database Lookups:** The token contains the user\'s identity (Payload) and is mathematically signed (Signature). The server only needs its secret key to verify the token hasn\'t been tampered with.\n- **Microservice Friendly:** Any backend service with the secret (or public key) can verify the user independently. You don\'t need a central Redis instance just to check if a user is logged in.\n\n**What to Save in the Payload (Claims):**\n\n- **Standard Identifiers:** Usually, you store the user ID (`sub` or subject), issue time (`iat`), and expiration time (`exp`).\n- **Roles & Permissions:** Storing `role: "admin"` allows the backend to authorize actions instantly without doing a database lookup.\n- **⚠️ Security Warning:** The payload is merely Base64 encoded, **not encrypted**. Anyone who intercepts it can read the contents. NEVER store sensitive data like passwords, SSNs, or PII inside a JWT.\n\n**Where to Store JWTs (Security):**\n\n- **❌ LocalStorage:** Vulnerable to Cross-Site Scripting (XSS). If an attacker runs malicious JS on your site, they can easily steal the token.\n- **✅ HttpOnly Cookies:** The gold standard. The browser stores the token and sends it automatically, but JavaScript *cannot* access it, neutralizing XSS attacks. (Requires CSRF tokens/SameSite attributes).\n\n**Access vs. Refresh Tokens:**\n\n- **Access Tokens:** Short-lived (e.g., 15 minutes). Sent with every API request to minimize the window of opportunity if stolen.\n- **Refresh Tokens:** Long-lived (e.g., 7 days). Stored securely and only sent to a specific `/refresh` endpoint to obtain a new Access Token.\n\n**The Revocation Problem (The Catch):**\n\n- Because JWTs are purely stateless, you cannot easily "invalidate" them before they expire. If a user clicks log out, you delete the cookie on the client, but the physical token remains technically valid until its expiration time.\n- **The Fix:** Rely on short-lived access tokens, or maintain a fast "Deny List" in Redis for logged-out tokens (though this technically makes the system stateful again!).',
            image: IMG_DATA
          },
          {
            id: 'bk1_2',
            title: 'API Versioning Strategies',
            shortDesc: 'Choose the right API versioning approach based on your team size and architecture scale.',
            details: 'Choosing the right API versioning strategy is critical for avoiding breaking changes and maintaining backward compatibility.\n\n**1. Global Versioning (URI Path)**\n- **Pattern:** `/api/v1/users`\n- **Scale:** Small/medium app, one team.\n- **Verdict:** Simpler to manage. Bump versions for the entire API on breaking changes.\n\n**2. Resource-Level Versioning**\n- **Pattern:** `/api/users/v2`, `/api/orders/v1`\n- **Scale:** Microservices, multiple teams.\n- **Verdict:** Teams move independently without global coordination.\n\n**3. Header Versioning**\n- **Pattern:** `Accept: application/vnd.myapi.v2+json`\n- **Scale:** Public APIs (e.g., GitHub).\n- **Verdict:** URLs stay RESTful (versions aren\'t resources). Excellent for public platforms.',
            image: IMG_ABSTRACT
          }
        ]
      },
      {
        id: 'b2',
        title: 'Module 2: Pub/Sub & Async Messaging',
        icon: <Waypoints className="w-6 h-6 text-orange-500" />,
        tasks: [
          { 
            id: 'bk2_0', 
            title: '1. Sync vs Async vs Parallelism', 
            shortDesc: 'Understanding execution models: Blocking, Concurrency, and CPU-bound math.',
            details: 'Understanding the difference between blocking, concurrent, and parallel execution is crucial for backend performance. When developers say "just make it async", they are usually conflating three entirely different architectural concepts: I/O Concurrency, True Parallelism, and Event Notification.\n\n**1. Synchronous (Sync): "Blocking"**\nBy default, Python is synchronous. It executes code exactly one line at a time.\n\n**2. Asynchronous (Async): "Smart Waiting"**\nAsynchronous programming is about dealing with multiple things at once by never wasting time waiting. Best for **I/O Bound** tasks (databases, API calls).\n\n**3. Parallelism: "Brute Force"**\nParallelism is doing multiple things at the exact same physical millisecond, requiring multiple CPU cores. Best for **CPU Bound** tasks.',
            customUI: (
              <>
                <AsyncDecisionFlowchart />
                <ThreadsVsCoroutines />
              </>
            )
          },
          {
            id: 'bk2_0b',
            title: '2. Deep Dive: Inside the Event Loop',
            shortDesc: 'A step-by-step interactive look at how Coroutines achieve massive concurrency without threading.',
            details: 'The magic of asynchronous programming is that the computer never waits. \n\nWhen a coroutine hits an `await` statement (like querying a database), it explicitly **yields control** back to the Event Loop, saying: *"I am going to sleep until the database answers. Go run something else!"*',
            customUI: <EventLoopStepper />
          },
          { 
            id: 'bk2_1', 
            title: '3. The Queue (1-to-1 Task List)', 
            shortDesc: 'A Point-to-Point communication pattern for executing specific background commands once.',
            details: 'A Queue represents a Point-to-Point communication pattern for executing specific background commands.\n\n- **🧠 The Mindset:** "I need someone to do this specific job once."\n- **🎯 Use Case:** Heavy tasks like image processing or inverse modeling.\n- **🚀 Scaling:** You can add as many workers as you want, but each message is processed exactly once.',
            image: IMG_QUEUE
          },
          { 
            id: 'bk2_2', 
            title: '4. Pub/Sub & The Event Bus (1-to-Many)', 
            shortDesc: 'The Publish/Subscribe paradigm for broadcasting facts to multiple independent listeners.',
            details: 'Pub/Sub (Publish/Subscribe) is an asynchronous communication paradigm where senders do not target specific receivers.\n\n- **🧠 The Mindset:** "I am announcing a fact. I don\'t care who is listening."\n- **🎯 Use Case:** Real-time dashboards, user notifications, or cross-service updates.\n- **🚀 Decoupling:** Producers never need to know about Consumers.',
            image: IMG_BROADCAST
          },
          { 
            id: 'bk2_3', 
            title: '5. The Message Broker (Infrastructure)', 
            shortDesc: 'The physical software engine that hosts your Queues and Event Buses.',
            details: 'The physical software engine (RabbitMQ, Kafka, Redis) that hosts your Queues and Event Buses.\n\n- **🏛️ The Golden Rule:** Queues are for **Commands** (Do this action once). Event Buses are for **Events** (This fact happened, react to it).',
            image: IMG_DATA
          },
          {
            id: 'bk2_4',
            title: '6. Client-Server Notification Strategies',
            shortDesc: 'Polling vs Server-Sent Events (SSE) vs WebSockets vs Webhooks.',
            details: 'When your background worker finishes a 5-minute task, how do you tell the user\'s browser? Use the right tool for the job to avoid over-engineering.',
            customUI: <NotificationStrategies />
          }
        ]
      },
      {
        id: 'b3',
        title: 'Module 3: System Architecture Patterns',
        icon: <Box className="w-6 h-6 text-purple-500" />,
        tasks: [
          {
            id: 'bk3_1',
            title: '1. Modular Monolith',
            shortDesc: 'A single deployable unit divided into strict, isolated business modules.',
            details: 'A software architecture that keeps all code in a single deployable application but enforces strict internal boundaries.\n\n**The Concept**\n\n- **Single Deployment:** Everything runs in one process. You deploy one artifact. It is significantly easier to build, test, and release.\n- **Strict Boundaries:** Code is organized by business domain (e.g., Billing, Users). Modules cannot directly access each other\'s databases; they must communicate through strictly defined internal APIs or interfaces.\n\n**Why it\'s popular**\n\n- **Simplicity:** Easier to debug and test than microservices. There is no network latency between modules because communication is strictly in-memory.\n- **Future-Proofing:** Because the boundaries are already strict, it is incredibly easy to break a module out into a separate microservice later if it requires independent scaling.',
            image: IMG_MONOLITH
          },
          {
            id: 'bk3_2',
            title: '2. Microservices',
            shortDesc: 'A distributed architecture where each service is an independent application.',
            details: 'A distributed architecture where an application is composed of many small, independent, and loosely coupled services.\n\n**The Concept**\n\n- **Independent Deployments:** The Billing team can deploy their service 10 times a day without coordinating with the Users team.\n- **Decentralized Data:** Every microservice MUST own its own database. Services communicate over the network (HTTP, gRPC, or Pub/Sub).\n\n**The Trade-offs**\n\n- **Pros:** Fault isolation (if the email service dies, checkout still works). Tech stack flexibility (use Python for AI, Go for heavy processing).\n- **Cons:** Dramatically increases operational complexity. Network calls can fail, requiring you to implement retries, circuit breakers, and distributed tracing.',
            image: IMG_NETWORK
          },
          {
            id: 'bk3_3',
            title: '3. Serverless Architecture',
            shortDesc: 'Ephemeral, event-driven compute where you pay only for execution time.',
            details: 'An execution model where the cloud provider dynamically manages the allocation and provisioning of servers (e.g., AWS Lambda, Google Cloud Functions).\n\n**The Concept**\n\n- **Event-Driven:** Code executes only in response to triggers (like an HTTP request, a file uploaded to S3, or a scheduled cron job).\n- **Scale to Zero:** If nobody is using your app, no code runs, and you pay $0. It scales up instantly to thousands of concurrent executions if traffic spikes.\n\n**The Trade-offs**\n\n- **Cold Starts:** If a function hasn\'t been run recently, the cloud provider needs to spin up a container from scratch, causing a noticeable delay (latency) on the first request.\n- **Use Cases:** Perfect for background processing, unpredictable traffic workloads, and rapid prototyping without infrastructure overhead.',
            image: IMG_SERVERLESS
          }
        ]
      },
      {
        id: 'b4',
        title: 'Module 4: Scaling & Observability',
        icon: <Target className="w-6 h-6 text-teal-500" />,
        tasks: [
          {
            id: 'bk4_1',
            title: '1. Load Balancers',
            shortDesc: 'The traffic cop that distributes incoming requests across multiple servers.',
            details: 'The traffic cop of your infrastructure, dynamically distributing incoming network traffic across a group of backend servers.\n\n**The Concept**\n\n- **High Availability:** Prevents any single server from becoming a bottleneck. If Server A crashes, the load balancer detects the failure via Health Checks and automatically routes traffic to Server B.\n- **Layer 4 vs Layer 7:** Layer 4 (Network) routes based on IP and TCP ports (super fast, low overhead). Layer 7 (Application) routes based on HTTP headers, cookies, or URL paths (smarter, context-aware routing).\n\n**Common Algorithms**\n\n- **Round Robin:** Distributes requests sequentially (A, B, C, A, B, C).\n- **Least Connections:** Sends the request to the server with the fewest active connections, which is excellent for long-lived tasks or uneven workloads.',
            image: IMG_LOAD_BALANCER
          },
          {
            id: 'bk4_2',
            title: '2. Logger Architecture & Observability',
            shortDesc: 'Centralized logging, tracing, and metrics for distributed systems.',
            details: 'In a distributed system, simply writing `print("error")` to a terminal is useless. You need centralized observability to figure out what went wrong across dozens of servers.\n\n**The Core Pillars**\n\n- **Structured Logging:** Logs must be emitted as JSON, not plain text. This allows you to easily search, filter, and alert on specific machine-readable fields (e.g., `{"level": "ERROR", "user_id": 123}`).\n- **Centralized Aggregation:** All services send their logs to a central system (like the ELK Stack, Datadog, or CloudWatch) so you can query everything in one dashboard without SSHing into individual servers.\n- **Correlation IDs:** A unique ID generated when a request first hits the API Gateway. This ID is passed to every microservice in the chain. If a request fails deep in the system, you can search the Correlation ID and trace the exact path the request took.',
            image: IMG_DATA
          }
        ]
      },
      {
        id: 'b5',
        title: 'Module 5: System Design Foundations',
        icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
        tasks: [
          {
            id: 'bk5_1',
            title: '1. Functional vs Non-Functional Requirements',
            shortDesc: 'The difference between what a system does (features) and how it performs (architecture).',
            details: 'Understanding the difference between Functional and Non-Functional requirements is the absolute foundation of System Design.\n\n**1. Functional Requirements (The "What")**\n\nThese define what the system *must do*. They are the specific behaviors, features, and business rules that the application needs to execute.\n\n- **The Focus:** Features, business logic, user interactions, and APIs.\n- **Examples:** "The user must be able to add an item to the shopping cart." / "The system must generate a PDF invoice after a successful payment."\n- **The Impact:** If you miss a functional requirement, the software simply doesn\'t do its job.\n\n**2. Non-Functional Requirements (The "How")**\n\nThese define how the system *must perform*. Also known as "Quality Attributes" (the "ilities": scalability, reliability, availability, latency).\n\n- **The Focus:** Performance, security, capacity, latency, and availability.\n- **Examples:** "The shopping cart page must load in under 200ms." / "The payment system must be highly available (99.99% uptime)."\n- **The Impact:** If you miss a non-functional requirement, the software works for 10 users, but crashes and burns when 10,000 users log in.\n\n**The Architectural Difference**\n\n- **Functional** requirements dictate your *code* (e.g., writing a new Python function or SQL query).\n- **Non-Functional** requirements dictate your *architecture* (e.g., adding Redis for caching, a Load Balancer for scale, or Read Replicas for database speed).',
            image: IMG_DESIGN
          }
        ]
      }
    ]
  },
  network: {
    id: 'network',
    title: 'Network Engineering Syllabus',
    icon: <Network className="w-5 h-5" />,
    description: 'Understanding the protocols that power the modern internet.',
    categories: [
      {
        id: 'n1',
        title: 'Module 1: The Foundations',
        icon: <Network className="w-6 h-6 text-slate-500" />,
        tasks: [
          { 
            id: 'nw1', 
            title: 'The OSI Model in Practice', 
            shortDesc: 'How data travels from a physical cable to a web browser.',
            details: 'How data travels from a physical copper cable all the way to a web browser.\n\n- **Layered Abstraction:** Breaks networking into 7 manageable layers (Physical to Application).\n- **Debugging Framework:** Helps isolate problems. Is it a physical issue (Layer 1), routing (Layer 3), or SSL (Layer 6)?\n- **Encapsulation:** Understand how HTTP payloads are wrapped in TCP segments, IP packets, and Ethernet frames.',
            image: IMG_SERVER
          }
        ]
      }
    ]
  }
};
