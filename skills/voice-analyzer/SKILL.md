---
name: voice-analyzer
description: Build a complete Voice Profile for any person. Three scenarios — online research, document input, or research-only audit. Uses a conversational interview (not a form) to extract voice DNA. Outputs a machine-readable profile with frequency-labeled rules, beliefs & editorial stance, anti-overfitting guidance, and an evidence bank. Triggers include "build my voice profile", "run voice analyzer", "analyze my voice", "make Claude sound like me", or any reference to voice capture.
---

# Voice Analyzer

Most AI-generated content fails for one reason: it sounds like AI. Not because the ideas are bad, but because the voice is wrong. Every person has a vocabulary signature — words they reach for, rhythms they fall into, beliefs they hold, emotions they avoid. A Voice Profile captures these patterns so precisely that AI output sounds like the person wrote it on a good day.

Three scenarios depending on what the user brings. Outputs a machine-readable Voice Profile: Voice DNA, Beliefs & Editorial Stance, Writing Rules with frequency labels, and an AI Prompt Framework with anti-overfitting guidance.

**Triggers:** "Build my voice profile", "Run voice analyzer", "Analyze my voice", "Make Claude sound like me", or any reference to voice capture or making AI write like the user.

## Quality Gate

Insufficient input → stop. State exactly what's missing, what it limits, and what input would fix it. Never invent, fabricate, or assume.

---

## SCENARIO ROUTING

Detect which scenario to run before doing anything else. Do not ask the user which scenario — read the context and route automatically.

```
If the user has provided a completed document at session start
(a transcript, voice memo transcript, paste of unscripted material):
→ SCENARIO B — Document Input

If the user explicitly requests "audit my online presence", "research only", or equivalent:
→ SCENARIO C — Run Phases 1–3, deliver the sufficiency report, stop.

If the user has provided only their name, company, or a request to "build my voice profile"
with no document attached and no research-only signal:
→ SCENARIO A — Online Research + Interview for gaps
```

---

## SCENARIO B — DOCUMENT INPUT

The user has provided a completed document (transcript, voice capture, etc.).
Skip online research. Analyze the document directly.

### Step 1 — Read and map the document

Map contents against the six voice dimensions:

| Dimension | Status |
|---|---|
| How they actually talk (unscripted speech patterns) | COVERED / PARTIAL / MISSING |
| Beliefs & editorial stance (opinions, contrarian takes) | COVERED / PARTIAL / MISSING |
| Aesthetic crimes (what they hate, what makes them cringe) | COVERED / PARTIAL / MISSING |
| Writing mechanics (structure, rhythm, vocabulary) | COVERED / PARTIAL / MISSING |
| Emotional calibration (default register, animation, restraint) | COVERED / PARTIAL / MISSING |
| Hard NOs (lines they won't cross, topics they won't touch) | COVERED / PARTIAL / MISSING |

### Step 2 — Check for critical gaps

Critical (profile will be too thin without these):
- How they actually talk (unscripted material)
- Aesthetic crimes / what they hate

If either is MISSING: run a targeted mini-interview (5-8 questions from the relevant round in Phase 4). Do not send a form.

If the document contains only written material (no spoken/unscripted content):
```
⚠️ This profile is based on written material only.
Written content tends to be more polished than how someone actually speaks.
For stronger voice fidelity, supplement with a voice memo or podcast appearance.
```

### Step 3 — Proceed to Voice Analysis

Run Phase 5 (Voice Analysis) directly on the document content.
Note: "Voice Profile built from provided document. No online sources analyzed."

---

## SCENARIO A — ONLINE RESEARCH + INTERVIEW PATH

### PHASE 1 — INTAKE

Ask all of this in one message:

```
To build your voice profile, I need to understand how you actually think and talk.

A few questions before we start:

1. What's your full name and company?

2. Do you have any links I should look at?
   - Podcast appearances, YouTube videos, conference talks (MOST USEFUL)
   - Any content where you're speaking naturally and unscripted

3. Do you have any documents you can share directly?
   - Voice memos, call transcripts, Slack messages, emails you wrote naturally

4. Or would you prefer to skip research and go straight to a conversation?
   Some people know they don't have much online — if that's you,
   we can jump right into the interview. Works just as well.
```

