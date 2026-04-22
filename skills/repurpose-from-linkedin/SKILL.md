---
name: repurpose-from-linkedin
description: >
  Take a LinkedIn post and repurpose it into 5 platform-native formats: Twitter/X thread, email newsletter, SEO blog post, short-form video script, and carousel slides. Each output is restructured for how people consume on that platform — not reformatted from the original.
---

# Repurpose from LinkedIn

A LinkedIn post that performed well is proof of a validated idea — your audience already told you they care. But "repurposing" doesn't mean reformatting. A Twitter thread is not a chopped-up LinkedIn post. An email is not the post with a subject line. A blog is not the post with filler paragraphs. Each platform has its own consumption pattern, and the job is to restructure the idea for how people read, watch, and scroll on that specific channel.

This skill takes one LinkedIn post and produces 5 platform-native outputs: Twitter/X thread, email newsletter, SEO blog post, short-form video script, and carousel slides.

**Pre-flight:** Run preflight.md. Client: [name provided by user].
**Required:** Voice Profile (applied to all outputs), ICP (audience alignment across platforms).
**Optional:** Content Pillars (used for blog expansion depth).
Load also: `linkedin-framework.md`, `templates-library.md` from engine root.

## Quality Gate

Insufficient input → stop. State gap, impact, fix option. Never invent or fabricate.

---

## Input

Paste the LinkedIn post as text. No URL scraping, no file ingestion. Just the post text.

Expected length: 100-300 words. If the post is under 100 words, flag that some formats (especially blog and email) will require more invention than repurposing — surface this before proceeding. If over 300 words, note that compression formats (thread, video) will require heavier editing choices.

---

## Platform Selection

Before generating, ask:

```
Generate all 5 formats, or pick specific ones?
Formats: Twitter/X thread | Email newsletter | SEO blog post | Short-form video script | Carousel slides
```

Default to all 5. Accept exclusions. Proceed after confirmation.

---

## Step 1 — Source Analysis

Before generating any output, analyze the LinkedIn post. This analysis is the foundation all formats build from.

Extract:

**Core insight:** The one idea the post is built around. State it in one sentence. If the post contains multiple ideas, identify the dominant one and note the secondary ideas as available expansion material.

**Hook type used:** Bold claim, question, story opener, stat, contrarian, pattern interrupt — name it.

**Supporting points:** The evidence, examples, steps, or proof. List each as a bullet. These are the raw materials every format draws from.

**CTA or closing sentiment:** What the post asks the reader to do or feel at the end. Some formats will adapt this; others will replace it entirely.

**Voice markers:** Sentence patterns (short/long/mixed), vocabulary choices, energy level (calm authority, high intensity, conversational, etc.), humor presence. These must carry across all outputs — adapted for platform register, never flattened.

Present the analysis. Wait for confirmation before generating outputs.

---

## The Anti-Summary Rule

Each output must be NATIVE to its platform. The Twitter thread is not a chopped-up LinkedIn post. The email is not the post with a subject line added. The blog is not the post with filler paragraphs. The video script is not the post read aloud. The carousel is not the post split across slides.

Each format restructures the insight for how people consume on that platform. If any output reads like a reformatted version of the LinkedIn post, it fails.

This rule overrides speed. If a format cannot be made platform-native from the source material, flag it and explain why — do not deliver a reformatted version.

---

## Step 2 — Generate Outputs

### Format 1: Twitter/X Thread

**Structure:**
- Hook tweet: under 280 characters, creates curiosity gap, stands alone in the timeline
- 3-5 value tweets: each under 280 characters, each stands alone as a complete thought
- CTA tweet: natural close, under 280 characters

**Platform rules:**
- No hashtags in tweet body
- Punchier, more compressed than LinkedIn — shorter sentences, no narrative arc
- If the LinkedIn post is story-driven, restructure as insight-first (the thread teaches; it does not narrate)
- Each tweet earns the next scroll — if a value tweet could be skipped without losing anything, cut it

**ICP check:** Twitter may reach a different ICP tier than LinkedIn. Note which tier this thread speaks to.

---

### Format 2: Email Newsletter

**Subject lines — 3 variations:**
- Curiosity: under 50 characters, opens a loop
- Benefit: under 50 characters, states what the reader gets
- Direct: under 50 characters, names the topic plainly

**Preview text:** 1-2 lines, under 100 characters. Complements the subject line — never repeats it.

**Body structure:**
- Inverted pyramid: key takeaway first, then supporting detail (2-3 points, 2-4 sentences each), then single CTA
- More personal and conversational than LinkedIn — write to one person
- Under 400 words total
- Provide both plain-text and HTML-friendly versions (HTML version adds bold for key lines, paragraph spacing, and a styled CTA button placeholder)

**Platform rules:**
- The email is a letter, not a broadcast. "You" appears more than "I."
- One CTA only. The reader should know exactly what to do next.
- If the LinkedIn post's CTA was engagement-driven ("comment below"), replace with an email-native CTA (reply, click, forward).

---

### Format 3: SEO Blog Post

This is the EXPANSION format — the post becomes 800-1500 words.

