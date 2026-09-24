# Agent instructions

This repo is a Philippines trip proposal for **24 December 2026 – 2 January 2027** (10 calendar days / 9 nights), starting in Bengaluru.

Files:

- `Philippines_10_Day_Trip_Planner_Dec24_2026-Jan2_2027.md` — research itinerary and route comparison
- `index.html`, `styles.css`, `app.js` — dependency-free static proposal site (open as a local file; usable down to 360px)
- `docs/superpowers/plans/2026-09-24-philippines-trip-proposal.md` — site implementation plan
- `.cursor/skills/compare-skyscanner-flights/SKILL.md` — live flight fare comparison via Skyscanner’s ChatGPT app
- `.cursor/skills/compare-expedia-hotels/SKILL.md` — live hotel price comparison via Expedia’s ChatGPT app

Option A (El Nido + Coron) is the recommended route. Keep Option B (Boracay + El Nido) and Option C (Cebu/Bohol + El Nido) as comparisons. Preserve the dates above.

## Never invent facts

State or write a travel fact only after you have checked a definite source in this session.

This covers places, opening hours, prices, transport schedules, ferry and flight times, visa and entry rules, weather, whether a hotel or restaurant exists, distances, and booking links.

If you do not have a definite source, say the claim is unverified. Leave out the number, time, and price.

## Definite sources

A definite source is one of these:

1. An official government, tourism, transport, airline, or ferry site (for this trip: Philippine eTravel, the Department of Tourism and `philippines.travel`, the Bureau of Immigration or the official visa/entry page, the airline, and the ferry operator).
2. The venue or operator’s own site (hotel, restaurant, tour operator, port, or airport).
3. A primary document already in this repo: the planner markdown, `index.html`, or the implementation plan. Use them for the project’s dates, route structure, and recommendations.
4. A page you fetched in the current session, recorded with its URL and the access date.

Training memory is not a definite source. An unsourced blog, forum post, or roundup is not a definite source. Fetch the official or operator page and cite that.

The planner markdown’s own note says flight, hotel, ferry, and tour prices are search-time indications. Copying a number from that file does not make the number current.

## Cite every factual claim

Every factual claim you write into an itinerary, UI copy, or doc must do one of these:

- Cite the source: URL, access date, and what you checked (hours, fare, schedule, existence, distance, rule).
- Or label it **Assumption** or **Unverified**, with no specific number, time, or price attached.

Match the site’s existing pattern: each itinerary day carries a source link. Name accommodation as a **candidate**. Say that availability, the rate, and the transfer policy still need confirmation with the property. Mark images as illustrative.

Keep external links on travel-critical claims pointed at definite sources.

Treat exact flights, prices, availability, and entry rules as items to confirm. They are not booking guarantees.

## When you cannot verify

Say “unverified” in the answer and in the file.

Write the action the traveler should confirm (“confirm the sailing with the operator”) and stop there. Omit the guessed departure time, fare, duration, or fee.

## Re-check time-sensitive facts

At the time of use, fetch current pages for:

- prices and availability
- flight, ferry, and bus schedules
- visa and entry rules, including eTravel
- opening hours, permits, and tour stops
- weather and sea conditions for the travel dates

A figure already in the repo, or one you saw earlier in the conversation, is stale until you re-check it. Record the new URL and access date.

Christmas and New Year is peak season. Schedules and rates move. Re-check them against the live source before they appear in copy.

## Facts and recommendations

When you compare routes or suggest a plan, split the writing into two labeled parts:

- **Verified:** only claims with a citation from this session.
- **Suggestion:** pacing, priorities, and trade-offs (experience density, transfer load, recovery time, NYE atmosphere). State the preference and the condition (“choose this when…”). Keep every time and price in **Verified**, or mark it **Unverified** and omit the figure.

The recommendation of Option A is a project decision. Support any new factual reason for it with a definite source.

## Live flight fares

When the user wants a Skyscanner flight search, live fare comparison, or the ChatGPT app “Find cheap flights”, read `.cursor/skills/compare-skyscanner-flights/SKILL.md` and follow it.

That app is flights only. Do not use it for hotels. Do not book, pay, or capture ChatGPT credentials. Do not add a Skyscanner MCP server, scraper, or unofficial API client, and do not edit `~/.cursor/mcp.json` for this.

## Live hotel prices

When the user wants a hotel search, live hotel prices, or the ChatGPT app “Expedia”, read `.cursor/skills/compare-expedia-hotels/SKILL.md` and follow it.

That app is for hotels in this repo. Do not use it for flights. Do not book, pay, or capture ChatGPT credentials. Do not add an Expedia MCP server, scraper, or unofficial API client, and do not edit `~/.cursor/mcp.json` for this.
