# Philippines Trip Proposal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a self-contained, mobile-friendly website that turns the supplied 24 December 2026–2 January 2027 Philippines research into a decision-ready trip proposal.

**Architecture:** A dependency-free static site will keep the proposal easy to open, share, and revise. Semantic HTML holds the narrative and itinerary data; CSS provides a high-contrast editorial travel design; a small JavaScript layer powers itinerary-day selection, route comparison, and print-ready behavior.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript; no build system or external runtime dependencies.

## Global Constraints

- Preserve the itinerary dates: 24 December 2026–2 January 2027 (10 calendar days / 9 nights).
- Treat exact flights, prices, availability, and entry rules as confirmation items rather than booking guarantees.
- Recommend El Nido + Coron while retaining the Boracay + El Nido and Cebu/Bohol + El Nido comparisons.
- Work well from a local file and on screens down to 360px wide.
- Keep external links limited to official sources where travel-critical claims are made.

---

### Task 1: Create the proposal’s semantic content structure

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: itinerary facts from `Philippines_10_Day_Trip_Planner_Dec24_2026-Jan2_2027.md`.
- Produces: stable section anchors and button data attributes used by `app.js` and `styles.css`.

- [ ] **Step 1: Write a static page smoke test**

Run: `test -f index.html && rg -q 'The Palawan Chapter' index.html && rg -q 'data-day' index.html`

Expected: the command exits with status 0 after implementation.

- [ ] **Step 2: Build the HTML document**

Create sections for the proposal cover, planning facts, recommendation, route comparison, option-A day cards, experience guide, booking sequence, readiness checklist, and source notes. Use `<button data-day="N">` for each of the 10 itinerary days and an `<article data-panel="N">` for its detail panel.

- [ ] **Step 3: Run the smoke test**

Run: `test -f index.html && rg -q 'The Palawan Chapter' index.html && rg -q 'data-day' index.html`

Expected: exit status 0.

### Task 2: Add the editorial responsive visual system

**Files:**
- Create: `styles.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: semantic section and component class names in `index.html`.
- Produces: legible desktop/mobile layouts, visible focus styles, and print CSS.

- [ ] **Step 1: Write a stylesheet presence check**

Run: `test -f styles.css && rg -q -- '--ink' styles.css && rg -q '@media print' styles.css`

Expected: the command exits with status 0 after implementation.

- [ ] **Step 2: Build the CSS system**

Define warm sand, deep ocean, coral, and lime color tokens; pair a characterful display typeface with readable body text; apply staggered entrance animation with reduced-motion support; and style the route comparison, day rail, detail panels, booking list, checklists, and responsive breakpoints.

- [ ] **Step 3: Link stylesheet and run check**

Add `<link rel="stylesheet" href="styles.css">` to `index.html`, then run the stylesheet presence check.

Expected: exit status 0.

### Task 3: Add interaction and validate the local deliverable

**Files:**
- Create: `app.js`
- Modify: `index.html`

**Interfaces:**
- Consumes: `data-day` buttons and `data-panel` articles from `index.html`.
- Produces: selected-day state, accessible tab-like controls, and a working Print Proposal action.

- [ ] **Step 1: Write a JavaScript behavior check**

Run: `test -f app.js && rg -q 'activateDay' app.js && rg -q 'window.print' app.js`

Expected: the command exits with status 0 after implementation.

- [ ] **Step 2: Implement the interactions**

Write `activateDay(day)` to set `aria-selected`, `tabindex`, and hidden state for all itinerary controls and panels. Bind click and arrow-key events, and bind `[data-print]` to `window.print()`.

- [ ] **Step 3: Link JavaScript and validate**

Add `<script src="app.js"></script>` before `</body>`. Run `node --check app.js`, the JavaScript behavior check, and `git diff --check`.

Expected: all commands exit with status 0.

## Self-Review

- **Spec coverage:** recommendation, three-option comparison, complete selected itinerary, transfer/sea risk, packing/arrival, booking priorities, and sources are each represented in the site.
- **Placeholder scan:** no `TBD`, `TODO`, or deferred implementation markers remain.
- **Type consistency:** `data-day` and `data-panel` use matching numeric string identifiers; `activateDay(day)` is the sole state-transition function.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-24-philippines-trip-proposal.md`. Two execution options:

1. **Subagent-Driven (recommended)** — dispatch a fresh subagent per task and review between tasks.
2. **Inline Execution** — execute the plan in this session with checkpoints.
