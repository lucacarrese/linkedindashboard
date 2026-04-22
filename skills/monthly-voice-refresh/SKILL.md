---
name: monthly-voice-refresh
description: Every 4 weeks, pull fresh Fireflies transcripts for a client, analyze for new voice patterns, and produce a suggestion report for voice-profile.md updates. Never edits voice-profile.md automatically — human approval required. Can be triggered manually or called by cron.
---

# Monthly Voice Refresh

People's voices evolve. A founder sounds different after raising a round, after losing a key hire, after landing their biggest client. A voice profile built 3 months ago might capture the right personality but miss the new confidence, the new frustration, or the new vocabulary. This skill pulls fresh Fireflies transcripts, analyzes for new voice patterns, and produces a suggestion report. Never edits voice-profile.md automatically — human approval required.

**Pre-flight:** Run preflight.md. Client: [name provided by user or cron job].
**Required:** Client name, niche, existing voice-profile.md.
**Trigger:** Manual or cron (first Monday of each month). Always runs in HEADLESS MODE.

## Quality Gate

Missing voice-profile.md → stop. State gap, impact, fix option.

---

## MODE DETECTION

This skill always runs in HEADLESS MODE — whether triggered manually or by cron.

```
HEADLESS MODE ACTIVE
— Never ask questions
— Run all steps automatically
— Flag issues in output but never block execution
— If a step fails: log the failure, continue to the next step
— Never edit voice-profile.md — suggestions only
```

---

## STEP 1 — TRANSCRIPT PULL

Search **both Fireflies and Google Drive** for all transcripts from the **past 4 weeks** for this client. Run both searches in parallel.

Use the same search term mapping as fireflies-transcript-miner:

| Client ID | Search terms |
|-----------|-------------|
| amir-airtop | "airtop" |
| bharath-datapoem | "datapoem", "bharath" |
| alex-coldiq | "coldiq", "alex" |
| mai-lan-linkedin | "mai-lan", "content call" |

**Fireflies search patterns** (substitute client terms from mapping above):
- "[client name] content call"
- "[client name] weekly"
- "content call [client name]"
- "weekly [client name]"

**Google Drive search patterns** (Gemini-recorded calls — search by document name):
- "Content [client name]"
- "Mai Lan [client name]"

**Mai Lan's own content (mai-lan-linkedin):** Also search for DWY client calls:
- "Content SEOPROFY"
- "Content PIP"

**Fireflies:** Use `fireflies_search` or `fireflies_get_transcripts` MCP tool.
**Google Drive:** Use `mcp__google-docs__searchGoogleDocs` with `searchIn: "name"` and `modifiedAfter` set to 4 weeks ago (ISO 8601). Read matched documents with `mcp__google-docs__readGoogleDoc` to extract transcript text.

**If no transcripts found in past 4 weeks (across both sources):**
- Flag: "No transcripts found for [client] in the past 4 weeks — voice analysis skipped."
- End the skill. Do not run voice analysis with no data.
- Send Discord notification with the skip flag (see Step 5).

**If one source fails, continue with the other. If both fail:**
- Flag: "Fireflies + Google Drive unavailable — [error details]"
- End the skill. Send Discord notification with the failure flag.

**Save all transcripts to:**
`clients/[client-id]/transcripts-[YYYY-MM].md`

File format:
```
# Transcripts — [Client Display Name] — [Month YYYY]

---

## [Transcript Title]
**Date:** [date]
**Duration:** [duration]

[Full transcript text or extracted content]

---

## [Next Transcript Title]
...
```

If a transcripts file for this month already exists, append new transcripts to it (do not overwrite).

---

## STEP 2 — VOICE PATTERN ANALYSIS

Read the transcripts saved in Step 1.
Read the existing `clients/[client-id]/voice-profile.md`.

Analyze the transcripts for the following 4 categories:

### 1. Phrases and Expressions
- Phrases or expressions the client uses repeatedly across multiple transcripts
- Filler structures they reach for when explaining something ("the thing is...", "what most people miss is...")
- Sentence openers or closers they default to

### 2. Vocabulary
- Technical terms, jargon, or niche-specific words they use naturally
- Words they use to describe their own work, product, or methodology
- Words they use to describe their clients, prospects, or audience
- Any language that feels new or different from the current voice profile

### 3. Storytelling Patterns
- How they structure stories or case studies (setup → conflict → resolution?)
- Whether they use data first or emotion first
- How they open and close an argument
- Any narrative structures that appear more than once

### 4. Topics and Themes
- Topics they keep returning to across multiple transcripts
- New themes that aren't represented in their current voice profile
- Anything their audience says back to them — questions, reactions, pushback — that the client references

---

## STEP 3 — COMPARISON

Read `clients/[client-id]/voice-profile.md` again for direct comparison.

Classify each pattern found in Step 2:

| Classification | Meaning |
|----------------|---------|
| NEW | Not present in current voice profile |
| CHANGED | Present but used differently or with different emphasis |
| DISAPPEARED | Was in voice profile but absent from recent transcripts |

**Confidence levels:**
- HIGH — pattern observed 3 or more times across transcripts
- MEDIUM — pattern observed exactly 2 times
- LOW — observed once; flag but do not recommend adding without more evidence

Flag only meaningful patterns. Do not flag one-off phrases or anomalies from a single moment in a transcript.

---

## STEP 4 — SUGGESTION REPORT

Create the file:
`clients/[client-id]/voice-refresh-[YYYY-MM].md`

### Report format:

