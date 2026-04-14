---
name: coldiq-linkedin-competition
description: Strategy and content generation skill for ColdIQ's Q2 LinkedIn team competition. Use this skill whenever Luca asks for help with LinkedIn posts, content ideas, scoring strategy, partner tagging, or anything related to winning the ColdIQ LinkedIn competition. Also trigger for requests like "write me a LinkedIn post", "what should I post today", "help me get more points", "score this post", or any content creation for LinkedIn in a B2B/outbound/ops context.
---

# ColdIQ Q2 LinkedIn Competition Skill

## Competition Rules (Source of Truth)

**Profile prerequisites (mandatory to qualify):**
- ColdIQ-branded banner
- CTA button linking to coldiq.com or any page on the site

**Scoring:**
| Action | Base Points |
|--------|-------------|
| 1 like | 1 pt |
| 1 comment | 2 pts |
| 1,000 impressions | 5 pts |
| 1 post published | 10 pts |

**Multipliers (stack multiplicatively):**
| Condition | Multiplier |
|-----------|------------|
| Original content (not redistributed by Monika or repurposed from someone else) | 1.5x on likes & comments |
| Video post | 2x on likes & comments |
| Post tags 1+ partner | 2x on likes & comments |

> Multipliers stack: original + video + partner = 1.5 × 2 × 2 = **6x**
> Impressions have NO multiplier — they score flat regardless of content type.

**Eligible partners to tag:**
Airops, Apollo, Artisan, Attention, Clay, Common Room, Expandi, Fullenrich, Hyperline, Instantly, Lemlist, Nooks, Openmart, Predictleads, Prospeo, Relevance AI, Taplio, Wiza, CompanyEnrich

---

## Luca's Strategy (No Video)

Luca has opted out of video content. Max multiplier stack is therefore:

**Original + Partner tag = 1.5 × 2 = 3x** on likes and comments.

### Point value per optimized post:
- **10 pts** just for publishing
- **Likes × 3** (1pt × 3x)
- **Comments × 6** (2pt × 3x)
- **Impressions** at 5pts/1k (flat, no multiplier — still massive at scale)

### Winning levers in priority order:
1. **Engineer comments** — highest ROI metric. A post with 30 comments = 180 pts. Ask questions, share takes that invite debate, end every post with a direct prompt.
2. **Post volume** — 10 pts per post regardless of performance. Consistent daily posting compounds.
3. **Chase impressions** — no multiplier but viral/reshared posts can generate hundreds of points silently. Hook quality drives this.
4. **Tag partners naturally** — always tag a relevant partner. Never force it; irrelevant tags kill engagement which hurts points.
5. **Stay original** — never redistribute Monika's posts or repurpose others' content. Always 1.5x original.

---

## Content Pillars for Luca

These are Luca's credible topic areas based on his actual work. Posts should draw from real experience, not generic takes.

**1. Ops & Automation**
- n8n workflows, Airtable-ClickUp sync, Railway deployments
- AI agent pipelines (RAG, Slack/Gmail/Fireflies integrations)
- Tag: Clay, Relevance AI, Airops

**2. Agency Finance & Margins**
- COGS reduction, gross margin modeling, inbox provisioning profitability
- Stripe ACH, Mercury, QuickBooks stack
- Tag: Apollo, Hyperline

**3. RevOps & GTM**
- Outbound strategy, pricing, commission structures
- Client renewal/upsell SOPs
- Tag: Apollo, Clay, Instantly, Lemlist, Expandi

**4. Remote Ops / COO-track POV**
- Running a B2B agency from Bali
- Head of Ops → COO transition
- Tag: any relevant partner contextually

**5. ColdIQ-specific insights**
- Behind-the-scenes of scaling to $1M MRR
- Team structure, KPIs, system implementation
- Tag: partners used in the actual stack

---

## Post Formats That Drive Comments

Use these structural patterns to maximize the comment multiplier:

**Contrarian take:** "Everyone says X. We do Y. Here's why it works better for us."
**Process teardown:** "How we [achieved outcome] in [timeframe] — step by step"
**Mistake post:** "We wasted $X on [thing]. Here's what we learned."
**Question hook:** Start with a question, give your answer, end with "What's your take?"
**Numbers post:** "[Specific metric] changed when we did [specific thing]"

Always end posts with a comment-baiting closer, e.g.:
- "What would you do differently?"
- "Anyone else seeing this?"
- "Drop your approach below 👇"

---

## Partner Tagging Guide

Match the post topic to a partner naturally:

| Topic | Best partners to tag |
|-------|----------------------|
| Lead enrichment / data | Clay, Fullenrich, Wiza, Prospeo, CompanyEnrich |
| Email outreach / sequences | Instantly, Lemlist, Expandi |
| LinkedIn outreach | Expandi, Taplio |
| AI workflows / agents | Relevance AI, Airops, Clay |
| CRM / pipeline | Apollo, Common Room, Attention |
| Prospecting / intent data | Apollo, Predictleads, Openmart, Nooks |
| Billing / revenue ops | Hyperline |
| Content / personal brand | Taplio, Artisan |

Tag 1 partner per post max unless 2+ are genuinely relevant. Over-tagging looks spammy and hurts engagement.

---

## When Writing a Post

Follow this checklist every time:

- [ ] Is this original content? (not redistributed) → qualifies for 1.5x
- [ ] Does it tag a relevant partner from the approved list? → qualifies for 2x
- [ ] Does it have a strong hook (first line stops the scroll)?
- [ ] Does it end with a comment-baiting question or CTA?
- [ ] Is it under ~1,300 characters for mobile readability?
- [ ] Does it sound like Luca (direct, ops-minded, grounded in real numbers)?

---

## Scoring Estimator

When asked to estimate points for a post, use this formula:

```
base = 10
likes_pts = likes × 1 × multiplier
comments_pts = comments × 2 × multiplier
impressions_pts = (impressions / 1000) × 5

total = base + likes_pts + comments_pts + impressions_pts
```

Where multiplier = 1.0 (base) × 1.5 (if original) × 2.0 (if partner tagged)

Max non-video multiplier = 3.0

---

## Reference Files

- `references/post-examples.md` — swipe file of high-performing post structures to use as templates
- `references/partner-profiles.md` — one-liner on what each partner does (for accurate contextual tagging)

Read these when generating posts or when asked for examples/inspiration.