**Target keyword:** Infer from the post's core topic. If ambiguous, present 2-3 options and ask the user to confirm before writing.

**Title — 3 variations:**
- Informational: "[How to / What is / Guide to] + keyword"
- Curiosity/contrarian: challenges a common belief or reframes the topic
- List/framework: "[N] [things/steps/mistakes] + keyword context"

**Meta description:** 150-160 characters, includes keyword naturally.

**H2/H3 outline:** 3-5 sections. Restructured for search intent — not the LinkedIn post's narrative order. Present outline before writing full draft.

**Full draft rules:**
- Opens with a hook (not "In this post, we'll explore...")
- Short paragraphs (2-4 sentences)
- Internal link placeholders: `[INTERNAL LINK: related topic]` where a link to another piece would add value
- The blog must add genuine depth — examples, context, data, nuance — not pad the LinkedIn post to word count
- Content Pillars help here: if the post's topic maps to a pillar, use the pillar's angle and depth to guide expansion
- Every H2 section should contain at least one point NOT in the original LinkedIn post

**ICP check:** Blog reaches people searching, not scrolling. The keyword choice determines which ICP tier finds this. Note the alignment.

---

### Format 4: Short-Form Video Script (30-60 seconds)

**Hook (first 3 seconds):**
- Pattern interrupt — single punchy line
- If the LinkedIn post is data-heavy, lead with the stat
- If story-driven, compress the narrative to the punchline and open with it

**Body (20-50 seconds):**
- Short lines: max 8-10 words per line
- `[PAUSE]` markers for breathing and emphasis
- `[B-ROLL: description]` cues for visual cuts
- One idea per line — teleprompter formatted
- Written for speaking voice, not written prose (read it aloud mentally; if it sounds like reading, rewrite)

**CTA (last 5 seconds):**
- Single ask
- Platform-native: follow, save, share, comment — pick one

**Format note:** Designed for Reels / TikTok / Shorts. Vertical, face-to-camera assumed unless B-roll cues suggest otherwise.

---

### Format 5: Carousel Slides (7-10 slides)

**Slide 1 — Cover:**
- Hook headline that creates swipe motivation
- Subtitle: context or promise (1 line)
- Design direction: [background color/style, text emphasis, layout]

**Slides 2 through N-1 — Content:**
- One idea per slide
- Headline: under 8 words
- Supporting copy: 1-2 lines maximum
- Design direction per slide: [emphasis technique, visual element, layout hint]
- The carousel teaches the insight as a visual sequence — it does not break the post into chunks

**Slide N — CTA:**
- Clear call to action
- Optional: value reinforcement (1 line summary of what they just learned)
- Design direction: [layout, emphasis]

**Readability rule:** Every slide must be readable in 3 seconds. If a slide requires more than 3 seconds to process, split it or cut copy.

---

## Step 3 — Quality Checks

Run per format before delivery. Fix every failed item.

**Twitter/X Thread:**
```
- [ ] Every tweet under 280 characters (count them)
- [ ] Hook tweet creates curiosity gap
- [ ] Each value tweet stands alone
- [ ] CTA is natural, not forced
- [ ] Voice matches profile
- [ ] No hashtags in tweet body
```

**Email Newsletter:**
```
- [ ] Subject lines under 50 chars
- [ ] Preview text doesn't repeat subject
- [ ] Body follows inverted pyramid
- [ ] Single clear CTA
- [ ] Under 400 words
- [ ] Both plain-text and HTML versions provided
```

**SEO Blog Post:**
```
- [ ] 800-1500 words
- [ ] Title includes target keyword naturally
- [ ] Meta description under 160 chars
- [ ] H2/H3 structure is scannable
- [ ] Content is genuinely expanded, not padded
- [ ] Internal link placeholders included
```

**Short-Form Video Script:**
```
- [ ] 30-60 seconds when read aloud
- [ ] Hook grabs in first 3 seconds
- [ ] Teleprompter formatted (short lines, pause markers)
- [ ] B-roll cues included
- [ ] Spoken voice, not written prose
```

**Carousel Slides:**
```
- [ ] 7-10 slides total
- [ ] Cover slide creates swipe motivation
- [ ] One idea per content slide
- [ ] Each slide readable in 3 seconds
- [ ] Design direction is actionable
- [ ] CTA slide is specific
```

---

## Verification

**Correctness:**
```
□ Core insight accurately extracted from source post
□ Voice profile applied consistently across all formats
□ Platform constraints met (character limits, word counts, slide counts)
□ No content fabricated beyond what the source post supports
```

**Completeness:**
```
□ All selected formats generated
□ Each format includes all required components
□ Quality checklist passed for every format
```

**Context-fit:**
```
□ ICP alignment checked — each format reaches the right tier on the right platform
□ Voice consistent but register adapted per platform
□ Content pillar connection preserved across formats
```

**Consequence:**
If the user publishes all outputs simultaneously: would an audience member who follows on multiple platforms feel they're seeing the same thing repackaged, or distinct value on each channel?
→ Answer this before delivery.

---

Repurpose complete — [N] formats delivered.
Next step → trigger: post-grader (for LinkedIn-origin quality check on any individual output)
