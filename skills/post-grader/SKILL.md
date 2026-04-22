---
name: post-grader
description: Score any LinkedIn post across 5 dimensions using a clean rubric. Pass threshold is 38/50. Below threshold triggers specific, actionable fixes per failing dimension. Optionally rewrites. Triggers include "grade this post", "review my post", "score this", "is this post good", "rewrite this post", or pasting a post for quality review.
---

# Post Grader

A post can feel good and still flop. Feeling is not a grading system. This skill scores posts across 5 dimensions using a clean rubric — hook strength, clarity, ICP relevance, voice match, and conversion intent. Pass threshold is 38/50. Below threshold triggers specific, actionable fixes per failing dimension — not "improve the hook" but "move line 7 to line 1 and cut the first paragraph."

**Pre-flight:** Run preflight.md. Client: [name provided by user].
**Required:** ICP (Dimension 3) and Voice Profile (Dimension 4).

## Quality Gate

Missing ICP or Voice Profile → stop. State gap, impact, fix option.

---

## Grading Profile (client-specific calibration)

Before scoring, check the client folder for a `grading-profile.md` file. If it exists, it overrides the default scoring behavior with client-specific weights, dimension floors, and clarity interpretation.

**What the grading profile controls:**
- **Dimension weights** (1.0x–2.0x multiplier) — which dimensions matter most for this client's audience and editorial feedback history
- **Dimension floors** — minimum acceptable score per dimension, regardless of total. A post can pass the total threshold but still fail if a critical dimension is below its floor
- **Category overrides** — per-category floor adjustments (e.g., Connect posts have a lower Conversion Intent floor because trust-building > pipeline signaling)
- **Clarity interpretation** — what "clear" means for this specific client (compactness, accessibility, or specificity)
- **Known failure patterns** — the recurring editorial issues from real feedback sessions, so the grader knows what to watch for before scoring

**If no grading profile exists:** Use the default flat scoring — 5 dimensions, equal weight, pass threshold 38/50. This is the case for new clients who haven't been through enough editorial cycles yet.

**How weighted scoring works:**

