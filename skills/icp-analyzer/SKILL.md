---
name: icp-analyzer
description: Build a detailed Ideal Client Profile that makes every piece of content speak directly to the person most likely to buy. Use this skill when the user wants to define their audience, research their ideal client, understand buyer psychology, or create an ICP document. Triggers include requests to "build my ICP", "define my audience", "who is my ideal client", or when starting content strategy for a new niche. Goes beyond demographics to map how the audience thinks, talks, and makes buying decisions.
---

# ICP Analyzer

Most content creators write for "founders" or "marketers." That's not an audience — that's a census category. Real ICP work maps how a specific person thinks, what keeps them up at 2am, what language they use when describing their problem to a colleague (not in a meeting — in Slack). When you know that, every hook writes itself because you're naming their situation before they've finished reading line 1.

This skill goes beyond demographics to build a detailed Ideal Client Profile that maps buyer psychology, decision triggers, and the actual vocabulary your audience uses. The output makes every piece of content speak directly to the person most likely to buy.

**Pre-flight:** Run preflight.md. Client: [name provided by user].

## Quality Gate

Insufficient input → stop. State gap, impact, fix option. Never invent or fabricate.

---

## SCENARIO ROUTING

Detect which scenario to run before doing anything else. Do not ask the user which scenario — read the context and route automatically.

```
If the user has provided a completed document at session start
(a filled ICP form, a PDF, a pasted document with structured audience information):
→ SCENARIO B — Document Input

If the user has provided only a request to "build my ICP" with no document attached:
→ SCENARIO A — Interview
```

---

## SCENARIO B — DOCUMENT INPUT

The user has provided a completed ICP form, PDF, or equivalent document.
Skip the interview. Analyze the document directly and output the ICP.

### Step 1 — Read and map the document

Read the full document. Map its contents against the six ICP layers:

| Layer | Required fields | Status |
|---|---|---|
| Demographics | Role/title, company size/type, industry | COVERED / PARTIAL / MISSING |
| Psychographics | Real anxieties, desired outcomes | COVERED / PARTIAL / MISSING |
| Language Map | How they describe the problem (Google field minimum) | COVERED / PARTIAL / MISSING |
| Buying Triggers | Events that push them to act | COVERED / PARTIAL / MISSING |
| Content Triggers | What content makes them engage | COVERED / PARTIAL / MISSING |
| Disqualifiers | Who is NOT the ICP | COVERED / PARTIAL / MISSING |

### Step 2 — Check for critical gaps

Critical fields (without these, the ICP output will be too vague to use):
- Role/title (specific — not just "founder" or "marketer")
- Their biggest problems in their own words (not marketer language)
- Language Map — Google field (how they search for solutions)

If any critical field is missing or too vague to use, ask for that specific field only:

```
I can see [field X] is missing from the document.
Without it, [specific consequence — e.g. "the language map will be too generic to write good hooks"].

Can you add this: [single specific question targeting only the missing field]

Everything else is covered — I'll proceed as soon as you send this.
```

Do not ask more than one gap question at a time. Do not run the full interview.
If a non-critical field is missing: note the gap in the output, proceed without blocking.

### Step 3 — Build the ICP map

Using the document contents, build the complete ICP across all six layers.
Fill gaps in non-critical fields using reasonable inference from the document context —
flag any inferred content clearly: *(inferred from document — confirm with client)*

Proceed to Phase 3 Output.

---

## SCENARIO A — INTERVIEW

### Phase 1: Input

Ask the user for:

**Business Basics:**
1. What do you sell? (service, product, offer)
2. Price range?
3. How do you deliver it? (done-for-you, coaching, SaaS, course, consulting)
4. What result does it produce? (be specific)

**Current Clients:**
5. Describe your best 3 clients (role, company, what made them great)
6. Describe your worst clients (who was a bad fit and why)
7. Where do your clients usually find you? (LinkedIn, referrals, cold outreach, ads)

**Optional but powerful:**
8. Paste 3-5 DMs or emails from people who reached out to buy
9. Paste common objections you hear on sales calls
10. What do clients say after working with you? (testimonials, feedback)

---

### Phase 2: Build The ICP Map

Using the inputs, build a comprehensive profile across 6 layers:

#### Layer 1: Demographics
- Exact role/title (not just "founder" - be specific: "solo founder running a B2B service business doing $15K-50K/month")
- Company size and revenue range
- Industry or niche
- Years in business
- Team size
- Location (if relevant)

#### Layer 2: Psychographics
- What keeps them up at 2am? (the real anxiety, not the surface problem)
- What have they already tried that didn't work?
- What do they secretly want but won't say on a sales call?
- What are they afraid of? (failure, embarrassment, wasting money, being scammed)
- What would success look like in 6-12 months? (in their words)
- Who do they compare themselves to? (competitors, peers, aspirational figures)

