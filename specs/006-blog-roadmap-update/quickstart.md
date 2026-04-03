# Quickstart: Testing the Blog Roadmap Migration

## Local Development
Since this feature is a direct port of React code into the Next.js `app/roadmap` route, validation testing is straightforward and entirely visual.

1. Start the local server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/roadmap` (or wherever the blog page mounts).

### Test Criteria Checklist

- [ ] **Tab Switching**: Verify that clicking between "AI Agent Skills", "Algorithms", "DevOps", etc., correctly swaps out the hero header and syllabus list without full page reloads.
- [ ] **Content Injection**: Open the "DevOps" -> "Pub/Sub & Async Messaging" -> "1. Sync vs Async vs Parallelism" task. Verify the `AsyncDecisionFlowchart` renders perfectly inline without syntax errors.
- [ ] **Interactive Stepper**: Open the same module -> "2. Deep Dive: Inside the Event Loop". Verify `EventLoopStepper` allows pagination and step navigation smoothly.
- [ ] **Code Styling**: Check that terms surrounded by backticks in the source text legitimately render with `bg-slate-100 text-pink-600` styling (as dictated by the `parseInlineStyles` system).
- [ ] **Clipboard**: Verify clicking "Copy" on AI Agent Prompts triggers a success state.
- [ ] **Aesthetic Integrity**: Verify that fonts map cleanly (using the global Layout definitions), colors contrast perfectly for reading, and hover states on categories expand the accordion smoothly.