1. Score each dimension 1–10 using the standard rubric below (this doesn't change)
2. Multiply each raw score by its weight from the grading profile
3. Sum the weighted scores
4. Calculate weighted pass threshold: 38 × (sum of all weights / 5)
5. Check each dimension against its floor — any dimension below its floor triggers NEEDS REVISION regardless of total

Example with Alex's profile (weights: Hook 1.5x, Clarity 1.2x, ICP 1.0x, Voice 1.5x, Conversion 0.8x):
- Raw scores: Hook 7, Clarity 8, ICP 8, Voice 7, Conversion 8
- Weighted: 10.5 + 9.6 + 8.0 + 10.5 + 6.4 = 45.0
- Weighted threshold: 38 × (6.0/5) = 45.6
- Verdict: NEEDS REVISION (45.0 < 45.6)
- Plus: Hook 7 < floor of 8 → floor violation flagged
- Without weights this would be 38/50 → PASS. With weights, the weak Hook and Voice (Alex's critical dimensions) correctly trigger a revision.

---

## Scoring Rubric

Score each dimension 1–10 using the rubric below. Apply weights from the grading profile after scoring.

---

### Dimension 1: Hook Strength (1–10)

The only test: would someone stop scrolling to read this?

**8–10:** First 2 lines are specific, unexpected, or create a genuine curiosity gap. Stands out in a feed of AI-generated content.

**5–7:** Competent but not compelling. Describes the topic rather than earning the click. A competitor could write the same opener.

**1–4:** Vague, generic, or could belong to any post on this topic. Starts with "I", a question, or a statement that reads like a blog headline.

---

### Dimension 2: Clarity and Specificity (1–10)

Test: does the post have real substance, or is it advice floating in space?

**8–10:** At least one concrete detail — a number, a name, a scene, a moment, a real result. Feels like it came from experience. Moves from one state to another (problem to insight, confusion to clarity).

**5–7:** Clear point but vague — the claim is real but unanchored. One specific example would fix it.

**1–4:** Pure generic advice. No concrete detail anywhere. The reader cannot picture a real situation this came from.

---

### Dimension 3: ICP Relevance (1–10)

Test: is this post speaking to one specific type of person?

**8–10:** A specific person reads this and thinks "this is about me." Pain points, examples, and language are specific to an audience segment. The right person would save or share this.

**5–7:** Audience identifiable but post speaks to a broad group. Language is slightly more generic than the ICP's actual vocabulary.

**1–4:** Could be about anyone, for anyone. No clear audience segment. The ICP would not recognize their specific situation.

**Connect posts:** Score 8–10 if a specific type of person reads this and feels seen — not because their problem is named, but because their experience is named. "That's exactly how I felt" reaction. Score lower if the story is too personal to generalize or too generic to land.

**Respond posts:** Score 8–10 if the right person thinks "this is exactly what I need to hear about this right now." Score lower if the post reacts to something too niche to matter to the ICP, or too broad to feel relevant to their role.

---

### Dimension 4: Voice Match (1–10)

Test: does this sound like this specific person wrote it?

**8–10:** Clear personality markers — humor, phrasing, opinions, preferences. Sentence length and structure match the Voice Profile. Zero AI vocabulary. A regular reader would recognize the author from the writing alone.

**5–7:** Voice present but diluted — the right person, polished down to a generic version. Minor AI vocabulary slipping through. Correct structure but missing personality markers.

**1–4:** Could have been written by anyone. Classic AI crutches: em dashes, "here's the thing", "the reality is", "let me be honest", "make no mistake". Vocabulary from the banned list present.

---

### Dimension 5: Conversion Intent (1–10)

Test: does this post move the reader closer to trusting, following, or buying?

**8–10:** Author comes across as credible and experienced — demonstrates expertise, doesn't just claim it. Someone would DM or follow after reading. Clear, earned CTA. Post could NOT be written by a direct competitor.

**5–7:** Builds some credibility but conversion path is unclear. CTA feels bolted on rather than earned. Passes the swap test — a competitor could post this with minor edits.

**1–4:** Pure engagement bait with no positioning value. No reason to think about this author specifically. CTA asks for something the post hasn't earned.

**Connect posts:** Measure trust-building, not pipeline signaling. Do not penalize for lacking a promotional CTA — that is correct behavior. Score 8–10 if the post builds genuine human trust: the reader learns something real about who this person is, and is more likely to follow or engage. Score lower if vulnerability feels performed or if the post ends with a hard sell.

**Respond posts:** Measure POV authority, not CTA strength. Score 8–10 if the post shows a faster, sharper read on the industry than average — reader thinks "I want more of this person's takes." Do not penalize for a soft or absent CTA. Score lower if the post just summarizes what happened with no distinct perspective.

---

## Scoring Calibration

- **10:** Exceptional. Would go viral in this niche.
- **8–9:** Very strong. Clear voice, specific, will perform.
- **6–7:** Good but has a fixable weakness. Worth revising.
- **4–5:** Multiple problems. Needs real work before publishing.
- **1–3:** Structural rethink needed.

A post with clear voice, real specificity, and genuine insight starts at 8. Reserve scores below 6 for posts with genuine problems.

**Performance benchmarks (calibration context):**
- 3–5% engagement rate: solid
- 5–8%: strong
- 8–10%: excellent — candidate to repurpose
- 10%+: viral for this niche — study the structure and repeat it
- Meaningful comments: adds perspective, shares experience, asks a follow-up. Emoji reactions and "great post!" do not count.
- Saves: strongest indicator for Teach posts.
- Shares/reposts: highest-value signal for Lead posts.
- Connection requests: best pipeline signal.

---

## Output Format

**If grading profile exists (weighted scoring):**

```
TOTAL SCORE: [weighted sum] / [weighted threshold] ([raw sum]/50 unweighted)
VERDICT: [PASS / NEEDS REVISION]
GRADING PROFILE: [client name] — applied

SCORES:                    Raw   Weight  Weighted
Hook Strength:             [N]   ×[W]    [N×W]     [floor: X — OK/FLOOR VIOLATION]
Clarity/Specificity:       [N]   ×[W]    [N×W]     [floor: X — OK/FLOOR VIOLATION]
ICP Relevance:             [N]   ×[W]    [N×W]     [floor: X — OK/FLOOR VIOLATION]
Voice Match:               [N]   ×[W]    [N×W]     [floor: X — OK/FLOOR VIOLATION]
Conversion Intent:         [N]   ×[W]    [N×W]     [floor: X — OK/FLOOR VIOLATION]

[If category override applied: "Category override: [category] — Conversion Intent floor lowered to [N]"]
[Clarity interpretation: [compactness/accessibility/specificity] — per grading profile]
```

**If no grading profile (default flat scoring):**

```
TOTAL SCORE: [N] / 50
VERDICT: [PASS (38+) / NEEDS REVISION (<38)]
GRADING PROFILE: none — using default flat scoring

SCORES:
Hook Strength:       [N]/10
Clarity/Specificity: [N]/10
ICP Relevance:       [N]/10
Voice Match:         [N]/10
Conversion Intent:   [N]/10
```

**If PASS:**
Strong post. Ready to publish.
[Note any dimension at 7 or below, or any dimension close to its floor — optional improvement if user wants.]
[If a floor was barely met (score = floor): flag as "at risk" — one revision away from failing.]

**If NEEDS REVISION — run Structured Diagnosis:**

Generic "fix the hook" feedback produces generic revisions. When a post fails, the grader must diagnose *why* the failure happened — not just *where* the score is low. This 4-step diagnosis replaces vague dimension notes with a rewrite directive that gets it right on the next pass.

**Step 1 — Root Cause (which dimension is dragging the rest down?):**
Scores rarely fail independently. A weak hook often masks a clarity problem (the post has no specific detail to hook with). A low voice match often means the structure was wrong for how this person talks. Identify the **primary failing dimension** — the one that, if fixed, would lift at least one other score.

```
ROOT CAUSE: [Dimension] ([Score]/10)
Why it's the root: [One sentence — how this dimension's failure is causing or worsening other low scores]
```

**Step 2 — Pattern Check (has this happened before?):**
Read the client's `learning-log.md` (if it exists). Search for prior sessions where the same dimension failed or the same type of fix was applied.

```
PATTERN CHECK:
- Prior occurrence: [Yes — session date + what happened / No — first time]
- If yes: [What was done last time, and did it work?]
- Recurring pattern: [Yes — this is a known drift area / No]
```

If a pattern is found, the rewrite directive in Step 4 must address the root pattern, not just this instance. If learning-log.md doesn't exist or has no relevant entries, state "No prior data" and proceed.

**Step 3 — Hypothesis (what specifically went wrong in the writing process?):**
Name the most likely process failure. This is not "the hook is weak" — it's *why* the hook ended up weak.

Common hypotheses:
- Voice Profile was read but not applied to sentence structure (only vocabulary was matched)
- The idea lacked a concrete detail and copy-developer didn't flag it with [INSERT REAL DATA]
- Structure choice didn't match the idea type — a story idea was forced into a list format
- The CTA was bolted on rather than earned by the body
- Hook describes the topic instead of creating tension — a category mismatch

```
HYPOTHESIS: [One sentence — the process failure that produced this score]
```

**Step 4 — Rewrite Directive (specific instructions for copy-developer):**
Not "improve the hook." Not "add more specificity." The directive must name:
- The exact line(s) to change
- What to replace them with (or the type of replacement needed)
- Which Voice Profile rule or ICP detail to lean on

```
REWRITE DIRECTIVE:
1. [Specific instruction referencing an exact line or section of the draft]
2. [Specific instruction if a second fix is needed]
3. [If pattern was found: instruction to prevent recurrence]
```

**Full NEEDS REVISION output:**

```
TOTAL SCORE: [weighted sum] / [weighted threshold] ([raw sum]/50 unweighted)
VERDICT: NEEDS REVISION
GRADING PROFILE: [client name or "default"]
FAIL REASON: [weighted total below threshold / floor violation on [dimension] / both]

SCORES:                    Raw   Weight  Weighted  Floor
Hook Strength:             [N]   ×[W]    [N×W]     [X — OK/VIOLATION]
Clarity/Specificity:       [N]   ×[W]    [N×W]     [X — OK/VIOLATION]
ICP Relevance:             [N]   ×[W]    [N×W]     [X — OK/VIOLATION]
Voice Match:               [N]   ×[W]    [N×W]     [X — OK/VIOLATION]
Conversion Intent:         [N]   ×[W]    [N×W]     [X — OK/VIOLATION]

DIAGNOSIS:
Root Cause:    [Dimension] ([N]/10) — [why it's the root]
Pattern Check: [Prior occurrence or "No prior data"]
               [If grading profile lists a known failure pattern that matches: "KNOWN PATTERN: [pattern from profile]"]
Hypothesis:    [Process failure that produced this result]

REWRITE DIRECTIVE:
1. [Specific fix with line reference]
2. [Second fix if needed]
3. [Pattern prevention if applicable]
```

Return to copy-developer with the rewrite directive. Revise, then re-grade.

---

## Rewrite Mode

If user requests a rewrite after grading:

- Target 9/10 on every dimension
- Rewrite the hook completely if it scored below 8
- Add one concrete detail wherever the original was vague — a number, a scene, a name
- Make bold improvements, not light edits
- Keep the author's core message and voice

**Banned in rewrites:**
em dashes / "here's the thing" / "the reality is" / "let me be honest" / "make no mistake" / "let that sink in" / "read that again" / "full stop" / "game-changer" / "next-level" / "deep dive" / "that said" / "in today's landscape" / "in today's fast-paced world" / "it's important to note" / "as we navigate" / "leverage" (as a verb) / "utilize" / "synergies" / "circle back" / "in conclusion" / "groundbreaking" / "transformative" / "cutting-edge" / "robust" / "scalable" / "best practices" / "touch base" / overly perfect parallel structure (three items that begin and end identically — real writing varies)

---

## Verification

**Correctness:**
```
□ Each dimension score is supported by a specific observation from the post (not a general statement)? Yes → pass. No → add the specific observation.
□ The feedback for any failing dimension names an exact line or word to change, not a general direction? Yes → pass. No → rewrite the feedback to be specific.
□ Post-type adjustments applied to Connect/Respond posts in Dimensions 3 and 5? Yes → pass. No → apply them now.
```

**Completeness:**
```
□ All 5 dimensions scored? Yes → pass. No → score the missing ones.
□ Total score calculated correctly (sum of 5 dimensions)? Yes → pass. No → recalculate.
□ PASS or NEEDS REVISION verdict stated? Yes → pass. No → add it.
```

**Context-fit:**
```
□ Dimension 4 (Voice Match) scored using the client's actual Voice Profile, not generic "sounds natural" judgment? Yes → pass. No → read the Voice Profile and re-score.
□ Dimension 3 (ICP Relevance) scored against the client's documented ICP tier, not general audience intuition? Yes → pass. No → read the ICP and re-score.
□ Any score below 6 accompanied by a structural fix, not just a surface edit suggestion? Yes → pass. No → add the structural fix.
```

**Consequence:**
If this post goes live at the current score: what is the single most likely underperformance reason?
→ State it before delivering. If the answer is "the hook won't stop the scroll" or "it reads as AI" — the post is not ready. Fix it or flag it explicitly.

---

[If PASS:]
Post approved — [weighted score]/[weighted threshold] ([raw]/50)
Grading profile: [client name or "default"]
Dimension scores: Hook [N] | Clarity [N] | ICP [N] | Voice [N] | Conversion [N]

Next steps:
A) Post needs a visual → trigger: run visual-brief for [client]
B) Text only, next idea → trigger: run hook-generator for [next idea title]
C) All posts done → trigger: end session for [client]

---

[If NEEDS REVISION:]
Post needs work — [weighted score]/[weighted threshold] ([raw]/50). Grading profile: [client name or "default"]
Fail reason: [weighted total / floor violation / both]
Root cause: [dimension + score + why it's dragging other scores]
Pattern: [prior occurrence from learning-log or "first time" + known pattern from grading profile if matched]
Hypothesis: [process failure]
Rewrite directive: [numbered specific fixes with line references]

Returning to copy-developer now with rewrite directive.
[loops automatically — max 2 retries]
