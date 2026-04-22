---
name: reverse-engineering
description: Fetch high-performing LinkedIn posts in a client's niche, reverse-engineer structural frameworks from text posts (Scenario A) and visual posts (Scenario B), and map reusable templates to the client's content pillars. One Apify call powers both scenarios. Part of the weekly research pipeline. Triggers include "run reverse engineering for [client]", "what post structures are working in [niche]?", or when called by weekly-idea-session.
---

# Reverse Engineering

The best LinkedIn creators don't invent post structures — they pattern-match. Every viral post has a structural framework underneath: the hook type, the body architecture, the tension mechanics, the CTA placement. Most people see a great post and think "nice idea." This skill sees the skeleton and extracts it as a reusable template.

Two scenarios: A — reverse-engineer text post structures. B — reverse-engineer visual post frameworks. One Apify call powers both. The output isn't "here's what worked" — it's "here's the template you can load into your content pillars and reuse."

**Pre-flight:** Run preflight.md. Client: [name provided by user].
**Required:** Keyword string from content pillars (hard stop without it).

## Quality Gate

Missing keyword string → stop. State gap, impact, fix option. Never invent or fabricate.

---

**Purpose:** Find what post structures and visual frameworks are performing in this niche right now. Extract reusable templates. Map them to the client's content pillars as ready-to-develop post angles.

---

## Step 1 — Fetch Viral Posts (one call, used for both scenarios)

```
POST /acts/datadoping~linkedin-posts-search-scraper/run-sync-get-dataset-items?token={APIFY_API_KEY}
{
  "keywords": ["[keyword string from pre-flight]"],
  "maxResults": 25
}
```

Sort all results by `comments + reposts` combined.

If Apify call fails:

```
Apify call failed for reverse-engineering — cannot pull post data. Method stopped.
```

---

## Scenario A — Text Post Reverse Engineering

Filter: posts where `image_url` is null or empty.
Take top 10–15 text posts by engagement score.

Select 2–3 posts with the clearest structural framework. Skip opinion dumps — look for posts where you can see a replicable skeleton.

**4-layer reverse engineering for each selected post:**

1. **Hook layer** — What emotional trigger does the opening use? (curiosity / fear / desire / controversy) Name the specific mechanism — not just the category.

2. **Format layer** — What is the structural architecture? (numbered list / single story arc / contrarian reversal / framework reveal / before-after comparison / other — describe it precisely)

3. **Core framework** — State the reusable template in plain language with no topic-specific words. Describe only the structure, not the content. This is the part someone could pick up and use for any topic.

4. **Engagement mechanic** — What behavior is this post designed to produce? (save it / comment with opinion / DM the author / share with their team) What specifically in the structure triggers that?

Map the extracted template to one of the client's content pillars. Generate one post angle using this template mapped to that pillar.

---

## Scenario B — Visual Post Reverse Engineering

Filter: posts where `image_url` is non-empty.
Take top 10–15 visual posts by engagement score.

If fewer than 3 visual posts found in results:

```
Fewer than 3 visual posts found in Apify results. Scenario B output may be limited.
```

Proceed with what is available.

Select 2–3 posts where the visual appears to be a structured framework — inferred from caption text. Exclude: headshots, quote cards, plain photos, promotional banners.

**For each selected post — three-layer analysis:**

**X-Ray:**
- Framework type: name the visual structure (Iceberg / Comparison / Venn / Matrix / Funnel / Flywheel / Roadmap / Anatomy / other — if the structure is novel, name it yourself and describe it precisely)
- Layout logic: describe how the eye moves through this visual
- The one big idea this visual communicates in the simplest form

**Pivot:**
- Which of the client's content pillars does this structure fit?
- What specific ICP pain or desire could this structure illuminate for this client?
- Generate 2 named concept options (e.g., "The Founder Decision Matrix" / "The Ghostwriter's Iceberg")

**Blueprint** (idea-level only — full visual production runs through visual-brief):
- Concept name
- One sentence: the contrast or "aha" this visual creates

---

## Output

**When run standalone:** Present text and visual findings directly. Visual angles are flagged for visual production path — route through visual-brief, not copy-developer, when developed.

**When called by weekly-idea-session**, return this result block:

```
METHOD RESULT: Reverse Engineering
Status: [COMPLETE / PARTIAL — fewer than 3 visuals found / FAILED]
Angles found: [N text + N visual]
Ideas:
  Text:
  - [Template type]: [Post angle mapped to pillar — 1 sentence]
  - [Template type]: [Post angle mapped to pillar — 1 sentence]
  Visual:
  - [Framework type]: [Concept name — the contrast or aha in 1 sentence]
  - [Framework type]: [Concept name — 1 sentence]
Flags: [visual post count if <3; any stops; or "None"]
```

Visual angles include route flag: → visual-brief when developing.

---

Reverse engineering complete — [N text + N visual angles] found.
Visual angles: route through visual-brief when developing, not copy-developer.

Next step → trigger: run hook-generator for [client] with [angle title]
Or bring angles to weekly-idea-session if part of a larger batch.

---

## Verification

**Correctness:**
```
□ Scenario A core framework stated with zero topic-specific words — describes only structure? Yes → pass. No → strip all topic references until only the reusable skeleton remains.
□ Scenario B visual X-ray describes what is structurally happening (layout, eye movement, big idea) — not just the post's topic or caption content? Yes → pass. No → separate structure from topic.
□ Every extracted template mapped to a specific client content pillar — not just "relevant to the niche"? Yes → pass. No → name the specific pillar before including the angle.
```

**Completeness:**
```
□ Both Scenario A and Scenario B outputs generated from the same Apify call — not two separate calls? Yes → pass. No → merge into one call.
□ Visual angles explicitly flagged for visual-brief routing — not sent toward copy-developer? Yes → pass. No → add the route flag to each visual angle.
□ If called by weekly-idea-session: METHOD RESULT block returned with Status, text angle count, visual angle count, and Flags? Yes → pass. No → format as METHOD RESULT.
```

**Context-fit:**
```
□ Text posts selected have a replicable skeleton — not opinion dumps or posts with no extractable structure? Yes → pass. No → swap for a post with a clearer framework.
□ Visual posts selected appear to show structured frameworks (inferred from caption) — not headshots, quote cards, or promotional images? Yes → pass. No → remove non-framework visuals.
□ Post angles generated are grounded in the client's documented content pillars — not generic industry takes that any competitor could publish? Yes → pass. No → run the commoditization check and push for the specific client angle.
```

**Consequence:**
If the extracted templates from this session are used to write posts: what is the most likely structural failure?
→ Answer before delivering. If the answer is "the template was copied at the topic level, not the structure level — the post reads like a cover of someone else's content" — verify each core framework is topic-free before handoff.
