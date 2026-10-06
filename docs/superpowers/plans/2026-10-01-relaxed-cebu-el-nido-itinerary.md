# Relaxed Cebu + El Nido Itinerary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the requested ten-day Cebu, Moalboal, El Nido, and Manila-buffer itinerary to the trip planner.

**Architecture:** Keep the existing route comparisons as historical alternatives and insert a clearly labelled selected itinerary near the beginning of the planner. Each day uses the established overview, plan, avoid, and confirmation pattern; claims that depend on booking availability remain unverified.

**Tech Stack:** Markdown; source links to official Philippine tourism and airline pages.

## Global Constraints

- Preserve the itinerary dates: 24 December 2026–2 January 2027 (10 calendar days / 9 nights).
- Use Cebu, Moalboal, El Nido, and a Manila buffer night; include one canyoneering day and one scuba day.
- Treat all flights, availability, operating conditions, qualifications, prices, and New Year programmes as confirmation items.
- Cite every factual travel claim with the URL, access date, and item checked; label non-factual pacing choices as Suggestion.
- Keep Option A (El Nido + Coron), Option B, and the original Option C as comparisons.

---

### Task 1: Add the selected itinerary

**Files:**
- Modify: `Philippines_10_Day_Trip_Planner_Dec24_2026-Jan2_2027.md` after the executive summary.

**Interfaces:**
- Consumes: user-directed route priorities and current official tourism/airline sources.
- Produces: `# 1A. SELECTED ITINERARY` with ten date-specific days and a source ledger.

- [ ] **Step 1: Add the route and verification note**

Write the requested route, state that the direct Bengaluru–Cebu ticket is unverified, and distinguish verified flight-route context from ticket-level availability.

- [ ] **Step 2: Write the ten day entries**

Use one non-flight recovery day after scuba, one El Nido Tour A day, relaxed El Nido days, and a 1 January Manila buffer night.

- [ ] **Step 3: Run the content smoke test**

Run: `rg -q 'SELECTED ITINERARY' Philippines_10_Day_Trip_Planner_Dec24_2026-Jan2_2027.md && rg -q 'Day 10 --- 2 Jan --- Manila → Bengaluru' Philippines_10_Day_Trip_Planner_Dec24_2026-Jan2_2027.md`

Expected: exit status 0.

### Task 2: Validate itinerary constraints

**Files:**
- Modify: `Philippines_10_Day_Trip_Planner_Dec24_2026-Jan2_2027.md`

**Interfaces:**
- Consumes: the selected itinerary from Task 1.
- Produces: a source ledger and an accurate overnight count.

- [ ] **Step 1: Check date coverage and night allocation**

Run: `rg -n '^## Day (1|2|3|4|5|6|7|8|9|10) --- (24 Dec|25 Dec|26 Dec|27 Dec|28 Dec|29 Dec|30 Dec|31 Dec|1 Jan|2 Jan)' Philippines_10_Day_Trip_Planner_Dec24_2026-Jan2_2027.md | head -10`

Expected: the first ten matching entries cover 24 December through 2 January in order.

- [ ] **Step 2: Check for unsupported booking facts**

Run: `rg -n 'unverified|confirm' Philippines_10_Day_Trip_Planner_Dec24_2026-Jan2_2027.md | head -30`

Expected: the selected itinerary flags direct flights, dive eligibility, conditions, and hotel/tour availability for confirmation.

- [ ] **Step 3: Check Markdown whitespace**

Run: `git diff --check`

Expected: exit status 0.

### Task 3: Align the proposal site with the selected itinerary

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: the selected itinerary and source links from the planner’s `1A` section.
- Produces: a site cover, route band, day rail, day panels, experience guide, and booking order for Cebu, Moalboal, El Nido, and the Manila buffer night.

- [ ] **Step 1: Update the selected-route copy**

Change the cover, recommendation, route band, comparison callout, experience guide, booking order, and bring-home route note so the site no longer presents El Nido + Coron as the selected itinerary.

- [ ] **Step 2: Replace the ten primary day panels**

Use the planner’s 24 December 2026–2 January 2027 sequence: Cebu arrival, Moalboal transfer, Kawasan canyoneering, Moalboal scuba, recovery, Cebu–El Nido transfer, Tour A, El Nido New Year’s Eve, Manila buffer, and Bengaluru departure. Preserve candidate accommodation language and mark ticket-level facts unverified.

- [ ] **Step 3: Run site checks**

Run: `node --check app.js && rg -q 'Bengaluru.*Cebu' index.html && rg -q 'Canyoneering at Kawasan' index.html && rg -q 'El Nido.*Manila buffer' index.html && rg -q 'Moalboal recovery' index.html && git diff --check`

Expected: all commands exit with status 0.
