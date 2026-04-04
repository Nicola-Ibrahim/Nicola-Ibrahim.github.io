# Tasks: Migrate Portfolio to Next.js

**Input**: Design documents from `/specs/001-migrate-nextjs/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js project with App Router, TypeScript, and Tailwind in root `./`
- [ ] T002 Configure `output: 'export'` and image optimization settings in `next.config.js`
- [ ] T003 Install MDX dependencies: `next-mdx-remote`, `gray-matter`, `shiki` 
- [ ] T004 Copy existing CSS custom properties and standard styles into `app/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Establish RootLayout in `app/layout.tsx` (includes `<html>`, `<body>`, font variables)
- [ ] T006 Generate custom not-found page structure in `app/not-found.tsx`
- [ ] T007 Configure `tailwind.config.ts` design tokens correctly extracted from existing `index.html` CSS logic

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - View the Homepage (Priority: P1) 🎯 MVP

**Goal**: Users visit the homepage and see the exact same visual design as the original portfolio, ensuring brand continuity while benefiting from a modern platform.

**Independent Test**: Can be fully tested by loading the root `/` URL and visually comparing it to the original static layout side-by-side to verify no changes occurred in layout, colors, or typography.

### Implementation for User Story 1

- [ ] T008 [P] [US1] Migrate all existing external static assets (images) to `public/images/`
- [ ] T009 [P] [US1] Port `index.html` structure exactly as the React component inside `app/page.tsx`
- [ ] T010 [US1] Verify and correct image paths and classes within `app/page.tsx` to utilize `public/` assets efficiently

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Run `npm run dev` and visually verify the homepage.

---

## Phase 4: User Story 2 - Read Blog Articles (Priority: P2)

**Goal**: Users navigate to the `/blog` section to read technical or personal articles, which are sourced from file-based content.

**Independent Test**: Can be fully tested by placing a simple text file in the content directory and verifying it renders correctly at the blog route.

### Implementation for User Story 2

- [ ] T011 [P] [US2] Create MDX data reading utility `getAllPosts()` and `getPostBySlug()` in `lib/blog.ts`
- [ ] T012 [P] [US2] Create reading time calculation utility in `lib/reading-time.ts`
- [ ] T013 [P] [US2] Create PostCard component in `components/blog/PostCard.tsx`
- [ ] T014 [P] [US2] Create PostBody component in `components/blog/PostBody.tsx`
- [ ] T015 [US2] Implement blog listing wrapper map inside `app/blog/page.tsx` utilizing `lib/blog.ts` functionality
- [ ] T016 [US2] Implement dynamic blog routing (`generateStaticParams`) in `app/blog/[slug]/page.tsx`
- [ ] T017 [US2] Create sample MDX testing post in `content/blog/sample-post.mdx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T018 Execute full static build validation: `npm run build` and `npx serve out` to ensure static HTML output success
- [ ] T019 Update `README.md` based on quickstart guidelines
- [ ] T020 Check `<head>` metadata implementations in layout and page files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2). Does not depend on US1 structurally.

### Parallel Opportunities

- All Setup/Foundational tasks marked [P] can run in parallel
- Once Foundational phase completes, User Story 1 and User Story 2 can be developed in parallel by separate workflows.
- The `lib/` utilities and `components/` UI abstractions in US2 can be generated in parallel before the app routing wrappers.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify homepage visually
5. Deploy/export MVP if ready

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 → Test independently → Deploy/Demo (MVP)
3. Add User Story 2 → Test independently → Deploy/Demo

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
