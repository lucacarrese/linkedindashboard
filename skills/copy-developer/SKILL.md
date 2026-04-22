---
name: copy-developer
description: Develop an approved content idea into a full LinkedIn post draft in the client's documented voice. The most-used production skill. Runs hook-generator first, selects the right post structure, writes in voice, and hands off to post-grader. Triggers include "develop this idea", "write a post for [topic]", "copy development", or any request to turn an idea into a post.
---

# Copy Developer

The most common failure in LinkedIn ghostwriting isn't bad writing — it's writing that sounds like "good content" instead of sounding like a specific person. Generic posts get scrolled past. Voice-matched posts get DMs.

This skill turns an approved idea into a full post draft. It runs hook-generator first, selects the right structure, writes in the client's documented voice, and hands off to post-grader. It is the most-used production skill in the pipeline.

**Pre-flight:** Run preflight.md. Client: [name provided by user].
**Required:** Voice Profile (cannot write in voice without it). Also load: ICP, content pillars.

---

## Quality Gate

Missing Voice Profile → stop. State gap, impact, fix option. Never invent or fabricate — flag with [INSERT REAL DATA].

---

## ENTRY ROUTING

Load in this order before writing anything:

1. `linkedin-framework.md` — platform principles active throughout session
2. `templates-library.md` — identify category, select template
3. Client folder → `formatting-profile.md` — exists? Apply as override to all defaults. Missing? Apply defaults: short sentences, white space, punchy, high scannability.
4. Client Voice Profile — apply from word one, not after drafting

Then ask:

```
Standard post or lead magnet post?
```

Standard post → continue below.
Lead magnet post → route to lead-magnet-writer + lead-magnet-builder. Stop here.

---

## STEP 0 — HOOK FIRST (required)

Do not write the post body. Run hook-generator first.

Pass to hook-generator:
- Topic and angle from the approved idea
- Category: [Teach / Lead / Prove / Connect / Respond]
- ICP tier: Tier 1 / Tier 2 / Tier 3
- Specific numbers, results, or stories available

Present top 5 hooks with a recommendation. Wait for selection before proceeding.

---

## STEP 1 — SELECT CATEGORY AND STRUCTURE

Identify category. Select matching template from `templates-library.md`.

| Category | Post Types | Structure |
|---|---|---|
| Teach/Educational | How-to, common mistakes, tool recommendations, behind-the-scenes process | Problem → Framework → Steps → Insight |
| Lead/Thought Leadership | Contrarian takes, pattern recognition, market observations, framework breakdowns | Contrarian hook → Common belief → Why it's wrong → Better way |
| Prove/Social Proof | Client success stories, results announcements, case studies | Before → Challenge → What we did → Result (specific) → Takeaway |
| Connect/Relationship | Personal stories, mistakes and lessons, question starters, journey posts | Scene → What happened → What I learned → What you can take from it |
| Respond/Amplify | Industry responses, event recaps, milestone updates, fresh learning drops | Signal → POV → Why it matters now → What to do with it |

---

## STEP 1B — STRUCTURE SELECTION (pick before writing)

Most ghostwriting rewrites happen because the structure was wrong, not the writing. A story-driven post rewritten as a list post is a new draft, not an edit. Choosing the structure upfront saves a full revision cycle.

After identifying the category, present **2-3 structural options** for the post. Each option is a different way to deliver the same idea with the same hook. The user picks one before any body copy is written.

**How to generate options:**

1. Take the approved hook + category from Step 1
2. Pull 2-3 compatible templates from `templates-library.md` within that category (or from adjacent categories if the idea spans two)
3. For each template, write a **3-line structural sketch** — not a draft, just the skeleton:
   - Line 1: How the post opens (after the hook)
   - Line 2: What the body does (lists steps? tells a story? stacks evidence?)
   - Line 3: How it closes and what the CTA earns

**Present like this:**

```
STRUCTURE OPTIONS for: [idea title]
Category: [category] | Hook: [first line of selected hook]

A) [Template name] — [one-sentence description]
   Opens with: [setup]
   Body does: [movement]
   Closes with: [landing + CTA type]

B) [Template name] — [one-sentence description]
   Opens with: [setup]
   Body does: [movement]
   Closes with: [landing + CTA type]

C) [Template name] — [one-sentence description]
   Opens with: [setup]
   Body does: [movement]
   Closes with: [landing + CTA type]

Recommendation: [A/B/C] — [why in one sentence]
```

