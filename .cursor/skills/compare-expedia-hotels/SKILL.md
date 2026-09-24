---
name: compare-expedia-hotels
description: >-
  Compare live hotel prices through Expedia Group’s ChatGPT app “Expedia”
  by driving the user’s already-signed-in ChatGPT session in the Cursor browser.
  Use when the user asks for hotel live prices, a hotel search, Expedia hotels,
  or the ChatGPT app at chatgpt.com/plugins/plugin_connector_68e004f14af881919eb50893d3d9f523.
  This is hotels, not flights. Does not book, pay, or call an Expedia API.
---

# Compare Expedia hotels

Drive the Cursor browser (`cursor-ide-browser`) through Expedia Group’s ChatGPT app. The app shows hotel prices and sends the user to Expedia to book. It does not book inside ChatGPT.

This skill is hotels only. Do not ask the app for flights. Flight fares use `.cursor/skills/compare-skyscanner-flights/SKILL.md`.

Checked 24 September 2026:

- Listing: https://chatgpt.com/plugins/plugin_connector_68e004f14af881919eb50893d3d9f523 — title “Expedia”, developer Expedia Group, category Travel, version 7.0.0. Visible copy: search hotels worldwide, compare prices, real-time prices and availability, then continue on Expedia to book.
- Skyscanner’s ChatGPT app remains flights only (`plugin_asdk_app_694546cd042881919bb746a8dc300f38`, “Find cheap flights”). No separate Skyscanner hotels listing was found.
- OpenAI’s Responses API connectors are Dropbox, Gmail, Google Calendar, Google Drive, Microsoft Teams, Outlook Calendar, Outlook Email, and SharePoint ([MCP and Connectors](https://developers.openai.com/api/docs/guides/tools-connectors-mcp), accessed 24 September 2026). `plugin_connector_…` is a ChatGPT connection id, not an API tool. Do not call the OpenAI API with that id. Do not add an Expedia MCP server.

## When not to use

- Booking, checkout, or payment.
- Capturing or storing ChatGPT passwords, session tokens, cookies, or one-time codes. Never type them. Never write them into the repo or `~/.cursor/mcp.json`.
- An unofficial Expedia API, scraper, or MCP wrapper.
- Flight live fares.

## Before the search

Collect destination, check-in, check-out, guest count, and rooms. If any of those are missing, ask once, then stop. Do not invent a stay.

Open a **new** browser tab. Leave existing tabs alone.

1. `browser_tabs` `action: "list"`.
2. `browser_navigate` with `newTab: true` to `https://chatgpt.com/plugins/plugin_connector_68e004f14af881919eb50893d3d9f523`.
3. `browser_lock` `action: "lock"`.
4. `browser_snapshot`.

The Cursor browser has its own ChatGPT session. A login in the user’s normal browser does not count.

## Login handoff

Stop and hand off when the snapshot or URL shows any of these: heading “Get responses tailored to you”, a “Log in” link, an “Email address” field, or a URL containing `/auth/login`.

Logged-out “Log in” and “Install plugin” both go to `https://chatgpt.com/auth/login?next=%2Fplugins%2Fplugin_connector_68e004f14af881919eb50893d3d9f523` (checked 24 September 2026).

1. `browser_lock` `action: "unlock"`.
2. Tell the user to sign in themselves in that tab, then say when they are done.
3. Do not click Continue with Google, Apple, or phone. Do not type in Email address or any password or code field.
4. Resume only after they confirm. Navigate again to the plugin URL above and snapshot.

## Run the search

Use the controls on the snapshot. Do not guess selectors from memory.

1. If “Install plugin” is present and its target is not `/auth/login`, click it. If a consent dialog appears, unlock and let the user approve it. Do not approve on their behalf.
2. If the listing has no composer after install, go to `https://chatgpt.com/`, snapshot, and open Expedia from the composer’s apps or plugins menu. If it is not listed, return to the plugin URL and install.
3. If the app still is not connected, stop. Tell the user to connect “Expedia” on the plugin page. Do not invent an MCP config.
4. Fill the composer with one query, then send it (click Send, or `browser_press_key` Enter):

```
Find hotels in {destination} checking in {check-in} checking out {check-out}, {guests} adults, {rooms} room(s). Compare prices. Do not book. Hotels only.
```

Example prompt on the listing, for shape only: “Show me hotels near the beach in Cancun”.

5. Snapshot again after results render. If the reply is still generating, snapshot once more. Do not poll for more than a few snapshots.
6. `browser_lock` `action: "unlock"`.

If the app says it is unavailable, region-locked, or not connected, quote that message, mark prices **Unverified**, and stop. Do not substitute another site’s prices.

## What to extract

From the ChatGPT reply and any Expedia card on the page, copy only what is visible:

- Hotel name, area, check-in, check-out, price, and currency
- The provider name
- A provider link, if one is shown

Do not open checkout. Do not click a pay or book button, including “Book on Expedia”. A provider link in the report is for the user to open later.

## How to report

```markdown
**Verified:** Prices below are what the Expedia ChatGPT app showed for hotels on {access date}. Source: https://chatgpt.com/plugins/plugin_connector_68e004f14af881919eb50893d3d9f523. This is a hotel comparison, not a booking, and not a flight fare.

| Hotel | Area | Check-in | Check-out | Price |
| --- | --- | --- | --- | --- |
| … | … | … | … | … |

**Suggestion:** …
```

Leave a cell blank when that field was not on screen. If no price was visible, say **Unverified** and name what the user should confirm with the property. Do not copy a price from the trip planner markdown. Re-check before writing a rate into `index.html` or the planner. Name the stay as a **candidate**. Availability, the rate, and the transfer policy still need confirmation with the property.
