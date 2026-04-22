---
name: content-auditor
description: Monthly or quarterly maintenance session. Reviews learning log, checks pillar relevance, identifies performance patterns, flags if voice profile needs refreshing, and outputs a prioritized maintenance report with specific recommended updates to the client folder. Triggers include "run content audit for [client]", "quarterly audit for [client]", "is [client]'s strategy still working?".
---

# Content Auditor

Strategy that doesn't evolve becomes stale. Pillars that were relevant 3 months ago might not match where the market has moved. A voice profile built from pre-product-launch interviews might not capture the founder's post-launch confidence. This skill runs a monthly or quarterly check on everything in the client folder — pillar relevance, voice freshness, performance patterns — and outputs a prioritized maintenance report.

**Pre-flight:** Run preflight.md. Client: [name provided by user].
**Required:** Full client folder + learning-log.md if it exists.

## Quality Gate

Insufficient input → stop. State gap, impact, fix option. Never invent or fabricate.

---

**Purpose:** Monthly or quarterly check-in. Catches drift before it compounds — pillars that no longer fit the ICP, a voice profile that's gone stale, patterns in what's not working. Outputs a maintenance report with ranked, specific recommendations.

**Run cadence:** Monthly for active clients. Quarterly minimum for any client.

---

## STEP 1 — READ THE LEARNING LOG

Check the client folder for `learning-log.md`.

If learning-log.md exists: read all entries since the last audit date (or all entries if no previous audit is logged).

If learning-log.md does not exist:
```
No learning log found for [client].
I'll run the audit based on the client folder contents alone.
Engagement pattern analysis will not be available without the learning log.
Run feedback-capture at the end of every production session to build this data over time.
```

Proceed to Step 2 regardless.

---

## STEP 2 — PILLAR RELEVANCE CHECK

Read the client's Content Pillars and ICP document.

For each content pillar, assess:
- Does this pillar still map to a named Tier 1 or Tier 2 ICP pain?
- Has the market or the client's offer shifted since this pillar was defined?
- Is this pillar being used? (Cross-reference learning log if available — how many posts produced per pillar?)
- If a pillar has produced 0 posts in the last 30 days: flag it. Either it's not useful or it's being avoided. Both are worth noting.

**Output:** List each pillar with status — CURRENT / NEEDS REFRESH / UNUSED / CONSIDER RETIRING

If engagement data is available from the learning log:
- Flag any pillar where posts consistently underperform (below average engagement for this client)
- Flag any pillar where posts consistently outperform — this may signal an opportunity to expand

---

## STEP 3 — VOICE PROFILE FRESHNESS CHECK

Read the Voice Profile. Compare against any written post samples in the learning log or client folder.

Flag if any of the following are true:
- The client's offer has changed since the voice profile was built → profile may no longer reflect who they're writing for
- The writing rules consistently conflict with how posts actually get approved → rules may be off
- The learning log shows the same voice corrections being made repeatedly → a rule is missing or wrong
- It has been more than 90 days since the profile was built or last updated → schedule a refresh

**Output:** Voice profile status — CURRENT / REFRESH RECOMMENDED / REFRESH REQUIRED (with specific reason)

---

## STEP 4 — PERFORMANCE PATTERN ANALYSIS

Only if learning log data is available.

Analyze entries for:
- **What consistently gets changed:** Are there recurring edits the user makes to every draft? What is the pattern?
- **Hook types that get rewritten:** Which hook structures from hook-generator consistently get revised?
- **Post types that underperform:** Any post type (framework, story, contrarian, how-to) consistently getting lower engagement?
- **Voice drift:** Are post edits moving the output toward or away from the documented voice profile?
- **Rejected ideas:** Are certain idea types (from certain research methods) consistently getting rejected? Why?

If fewer than 5 sessions are logged: note that patterns may not yet be reliable. Surface what's there with a caveat.

---

## STEP 5 — OUTPUT: MAINTENANCE REPORT

```
CONTENT AUDIT REPORT — [CLIENT NAME]
Date: [today's date]
Last audit: [date from previous report, or "First audit"]
Sessions reviewed: [N from learning log, or "No log — folder-based audit only"]

---

PILLAR STATUS:
[Pillar 1]: [CURRENT / NEEDS REFRESH / UNUSED / CONSIDER RETIRING] — [1-sentence reason]
[Pillar 2]: [status] — [reason]
[Pillar 3]: [status] — [reason]

VOICE PROFILE STATUS: [CURRENT / REFRESH RECOMMENDED / REFRESH REQUIRED]
[Reason if not current]

PERFORMANCE PATTERNS:
[List patterns found, or "Insufficient data — continue logging sessions"]

---

RECOMMENDED UPDATES (prioritized):

Priority 1 — Do this now:
[Specific action, e.g., "Retire Pillar 4 (Industry Trends) — 0 posts produced, no ICP pain mapped to it. Replace with [suggested alternative]."]

Priority 2 — Do this this month:
[Specific action]

Priority 3 — Schedule:
[Specific action, e.g., "Refresh voice profile — last updated 4 months ago. Run voice-analyzer Scenario B with 3 recent posts."]

---

To apply Priority 1 updates: confirm and I'll write them to [client]'s folder.
Priority 2+ updates: review and confirm before I apply.
```

---

## STEP 6 — APPLY UPDATES

For any recommended update the user confirms:
1. Show exactly what will change: "I'll update [field] from [current value] to [new value]."
2. Wait for confirmation.
3. Write the change to the client folder.
4. Confirm: "Updated."

For skill file updates (e.g., if a pattern suggests a skill rule needs to change): present the recommendation only. Do not apply. These require explicit human review and approval separately.

---

Audit complete. Maintenance report delivered.
Recommended updates: [list prioritized]

→ trigger: run pattern-recognition for [client] to apply learning from sessions

---

## Verification

**Correctness:**
```
□ Pillar status verdicts (CURRENT / NEEDS REFRESH / UNUSED / CONSIDER RETIRING) supported by specific evidence from the learning log or usage data? Yes → pass. No → add the evidence.
□ Voice profile status (CURRENT / REFRESH RECOMMENDED / REFRESH REQUIRED) includes a specific reason — not just a time-based flag? Yes → pass. No → add the specific reason.
□ Every recommended update is actionable — states exactly what to change, not "review the pillars"? Yes → pass. No → make it specific.
```

**Completeness:**
```
□ All 5 steps run: learning log review, pillar check, voice freshness check, performance patterns, output report? Yes → pass. No → run the missing steps.
□ Report includes last audit date and session count reviewed? Yes → pass. No → add them.
□ Priority ranking applied to recommendations (Priority 1 / 2 / 3)? Yes → pass. No → rank them.
```

**Context-fit:**
```
□ Pillar analysis cross-references the ICP document — not just the content calendar? Yes → pass. No → cross-reference before concluding.
□ Performance pattern analysis notes where data is insufficient (fewer than 5 sessions) — not treated as confirmed? Yes → pass. No → add the caveat.
□ Skill file update recommendations presented for review only — not applied? Yes → pass. No → do not apply them.
```

**Consequence:**
If Priority 1 recommendations are applied immediately: what is the most likely negative consequence that wasn't accounted for?
→ Answer before delivering. If the answer is "retiring a pillar that the client is emotionally attached to" or "refreshing the voice profile with insufficient new material" — flag it explicitly.
