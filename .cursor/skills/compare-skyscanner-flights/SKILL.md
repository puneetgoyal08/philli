---
name: compare-skyscanner-flights
description: >-
  Compare live flight fares through Skyscanner Limited’s ChatGPT app “Find cheap flights”
  by driving the user’s already-signed-in ChatGPT session in the Cursor browser.
  Use when the user asks for Skyscanner flight search, live fare comparison, cheap flights,
  or the ChatGPT app at chatgpt.com/plugins/plugin_asdk_app_694546cd042881919bb746a8dc300f38.
  Does not search hotels, book, pay, or call a Skyscanner API.
---

# Compare Skyscanner flights

Drive the Cursor browser (`cursor-ide-browser`) through Skyscanner Limited’s ChatGPT app. The app compares fares and sends the user to a provider to book. It does not book inside ChatGPT.

Checked 24 September 2026:

- Listing: https://chatgpt.com/plugins/plugin_asdk_app_694546cd042881919bb746a8dc300f38 — title “Find cheap flights”, developer Skyscanner Limited, category Travel, version 4.1.0. Copy on that page is flights only.
- No public hotels app URL was found. Do not use this skill for hotels.
- OpenAI’s Responses API connectors are Dropbox, Gmail, Google Calendar, Google Drive, Microsoft Teams, Outlook Calendar, Outlook Email, and SharePoint ([MCP and Connectors](https://developers.openai.com/api/docs/guides/tools-connectors-mcp), accessed 24 September 2026). `plugin_asdk_app_…` is a ChatGPT connection id, not an API tool. Do not call the OpenAI API with that id. Do not add a Skyscanner MCP server.

## When not to use

- Booking, checkout, or payment.
- Capturing or storing ChatGPT passwords, session tokens, cookies, or one-time codes. Never type them. Never write them into the repo or `~/.cursor/mcp.json`.
- An unofficial Skyscanner API, scraper, or MCP wrapper.
- Hotel live pricing.

## Before the search

Collect origin, destination, depart date, return date if any, passenger count, and cabin. If any of those are missing, ask once, then stop. Do not invent a route.

Open a **new** browser tab. Leave existing tabs alone.

1. `browser_tabs` `action: "list"`.
2. `browser_navigate` with `newTab: true` to `https://chatgpt.com/plugins/plugin_asdk_app_694546cd042881919bb746a8dc300f38`.
3. `browser_lock` `action: "lock"`.
4. `browser_snapshot`.

The Cursor browser has its own ChatGPT session. A login in the user’s normal browser does not count.

## Login handoff

Stop and hand off when the snapshot or URL shows any of these: heading “Log in or sign up”, a “Log in” link, an “Email address” field, or a URL containing `/auth/login`.

Logged-out “Log in” and “Install plugin” both go to `https://chatgpt.com/auth/login?next=%2Fplugins%2Fplugin_asdk_app_694546cd042881919bb746a8dc300f38` (checked 24 September 2026).

1. `browser_lock` `action: "unlock"`.
2. Tell the user to sign in themselves in that tab, then say when they are done.
3. Do not click Continue with Google, Apple, or phone. Do not type in Email address or any password or code field.
4. Resume only after they confirm. Navigate again to the plugin URL above and snapshot.

## Run the search

Use the controls on the snapshot. Do not guess selectors from memory.

1. If “Install plugin” is present and its target is not `/auth/login`, click it. If a consent dialog appears, unlock and let the user approve it. Do not approve on their behalf.
2. If the listing has no composer after install, go to `https://chatgpt.com/`, snapshot, and open Skyscanner from the composer’s apps or plugins menu. If it is not listed, return to the plugin URL and install.
3. If the app still is not connected, stop. Tell the user to connect “Find cheap flights” on the plugin page. Do not invent an MCP config.
4. Fill the composer with one query, then send it (click Send, or `browser_press_key` Enter):

```
Find cheap flights from {origin} to {destination} departing {depart} returning {return}, {passengers} adults, {cabin}. Compare fares. Do not book.
```

Omit “returning …” for a one-way trip. Example prompts on the listing, for shape only: “flights from San Francisco to Seattle next weekend returning on Tuesday”.

5. Snapshot again after results render. If the reply is still generating, snapshot once more. Do not poll for more than a few snapshots.
6. `browser_lock` `action: "unlock"`.

If the app says it is unavailable, region-locked, or not connected, quote that message, mark fares **Unverified**, and stop. Do not substitute another site’s prices.

## What to extract

From the ChatGPT reply and any Skyscanner card on the page, copy only what is visible:

- Airline, times, stops, price, and currency
- The provider name
- A provider link, if one is shown

Do not open checkout. Do not click a pay or book button. A provider link in the report is for the user to open later.

## How to report

```markdown
**Verified:** Fares below are what the Skyscanner “Find cheap flights” ChatGPT app showed on {access date}. Source: https://chatgpt.com/plugins/plugin_asdk_app_694546cd042881919bb746a8dc300f38. This is a comparison, not a booking.

| Airline | Depart | Arrive | Stops | Price |
| --- | --- | --- | --- | --- |
| … | … | … | … | … |

**Suggestion:** …
```

Leave a cell blank when that field was not on screen. If no fare was visible, say **Unverified** and name what the user should confirm. Do not copy a price from the trip planner markdown. Re-check before writing a fare into `index.html` or the planner.