Wait for user selection. Do not write the post body until a structure is confirmed.

**Skip condition:** If the idea strongly dictates a single structure (e.g., a case study is always Prove, a hot take response is always Respond), state the structure, explain why alternatives don't fit, and proceed. Do not force 3 options when only 1 makes sense.

---

## STEP 2 — VOICE APPLICATION

Read the Voice Profile AI Prompt Framework (Part 3) and Writing Rules DO's/DON'Ts before writing. Keep the Words to Use / Words to Avoid table open. Scan every paragraph against it.

**Sentence length:**
Profile says "short and punchy" → no sentence over 12 words. One idea per sentence.
Profile says "long and winding" → let sentences breathe. No paragraph over 3 lines.
Profile says "mixed" → short for impact moments. Longer for context-setting.

**Vocabulary:**
Every meaningful noun/verb → pull from their "Use This" list where applicable.
After each paragraph → scan for banned words. Remove every instance. Not reduce. Remove.

**Storytelling:**
Profile says "story then insight" → open with a scene. Lesson at the end.
Profile says "insight then story" → state the point first. Story proves it.

**Qualification:**
Profile says "flat statements" → cut every hedge word: possibly, perhaps, might, could, tends to.
Profile says "qualified statements" → keep nuance with specifics: "In B2B services specifically" not "sometimes."

**Humor:**
Profile documents humor → include one moment. Not forced. One.
No humor documented → include none.

---

## STEP 2B — CONFIDENCE CHECKPOINT (before writing the body)

A mediocre draft that goes through the full grader loop wastes more time than catching the problem here. Before writing a single line of body copy, run this self-assessment. It takes 10 seconds and can save a full revision cycle.

**Check these 3 things:**

```
1. MATERIAL CHECK — Do I have enough concrete material to write this at 38+ level?
   □ At least one specific number, result, or named example available? 
   □ A real story, scene, or moment I can open with (not a hypothetical)?
   □ The idea has a clear "so what" for the ICP — not just interesting, but useful?

   If 2+ boxes are empty → STOP. Flag what's missing:
   "This idea needs [specific number/a client story/a concrete example] before 
   I can write it above threshold. Provide it, or I'll flag with [INSERT REAL DATA]
   and the post will need that filled before publishing."

2. VOICE CHECK — Can I write this in voice with what the profile gives me?
   □ Voice Profile has clear rules for this type of content?
   □ I can hear how this person would say the key claim — not just the words, 
     but the rhythm and attitude?
   
   If no → Flag: "The Voice Profile doesn't cover [this type of content/this tone]. 
   I'll write my best interpretation but flag the voice-uncertain sections for review."

3. STRUCTURE CHECK — Does the selected structure from Step 1B actually fit this material?
   □ The material I have fills the structure naturally — no sections will be padded?
   □ The structure earns the CTA — the reader will feel the ask is justified?
   
   If no → Revisit Step 1B. Pick a structure that fits what you actually have, 
   not what you wish you had.
```

All 3 pass → proceed to Step 3.
Any flag raised → surface it to the user before writing. Do not write a draft you already know will score below threshold.

---

## STEP 3 — POST STRUCTURE RULES

**Hook (2 lines max):**
Line 1: specific claim, observation, or story opening.
Line 2: tension, gap, or setup that earns the "see more" click.

Hook fails if:
- Starts with "I" → rewrite. Why: "I" signals self-focus before the reader has any reason to care. LinkedIn truncates after 2 lines on mobile — the hook must earn attention for the reader, not announce the author.
- Opens with a question → rewrite. Why: Questions are passive — they ask the reader to think before giving them a reason to. Statements with tension earn the click; questions hope for it.
- Contains a vague claim ("many", "most", "often") with no number → add the number or cut the claim. Why: Vague quantifiers are the hallmark of AI-generated content. "47% of founders" stops the scroll; "most founders" gets skipped because it could be anyone's guess.

