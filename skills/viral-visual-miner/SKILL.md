---
name: viral-visual-miner
description: Two scenarios. Scenario A: proactively search for viral visual posts in a client's niche, extract structural frameworks, and map them to the client's ICP and expertise. Scenario B: user drops a visual — analyze its structure and generate ideas from it. Triggers include "find viral visual ideas for [client]", "mine visual posts for [client]", "analyze this visual", "reverse engineer this image", or dropping an image for analysis.
---

# Viral Visual Miner

Visual posts on LinkedIn get 2-3x the engagement of text posts — but most people treat visuals as decoration. The real value of a viral visual isn't the design — it's the information architecture. How did they organize the idea? What's the hierarchy? Why does the eye move where it does? Those structural decisions are transferable even if the topic is completely different.

This skill does two things: proactively finds viral visual posts in the client's niche and reverse-engineers their structure (Scenario A), or analyzes a visual the user drops and generates ideas from it (Scenario B).

**Pre-flight:** Run preflight.md. Client: [name provided by user].
**Required:** ICP and content pillars.

## Scenario Routing

If the user has dropped or pasted a visual → SCENARIO B (analyze what they brought).
If no visual is provided → SCENARIO A (proactive search in client's niche).

## Quality Gate

Insufficient input → stop. State gap, impact, fix option. Never invent or fabricate.

---

## SCENARIO A — PROACTIVE VISUAL SEARCH

**Purpose:** Find high-performing visual posts in the client's niche. Extract the structural frameworks. Map them to the client's ICP. Output 3–5 content ideas with visual direction — ready to develop.

### Step 1: Define Search Parameters

From client context, establish:
- **Niche keywords:** What terms would a viral post in this space use?
- **Comparable accounts:** Whose audience overlaps with this client's ICP?
- **Visual format priority:** Carousels? Infographics? Comparison graphics?

Build 3–5 specific search angles. Examples:
- "B2B SaaS LinkedIn carousel [niche keyword]"
- "[industry] infographic LinkedIn high-performing"
- "visual breakdown [topic ICP cares about]"

### Step 2: Search for Viral Visual Posts

**IMPORTANT — LinkedIn auth rule:** Never use WebFetch on LinkedIn URLs directly. LinkedIn requires authentication and will return a login wall. Use WebSearch only — Google indexes LinkedIn post previews without requiring auth.

Use WebSearch with these query patterns (always include `after:[date 14 days ago YYYY-MM-DD]`):
- `"linkedin" "[niche keyword]" carousel infographic after:[date]`
- `site:linkedin.com/posts "[niche keyword]" carousel after:[date]`
- `"[niche keyword]" linkedin visual framework breakdown after:[date]`
- `"[niche keyword]" linkedin infographic "comments" after:[date]`

If LinkedIn search returns thin results, expand to platforms where people share LinkedIn screenshots:
- `"[niche keyword]" carousel framework site:twitter.com after:[date]`
- `"[niche keyword]" linkedin post screenshot infographic after:[date]`

**Worth analyzing:**
- High engagement signals (comments, shares, saves mentioned in the Google preview snippet)
- Visually structured — a framework, comparison, breakdown, or system (not just a photo)
- Relevant to the client's ICP — not just the niche in general
- Published in the last 7–14 days — discard anything older than 2 weeks

**Search recency rule:** Always append `after:[date 14 days ago YYYY-MM-DD]` to all WebSearch queries. If results are thin, extend to 21 days maximum — never beyond that.

**If fewer than 3 LinkedIn visual posts found after exhausting search queries:**
- Do not substitute unrelated industry sources
- Flag: "PARTIAL — only [N] LinkedIn visual posts found in recency window. Proceeding with available posts + extending framework analysis."
- Proceed with what is available rather than fabricating or substituting

Find 3–5 strong candidates. For each: source/account, what made it stop the scroll, estimated engagement quality.

### Step 3: X-Ray Each Visual — Extract the Skeleton

For each visual, extract only the structural framework. Ignore the topic — you're after the skeleton under the skin.

**4 layers:**
1. **Structure** — Describe exactly how this visual is built. Layout logic, number of elements, how they relate, how the eye moves. Do not force it into a predefined category — describe what's actually there. If the structure is novel, name it yourself.
2. **Entry point** — Where does the eye land first? What creates the initial pull?
3. **Information density** — How many distinct pieces of information? How is whitespace used?
4. **Emotional mechanic** — What feeling does this visual create? (Clarity / urgency / curiosity / relief / authority — or name it if it's something else)

### Step 4: Map Skeleton to Client's Niche and ICP

For each skeleton, ask: *"What specific problem or insight of [client's ICP] could this visual structure illuminate?"*

Generate 1–2 content concepts per skeleton that:
- Use the same structural framework
- Are grounded in the client's actual expertise
- Speak directly to their ICP's pain or desire
- Could not be the same post if written by a competitor

**Commoditization check:** Could this visual concept be published by any agency blog or industry vendor without modification? If yes, push harder on the client-specific angle.

### Step 5: Output — Content Ideas with Visual Direction

```
---
VISUAL IDEA [#]

Source framework: [Visual type] — extracted from [source/account]
Why it works: [1 sentence on the structural mechanic]

Content idea: [Topic / angle — 1 sentence]
ICP pain addressed: [Specific pain this speaks to]
Client's unique angle: [What only this client can say]
Funnel stage: [TOFU / MOFU / BOFU]

Visual direction:
- Format: [Carousel / Infographic / Comparison graphic]
- Structure: [Describe the skeleton mapped to this content]
- Entry point: [What the eye should see first]

Suggested hook: [1-2 line hook to pair with this visual]
---
```

Generate 3–5 ideas minimum.

**When called by weekly-idea-session**, return this result block:

```
METHOD RESULT: Viral Visual Miner
Status: [COMPLETE / PARTIAL / FAILED]
Angles found: [N]
Ideas:
- [Framework type]: [Concept — 1 sentence]
- [Framework type]: [Concept — 1 sentence]
Flags: [any stops, or "None"]
```

---

## SCENARIO B — ANALYZE A DROPPED VISUAL

**No pre-flight required.** Client context is optional — if provided, ideas are mapped to the client's niche and ICP. If not provided, ask before Step 2.

---

### Step 1: X-Ray — Extract the Skeleton

Analyze what is structurally happening in the visual. Ignore the topic entirely.

**4 layers:**
1. **Structure** — Describe exactly how this visual is built. Layout logic, how elements relate, how the eye moves. If the structure is novel or unnamed, describe it on its own terms — that specificity is the point.
2. **Entry point** — Where does the eye land first, and why? (Bold headline? High contrast? Single dominant element? Something unexpected?)
3. **Information density** — How many distinct data points? How is whitespace used — breathing room, tension, or focus?
4. **Emotional mechanic** — What feeling does this create? Name it precisely.

In 2–3 sentences: why does this visual stop the scroll? Name the specific structural or emotional choice that produces that effect.

### Step 2: Map Skeleton to Client Niche and ICP

If client context was provided: map directly to their niche, expertise, and ICP pain points.
If no client context: ask before mapping — the mapping is what makes the output useful.

For each mapped concept, push for specificity:
- What only this client can say about this topic?
- What real experience, data, or proof point fits this structure?

**Commoditization check:** Could this concept be published by any agency blog or vendor without modification? If yes: ground it in the client's specific experience, or generate a different angle.

### Step 3: Output — 3-5 Content Ideas with Visual Direction

```
---
IDEA [#]

Content idea: [Topic / angle — 1 sentence]
ICP pain addressed: [Specific pain this speaks to]
Client's unique angle: [What only this client can say]
Funnel stage: [TOFU / MOFU / BOFU]

Visual direction:
- Structure: [The skeleton mapped to this content — described concretely]
- Entry point: [What the eye should see first]
- Format: [Carousel / Infographic / Comparison graphic]
- Max text: [Under 20 words for infographics; per-slide guidance for carousels]

Suggested hook: [1-2 line hook to open the post]
---
```

Generate 3–5 ideas. When copy is finalized, route through visual-brief for production.

---

Visual mining complete — [N] ideas found.
Visual ideas: route through visual-brief when developing.

Next step → trigger: run visual-brief for [client] with [idea title]
Or bring ideas to weekly-idea-session if part of a larger batch.

---

## Verification

**Correctness:**
```
□ Skeleton extracted from each visual describes only the structural framework — not the topic? Yes → pass. No → separate the structure from the content.
□ Every content idea passed the commoditization check: could not be published by a competitor without modification? Yes → pass. No → push harder on the client-specific angle.
□ Client's unique angle stated for each idea — not left as "use [client's name]'s experience"? Yes → pass. No → specify exactly what real experience or result grounds this idea.
```

**Completeness:**
```
□ 3–5 ideas minimum generated? Yes → pass. No → generate more.
□ For each idea: content idea, ICP pain addressed, client's unique angle, visual direction (format, structure, entry point)? Yes → pass. No → add missing fields.
□ If called by weekly-idea-session: METHOD RESULT block returned with Status, Angles found, Ideas, and Flags? Yes → pass. No → format as METHOD RESULT.
```

**Context-fit:**
```
□ Visual formats recommended (Carousel / Infographic / Comparison) match what will resonate with the client's ICP tier? Yes → pass. No → adjust the format recommendation.
□ Scenario B (dropped visual): client context confirmed before mapping to niche? Yes → pass. No → confirm the niche before mapping.
□ Ideas flagged for visual-brief routing — not sent to copy-developer? Yes → pass. No → add the route flag.
```

**Consequence:**
If visual ideas from this session go to visual-brief without the client's unique angle filled in: what is the most likely output quality problem?
→ Answer before delivering. If the answer is "visual looks like a generic industry infographic — no distinctive POV" — ensure the client's specific angle is named before handoff.