**Routing after intake:**
- User says "skip research" or "go straight to interview" → jump to Phase 4 (Voice Interview)
- User provides links or wants you to search → proceed to Phase 2
- User provides documents → route to Scenario B

---

### PHASE 2 — DISCOVERY

Search for publicly available sources. **Prioritize spoken/unscripted material only.**

Search queries:
```
"[NAME]" interview podcast 2023 OR 2024 OR 2025 OR 2026
"[NAME]" "[COMPANY]" YouTube talk keynote
"[NAME]" site:youtube.com
"[NAME]" Forbes OR TechCrunch OR Inc interview
"[NAME]" podcast transcript
```

For each result, note:
- Title, URL, format (YouTube / Podcast / Talk)
- Approximate date
- Length: Short (<5 min) / Medium / Long (>20 min)
- Authenticity signal: Scripted / Semi-scripted / Unscripted/Conversational

**Written material policy — SKIP BY DEFAULT:**

Do NOT include blog posts, LinkedIn posts, articles, or newsletters in the results. Explain why:

```
I found some written content (blog posts, LinkedIn posts, articles) but I'm not including
those. Written material is often edited, ghostwritten, or AI-assisted — even slightly —
and those patterns contaminate the voice analysis. We want how YOU actually communicate,
not a polished version.

If any of those were 100% written by you with zero AI help or heavy editing,
let me know and I'll add them back in.
```

**Present spoken sources only:**
```
✅ SPOKEN / HIGH-TRUST (unscripted video, podcast, conversational interview)
[list with title, URL, date, length, authenticity signal]

Total spoken sources found: [X]
Gaps: [e.g., "No long-form audio found" / "Most content is pre-2024"]
```

**If NO spoken sources found:**
```
I didn't find any spoken/unscripted content online. That's totally fine — it means
the voice interview becomes our primary source. This actually produces great results
because I can push for depth on every answer.

Ready to start the conversation?
```
→ Jump to Phase 4.

Wait for user to confirm which sources to analyze before proceeding.

---

### PHASE 3 — EXTRACTION + SUFFICIENCY

Extract text from each approved source.

**YouTube:** Use transcript API or Gemini video analysis. If unavailable: "I can't auto-extract this one — can you paste the transcript?"

**Multi-speaker sources:** Extract only the user's lines. Discard host/interviewer entirely.

Tag each:
```
SOURCE: [Title]
FORMAT: [YouTube / Podcast / Talk]
DATE: [Year]
AUTHENTICITY: [Unscripted / Semi-scripted]
---
[Extracted text]
```

**Sufficiency check** against the six voice dimensions:

| Dimension | Status |
|---|---|
| How they actually talk | COVERED / PARTIAL / MISSING |
| Beliefs & editorial stance | COVERED / PARTIAL / MISSING |
| Aesthetic crimes (what they hate) | COVERED / PARTIAL / MISSING |
| Writing mechanics | COVERED / PARTIAL / MISSING |
| Emotional calibration | COVERED / PARTIAL / MISSING |
| Hard NOs | COVERED / PARTIAL / MISSING |

**Verdict:**
- **SUFFICIENT** → Proceed to Phase 5 (Analysis). No interview needed.
- **PARTIAL** → Run a targeted mini-interview (only the rounds covering MISSING/PARTIAL dimensions), then Phase 5.
- **INSUFFICIENT** → Run the full voice interview (Phase 4), then Phase 5.

---

### PHASE 4 — VOICE INTERVIEW

**Why a conversation instead of a form:** A questionnaire produces safe, considered answers — the person performing their best self. A real-time conversation where vague answers get challenged and interesting threads get followed reveals how someone actually thinks and communicates. The interview itself IS the voice sample.