**Body:**
- One idea per line. Why: LinkedIn is read on phones at scroll speed. Dense paragraphs get skipped entirely — each line needs to earn the next.
- White space every 2–3 lines. Why: White space is a visual pause. On mobile, a wall of text triggers the "too long" reflex before a single word is read.
- Paragraphs: 1–3 lines maximum.
- Claim has a number → use the number. "47% of founders" not "most founders." Why: Specificity is the fastest trust signal. Numbers prove you counted; vague claims prove you didn't.
- Framework present → name it. Don't describe an unnamed system. Why: Named frameworks are saveable. "The 3-Layer Pipeline" gets screenshotted; "here's how I think about it" gets forgotten.
- Passive voice → rewrite active. Why: Passive voice hides the actor and weakens the claim. "Revenue was increased" vs "We increased revenue" — the second has a person behind it.
- Em dash present → replace with period or line break. Why: Em dashes are Claude's signature punctuation. Even one signals AI-generated content to anyone who reads LinkedIn regularly.

**CTA:**
- One CTA. Never two. Why: Multiple CTAs create decision paralysis. The reader does nothing instead of choosing. One clear action converts; two competing actions cancel each other.
- Do not end with: "What do you think?" / "Thoughts?" / "Drop a comment below." Why: These are the laziest CTAs on LinkedIn. They signal the author ran out of ideas. Strong CTAs emerge from the content — they feel earned, not bolted on.
- Do not end with a summary of the post. Why: Summary endings kill momentum. The reader already read the post. End on the sharpest insight or the strongest example — the thing they'll remember.

Category-specific:
- Teach → "Try this in [specific context]" or "DM me for the template."
- Lead → one question only your ICP would have a strong opinion on. You respond to every reply.
- Prove → invite similar situation or direct follow: "If you're dealing with [situation], let's talk."
- Connect → resonance only: "If this hit home, I'd love to know why." No sales CTA.
- Respond → state the implication. Hard CTA is rarely earned.

**Hashtags:** 3 maximum. End of post only. Voice profile says no hashtags → use none.

**External links:** Never in the post body. Note at draft end: "Link goes in first comment."

---

## STEP 4 — FAILURE PATTERN CHECK

Correct before delivery:

**Generic opener:**
Wrong: "In today's competitive landscape, it's more important than ever to..."
Right: "Three months ago, a client told me her pipeline was completely dry. Here's what we found."

**Starts with "I":**
Wrong: "I've been thinking about something lately..."
Right: "Something I keep seeing in B2B founders:" / "Five clients told me the same thing this month."

**Generic advice:**
Wrong: "Here are 5 tips for better LinkedIn content."
Right: "5 things I stopped doing on LinkedIn after hitting 500K impressions — and what I do instead."
Test: could a direct competitor post this exact draft? Yes → find what only this person can say.

**Hedge language:**
Wrong: "It might be worth considering whether your content strategy could potentially..."
Right: "Your content strategy is broken. Here's why."

**Summary ending:**
Wrong: "In conclusion, consistent content creation is key to building a pipeline on LinkedIn."
Right: End on the sharpest insight, a direct question, or the strongest example.

**AI vocabulary — remove every instance:**
in today's landscape / in today's fast-paced world / it's important to note / as we navigate / leverage (verb) / utilize / game-changer / next-level / deep dive / in conclusion / make no mistake / let that sink in / the reality is / here's the thing / synergies / circle back / groundbreaking / transformative / cutting-edge / robust / scalable / best practices / touch base

---

## STEP 4B — SELF-EDITING CHECKLIST

Run before presenting the draft. Fix every failed item.

**Hook:**
```
□ Specific claim, not vague? Yes → pass. No → rewrite.
□ Earns "see more" without opening with a question? Yes → pass. No → rewrite.
□ Avoids starting with "I"? Yes → pass. No → rewrite.
□ Would stop your scroll in a crowded feed? Yes → pass. No → rewrite.
```

**Body:**
```
□ One idea per line? Yes → pass. No → break up.
□ No paragraph over 3 lines? Yes → pass. No → split.
□ Claim with a number uses the number? Yes → pass. No → add it.
□ Zero em dashes? Yes → pass. No → replace with period or line break.
□ Active voice throughout? Yes → pass. No → rewrite passive sentences.
□ Zero AI vocabulary? Yes → pass. No → remove every instance.
□ Each section follows logically from the one before? Yes → pass. No → reorder.
```

