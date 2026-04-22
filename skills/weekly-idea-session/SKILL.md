---
name: weekly-idea-session
description: Self-serve weekly content planning session. Always runs both evergreen mining (from confirmed materials) and 6 parallel research workers (live signals). Outputs three pools — 5 evergreen ideas, all research angles ranked, and a recommended weekly combination mixing both. Triggers include "start my weekly session", "generate ideas for this week", "weekly idea batch", "what should I post this week", "run weekly ideation for [client]".
---

# Weekly Idea Session

The hardest part of LinkedIn consistency isn't writing — it's knowing what to write. Most creators stare at a blank page and default to whatever's on their mind, which produces random content that doesn't compound. This skill replaces randomness with a system: 6 parallel research workers mine different sources, results get merged and quality-gated, personal material gets layered in, and you end up with a sized, prioritized batch of ideas that are ICP-targeted and ready to develop.

**Pre-flight:** Run preflight.md. Client: [name provided by user].
**Required:** Content pillars must be present — hard stop without them.

## Quality Gate

Missing content pillars → stop. State gap, impact, fix option. Never invent or fabricate.

---

## PHASE 1 — INTAKE

Defaults: 1 week, 6 ideas per week, research always on. Do not ask these questions — just proceed. Override defaults only if the user explicitly states a different duration or idea count in their request (e.g. "run weekly ideation for 2 weeks" or "give me 8 ideas").

State the session parameters once and move to Phase 2:

```
Running weekly idea session for [client].
Duration: [1 week / N weeks per user request]
Ideas per week: [6 / N per user request]
Research: on
Evergreen pool: 5 ideas
```

---

## PHASE 2 — RESEARCH

Research always runs. State which workers are launching and spawn all 6 simultaneously.

```
Running 6 research methods in parallel — this takes a moment.
```

**Workers (run simultaneously):**

1. **reddit-miner** — ICP communities and forums → real pain language and post angles
2. **youtube-miner** — Long-form video in niche → frameworks and insight angles
3. **real-time-signal** — Grok/X + Apify → live debates and POV angles
4. **repurposing-archive** — Client post history via Apify → gaps and refresh angles
5. **reverse-engineering** — Viral text + visual posts via Apify → structural templates and angles
6. **viral-visual-miner** — Proactive visual search → visual framework ideas

Each worker receives: client name, keyword string from pre-flight, content pillars.
Each worker returns a standardized METHOD RESULT block.

**RECENCY RULE:**
- **real-time-signal, reverse-engineering, viral-visual-miner:** All WebSearch queries must include `after:[date 7 days ago YYYY-MM-DD]`. Discard LinkedIn posts and live debates older than 14 days. This is a B2B AI/tech niche — 2 weeks is already old news, 4 weeks is history.
- **All Apify LinkedIn searches:** filter to past week only.
- **reddit-miner:** Use a 15-day window. Reddit threads are ICP pain sources, not breaking news. Do not apply the 7-day rule here.
- **youtube-miner:** Use a 30-day window. YouTube videos are framework sources. Do not apply the 14-day rule here.
- **repurposing-archive:** No recency filter — pulls client's full post history by design.
- If a worker finds nothing after exhausting its window, flag FAILED. Do not substitute industry press, blogs, or news articles for any worker.

After all workers complete:
- Collect all METHOD RESULT blocks
- Note any workers that returned FAILED or PARTIAL status
- Deduplicate angles that are substantially the same idea from different sources
- Pool all passing angles for Phase 3

**Model routing note:** Phase 2 workers are data-gathering tasks — fetching from APIs, extracting pain points from threads, parsing video transcripts. These run fine on standard models. Phases 2.5–6 (evergreen mining, personal material extraction, quality gate, coverage checks, prioritization) require judgment: evaluating ICP fit, spotting generic angles, balancing the batch. If using plan mode or model switching, the split point is here — research below this line, synthesis above.

---