```markdown
# Voice Refresh Report — [Client Display Name] — [Month YYYY]

**Generated:** [date]
**Transcripts analyzed:** [N]
**Transcript file:** clients/[client-id]/transcripts-[YYYY-MM].md

---

## Transcripts Analyzed

| Title | Date | Duration |
|-------|------|----------|
| [title] | [date] | [duration] |

---

## New Patterns Found

### Phrases and Expressions
[Bulleted list with transcript evidence, or: None found]
- "[exact phrase from transcript]" — seen [N] times — Confidence: HIGH/MEDIUM/LOW

### Vocabulary
[Bulleted list with transcript evidence, or: None found]

### Storytelling Patterns
[Bulleted list with examples, or: None found]

### Topics and Themes
[Bulleted list, or: None found]

---

## Suggested Additions to voice-profile.md

[Specific text blocks to add, formatted exactly as they should appear in the voice profile]
[Or: No additions suggested — no HIGH or MEDIUM confidence patterns found]

---

## Suggested Updates to copy-developer Language Rules

### Add to "use" list:
[Phrases or words to add, or: None]

### Add to "avoid" list:
[Phrases or words to add, or: None]

---

## Patterns That Have Disappeared

[List patterns from voice-profile.md that were absent from recent transcripts — consider removing]
[Or: No disappearances noted]

---

## Confidence Summary

| Suggestion | Confidence | Basis |
|------------|-----------|-------|
| [suggestion] | HIGH/MEDIUM/LOW | Seen [N] times — "[example quote]" |

---

> To apply these updates, review and run: **update voice profile for [client]**
```

**If no HIGH or MEDIUM confidence patterns are found:**
- Still create the report
- Note: "No meaningful new patterns found this month. Voice profile appears current."
- Do not suggest changes based on LOW confidence patterns alone

---

## STEP 5 — GOOGLE DRIVE SAVE

Read `Google Drive Folder ID` from `clients/[client-id]/client-profile.md`.

Save the voice refresh report to the client's Google Drive folder using the Google Docs MCP.

**IMPORTANT:** Follow `google-docs-formatting.md` in the engine root. Do NOT pass markdown text to `createDocument` via `initialContent` — it renders as raw markdown syntax. Instead: create an empty document, insert clean text (markdown syntax stripped), then apply native paragraph styles (HEADING_2, HEADING_3) and text styles (bold, italic) via the Google Docs API.

**Document title:** `Voice Refresh — [Client Display Name] — [Month YYYY]`
(e.g., "Voice Refresh — Amir Ashkenazi — March 2026")

**Folder ID:** value of `Google Drive Folder ID` field in client-profile.md

**Document content:** full contents of the `voice-refresh-[YYYY-MM].md` report generated in Step 4, formatted natively per the procedure above.

**If Google Drive Folder ID is missing from client-profile.md:**
- Flag: "Google Drive Folder ID missing from client-profile.md — report saved locally only."
- Skip Google Drive save. Continue to Discord notification.

**If Google Drive save fails:**
- Flag: "Google Drive save failed — [error details] — report saved locally only."
- Skip. Continue to Discord notification.
- Include failure note in Discord message (see Step 6).

---

## STEP 6 — DISCORD NOTIFICATION

Send a Discord message via webhook when all steps are complete.

**Webhook:** `DISCORD_WEBHOOK_URL` environment variable

**Standard message format:**
```
Monthly voice refresh complete for [Client Display Name]

Transcripts analyzed: [N]
New patterns found: [N]
Report saved to: clients/[client-id]/voice-refresh-[YYYY-MM].md
Google Doc: [document URL or "save failed — local only"]

Review and approve updates when ready.
```

**If transcripts were not found (skip case):**
```
Monthly voice refresh: no transcripts found for [Client Display Name]

Search window: past 4 weeks
No voice analysis was run — nothing to review.
```

**If Fireflies was unavailable:**
```
Monthly voice refresh: Fireflies unavailable for [Client Display Name]

Error: [error details]
No voice analysis was run.
```

**If Google Drive save failed, add this line to the standard message:**
```
⚠ Google Drive save failed — report saved locally only.
```

**Send via:**
```
POST {DISCORD_WEBHOOK_URL}
Content-Type: application/json
{
  "content": "[message text above]"
}
```

If the webhook call fails: log the failure. Print the full message to terminal so it can be copied manually.

If `DISCORD_WEBHOOK_URL` is not set: complete all steps, then note: "DISCORD_WEBHOOK_URL not set — notification not sent. Copy the summary above to Discord manually."

---

## VERIFICATION

Run before closing. All checks are binary.

**Correctness:**
```
□ Were transcripts from the past 4 weeks pulled for the right client? Yes → pass. No → flag: wrong client matched — check search terms.
□ Does the report reference only patterns found in the transcripts (not fabricated)? Yes → pass. No → flag and remove unsupported suggestions.
```

**Completeness:**
```
□ Were all 4 analysis categories covered (phrases, vocabulary, storytelling, topics)? Yes → pass. No → flag which categories are missing and why.
□ Does the report include a confidence level for every suggestion? Yes → pass. No → add confidence ratings before closing.
□ Was the report saved locally? Yes → pass. No → save now.
□ Was a Google Drive save attempted? Yes → pass. No → attempt now or log why it was skipped.
□ Was Discord notification sent (or failure logged)? Yes → pass. No → send now.
```

**Context-fit:**
```
□ Are suggestions specific and grounded in direct transcript evidence (exact quotes or clear patterns)? Yes → pass. No → flag vague suggestions — add evidence or remove.
□ Do suggested additions feel meaningfully different from what is already in voice-profile.md? Yes → pass. No → flag as low-value — may not be worth adding.
```

**Consequence:**
```
□ If these suggestions are applied to voice-profile.md, will copy-developer produce more accurate voice matching for this client? Yes → pass. No → flag low-value suggestions and note why.
```

---

## CHANGELOG

v1.0 — March 2026 — initial build
