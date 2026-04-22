---
name: repurposing-archive
description: Pull a client's LinkedIn post history via Apify, identify signature themes and engagement patterns, surface content gaps, and generate refresh angles. Use when you want to repurpose what already worked or identify what's missing from the content mix. Part of the weekly research pipeline. Triggers include "run repurposing archive for [client]", "what should I repurpose?", "what have I not covered yet?", or when called by weekly-idea-session.
---

# Repurposing Archive

Most creators think they need new ideas every week. They don't. They need to find which of their existing ideas landed and repackage them from a different angle. A post that got 50 comments 3 months ago has a proven hook and a proven topic — the audience already told you they care. The job is to find the next version, not start from scratch.

This skill pulls the client's LinkedIn post history, identifies what actually worked (not just what they liked writing), surfaces content gaps, and generates refresh angles. It's the difference between "what should I write about?" and "what did my audience already tell me they want more of?"

**Pre-flight:** Run preflight.md. Client: [name provided by user].
**Required:** Client LinkedIn URL (hard stop), content pillars (for theme grouping and gap analysis).

## Quality Gate

Missing LinkedIn URL → stop. State gap, impact, fix option. Never invent or fabricate.

---

**Purpose:** Analyze a client's post history to find: their signature themes, their highest-engagement content, and the content gaps worth filling next.

---

## Step 1 — Pull Post History

```
POST /acts/datadoping~linkedin-profile-posts-scraper/run-sync-get-dataset-items?token={APIFY_API_KEY}
{
  "profiles": ["[LinkedIn URL from client folder Header block]"],
  "maxPosts": 100
}
```

Returns: post text, total_reactions, comments, reposts, posted_at.

If Apify call fails:

```
Apify call failed for repurposing-archive — cannot pull post history. Method stopped.
```

Do not ask the user to paste posts as a substitute. The gap is noted. Stop this method.

---

## Step 2 — Process Results

Run all four analyses silently. Present results together.

**Theme mapping:**
- Group posts by content pillar — match keywords and topics against each pillar description
- Identify 3–5 most frequent topics across all posts — these are the client's signature themes
- Flag any topic covered 3+ times (risk of repetition; refresh angle needed, not a repeat)

**Engagement ranking:**
- Rank all posts by `comments + reposts` combined
- Identify top 3 posts by this metric
- For each top post: note the hook type, post structure (story / list / framework / contrarian), and format

> ⚠️ Engagement rate not calculable — impressions data requires Shield/Taplio/Scripe. These are raw engagement counts. Directional signal only.

**Gap analysis:**
- Cross-reference covered topics against the full Content Pillars list
- Identify 2–3 topics the ICP would expect to see that have not been covered yet
- These are gap-fill angles — highest-priority new posts to develop

**Refresh angles:**
- For each top-performing post: generate one "same insight, new angle" refresh — change the ICP tier it speaks to, update the format, or add a new example
- For any topic covered 3+ times: find the one angle not yet tried (different structure, opposite POV, or more specific example)

---

## Output

**When run standalone:** Present theme map, top posts, gap analysis, and refresh angles directly. Each gap or refresh angle is a candidate post idea ready to develop.

**When called by weekly-idea-session**, return this result block:

```
METHOD RESULT: Repurposing Archive
Status: [COMPLETE / FAILED]
Angles found: [N]
Ideas:
- [Gap-fill angle 1: topic + why it's missing — 1 sentence]
- [Gap-fill angle 2]
- [Refresh angle 1: original post summary + new angle — 1 sentence]
- [Refresh angle 2]
Flags: [engagement rate caveat always included; any stops, or "None" for stops]
```

---

Repurposing archive complete — [N] angles found.
Next step → trigger: run hook-generator for [client] with [angle title]
Or bring angles to weekly-idea-session if part of a larger batch.

---

## Verification

**Correctness:**
```
□ Top posts ranked by comments + reposts combined — not by likes alone? Yes → pass. No → re-rank using the correct engagement signal.
□ Refresh angles propose a genuinely different angle (different ICP tier, different format, different POV) — not a rephrased repeat of the original? Yes → pass. No → find the distinct new angle or discard.
□ Gap-fill topics are missing from the post history — not just underrepresented (covered once or twice)? Yes → pass. No → reclassify as refresh angles, not gaps.
```

**Completeness:**
```
□ All four analyses completed: theme mapping, engagement ranking, gap analysis, refresh angles? Yes → pass. No → complete the missing analyses before delivering.
□ Engagement rate caveat included in output (raw counts, not true engagement rate)? Yes → pass. No → add the caveat.
□ If called by weekly-idea-session: METHOD RESULT block returned with Status, Angles found, Ideas, and Flags? Yes → pass. No → format as METHOD RESULT.
```

**Context-fit:**
```
□ Topics grouped against this client's documented content pillars — not generic niche categories invented for this session? Yes → pass. No → re-group using the actual pillar descriptions.
□ Post history pulled from the correct client LinkedIn URL (from folder Header block) — not a manually remembered URL? Yes → pass. No → verify URL before running.
□ Signature themes identified from actual post frequency data — not assumed from the client's profile or bio? Yes → pass. No → base themes only on what the data shows.
```

**Consequence:**
If one of these refresh or gap-fill angles is developed and published: what is the most likely reason it underperforms?
→ Answer before delivering. If the answer is "refresh angle is too similar to the original — the ICP already saw this" — find the differentiating element before handoff.