## PHASE 2.5 — EVERGREEN POOL

While research workers run (or after they complete), build 5 ranked evergreen ideas from confirmed client materials. These are pillar-grounded, long-shelf-life ideas that don't depend on news hooks.

**Sources (mine all of these):**
- Content pillars — each pillar should have at least 1 evergreen idea in the batch of 5
- Onboarding form answers — core problems, customer outcomes, objections, differentiators
- Voice profile — editorial stances, strong opinions, personal history anchors
- ICP document — named pain points per persona tier
- Case studies and social proof — approved client results
- Client-provided materials — whitepapers, presentations, new case studies, pitch decks, internal docs. Check the client folder for any recently added files and prioritize fresh material — it carries specificity that older pillar angles don't.

**Rules:**
- 5 ideas per run (regardless of how many weeks the session covers — evergreen is reusable across weeks)
- All marked `Recommended post date: Any day (evergreen)`
- Each idea must map to a content pillar
- Rank by: ICP Tier 1 fit → specificity (HIGH preferred) → pillar coverage (don't cluster on one pillar)
- Apply Phase 4 quality gate to each evergreen idea — 2/3 minimum to include
- Do not repeat the same 5 evergreen ideas across consecutive weekly sessions — rotate fresh angles from the source material

---

## PHASE 3 — PERSONAL MATERIAL

Present a brief count, then ask:

```
Research complete — [N] angles found across [X] methods.
[Note any methods that could not run and why.]

Before I size the batch: do you have any personal material this week?
A client conversation, a pattern you noticed, a win, something frustrating,
an insight from your work — anything real.

If yes, paste it and I'll extract angles and add them to the pool.
If no, I'll build the batch from research.
```

If personal material is provided, extract:
1. Specific stories or moments → standalone post candidates
2. Concrete data points, numbers, or results → post anchors
3. Contrarian takes or strong opinions → challenge posts
4. Client pain points or objections → audience-resonant angles
5. Personal experiences or lessons → Connect post material

For each extracted angle: 1-sentence summary / ICP tier / category / specificity rating (HIGH = has real number or named story / MEDIUM / LOW).

Add to pool. Proceed to Phase 4.

---

## PHASE 4 — QUALITY GATE

Apply to every angle in the pool:

**Q1: Is there a real experience, specific number, or concrete story behind this?**
YES → pass. NO → flag "needs enrichment" or discard.

**Q2: Could only this person write this — or could anyone in their industry write it?**
YES (distinctive) → pass. NO (generic) → flag for refinement.

**Q3: Does this speak to a named pain point of Tier 1 or Tier 2 ICP?**
YES → pass. NO → move to Tier 3 bucket or discard.

**Decision:**
- 3/3 → include in batch
- 2/3 → include with note on weak dimension
- 1/3 → return to user: "This needs more before developing — here's why: [specific gap]"
- 0/3 → discard quietly

---

## PHASE 5 — COVERAGE CHECKS

### ICP Tier Coverage

| Tier | Target | Current count |
|------|--------|---------------|
| Tier 1 (Decision Makers) | At least 2 | [count] |
| Tier 2 (Champions / Evaluators) | At least 1 | [count] |
| Tier 3 (Community / Practitioners) | 0–1 flexible | [count] |

Tier 1 under 2 → flag:
```
We have [X] Tier 1 posts. For pipeline impact, we need at least 2.
I can pull one more from [research method] — or do you have a client story
or outcome you haven't mentioned yet?
```

Do not silently add ideas to fill the quota.

### Post-Type Diversity Check

Recommended weekly mix: 30–40% Teach, 20–25% Lead, 20–25% Prove, 15–20% Connect, 5–10% Respond.

| Category | Target % | Current count |
|----------|----------|---------------|
| Teach/Educational | 30–40% | [count] |
| Lead/Thought Leadership | 20–25% | [count] |
| Prove/Social Proof | 20–25% | [count] |
| Connect/Relationship | 15–20% | [count] |
| Respond/Amplify | 5–10% | [count] |

Batch represents fewer than 3 of 5 categories → flag and ask.
More than 50% of the batch falls in a single category → flag:

```
This batch is heavily weighted toward [category] posts ([N] of [total]).
A balanced week signals range to the algorithm and to your audience.
Want me to suggest a swap — or is this intentional for this week?
```

Do not force a rebalance. Flag and ask.

### Evergreen-Research Balance Check (applied to Section C only)

| Source | Default target per 6-idea week | Current count |
|--------|-------------------------------|---------------|
| Evergreen | ~3 | [count] |
| Research | ~3 | [count] |

Adjust based on what's available:
- If the research week has 5+ HOT signals, shift to 2 evergreen + 4 research.
- If the research week is thin (few HOT, mostly WARM), shift to 4 evergreen + 2 research.
- Never go all-evergreen or all-research. Minimum 1 from each pool.

All ideas from one pool → flag:
```
This week's combination is 100% [evergreen/research]. A balanced week needs both:
- Evergreen posts build long-term authority and compound over time on the feed
- Research posts capture timely signals and show the client is paying attention to the market
Want me to swap one in from the other pool?
```

Do not force a rebalance. Flag and ask.

---

## PHASE 6 — LEAD MAGNET PROMPT

Ask once after confirming the idea batch:

```
One more option: would you like one post this week to be a lead magnet?
That means giving away a free resource — a template, checklist, playbook, or system —
in exchange for comments and connections.

Say yes only if you're ready to build and deliver the resource.
The post creates a public promise. You need to follow through.

Yes / No / Maybe next week
```

Yes → flag that idea for the lead magnet path → lead-magnet-writer + lead-magnet-builder instead of the standard copy path.

---

## PHASE 7 — OUTPUT

Present results in three sections. The Recommended Weekly Combination (Section C) is the actionable output — the pools (A and B) provide context and options.

### Standard per-idea format (used across all sections)

```
IDEA [N]: [Title / angle in one sentence]

Pool: [Evergreen / Research]
ICP Tier: [Tier 1 / Tier 2 / Tier 3]
Category: [Teach / Lead / Prove / Connect / Respond]
Source: [Personal material / Reddit / YouTube / Real-time signal / Archive repurpose / Reverse-engineered / Visual anchor / Content pillar / Onboarding / Case study / Client-provided material]
Specificity: [HIGH / MEDIUM — with note if enrichment needed]
Quality gate: [3/3 / 2/3 — with note on weak dimension if applicable]
Recommended post date: [Month DD] or earlier | Any day (evergreen) | [Month DD] (pre-event) or [Month DD] (same-day reaction)
```

**Why Recommended post date is required:** News-reactive ideas decay at different rates. A "5-7 day first-mover window from April 15" means nothing to a client scheduling across a full week — they'll pick it Monday and post it Thursday when the window closed Tuesday. The skill has the research context; the client does not. Translate every decay window into a concrete post-by date. For ideas with no decay, state "Any day (evergreen)" — consistency means the client can scan the field and know status at a glance.

**How to set the date:**
- News hook with a stated decay window: today + decay days = latest recommended post date. Subtract 1-2 days for margin.
- Calendar-locked event (earnings, conference, product launch): use the event date itself for pre-event posts, or the next day for same-day reactions.
- Stat that will be superseded by a scheduled refresh: use the refresh date minus 1 as the latest.
- No decay / pillar-grounded: "Any day (evergreen)".

---

### Section A — Evergreen Pool (5 ideas, ranked)

Present the 5 evergreen ideas from Phase 2.5, ranked by ICP Tier 1 fit and specificity. State which content pillar each maps to. These ideas can be used any week — they don't expire.

---

### Section B — Research Pool (all scraped angles, ranked)

Present ALL research-sourced angles ranked by:
1. Urgency (HOT → WARM → Evergreen-adjacent)
2. ICP Tier 1 relevance
3. Pillar fit

Do not cap this section — output everything the research workers found. The user will not use all of them; the ranking is what matters. Typical count: 15-25 angles.

---

### Section C — Recommended Weekly Combination

Present [6 × N weeks] ideas as the recommended content plan. Default: 6 ideas for 1 week.

**Default mix:** 3 evergreen + 3 research. Adjust based on what's available:
- If the research week has 5+ HOT signals, shift to 2 evergreen + 4 research.
- If the research week is thin (few HOT, mostly WARM), shift to 4 evergreen + 2 research.
- Never go all-evergreen or all-research. Minimum 1 from each pool.

Each idea tagged with `[Evergreen]` or `[Research]` so the source is visible at a glance.

Apply coverage checks (Phase 5) to this section specifically — TOFU/MOFU/BOFU, ICP tiers, pillar mix, category diversity, and evergreen-research balance.

End with summary:

```
This week's combination: [N] ideas ([X] evergreen + [Y] research)
Tier coverage: [X] Tier 1 | [Y] Tier 2 | [Z] Tier 3
Lead magnet: [Yes — [idea title] / No]
Methods that could not run: [list with reason, or "None"]

Next step: Take your first idea to hook-generator, then copy-developer.
Or bring them all — develop one at a time.
```

---

## Verification

**Correctness:**
```
□ Every idea in the batch passed Phase 4 quality gate at 2/3 or higher? Yes → pass. No → remove or flag the failing ones.
□ Tier 1 ICP count is at least 2? Yes → pass. No → flag before delivering.
□ Batch size matches the post count the user stated in Phase 1? Yes → pass. No → resize.
```

**Completeness:**
```
□ Each idea has all 6 output fields: ICP Tier, Category, Source, Specificity, Quality gate, Recommended post date? Yes → pass. No → fill the missing fields.
□ Every idea's Recommended post date is a concrete date or "Any day (evergreen)" — never a vague decay window? Yes → pass. No → resolve the date before delivering.
□ Summary block includes tier coverage, lead magnet decision, and methods that failed? Yes → pass. No → add it.
□ Any workers that returned FAILED or PARTIAL have a note explaining why? Yes → pass. No → add the note.
```

**Context-fit:**
```
□ Section A (Evergreen Pool) contains exactly 5 ideas? Yes → pass. No → fill or trim.
□ Section B (Research Pool) contains all scraped angles with ranking? Yes → pass. No → add missing angles.
□ Section C contains at least 1 evergreen and 1 research idea? Yes → pass. No → flag the imbalance before delivering.
□ At least one idea comes from personal material (client conversation, real result, specific experience) — not purely from external research? Yes → pass. No → ask for personal material again before delivering.
□ Every idea is mapped to a content pillar from the client's documented pillars? Yes → pass. No → map or discard the unmapped idea.
□ Category mix in Section C represents at least 3 of 5 categories? Yes → pass. No → flag the imbalance before delivering.
```

**Consequence:**
If the client develops all Section C ideas and publishes them this week: what is the most likely gap?
→ Answer before delivering. Check: is the batch too research-heavy (will age poorly on the feed)? Too evergreen (missing timely market signal)? No Prove posts (no pipeline signal)? All from one source type (will feel generic)?

---

Idea session complete — [N] ideas this week ([X] evergreen + [Y] research in recommended combination).
Pools delivered: Evergreen (5) | Research ([N] angles)
Methods that ran: [list]
Methods that failed: [list with reason and what was missing]
Methods with thin results: [list with specific gap and suggested fix]

Lead magnet decision — point 1:
Would you like any of these ideas as a lead magnet this week?
A post that gives away a free resource in exchange for comments.
Only say yes if you are ready to build the resource.

Yes → trigger: run lead magnet flow for [idea title]
No → trigger: run hook-generator for [idea title]