**Style:**
```
□ Sounds like this specific person, not polished-generic? Yes → pass. No → find what's missing from the Voice Profile.
□ Zero banned words from the Voice Profile? Yes → pass. No → remove all of them.
□ Swap test: competitor could NOT post this? Yes → pass. No → make it more specific to this person's experience.
```

**CTA:**
```
□ One CTA only? Yes → pass. No → cut to one.
□ Appropriate for category? (Connect = engagement only. Respond = soft or none.) Yes → pass. No → fix.
□ Avoids "What do you think?" / "Thoughts?" / "Drop a comment below"? Yes → pass. No → rewrite.
□ Post earned the ask? Yes → pass. No → either add more value or soften the CTA.
```

---

## STEP 5 — DELIVER THE DRAFT

**1. Full post draft**
Formatted as it appears on LinkedIn — with line breaks as written.

**2. Two alternative hooks**
Different opening energy. If main hook uses desire → alternatives use curiosity and fear.

**3. Template and voice log**
- Category: [Teach / Lead / Prove / Connect / Respond]
- Structure used: [name] — why: [1 sentence]
- Voice rules applied: the 2–3 most relevant rules from their profile that shaped this draft
- Tension points: any rule that was hard to apply or created a trade-off

**4. Missing content flags**
Idea required a specific number, result, or story that wasn't provided → flag with [INSERT REAL STAT/RESULT] in the draft. Do not invent. Do not guess.

---

## STEP 6 — PRE-GRADER GATE

Confirm before handing to post-grader:

```
□ Hook confirmed by user
□ All [INSERT REAL STAT/RESULT] placeholders filled or acknowledged
□ Voice Profile applied — not just referenced
□ Post does not start with "I"
□ Zero AI vocabulary
□ External links noted for first comment
□ Hashtags at end only, 3 maximum
□ One CTA
□ No summary ending
```

All confirmed → run post-grader.

---

## STEP 7 — REVISION HANDLING

User says "this doesn't sound like me":
→ Ask: which specific word, tone, or sentence structure feels wrong?
→ Revise with that specific rule. Generic feedback produces generic revision.

User wants different structure:
→ Name the closest template. Rewrite using it.

Visual brief reveals story gaps:
→ After a visual brief is built for this post, use it as a structural audit for the copy. The visual's need to stand alone forces every beat of the argument to be explicit. If the visual covers beats the copy hand-waves, implies, or skips entirely — the copy has gaps.
→ Check each section of the visual against the copy. Every beat the visual needs should have a concrete counterpart in the copy. If the visual makes an argument explicit that the copy only implies, make it explicit in the copy too. The visual brief is the completeness check.

User approves with no changes:
→ Confirm post-grader has run. If not, remind once.

---

## Verification

Run before delivering. All checks are binary.

**Correctness:**
```
□ Post starts with a specific claim or scene — not "I", not a question, not a vague statement? Yes → pass. No → rewrite hook.
□ Every number in the post body uses a numeral, not a word ("7 clients" not "several clients")? Yes → pass. No → fix.
□ Zero em dashes in the draft? Yes → pass. No → replace each one.
```

**Completeness:**
```
□ Hook selected by user before body was written? Yes → pass. No → go back to STEP 0.
□ Template and voice log included in delivery? Yes → pass. No → add.
□ All [INSERT REAL STAT/RESULT] flags either filled or explicitly acknowledged? Yes → pass. No → flag them now.
```

**Context-fit:**
```
□ Would the client say this exact sentence in a conversation? (Pick the most "written" line — if no: rewrite it.) Yes → pass. No → rewrite.
□ Does the CTA match the category rule? (Connect = no promotional CTA. Respond = soft or none.) Yes → pass. No → fix.
□ Swap test passed — a direct competitor cannot post this draft unchanged? Yes → pass. No → add specificity.
```

**Consequence:**
If this post goes live right now: what is the most likely failure?
→ Answer this before delivery. If the answer is "it reads as AI-generated" or "it could be from anyone in the niche" — fix it before sending.

---

Draft complete. Running post-grader now.
[post-grader runs automatically]