**Interview rules:**
1. **ONE question at a time.** Wait for their response before asking the next.
2. **Push back on vague answers.** If they say "I like to keep things simple," ask: "Simple how? Give me an example of simple done right and simple done lazy."
3. **Ask for specific examples.** "Can you show me a sentence or message that captures what you mean?"
4. **Call out contradictions.** If they said one thing earlier and something different now, name it.
5. **Follow interesting threads.** If something unexpected surfaces, go deeper before moving on.
6. **Don't accept "I don't know" easily.** Reframe the question or approach from a different angle.
7. **Keep the tone direct and curious** — like a sharp colleague who genuinely wants to understand. Not adversarial, not polite-for-the-sake-of-polite.

**5 rounds, ~25 questions total (~20 min). Adapt based on what's already covered by research.**

---

#### ROUND 1: HOW YOU TALK (~5 questions)
*Goal: Capture natural communication patterns — not what they think they sound like, but how they actually speak.*

Open with: "Tell me what you actually do — explain it like I'm a smart friend who doesn't work in your industry."

Then probe:
- Something on your mind lately — a client situation, a pattern you're noticing, something you're figuring out
- When someone in your field says something you disagree with, how do you respond? Walk me through a recent example
- How do people close to you describe the way you communicate? What would they say is distinctive?
- What's something you recently explained to someone where the explanation just clicked — you nailed it?

---

#### ROUND 2: BELIEFS & OPINIONS (~5 questions)
*Goal: Capture editorial stance — what they believe that's interesting, contrarian, or distinctive. This shapes every content angle.*

- What do you believe about your industry that most people in it would disagree with?
- What's a piece of "best practice" advice in your space that you think is wrong or outdated?
- When you see other people in your space posting content, what makes you think "this person gets it" vs. "this person is faking it"?
- What hill would you die on professionally?
- What's something you've changed your mind about in the last year?

---

#### ROUND 3: AESTHETIC CRIMES & HARD NOs (~5 questions)
*Goal: The negative space of their voice — what they'd NEVER do or sound like. This is the most critical dimension and the one most often missing from online material.*

- What makes you cringe when you read someone else's content? Give me specific words, phrases, or patterns.
- What type of content do you find lazy or uninspired? What specifically makes it feel that way?
- If I wrote something as you and it had [corporate buzzword / bro-marketing phrase / fake vulnerability], would you notice? What would bother you most?
- Is there a topic or approach you'd never touch? Something that's off-limits?
- Think of the worst piece of content you've seen recently. What specifically made it bad?

---

#### ROUND 4: WRITING MECHANICS (~5 questions)
*Goal: How they structure ideas, their relationship with language, their natural rhythm.*

- When you explain a complex idea, do you give the conclusion first then explain, or build up to it?
- How do you use humor? Frequent, rare, dry, self-deprecating, situational? Give me an example.
- Do you prefer short punchy statements or longer explanations? What does your natural rhythm feel like?
- How do you start a message when you're writing something you actually care about? Not the formula — what do you instinctively reach for?
- Words or phrases you use all the time? And words that feel foreign — they'd never come out of your mouth?

---

#### ROUND 5: EMOTIONAL CALIBRATION (~4 questions)
*Goal: Fine-tune the emotional register — what they want people to feel, how vulnerable they get, where the line is.*

- When someone reads something you wrote, what do you want them to feel? Not "informed" — the actual emotional reaction.
- How personal do you get? Where's the line between sharing a real experience and oversharing?
- Who's a communicator you genuinely respect? What specifically about how they express themselves?
- If I nailed your voice perfectly, what would the output feel like? And if I got it slightly wrong, what would be the tell?

---

**After the interview:** "That's everything I need. Give me a few minutes to analyze this." → Proceed to Phase 5.

**If running a targeted mini-interview** (partial coverage from research): Run only the rounds covering MISSING/PARTIAL dimensions. Tell the user: "Your spoken material covered [X, Y]. I just need to dig into [Z] to complete the picture."

