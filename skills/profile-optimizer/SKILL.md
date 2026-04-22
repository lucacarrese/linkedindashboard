---
name: profile-optimizer
description: Turn any LinkedIn profile into a conversion machine. Use this skill when the user wants to optimize their LinkedIn profile, rewrite their headline, improve their About section, or audit their profile for conversions. Triggers include requests to "fix my profile", "optimize my LinkedIn", "rewrite my headline", "audit my profile", or when onboarding a new client. Scores each section and delivers copy-paste-ready rewrites for headline, About, Experience, Featured, and banner.
---

# Profile Optimizer

Your LinkedIn profile isn't a resume — it's a landing page. Every visitor makes a follow/ignore decision in 7 seconds. Most profiles describe what someone does. Optimized profiles make the visitor think "I need to talk to this person." The difference is conversion copy vs. job description copy — and most people are writing job descriptions.

This skill audits every section of a LinkedIn profile and rewrites it to convert visitors into followers, connections, and DMs.

**Pre-flight:** Run preflight.md. Client: [name provided by user].
**Required:** Voice Profile (rewrites in client's voice), ICP (optimizes for the right audience), content pillars (aligns positioning).

## Quality Gate

Insufficient input → stop. State gap, impact, fix option. Never invent or fabricate.

---

## How It Works

1. **Audit Phase** - User shares their current profile (text or screenshot)
2. **Analysis Phase** - Score each section and identify gaps
3. **Rewrite Phase** - Deliver optimized copy for every section

---

## Phase 1: Audit

Ask the user to provide:
- Their current LinkedIn headline
- Their current About section
- Their current Experience section (at least the most recent role)
- Their Featured section (what's pinned, if anything)
- Their banner image description (what does it show?)
- Their profile photo description
- Their website/link if any

Also ask:
- Who is your ideal client? (or reference the ICP skill output)
- What's your main offer?
- What result do you deliver?
- What's your best proof point? (biggest result, most impressive client, strongest number)

---

## Phase 2: Section-by-Section Analysis

Score each section 1-10 and identify specific problems.

### Profile Photo Check
- Is it professional but approachable?
- Does it show confidence? (eye contact, slight smile, good lighting)
- Is the background clean or intentional?
- Would you trust this person with your money based on the photo alone?

### Banner Image Check
- Does it communicate what they do in under 3 seconds?
- Does it include a clear value proposition or social proof?
- Is it branded and professional, not a default LinkedIn banner?

### Headline Check (most important section)
Common mistakes:
- Just a job title ("CEO at Company X")
- Vague value prop ("Helping businesses grow")
- Too many buzzwords
- No clear benefit to the reader

A great headline answers: "What do you do, for who, and what result do they get?"

### About Section Check
Common mistakes:
- Reads like a resume
- Starts with "I am a..." or "With X years of experience..."
- No clear call to action
- Talks about themselves instead of the reader's problems
- Wall of text with no formatting

### Featured Section Check
- Is anything pinned? (empty featured section = missed opportunity)
- Are the pinned items valuable to the ICP?
- Do they showcase results or just content?

### Experience Section Check
- Does the most recent role read like a value proposition or a job description?
- Are there results and numbers, or just responsibilities?

---

## Phase 3: Rewrite

### Headline Formulas

**Formula 1: Result-focused**
"I help [WHO] [ACHIEVE WHAT] through [HOW] | [PROOF POINT]"

**Formula 2: Identity + outcome**
"[IDENTITY] | [WHAT YOU DO FOR THEM]"

**Formula 3: Specific + credible**
"[WHAT YOU DO] for [WHO] | [NUMBER/PROOF]"

**Formula 4: Problem-aware**
"[WHO]'s LinkedIn is broken. I fix it. | [PROOF]"

Provide 3 headline options for the user to choose from.

### About Section Template

```
[Hook: Start with their problem, not your bio]

[Problem agitation: 2-3 lines describing what they're experiencing]

[Positioning: What you do differently, in 1-2 lines]

[Proof: Your strongest results, 3-5 bullet points]
- [Result 1 with specific number]
- [Result 2 with specific number]
- [Result 3 with specific number]

[What you offer: Clear description of your service]

[CTA: Exactly what they should do next]
- DM me "[KEYWORD]" to [get specific thing]
- Or connect with me and I'll [do specific thing]
```

### Featured Section Recommendations

Suggest 3-4 items to pin:
- A lead magnet post (highest engagement)
- A case study or result
- A testimonial or social proof screenshot
- A link to their main offer or calendar

### Experience Section Rewrite

For their current role, rewrite using this structure:
- Line 1: What you do and who you do it for
- Line 2: The result you deliver
- Lines 3-5: Specific proof points with numbers

---

## Output Format

```
OPTIMIZED LINKEDIN PROFILE

HEADLINE:
[Option 1]
[Option 2]
[Option 3]

ABOUT SECTION:
[Full rewritten About section]

EXPERIENCE (Current Role):
[Rewritten experience entry]

FEATURED SECTION:
[Recommendations for what to pin]

BANNER RECOMMENDATIONS:
[What to include on their banner]

PROFILE PHOTO NOTES:
[Any suggestions]
```

---

## Quality Check

Before delivering:
- Would someone landing on this profile know exactly what this person does within 5 seconds?
- Is there a clear reason to connect or DM?
- Does it build trust and authority without sounding braggy?
- Is every section written for the VISITOR, not for the profile owner's ego?
- Would you DM this person if you had the problem they solve?

---

Profile rewrite complete.

Optional final Foundation step:
Does [client] have specific LinkedIn formatting preferences — line breaks, sentence length, structure, emoji, CTA style?

Yes → trigger: run formatting-profile for [client]
No → Foundation complete → trigger: run weekly ideas for [client]

---

## Verification

**Correctness:**
```
□ Headline options answer the three questions: what do you do, for who, and what result do they get? Yes → pass. No → rewrite.
□ About section starts with the visitor's problem — not "I am a..." or "With X years..."? Yes → pass. No → rewrite the opening.
□ Proof points in the About section use specific numbers — not "many clients" or "significant results"? Yes → pass. No → add numbers or flag with [INSERT REAL STAT].
```

**Completeness:**
```
□ All 5 sections delivered: Headline (3 options), About, Experience (current role), Featured recommendations, Banner recommendations? Yes → pass. No → complete missing sections.
□ CTA in the About section specifies exactly what the visitor should do next? Yes → pass. No → add a specific CTA.
□ Section scores and specific problems listed in Phase 2 before rewriting? Yes → pass. No → add the scores.
```

**Context-fit:**
```
□ Profile rewrite is written in the client's documented voice — not generic LinkedIn optimization language? Yes → pass. No → apply the Voice Profile to the rewrite.
□ Profile speaks to the documented ICP — a visitor who is the ICP would recognize this as relevant to them? Yes → pass. No → add ICP-specific language.
□ Would you DM this person if you had the problem they solve? Yes → pass. No → identify what's missing.
```

**Consequence:**
If an ideal client visits this profile and does not connect or DM: what is the most likely reason?
→ Answer before delivering. If the answer is "no clear result stated" or "About section reads like a bio not a pitch" — fix it.
