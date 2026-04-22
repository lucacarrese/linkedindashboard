---
name: pattern-recognition
description: Reads the full learning log for a client and identifies patterns across sessions — what consistently gets changed, which hook types get rewritten, which post types underperform, and where voice drift is occurring. Outputs two things: recommended client folder updates (applies with confirmation) and recommended skill file updates (presents for review only, never applies automatically). Triggers after every 5 sessions automatically, or manually with "run pattern recognition for [client]".
---

# Pattern Recognition

Individual feedback captures are noise. Patterns across 5+ sessions are signal. This skill reads the full learning log and identifies what consistently gets changed, which hook types get rewritten, which post types underperform, and where voice drift is occurring. The output isn't a report — it's a specific list of recommended updates to the client folder (applied with confirmation) and suggested skill improvements (presented for review only, never auto-applied).

**Pre-flight:** Run preflight.md. Client: [name provided by user].
**Required:** learning-log.md (cannot run without it). Triggers after every 5 sessions automatically, or manually.

## Quality Gate

Missing learning-log.md → stop. State gap, impact, fix option.

---

**Purpose:** Find what the learning log reveals about this client's content patterns. Translate recurring observations into specific, actionable improvements — to the client folder and, when warranted, to the skill files themselves.

**Run cadence:** Automatically after every 5 sessions logged in learning-log.md. Or manually on demand.

**Critical rule:** Recommended client folder updates apply with user confirmation. Recommended skill file updates are presented for human review only — never applied automatically.

---

## STEP 1 — READ THE FULL LEARNING LOG

Read every entry in `learning-log.md` for this client.

If fewer than 3 sessions are logged:
```
Only [N] sessions logged for [client]. Patterns require at least 3 sessions to be reliable.
I'll surface what I can see, but treat these as early signals rather than confirmed patterns.
```

Proceed regardless.

---

## STEP 2 — IDENTIFY PATTERNS

Analyze all log entries across these five dimensions:

**A. What consistently gets changed**
- What fields are modified in almost every session? (hooks, structure, specific words, CTAs?)
- Is there a recurring edit the user always makes? What is the common element?
- Pattern threshold: appears in 3+ sessions = flag as a pattern

**B. Hook types that get rewritten**
- Which emotional triggers (desire / curiosity / fear / mixed) consistently get selected and then revised?
- Which hook templates get chosen but then modified significantly?
- Are there hook patterns that get selected and published without changes? (These are working — note them)

**C. Post types that underperform**
- Cross-reference post types with engagement data where available
- Are framework posts, story posts, or contrarian posts consistently getting lower engagement?
- Are certain ICP tiers consistently outperforming others?

**D. Voice drift**
- Are the voice edits the user makes moving the output toward or away from the documented voice profile rules?
- Is there a banned word or phrase appearing repeatedly in drafts that shouldn't be there?
- Is there a voice rule in the profile that seems to produce output the user consistently revises away from?

**E. Research method signal quality**
- Are ideas from certain research methods (Reddit, YouTube, real-time signal, etc.) consistently making it to final batch?
- Are ideas from certain methods consistently getting rejected? This signals a signal quality problem with that method for this client.

**F. Grading profile calibration**
Read the GRADING OUTCOME section of each log entry. This dimension determines whether the grading profile is accurately calibrated to what the client and their reviewers actually accept or reject.

Analyze:
- **Floor accuracy:** Are specific dimension floors being violated repeatedly (same dimension fails 3+ sessions)? This means either the copy-developer has a blind spot OR the floor is correctly catching a real problem. Cross-reference: if the post was revised after the floor violation and the revision was accepted → floor is working. If the user overrode the floor (published anyway) → floor may be too strict.
- **Missing failure patterns:** Is the user consistently rejecting posts or requesting specific changes that the grading profile's Known Failure Patterns section doesn't cover? A recurring edit that doesn't map to any known pattern = candidate for a new pattern.
- **Weight accuracy:** Are posts passing the weighted threshold but then getting rejected by the user? This suggests a dimension that matters to the client is under-weighted. Conversely: are posts failing the threshold but getting accepted by the user? The weight may be too high.
- **Category override gaps:** Are Connect or Respond posts being graded too harshly or too leniently on Conversion Intent? Are Teach posts for accessibility-focused clients (Bharath, Amir) hitting the right Clarity floor?

Pattern threshold: same as other dimensions — 3+ occurrences = confirmed pattern.

---

## STEP 3 — OUTPUT: PATTERN REPORT

```
PATTERN RECOGNITION REPORT — [CLIENT NAME]
Date: [today's date]
Sessions analyzed: [N]
Date range: [first entry date] to [last entry date]

---

PATTERNS IDENTIFIED:

[For each pattern found:]

PATTERN: [Short name, e.g., "Hook rewrites on curiosity templates"]
Observed in: [N] of [total] sessions
What happens: [Specific description — e.g., "Curiosity hooks from templates 11-15 are selected but consistently rewritten before final draft. User typically adds a specific number or personal reference."]
Signal: [What this suggests — e.g., "Curiosity templates need to be more specific out of the gate. The gap is the lack of concrete detail in the initial generation."]

[Repeat for each pattern]

---

PATTERNS NOT YET CONFIRMED (early signals — 1-2 occurrences):
[List anything that appeared twice but isn't yet a pattern — worth watching]

---

NO PATTERNS FOUND IN:
[List any dimensions where the data showed no consistent signal]
```