#### Layer 3: Language Map
This is the most valuable section. Map out how they actually talk about their problems.

- **DM language**: How they describe their problem when reaching out cold
- **Sales call language**: How they explain it on a call
- **Google language**: What they search when looking for solutions
- **Community language**: How they talk about it in Slack groups, Reddit, forums
- **Internal language**: How they think about it privately

#### Layer 4: Buying Triggers
- What event makes them finally take action?
- What's the cost of NOT solving this? (quantify if possible)
- What objections do they have before buying?
- What proof do they need to see?
- Who else do they need to convince?

#### Layer 5: Content Triggers
What content makes them stop scrolling and actually engage?

- **Pain content**: Posts that describe their exact frustration
- **Proof content**: Results and case studies from people like them
- **How-to content**: Tactical posts they can implement immediately
- **Story content**: Relatable situations they've experienced
- **Contrarian content**: Challenges to advice they've been following

#### Layer 6: Disqualifiers
Who is NOT your ICP?

- Role/company types that are bad fits
- Budget levels that don't work
- Mindset or behavior red flags
- Industries or niches you don't serve

---

### Phase 3: Output

Generate the complete ICP document in this format:

```
ICP PROFILE: [CLIENT NAME]'s Ideal Buyer

WHO THEY ARE:
[2-3 sentence description of the exact person]

DEMOGRAPHICS:
- Role: [specific]
- Company: [size, stage, revenue]
- Industry: [if specific]
- Team: [size]

THEIR BIGGEST PROBLEMS (in their words):
1. "[exact language they'd use]"
2. "[exact language they'd use]"
3. "[exact language they'd use]"
4. "[exact language they'd use]"
5. "[exact language they'd use]"

WHAT THEY'VE TRIED:
- [previous solutions that didn't work]
- [why those failed]

WHAT THEY ACTUALLY WANT:
- [desired outcome in their language]
- [what success looks like to them]

BUYING TRIGGERS:
- [events that push them to act]

OBJECTIONS:
- [common objections + how to address each]

LANGUAGE MAP:
- DMs: "[how they describe their problem]"
- Sales calls: "[how they explain it verbally]"
- Google: "[what they search]"
- Internally: "[how they think about it]"

CONTENT THAT GRABS THEM:
- [types of posts/topics that resonate]
- [specific angles that work]

NOT YOUR ICP:
- [who to repel]

---
Scenario: [A — interview / B — document input]
Inferred fields (confirm with client): [list any, or "None"]
```

---

## How To Use This Output

Tell the user: "Paste this entire document into your Claude Project instructions or upload it as a knowledge file. Every post Claude writes will now speak directly to this person instead of writing for 'everyone.'"

---

## Quality Check

Before delivering:
- Is the language map specific enough? (real phrases, not marketing speak)
- Are the pain points things a real person would say, not things a marketer would write?
- Could you picture one specific human reading this ICP and saying "that's me"?
- Are the buying triggers based on real events, not theoretical "awareness stages"?

If any answer is no, ask more questions (Scenario A) or flag the gap in the output (Scenario B).

---

ICP document complete — scenario used: [A/B]
Quality check: flag any layer that was inferred not confirmed.
If Language Map thin: flag that keyword quality for all Apify calls will be reduced.

Next step → trigger: run content-pillars for [client]

---

## Verification

**Correctness:**
```
□ Language Map contains actual phrases the ICP uses — not marketing-speak paraphrases? Yes → pass. No → rewrite using the audience's own words.
□ Buying triggers are specific events (e.g., "missed Q3 quota", "new CMO hired") — not theoretical stages? Yes → pass. No → replace with real events.
□ Disqualifiers section names who is NOT the ICP — not just who is? Yes → pass. No → add the disqualifiers.
```

**Completeness:**
```
□ All 6 layers covered: Demographics, Psychographics, Language Map, Buying Triggers, Content Triggers, Disqualifiers? Yes → pass. No → complete the missing layers.
□ "Their Biggest Problems" section uses verbatim-style language (first-person or quote-style)? Yes → pass. No → rewrite in audience voice.
□ Scenario documented (A — interview / B — document)? Yes → pass. No → add it.
```

**Context-fit:**
```
□ Could a specific person read this ICP and say "that's me"? Yes → pass. No → add more specificity to role, company size, or situation.
□ Language Map Google field present — how they search for solutions? Yes → pass. No → add it (critical for Apify keyword quality).
□ Any inferred fields clearly flagged as "inferred — confirm with client"? Yes → pass. No → flag them.
```

**Consequence:**
If content written against this ICP misses the audience: what is the most likely reason?
→ Answer before delivering. If the answer is "language map is too generic" or "pain points sound like a marketer wrote them" — fix it before use.
