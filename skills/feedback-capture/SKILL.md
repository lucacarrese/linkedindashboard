---
name: feedback-capture
description: Runs automatically at the end of every content production session. Captures what was produced, what was changed and why, what was rejected, and any engagement data. Appends a structured entry to learning-log.md in the client folder. Never interrupts a session — runs at the end only. Triggers automatically at session end, or manually with "capture feedback for [client]".
---

# Feedback Capture

Every content session produces invisible data: what got changed, what got rejected, why the client rewrote the hook, which post type they gravitated toward. Without capturing this, you repeat the same mistakes and miss the same preferences every week. This skill runs silently at the end of every production session and logs the session's learning — so the system gets smarter over time, not just the person.

**Pre-flight:** Run preflight.md. Client: [name from current session context].

## Quality Gate

Insufficient input → stop. State gap, impact, fix option. Never invent or fabricate.

---

**Purpose:** Build a learning log for each client without interrupting the production session. Runs silently at the end. Captures what happened in the session so pattern-recognition can find what's working and what isn't over time.

**When to run:** At the end of every content production session — automatically, or triggered manually.

**Never:** Ask questions during a production session. Never interrupt creative work to capture data. End of session only.

---

## WHAT TO CAPTURE

Observe the session and extract:

**1. What was produced**
- Post topic / angle
- Post type (framework / story / contrarian / how-to / social proof / lead magnet / visual)
- ICP tier targeted (Tier 1 / Tier 2 / Tier 3)
- Hook type used (from hook-generator — desire / curiosity / fear / mixed)
- Content pillar it maps to
- Research source (Reddit / YouTube / real-time signal / repurposing / reverse-engineered / personal material / visual)

**2. What was changed during refinement**
- Was the hook changed after the initial draft? What did it change from and to?
- Were there structural changes (different template used after first draft)?
- Were there voice edits (specific words or phrases the user replaced)?
- Was the CTA changed? What was swapped?

**3. What was rejected (if stated)**
- Ideas that made it through the quality gate but were dropped from the batch — with reason if the user gave one
- Hooks from hook-generator that were not selected — note which and why if stated

**4. Grading outcomes (if post-grader ran)**
- Did the post pass or fail? What was the score vs threshold?
- Which dimensions hit or violated their floor?
- Which known failure patterns from the grading profile were triggered?
- If the post failed and was revised: what changed between the first and final grade?
- If the user overrode the grader (published a post that scored below threshold): note this — it may indicate the floor is too strict.
- If the user rejected a post that passed: note this — it may indicate the floor is too lenient or a missing failure pattern.

**5. Engagement data (if provided)**
- If the user shared performance data for a previously published post during this session: capture it
- Fields: post date / approximate impressions / likes / comments / reposts / outcome (if stated)

---

## HOW TO CAPTURE

Observe silently during the session. Do not ask the user to fill out a form.

At the end of the session, say:

```
Session complete. Capturing feedback for [client]'s learning log.
```

Then extract the above fields from what happened in the session. Fill what you observed. Leave fields blank where nothing relevant occurred — do not invent or guess.

---

## LOG ENTRY FORMAT

Append to `learning-log.md` in the client's folder. If the file does not exist, create it.

```
---
SESSION: [Date] — [Client Name]

PRODUCED:
- Post topic: [angle / title]
- Post type: [type]
- ICP tier: [Tier 1 / 2 / 3]
- Hook type: [desire / curiosity / fear / mixed]
- Content pillar: [pillar name]
- Source: [research method or personal material]

CHANGES MADE:
- Hook changed: [Yes — from "[original]" to "[final]" / No]
- Structure changed: [Yes — from [template] to [template] / No]
- Voice edits: [Yes — "[word/phrase replaced]" → "[replacement]" / No / Not noted]
- CTA changed: [Yes — [describe] / No]

REJECTED:
- Ideas dropped: [list with reason if given, or "None"]
- Hooks not selected: [list with reason if given, or "Not noted"]

GRADING OUTCOME:
- Score: [weighted/threshold (raw/50) or "Grader did not run"]
- Verdict: [PASS / NEEDS REVISION / Grader did not run]
- Floor violations: [dimension(s) that hit below their floor, or "None"]
- Known failure patterns triggered: [pattern name(s) from grading-profile.md, or "None"]
- Revision cycles: [0 / 1 / 2 — how many grader loops before pass]
- User override: [Yes — user published below threshold / Yes — user rejected above threshold / No]
- Override reason: [if stated by user, or "Not stated"]

ENGAGEMENT DATA:
- Post referenced: [topic / date if stated]
- Impressions: [if given]
- Likes: [if given]
- Comments: [if given]
- Reposts: [if given]
- Outcome note: [any context user gave]
[Or: No engagement data provided this session.]
---
```

After appending:

```
Added to [client]'s learning log. [N] sessions logged total.
```

If the client folder cannot be written to:

```
I can't write to [client]'s folder directly. Here is the session entry to paste manually:
[entry]
```

---

Session complete for [client].
Learning log updated.
Gaps encountered this session: [list any limitations, missing inputs, failed calls — or "None"]
Reminder: run content-auditor monthly.

→ trigger: run content audit for [client]

---

## Verification

**Correctness:**
```
□ Log entry captures only what actually happened in the session — no invented or guessed data? Yes → pass. No → remove any fabricated fields.
□ Changes Made section is specific — "Hook changed from X to Y" not "hook was revised"? Yes → pass. No → add the specific before/after.
□ Any engagement data captured is exactly what the user stated — not paraphrased or estimated? Yes → pass. No → use exact figures or leave blank.
```

**Completeness:**
```
□ All 5 capture areas present: What was produced, Changes made, What was rejected, Grading outcome (or "Grader did not run"), Engagement data (or "none provided")? Yes → pass. No → add the missing sections.
□ Entry appended to learning-log.md — not just presented in chat? Yes → pass. No → write it to the file.
□ Total sessions count updated? Yes → pass. No → update it.
```

**Context-fit:**
```
□ Post type uses the correct vocabulary: framework / story / contrarian / how-to / social proof / lead magnet / visual — not "general post"? Yes → pass. No → use the correct label.
□ Hook type labeled as desire / curiosity / fear / mixed — not left blank if a hook was generated? Yes → pass. No → label it.
□ Research source identified where known — not left as "unknown" if the session made it clear? Yes → pass. No → fill it.
```

**Consequence:**
If pattern-recognition runs on this log in 5 sessions: what will be missing that would prevent a useful pattern from emerging?
→ Answer before closing. If the answer is "voice edits weren't captured" or "grading outcomes not logged" or "hook type not logged" — add those fields before saving.