---

## STEP 4 — RECOMMENDED UPDATES

### Client Folder Updates (applies with your confirmation)

For each pattern that points to a specific fix in the client folder:

```
RECOMMENDED CLIENT FOLDER UPDATE [N]:
What to change: [field name in client folder]
Current value: "[current text]"
Proposed value: "[new text]"
Why: [which pattern this addresses, how many sessions it appeared in]

Confirm to apply? Yes / No
```

Wait for explicit confirmation before writing each change. Do not batch-apply.

Examples of client folder updates:
- Adding a voice rule to the profile that catches a recurring drift
- Adding a word to the banned vocabulary list that keeps appearing in drafts
- Updating a content pillar description that's producing consistently weak ideas
- Flagging a research method as low-signal for this client

---

### Grading Profile Updates (applies with your confirmation)

For each pattern from Dimension F (Grading Profile Calibration) that points to a specific fix:

```
RECOMMENDED GRADING PROFILE UPDATE [N]:
What to change: [weight / floor / category override / known failure pattern / clarity interpretation]
Current value: "[current setting]"
Proposed value: "[new setting]"
Why: [which pattern this addresses — e.g., "Hook floor of 8 was violated in 4/5 sessions but all 4 posts were revised and accepted after hook rewrite → floor is correctly calibrated, no change needed" OR "User accepted 3 posts that scored Voice Match 6, below the floor of 8 → floor may be too strict, propose lowering to 7"]
Evidence: [session dates and specific observations]

Confirm to apply? Yes / No
```

**Types of grading profile updates:**

- **Add a known failure pattern:** A recurring edit the user makes that doesn't map to any existing pattern. Example: "User rewrites every CTA that starts with 'DM me' — add 'DM me as CTA opener' to known failure patterns."
- **Adjust a dimension weight:** A dimension consistently over- or under-predicts what the client accepts. Example: "Posts passing with Voice Match 7 are consistently rejected → Voice Match weight should increase from 1.0x to 1.3x."
- **Adjust a floor:** A floor that's consistently violated but the post gets accepted anyway (too strict), or a floor that passes but the client rejects (too lenient).
- **Add a category override:** A post category is being graded too harshly on a dimension. Example: "Amir's Respond posts keep failing on Conversion Intent, but he doesn't want strong CTAs on hot takes → add Respond override."
- **Update clarity interpretation:** The client's feedback consistently targets a different aspect of clarity than what's documented.

Wait for explicit confirmation before writing each change. Do not batch-apply.

---

### Skill File Updates (presents for review only — never applies automatically)

For each pattern that suggests a skill file needs to change:

```
RECOMMENDED SKILL FILE UPDATE [N]:
Skill: [skill name]
What to change: [describe the specific rule, instruction, or section]
Why: [which pattern this addresses across how many sessions and clients]
Proposed change: [exact text — show the before and after]

STATUS: Presented for your review only.
I will not apply this change. To apply: review the skill file and edit it directly,
or instruct me to apply it explicitly in a separate session.
```

Examples of skill file updates:
- A hook template that consistently produces output that gets rewritten
- A voice application rule in copy-developer that isn't working
- A quality gate filter in weekly-idea-session that's blocking good ideas
- A post structure in copy-developer that consistently underperforms for this type of content

---

## STEP 5 — LOG THE PATTERN RUN

Append to `learning-log.md`:

```
---
PATTERN RECOGNITION RUN: [Date]
Sessions analyzed: [N]
Patterns identified: [N]
Client folder updates applied: [N — list what was changed]
Grading profile updates applied: [N — list what was changed, or "None" / "No grading profile exists"]
Skill file updates surfaced: [N — list what was recommended, not applied]
---
```

---

Pattern recognition complete.
Client folder updates applied: [N — list]
Grading profile updates applied: [N — list, or "None"]
Skill file updates surfaced for review: [N — list]

→ Next run: after 5 more sessions, or manually with "run pattern recognition for [client]"

---

## Verification

**Correctness:**
```
□ Every pattern listed appeared in 3+ sessions — not inferred from 1-2 data points? Yes → pass. No → move it to "Early Signals" section.
□ Recommended client folder updates show exact before/after text — not just "update the voice profile"? Yes → pass. No → add the specific proposed value.
□ Skill file updates presented for review only — not applied? Yes → pass. No → do not apply them. Present only.
```

**Completeness:**
```
□ All 6 dimensions analyzed: what gets changed, hook types rewritten, post types underperforming, voice drift, research method quality, grading profile calibration? Yes → pass. No → analyze the missing dimensions.
□ Pattern run logged to learning-log.md? Yes → pass. No → append the log entry.
□ "No patterns found" sections stated explicitly for dimensions with no signal? Yes → pass. No → add them.
```

**Context-fit:**
```
□ Patterns are specific to this client — not generic observations about LinkedIn content? Yes → pass. No → remove generic observations.
□ Early signals (1-2 occurrences) clearly separated from confirmed patterns (3+)? Yes → pass. No → separate them.
□ Research method quality analysis cross-references accepted vs. rejected ideas — not just volume? Yes → pass. No → cross-reference before concluding.
```

**Consequence:**
If client folder updates are applied based on these patterns: what is the most likely unintended side effect?
→ Answer before presenting recommendations. If the answer is "removing a voice rule that was working well most of the time" — flag it before recommending the change.