**Voice memo alternative:** If someone says they prefer recording over typing, give them Round 1 + Round 3 prompts as a single voice memo brief (~10 min recording). These two rounds are the most critical. Then run the remaining rounds as conversation.

---

### PHASE 5 — VOICE ANALYSIS

Analyze all collected material (research + interview + documents) and produce the Voice Profile.

**Output is optimized for machine consumption.** Structure every section so another AI instance can parse and apply it without interpretation. Rules must be specific, actionable, and labeled by priority.

---

#### PART 1: VOICE DNA

**Core Identity**
2-3 sentences capturing the essence of this person's voice. This is the anchor — every rule below traces back to this.

**Tone Profile**
- Primary tone (describe emotional texture — e.g., "dry wit wrapped in genuine curiosity")
- Secondary tones that appear situationally (when does the tone shift, and to what?)
- What is notably absent from their tone
- Support each claim with 2-3 verbatim quotes from the material

**Emotional Baseline**
- Default register (how do they sound most of the time?)
- When they get most animated — quote a moment
- When they pull back — quote a moment
- Emotions they avoid expressing

**Natural Rhythm**
- Build-to-point or state-upfront-then-explain?
- Analogy type: technical / personal / nature / pop culture / other
- Sentence length pattern: short punchy / long winding / mixed
- Verbal tics or written tics
- Do they qualify statements or state them flat?

**Vocabulary Signature**
- Words and phrases they use repeatedly (their language, not industry defaults)
- Words they conspicuously avoid
- How they describe their own work in their own terms
- Technical depth: do they explain jargon or assume the reader knows?
- Humor: frequency and style

---

#### PART 2: BELIEFS & EDITORIAL STANCE

*Why this section exists: Two people with identical sentence rhythm but opposite beliefs will produce completely different content. Editorial stance IS voice.*

- Contrarian takes they'd defend (with quotes)
- Conventional wisdom they reject (with their reasoning)
- What they think separates good from bad in their space
- Topics or angles they naturally gravitate toward
- Topics or angles they'd never touch (and why)

---

#### PART 3: WRITING RULES

**Label every rule with one of:**
- **HARD RULE** — Never violate. These are rare.
- **STRONG TENDENCY** — Follow 70-80% of the time. Breaking it occasionally is fine.
- **LIGHT PREFERENCE** — Nice to have. Context determines when to apply.

**DO'S (6-10 rules)**
Each with: the rule, why it matters for this person, a real example from their material.

**DON'TS (6-10 rules)**
Each with: what it would sound like if broken, why it breaks their voice specifically.

**HARD NOs**
Things they would never write, say, or sound like. Non-negotiable. Pulled directly from their aesthetic crimes and interview answers.

**Sentence Structure Guide**
- Ideal sentence length
- When to use short sentences
- How to open (what signals "this is them")
- How to close (their natural landing style)

**POV Rules**
- When they use "I" vs "we" vs "you"
- How personal they get
- How directly they address the reader

**Storytelling Patterns**
- Story then insight, or insight then story?
- How specific are their examples?
- Where does vulnerability appear — and how do they handle it?

**Words to Use / Words to Avoid**

| Use This | Not This | Priority |
|----------|----------|----------|
| [their word] | [the AI/corporate version] | HARD / STRONG / LIGHT |

(15-20 rows)

---

#### PART 4: AI PROMPT FRAMEWORK

A complete instructions block optimized for machine consumption. Ready to paste at the start of any AI content session.

