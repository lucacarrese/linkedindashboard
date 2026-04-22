---
name: formatting-profile
description: Capture a client's LinkedIn visual formatting preferences — how posts look on the feed. Covers line breaks, sentence length, punctuation, emphasis, post length, structure, and emoji. Does NOT cover voice, tone, content, or CTA strategy — those live in voice-analyzer and copy-developer respectively. Optional Foundation skill, runs after profile-optimizer. Triggers include "run formatting-profile for [client]", "capture formatting preferences", or when a client has strong formatting opinions.
---

# Formatting Profile

Voice is what you say. Formatting is how it looks on the feed. Two posts with identical words can perform completely differently based on line breaks, sentence length, white space, and punctuation patterns. This skill captures a client's visual formatting preferences — the stuff that makes their posts recognizable at scroll speed before a single word is read.

Does NOT cover voice, tone, or content — those live in voice-analyzer. This is purely visual rhythm on the feed.

**Pre-flight:** Run preflight.md. Client: [name provided by user].

## Quality Gate

Insufficient input → stop. State gap, impact, fix option. Never invent or fabricate.

---

**Purpose:** Capture only how posts look on the feed — the 7 visual formatting dimensions that shape scannability and rhythm. This skill contains nothing about tone, voice, vocabulary, content, or CTA strategy. Those live in voice-analyzer and copy-developer respectively.

**Pipeline position:** Optional. Runs after profile-optimizer. Can also run standalone at any time.

---

## SCENARIO ROUTING

```
If the user has provided a completed questionnaire or document with formatting information:
→ SCENARIO B — Document Analysis

If the user has provided only a request to run this skill with no document:
→ SCENARIO A — Interview
```

---

## SCENARIO A — INTERVIEW

Ask ONE question per message. Wait for the answer before asking the next. Keep each message short and scannable — just the question, the options, and nothing else. The member should only need to pick a letter.

Start with a brief intro message:

```
Quick formatting check — 7 questions about how your posts should look on the feed. Just pick the option that fits. Let's go.
```

Then ask each question one at a time:

**Message 1:**
```
LINE BREAKS — how much white space between lines?

A) Lots of white space — airy and scannable
B) Moderate spacing
C) Dense paragraphs
```

**Message 2:**
```
SENTENCE LENGTH — how long do your sentences run?

A) Short and punchy — under 15 words
B) Mixed short and medium
C) Flowing and complex
```

**Message 3:**
```
PUNCTUATION — what do you use most?

A) Minimal — periods and commas only
B) Em dashes for flow
C) Ellipses for pauses
D) Mix of the above
```

**Message 4:**
```
EMPHASIS — how do you highlight key points?

A) Bold key points
B) ALL CAPS for emphasis
C) Arrows and bullets
D) Clean text only — no emphasis markers
E) Mix — tell me which ones
```

**Message 5:**
```
POST LENGTH — what's your default?

A) Under 100 words — short and sharp
B) 100–200 words
C) 200–400 words
D) 400+ words — long form
E) Varies by post type
```

**Message 6:**
```
STRUCTURE — how do you organize a post?

A) Numbered lists
B) Bullet points
C) Story prose — no lists
D) Problem → Solution → Result
E) Mix — tell me when you use which
```

**Message 7:**
```
EMOJI — how much?

A) Never
B) 1–2 maximum
C) Moderate throughout
D) Frequent
```

After all 7 answers: proceed directly to OUTPUT. Do not ask follow-up questions unless a specific answer is contradictory — in that case, ask only about that dimension.

---

## SCENARIO B — DOCUMENT ANALYSIS

Parse the provided questionnaire or document.

Extract only the 7 formatting dimensions above.
Ignore all sections about tone, vocabulary, storytelling, vulnerability, inspiration, CTA strategy, or any content preferences — those belong in voice-analyzer and copy-developer.

Flag any of the 7 dimensions that are:
- Blank or unanswered → apply documented default, flag it
- Contradictory (e.g., "short sentences" + "flowing and complex") → flag the conflict, suggest the resolution

Proceed to OUTPUT.

---

## OUTPUT

Save as `formatting-profile.md` in the client's folder.

```
FORMATTING PROFILE — [CLIENT NAME]
Built: [date]
Scenario: [A — interview / B — document analysis]

---

VISUAL RULES
Line breaks: [specific rule — e.g., "one blank line between every paragraph; never 3+ lines of continuous text"]
Sentence length: [specific rule with one example — e.g., "under 15 words per sentence; 'This system cuts onboarding time by half.' not 'By implementing this system, you can significantly reduce the time it takes to onboard new team members.'"]
Paragraph max: [lines before a break — e.g., "2 lines maximum before white space"]

---

PUNCTUATION AND EMPHASIS
Use: [list — e.g., periods, commas, dashes]
Never use: [list — e.g., ellipses, semicolons]
Emphasis tools: [list — e.g., bold for key terms only; no ALL CAPS; no bullets in body]

---

POST STRUCTURE
Default format: [specific — e.g., "story prose with one insight at the end"]
Length target: [word range — e.g., "150–250 words"]
List usage: [when yes, when no — e.g., "numbered lists for step-by-step only; not for general points"]

---

EMOJI
Emoji rule: [specific — e.g., "never" / "one at most, only at end of post"]

---

GAPS FLAGGED: [any of the 7 dimensions left blank — with default applied and labeled as DEFAULT]
CONFLICTS FLAGGED: [any contradictions — with recommended resolution]
```

---

Formatting profile saved for [client].
copy-developer will apply these rules automatically.
Foundation fully complete.

→ trigger: run weekly ideas for [client]

---

## Verification

**Correctness:**
```
□ All 7 dimensions captured with specific rules — not just option letters? (e.g., "one blank line between every paragraph" not just "A")? Yes → pass. No → convert options to explicit rules.
□ Any contradictions flagged and resolved — not silently applied one way? Yes → pass. No → flag the conflict before saving.
□ Document contains zero voice, tone, vocabulary, or content preferences — those belong in voice-analyzer? Yes → pass. No → remove them.
```

**Completeness:**
```
□ All 7 dimensions present in the output: line breaks, sentence length, punctuation, emphasis, post length, structure, emoji? Yes → pass. No → fill the missing ones.
□ Any blank answers applied with a documented default and labeled as DEFAULT? Yes → pass. No → apply the default and label it.
□ Scenario documented (A — interview / B — document analysis)? Yes → pass. No → add it.
```

**Context-fit:**
```
□ Rules are specific enough that copy-developer can apply them without judgment calls? (e.g., "under 15 words per sentence" is specific; "keep it short" is not) Yes → pass. No → add the specific rule.
□ Formatting profile saved to client folder as formatting-profile.md? Yes → pass. No → save it.
□ If this overrides a default in linkedin-framework.md, is the override explicit? Yes → pass. No → note the override.
```

**Consequence:**
If copy-developer applies this formatting profile and the client says "this doesn't look like my posts": what dimension is most likely off?
→ Name it before finalizing. If the answer is "line break rule is too vague" or "sentence length not specified" — fix it.