```
You are writing as [NAME].

CORE IDENTITY
[2-3 sentences — the essence of their voice]

EDITORIAL STANCE
[3-4 key beliefs that shape their content angles]

HARD RULES (never violate):
[List — non-negotiable]

STRONG TENDENCIES (follow 70-80% of the time):
[List — break occasionally for variety]

LIGHT PREFERENCES (context-dependent):
[List — apply when it fits naturally]

SENTENCE STYLE:
[2-3 rules on length, structure, rhythm]

NATURAL VOCABULARY:
[Words/phrases to pull from — their actual language]

BANNED VOCABULARY:
[Words that immediately break their voice]

HARD NOs:
[Things they'd never write, topics they'd never touch, tones they'd never use]

ANTI-OVERFITTING RULES:
- Spirit over letter. Internalize the sensibility, don't mechanically apply every pattern.
- A piece that uses 3 tendencies naturally beats a piece that forces in 10 awkwardly.
- Real writers aren't perfectly consistent. Introduce natural variation.
- Don't start every piece the same way just because there's a "signature open."
- Format matters: a LinkedIn post ≠ a newsletter ≠ a DM. Adapt rules to format.
- If it sounds like an AI trying hard to imitate someone, pull back. Less imitation, more inhabitation.

LITMUS TEST:
Before outputting: Does this sound like [NAME] wrote it on a good day?
If it sounds like a B2B content template, rewrite.
If it sounds like an AI wearing a costume, simplify.

WHAT MATTERS MOST:
If you forget everything else, remember these 3 things:
1. [Their single most important belief about communication]
2. [The one pattern that makes their voice theirs]
3. [The #1 thing they never do]
```

**"Sounds Like Them" vs "Doesn't Sound Like Them" (3 pairs)**
From actual material:
- Original (sounds like them)
- AI version of the same idea (sounds generic)
- What makes the original theirs

**Quality Checklist for AI Drafts (8-10 checks specific to this person)**
Pulled from the voice analysis — not generic.

---

#### PART 5: EVIDENCE BANK

Key verbatim quotes from the interview and/or source material, organized by dimension. This is the source of truth the rules above are derived from. When a rule feels ambiguous, reference the original quote.

```
[HOW THEY TALK]
- "[exact quote]" — demonstrates [X]
- "[exact quote]" — demonstrates [Y]

[WHAT THEY BELIEVE]
- "[exact quote]" — demonstrates [X]

[WHAT THEY HATE]
- "[exact quote]" — demonstrates [X]

[EMOTIONAL REGISTER]
- "[exact quote]" — demonstrates [X]

[WRITING MECHANICS]
- "[exact quote]" — demonstrates [X]
```

10-15 key quotes total — the most revealing, not exhaustive.

---

### PHASE 6 — DELIVERY

Present the full Voice Profile.

End with:

```
Voice Profile complete.

Scenario: [A / B / C]
Data sources: [research only / interview only / research + interview / document]

Top 3 voice signatures:
1. [One-liner]
2. [One-liner]
3. [One-liner]

What matters most:
1. [Their core belief about communication]
2. [The pattern that makes them them]
3. [The thing they never do]

Data sufficiency: [SUFFICIENT / PARTIAL — flag specific gaps]

How to use: Paste the AI Prompt Framework (Part 4) at the start of any content session.
Update this profile every 4 weeks or after 5+ new recordings/transcripts.
```

---

## Verification

**Correctness:**
```
□ Every rule in the AI Prompt Framework labeled HARD RULE / STRONG TENDENCY / LIGHT PREFERENCE?
□ "Sounds Like Them" vs "Doesn't Sound Like Them" examples from actual material — not invented?
□ Voice DNA includes verbatim quotes as evidence for each claim?
□ Beliefs & Editorial Stance present with specific opinions — not generic?
```

**Completeness:**
```
□ All five parts delivered: Voice DNA, Beliefs, Writing Rules, AI Prompt Framework, Evidence Bank?
□ Words to Use / Words to Avoid table has 15+ rows with priority labels?
□ Anti-overfitting rules included in AI Prompt Framework?
□ "What Matters Most" top 3 filled with specifics — not placeholders?
```

**Context-fit:**
```
□ Rules are specific to this person — not generic "write short sentences" advice?
□ AI Prompt Framework passes the litmus test: would a session using only Part 4 produce output that sounds like this person?
□ Scenario and data limitations documented?
```

**Consequence:**
If a content session uses this profile and output "doesn't sound like me" — what is the most likely missing rule?
→ Name the gap before delivering. If the answer is "no frequency labels" or "no beliefs section" or "no anti-overfitting guide" — fix it.
