---
name: performance-analytics
description: Pull LinkedIn performance data and feed it back into the learning log so pattern-recognition has real numbers, not session notes. Three data sources combine — native export (impressions only), Apify (bulk reactions/comments/reposts), and WebFetch on individual post URLs (per-post reactions/comments/reposts split). Computes period-over-period and conditional year-over-year. Triggers include "run performance analytics for [client]", "run weekly analytics for [client]", "run monthly analytics for [client]", "analyze linkedin performance for [client]", "how did their posts do", or scheduled execution.
---

# Performance Analytics

Most content systems run forever on session notes and gut feel. Pattern recognition without real engagement data is just opinion with extra steps. This skill closes the loop — it pulls actual post performance, compares it to the client's own baseline, and writes the result back to the system so pattern-recognition is mining numbers, not vibes.

LinkedIn fragments the metrics you need across three sources. No single source gives the full picture — and getting this wrong is the most common reason engagement analysis is misleading. The skill always combines all three when running monthly, and uses the cheapest two on the weekly cadence.

**Pre-flight:** Run preflight.md. Client: [name].
**Required:** LinkedIn URL (Header block), content-pillars.md, learning-log.md (auto-created if missing), `clients/[name]/analytics/` folder (auto-created if missing).

## Quality Gate

Missing LinkedIn URL → stop. State gap, impact, fix option. Never invent or fabricate engagement numbers. If the required source for a scenario is unavailable, the run stops — no fallback to "estimated" data.

---

## The three data sources — what each one gives, what it doesn't

| Source | Gives | Does NOT give | Cost | Speed |
|---|---|---|---|---|
| **Native export (XLSX/Sheets)** | Impressions per post, total engagements per post, daily impressions/engagements, follower deltas, demographics | Reactions/comments/reposts split | 5 min user effort once a month | Manual download |
| **Apify scraper** | Reactions, comments, reposts (3-way split per post), post text, posted_at | Impressions | API credits | Fast bulk |
| **WebFetch on post URL** | Reactions, comments, reposts (3-way split per post), post text | Impressions | Free | One HTTP call per post |

**The architecture this enables:**
- **Impressions** can ONLY come from the native export. There is no scraper workaround. LinkedIn hides this from public traffic by design.
- **Reactions / comments / reposts split** can come from Apify (bulk) OR WebFetch (one post at a time). They return identical numbers. Apify is faster for >20 posts; WebFetch is free and fine for <20 posts.
- **Total engagements per post** is in the native export but it's a single number — to know whether a post got 60 engagements via reactions or via comments, you need Apify or WebFetch on top.

**Why this matters:** the question "are we getting passive likes, real conversation, or shareable amplification?" is unanswerable from the native export alone. Reactions = passive endorsement. Comments = active conversation. Reposts = the only metric that exposes a post to non-followers. If follower velocity is flat but engagement rate is high, the answer is almost always "lots of reactions, no reposts" — and you need the 3-way split to confirm it.

---

## Two scenarios — pick one up front

| Scenario | Frequency | Sources used | Effort | What you learn |
|---|---|---|---|---|
| **A — Weekly** | Every Monday | Apify (bulk) + WebFetch (per post for content tagging) | Zero — autonomous | Engagement subtypes, trend direction, week-over-week deltas |
| **B — Monthly** | First Monday of month | Native export + Apify (or WebFetch as fallback) + WebFetch for content scraping | 5 min — drop the export file | Full picture: impressions, engagement rate, the 3-way split, follower delta, demographics |

**Trigger routing:**
- `run weekly analytics for [client]` → Scenario A
- `run monthly analytics for [client]` → Scenario B
- `run performance analytics for [client]` → ask which one

**Why both:** Weekly Apify keeps pattern-recognition fed with trend signal between monthly fidelity checks. The monthly native export adds the impressions dimension and lets you compute true engagement rate. Apify alone gives you trends without reach context. Native alone gives you reach without engagement breakdown. Together they give you a real feedback loop.

---

## Scenario A — Weekly

### Step 1 — Pull post history via Apify

```
POST /acts/datadoping~linkedin-profile-posts-scraper/run-sync-get-dataset-items?token={APIFY_API_KEY}
{
  "profiles": ["[LinkedIn URL from client folder Header block]"],
  "maxPosts": 100
}
```

Returns per post: `text, total_reactions, comments, reposts, posted_at`. **No impressions** — LinkedIn does not expose this to public scrapers. The skill always discloses this in its output.

If Apify call fails:
```
Apify call failed for performance-analytics — cannot pull post history.
Method stopped. No engagement data written this run.
Run system-check to diagnose.
```
Do not ask the user to paste posts as a substitute. Stop.

**Apify alternative:** If Apify is down or out of credits, fall back to WebFetch on each post URL the client has published in the last 14 days. To get the URL list with no Apify, scrape the client's profile page once via WebFetch, extract post URLs from the HTML, then WebFetch each individually. Slower but always works as long as posts are public.

### Step 2 — Segment into periods

- **Current period:** last 7 days from today
- **Previous period:** 8–14 days ago
- **Year-ago period (conditional, only if YoY triggered):** 358–371 days ago, read from `engagement-history.md` — never re-scrape

Skip any post where `posted_at` is missing or unparseable. Note skipped count in the gaps section.

### Step 3 — Score posts

For each post: `score = comments + reposts`. Likes are vanity. Comments and reposts are intent signals — what people did when the post made them stop scrolling. This is the metric pattern-recognition needs.

Compute the **client's trailing 30-day median** from all posts in `engagement-history.md` plus the current Apify pull. If history has < 10 posts, use available count and flag the report:

```
⚠ Baseline computed on [N] posts — low-confidence percentiles. Will stabilize after ~10 weekly runs.
```

Tag each current-period post against this baseline:
- `top decile` — score in top 10% of trailing 30d
- `above median` — above median, below top decile
- `below median` — below median, above bottom decile
- `bottom decile` — bottom 10%

### Step 4 — Period-over-period comparison

Compute aggregate metrics for current vs previous period:

- Total posts in period
- Sum of `comments + reposts`
- Median post score
- Top post score
- Number of `top decile` posts
- Reactions / comments / reposts split totals (so you can see if reposts are climbing or stuck near zero)

Then compute deltas: current vs previous, expressed as % change.

### Step 5 — Year-over-year trigger check

Run YoY ONLY if one of these three conditions is true. Otherwise skip — keep the report clean.

1. **Big swing:** median post score changed >30% week-over-week (either direction)
2. **Flat:** median post score changed <5% week-over-week (no movement = needs longer arc to interpret)
3. **Single-post dominance:** one post contributed >60% of total period engagement

If YoY triggered AND `engagement-history.md` has data from 358–371 days ago:
- Pull that period's aggregates from history
- Compute current vs year-ago deltas
- Add a YoY section to the report explaining which condition triggered

If YoY triggered but no year-ago data exists:
```
YoY analysis triggered ([condition]) but engagement-history.md has no data from [date range].
Available history: [oldest_date] → [newest_date]. YoY will become available [date when 12mo accumulates].
```

### Step 6 — Write to engagement-history.md

Append every current-period post to `clients/[name]/analytics/engagement-history.md`. This file is the persistent record — every weekly Apify run and every monthly native export writes here. Pattern-recognition reads from this file directly.

If `engagement-history.md` does not exist, create it with the header block defined in the **Storage Schema** section below.

For each post in the current period, add or update its entry:
- New post (not yet in history) → append a new POST block
- Existing post (already in history, being re-measured) → append a new METRICS line under that post

Never delete or overwrite previous METRICS lines. The history is append-only — that's how trends become visible.

### Step 7 — Backfill learning-log.md (best effort)

For each high-confidence match between an Apify post and a learning-log session entry:
1. Match by date window (post date within ±2 days of session date)
2. Topic match: ≥3 distinctive content words from session "Post topic" line appear in the post text (skip stopwords: the, a, and, of, to, for, on, in, at, with, this, that, is, are)
3. Confidence: high (date + 5+ word match), medium (date + 3–4 word match), low (date only or weak text match)

For high and medium confidence matches, append a new section inside the matching session entry:

```
ENGAGEMENT DATA (T+[N]d, source: apify_auto, match: [confidence]):
- Reactions: [N]
- Comments: [N]
- Reposts: [N]
- Impressions: not available (Apify limitation — see monthly native export for impressions)
- Score (c+r): [N]
- Percentile vs 30d median: [top decile / above / below / bottom]
```

Low-confidence matches go to the report only, not the log. Flag them for human review.

**If no learning-log.md exists for the client:** scrape the post URL via WebFetch, classify the post against `content-pillars.md` based on the content, and write the inferred pillar/hook/post-type into the engagement-history POST block. The skill should not require a pre-existing learning log to produce useful content tagging — for any post without a session entry, scrape and infer.

### Step 8 — Output the weekly report

See **Output Format — Weekly Report** below.

---

## Scenario B — Monthly Full-Picture Analysis

### Step 1 — Locate the native export

Check `clients/[name]/analytics/` for the most recent `linkedin-export-*.xlsx` or `linkedin-export-*.gsheet` reference. If a file modified in the last 14 days is found, proceed to Step 2.

If not found:
```
Monthly performance analytics for [client] needs the native LinkedIn export.

To get it:
1. Open LinkedIn → Me → Posts & Activity → Analytics → Content
2. Top right: "Export" → choose date range "Last 30 days" or "Last 90 days"
3. Save the XLSX as: clients/[client]/analytics/linkedin-export-[YYYY-MM-DD].xlsx
   OR upload to Google Sheets and provide the share link

If you've already saved the file, I'll auto-pick the most recent one.
```

If triggered from cron and no recent export exists, send a Discord ping and exit cleanly. Do not block.

**Google Sheets support:** if the user provides a Google Sheets share link instead of an XLSX, parse it via the Google Sheets MCP (`mcp__google-docs__readSpreadsheet`). The data structure is identical to the XLSX export.

### Step 2 — Parse the native export

LinkedIn's native creator analytics export contains 5 distinct sheets/sections. The skill must read all 5 — they each contain different signals:

| Sheet | Contains |
|---|---|
| DISCOVERY | Total period impressions, members reached |
| ENGAGEMENT | Daily timeline: Date, Impressions, Engagements (single total) |
| TOP POSTS | Two side-by-side tables: top posts by engagements (URL, date, total engagements) and top posts by impressions (URL, date, impressions). Up to 50 posts each. |
| FOLLOWERS | Daily timeline: Date, New followers + final total |
| DEMOGRAPHICS | Job titles, locations, industries, seniority, company size, top companies |

**Critical fact about the native export schema (verified 2026-04-10):** the native export's "Engagements" column is a single total per post — it does NOT split into reactions, comments, and reposts. The split must be sourced separately via Apify or WebFetch. Do not assume the export has this split — every parser version must be defensive against schema drift, but the absence of the 3-way split is the documented baseline, not a bug.

Use flexible column detection — match by header substring (case-insensitive):

| Logical field | Header substring to match | Source sheet |
|---|---|---|
| post_url | "post url" or "url" | TOP POSTS (both tables) |
| post_date | "date" or "publish" | TOP POSTS, ENGAGEMENT, FOLLOWERS |
| total_engagements | "engagement" (and not "engagement rate") | TOP POSTS (left table), ENGAGEMENT |
| impressions | "impression" | TOP POSTS (right table), ENGAGEMENT, DISCOVERY |
| new_followers | "new follower" or "followers" | FOLLOWERS |
| total_followers | "total followers" | FOLLOWERS header row |
| reactions | "reaction" or "like" | NOT IN EXPORT — must come from Apify/WebFetch |
| comments | "comment" | NOT IN EXPORT — must come from Apify/WebFetch |
| reposts | "repost" or "share" | NOT IN EXPORT — must come from Apify/WebFetch |

If `total_engagements`, `impressions`, or `post_date` is missing → halt and report:

```
Native export parse failed — column "[field]" not found in [sheet name].
LinkedIn may have changed the export schema. Headers found: [list]
Stopping. Update performance-analytics column mapping before retry.
```

### Step 3 — Build the post list and join the 3-way engagement split

The export gives you a list of post URLs with impressions and total engagements. To get the reactions/comments/reposts split, the skill MUST do one of the following for each post:

**Option A (preferred for >20 posts in the export):** Run Apify on the client's profile, then join Apify results to native export rows by post URL. Apify and the native export agree on the URL format, so this is a clean string match.

**Option B (preferred for <20 posts or when Apify is unavailable):** WebFetch each post URL from the export. Each WebFetch returns the public post page which displays reactions, comments, and reposts. Parse the three numbers from the rendered page.

Run all WebFetches in parallel if Option B is used — never sequential.

After joining, every post in the analysis has:
- impressions (from native export)
- total engagements (from native export)
- reactions (from Apify or WebFetch)
- comments (from Apify or WebFetch)
- reposts (from Apify or WebFetch)
- post text (from Apify or WebFetch — needed for content tagging)

**Sanity check:** `reactions + comments + reposts` should equal `total engagements` from the native export ±5%. Larger discrepancies indicate either a stale cache, a deleted reaction since the export was generated, or a parse error. Flag posts with >5% discrepancy in the report but do not block — the export is the canonical source for the total.

### Step 4 — Segment into periods

- **Current period:** last 30 days from export date
- **Previous period:** 31–60 days ago
- **Year-ago period (conditional):** 11–13 months ago

If the export covers <60 days, previous-period comparison is skipped with a note. If <13 months, YoY is skipped with a note (or read from history if accumulated).

### Step 5 — Score posts

For each post in the export:
- `score = comments + reposts` (consistent with Scenario A)
- `engagement_rate = total_engagements / impressions` (computed from native export)
- `repost_share = reposts / total_engagements` — this is the new metric the 3-way split unlocks. High repost share = content is breaking out of the existing follower graph. Low repost share = engagement is happening but no amplification.

Compute the client's trailing 30-day median from the export's current period.

Tag each post against the baseline (top decile / above / below / bottom) using `score`, NOT engagement_rate. Engagement rate is reported as a separate dimension. Engagement rate punishes long posts that earn high absolute engagement; pattern-recognition needs absolute signals.

### Step 6 — Period-over-period comparison

Compute deltas across all dimensions:

| Dimension | Why it matters |
|---|---|
| Total impressions | Reach |
| Daily impressions | Reach per active day |
| Total engagements | Audience response volume |
| Engagement rate | Per-impression resonance — the cleanest quality signal |
| Reactions / comments / reposts split totals | What KIND of engagement was earned |
| **Repost share %** | Whether content is amplifying out (the follower acquisition signal) |
| New followers (period total) | The actual outcome — did the audience grow |
| Daily new followers | Velocity (corrects for period length differences) |

### Step 7 — Performance breakdowns by content type

This is what makes the monthly report actionable. After the aggregate numbers, break down performance by:

- **By pillar** — average rate, top post, post count per pillar from `content-pillars.md`. Surfaces which pillars are overworked, underworked, or punching above weight.
- **By hook type** — desire / curiosity / fear / contrarian / framework. Surfaces which hooks resonate.
- **By post type** — personal story / framework / how-to / case study / contrarian / lead magnet / product launch.

To classify each post's pillar/hook/post-type:
1. First check learning-log.md for a matching session entry (date + topic match)
2. If no match, use the WebFetch'd post text and classify against `content-pillars.md` directly
3. Never leave a post tagged "unmapped" if the text is available — always classify

### Step 8 — Year-over-year trigger check

Same three conditions as Scenario A. If triggered AND the export covers 13+ months, run YoY directly from the export. Otherwise check `engagement-history.md` for year-ago data. Otherwise skip with a note.

### Step 9 — Write to engagement-history.md

Same append-only logic as Scenario A. Native export METRICS lines include all fields:

```
- 2026-04-15 (T+14d, source: native_export+webfetch):
  reactions: 47
  comments: 12
  reposts: 3
  impressions: 4823
  engagement_rate: 1.29%
  repost_share: 4.84%
  total_engagements: 62
  score: 15
  percentile: top_decile
```

The METRICS line tags the source compositely (`native_export+webfetch` or `native_export+apify`) so future you knows where each number came from.

### Step 10 — Backfill learning-log.md

Same matching logic as Scenario A. With native export, the source field is `native_export+[apify|webfetch]` and the impressions/engagement_rate/repost_share fields are populated.

### Step 11 — Output the monthly report

See **Output Format — Monthly Report** below.

---

## Storage Schema — engagement-history.md

Path: `clients/[name]/analytics/engagement-history.md`

```
# Engagement History — [Client Name]
# Append-only. Every weekly run and every monthly run writes here.
# Pattern-recognition reads from this file as the source of truth.

---
POST: [first 80 chars of post text, or learning-log topic if matched]
URL: [post URL]
Posted: 2026-04-08
First seen: 2026-04-15
Pillar: [pillar name from learning log OR inferred via WebFetch + content-pillars.md]
Hook type: [desire / curiosity / fear / contrarian / framework]
Post type: [personal_story / framework / how_to / case_study / contrarian / lead_magnet / product_launch]

METRICS:
- 2026-04-15 (T+7d, source: apify_auto):
  reactions: 47
  comments: 12
  reposts: 3
  impressions: not_available
  engagement_rate: not_available
  repost_share: not_available
  total_engagements: 62
  score: 15
  percentile: above_median
- 2026-05-01 (T+23d, source: native_export+apify):
  reactions: 52
  comments: 14
  reposts: 4
  impressions: 4823
  engagement_rate: 1.45%
  repost_share: 5.71%
  total_engagements: 70
  score: 18
  percentile: top_decile
---
```

**Why one POST block per post, multiple METRICS lines:** the same post matures over time. T+7d looks different from T+23d. Pattern-recognition needs to see the curve, not just the latest snapshot. Append-only history preserves that.

**Why source-tagging matters:** Apify and the native export sometimes disagree slightly (caching lag, deleted reactions). The source field lets you spot calibration drift instead of treating all numbers as equivalent.

---

## Output Format — Weekly Report

```
═══════════════════════════════════════════════════════════
WEEKLY ENGAGEMENT LOOP — [Client Name]
Period: [YYYY-MM-DD] → [YYYY-MM-DD]
Sources: Apify (3-way split) + WebFetch (content tagging)
═══════════════════════════════════════════════════════════

CURRENT WEEK
- Posts: [N]
- Total reactions: [N] | comments: [N] | reposts: [N]
- Repost share: [X.X%]  (← follower acquisition signal — higher = content is amplifying out)
- Median post score (c+r): [N]
- Top post: "[truncated topic]" — score [N] ([percentile])
- Top decile posts: [N]

VS PREVIOUS WEEK
- Posts: [N] → [N] ([+/-]%)
- Median score: [N] → [N] ([+/-]%)
- Repost share: [X.X%] → [X.X%] ([+/-] pp)
- Top decile posts: [N] → [N]

[YEAR-OVER-YEAR — only if triggered]
YoY triggered: [big swing / flat / single-post dominance]
- Median score this week: [N]
- Median score same week last year: [N] ([+/-]%)
- Interpretation: [1 sentence — is this seasonal, structural, or noise]

TOP POSTS THIS WEEK
1. "[topic]" — score [N], reactions/comments/reposts [N/N/N], pillar: [name], hook: [type]
2. "[topic]" — score [N], reactions/comments/reposts [N/N/N]
3. "[topic]" — score [N], reactions/comments/reposts [N/N/N]

BOTTOM POSTS THIS WEEK
1. "[topic]" — score [N]
2. "[topic]" — score [N]

PATTERN NOTES (auto, no recommendations — that's pattern-recognition's job)
- [Hook type X dominated top posts: N of top 3]
- [Pillar Y had no posts above median this week]
- [Reposts are concentrated in N of N posts — content amplifying out is rare]

LIMITATIONS
- Impressions not available this run (only the monthly native export provides impressions)
- Engagement rate not computable without impressions
- [Baseline confidence note if applicable]
- For impressions, engagement rate, and follower delta, run the monthly native export.

WRITTEN
- engagement-history.md: [N] new posts, [N] new metrics lines
- learning-log.md: [N] high-confidence backfills, [N] low-confidence flagged

NEXT
- Next weekly run: Monday [date] 9:00
- Next monthly native export prompt: first Monday of next month — [date]
═══════════════════════════════════════════════════════════
```

---

## Output Format — Monthly Report

```
═══════════════════════════════════════════════════════════
MONTHLY ENGAGEMENT LOOP — [Client Name]
Period: [YYYY-MM-DD] → [YYYY-MM-DD]
Sources: Native export (impressions + totals) + [Apify | WebFetch] (3-way split) + WebFetch (content tagging)
═══════════════════════════════════════════════════════════

REACH & ENGAGEMENT
- Total impressions: [N]
- Avg impressions per post: [N]
- Total engagements: [N]
- Median engagement rate: [X.XX%]
- Reactions / comments / reposts (period totals): [N] / [N] / [N]
- Repost share: [X.X%]   ← follower acquisition signal
- New followers this period: [N]
- Daily new followers: [N]

VS PREVIOUS MONTH
- Total impressions: [N] → [N] ([+/-]%)
- Median engagement rate: [X.XX%] → [X.XX%] ([+/-] pp)
- Repost share: [X.X%] → [X.X%] ([+/-] pp)
- Daily new followers: [N] → [N] ([+/-]%)

[YEAR-OVER-YEAR — only if triggered]
[Same structure as weekly]

PERFORMANCE BY PILLAR
| Pillar | Posts | Avg rate | Top post score | Notes |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

PERFORMANCE BY HOOK TYPE
| Hook | Posts | Avg rate | Top |
|---|---|---|---|
| ... | ... | ... | ... |

PERFORMANCE BY POST TYPE
| Post type | Posts | Avg rate |
|---|---|---|
| ... | ... | ... |

TOP POSTS THIS MONTH (by score)
1. "[topic]" — score [N], rate [X%], reactions/comments/reposts [N/N/N], pillar: [name]
[... up to 5]

TOP POSTS BY IMPRESSIONS (separate ranking — what reached the most people)
1. "[topic]" — impressions [N], rate [X%]
[... up to 5]

TOP POSTS BY REPOST SHARE (what amplified out the most)
1. "[topic]" — repost_share [X.X%], reposts [N], pillar: [name]
[... up to 5]

AUDIENCE COMPOSITION (from demographics sheet)
- Top job titles: [list]
- Top locations: [list]
- Top industries: [list]
- Seniority mix: [list]
- Company size mix: [list]
[Flag any drift from documented ICP if relevant]

PATTERN NOTES (auto, observations only)
- [N posts in dominant pillar — concentration check]
- [Engagement rate vs follower velocity: aligned or diverging]
- [Repost share trend: climbing / flat / declining]
- [Any pillars completely absent this period]

WRITTEN
- engagement-history.md: [N] new posts, [N] new metrics lines
- learning-log.md: [N] high-confidence backfills, [N] inferred via WebFetch + content-pillars.md

NEXT
- Next monthly run: first Monday of next month — [date]
- Recommended: run pattern-recognition for [client] to convert these observations into action
═══════════════════════════════════════════════════════════
```

---

## Anti-patterns

**Don't fabricate impressions.** If the native export wasn't available this run, impressions stay `not_available`. Never estimate, infer, or back-calculate from engagement counts. A made-up number poisons the history forever.

**Don't assume the native export gives the 3-way engagement split.** Verified 2026-04-10: it does not. The "Engagements" column in the native export is a single total per post. To get reactions/comments/reposts you must use Apify or WebFetch. Any future schema check that finds the 3-way split is a bonus, not a baseline assumption.

**Don't overwrite history.** METRICS lines are append-only. If a post has a T+7d entry, the next run adds a T+14d entry — it does not replace.

**Don't rank by engagement rate.** Engagement rate punishes long posts that earn high absolute engagement. Score (comments + reposts) is the ranking metric. Engagement rate is reported as a separate dimension.

**Don't recommend.** This skill reports. Pattern-recognition recommends. Mixing the two creates noise — performance analytics should be a clean data layer.

**Don't skip the limitation banner on Scenario A reports.** Every weekly Apify-only report must say impressions are unavailable. Omitting it = inviting wrong conclusions about reach.

**Don't prompt the user mid-run.** Scenario A is fully autonomous (built for cron). Scenario B asks for the file once at Step 1, then runs to completion. No mid-run questions.

**Don't leave posts tagged "unmapped" when the text is available.** If learning-log.md doesn't have a matching session entry, WebFetch the post and classify against `content-pillars.md`. Pattern-recognition is useless without pillar tags.

---

## Verification

**Correctness:**
```
□ Score = comments + reposts (not likes, not engagement rate)? Yes → pass. No → fix the metric.
□ Impressions field is "not_available" for any Apify-only metric line — never a number? Yes → pass. No → remove the fabricated value.
□ Reactions/comments/reposts split is sourced from Apify or WebFetch — never inferred from native export's "engagements" total alone? Yes → pass. No → re-fetch via Apify or WebFetch.
□ Sanity check: reactions + comments + reposts ≈ native export total engagements ±5% per post? Yes → pass. No → flag drift.
□ engagement-history.md is append-only — no METRICS lines deleted or overwritten? Yes → pass. No → restore.
□ Period boundaries match the cadence (7d for weekly, 30d for monthly)? Yes → pass. No → recompute.
```

**Completeness:**
```
□ All steps executed in order, none skipped? Yes → pass.
□ engagement-history.md exists or was created? Yes → pass.
□ Report includes period comparison (current vs previous)? Yes → pass.
□ YoY section present if any of 3 trigger conditions met (or absent if not triggered)? Yes → pass.
□ Limitations section present and accurate for the scenario used? Yes → pass.
□ Monthly report includes pillar/hook/post-type breakdowns? Yes → pass. No → add them.
□ Every post in the analysis has a pillar tag (from learning log OR inferred via WebFetch + content-pillars.md)? Yes → pass. No → infer the missing ones.
```

**Context-fit:**
```
□ Trailing 30-day median computed from history file (not a generic benchmark)? Yes → pass.
□ Pattern notes are observations about THIS client's data, not generic LinkedIn advice? Yes → pass.
□ Backfill matches use date + topic word overlap, not loose text similarity? Yes → pass.
□ Pillar classification uses THIS client's content-pillars.md — not generic categories? Yes → pass.
```

**Consequence:**
If pattern-recognition reads engagement-history.md after this run: what is the most likely reason it draws a wrong conclusion?
→ Answer before delivering. If the answer is "Apify counts compared directly to native export counts without acknowledging source drift" or "posts tagged as wrong pillar because content-pillars.md wasn't consulted" — fix before saving.

---

## When called by a scheduled cron trigger

There is **one** weekly cron per client: `0 9 * * 1` (Mondays at 9 AM local). It always fires Scenario A. The skill self-detects whether today is also the first Monday of the month and chains the monthly jobs if so.

### First-Monday-of-month detection

```
today = current date
day_of_week = today.weekday()  # 0 = Monday
day_of_month = today.day

is_monday = (day_of_week == 0)
is_first_monday = is_monday AND (day_of_month <= 7)
```

If `is_first_monday`:
1. Run Scenario A (weekly Apify) to completion as normal.
2. Then run Scenario B (monthly native export) — but in **passive mode**: check `clients/[name]/analytics/` for any `linkedin-export-*.xlsx` modified in the last 14 days. If found, parse it and run the monthly analysis. If not found, surface a single Discord ping: *"Monthly performance analytics for [client] needs the native LinkedIn export. Drop the file in clients/[client]/analytics/ and reply 'run monthly engagement for [client]' when ready."* Do not block.
3. Then run [foundation-refresh-ping](../foundation-refresh-ping/SKILL.md) for the same client.

If NOT `is_first_monday`: only Scenario A runs. Exit cleanly.

### Failure logging

Every cron-invoked run writes its outcome to `clients/[name]/analytics/run-log.md` — one line per run, append-only:

```
2026-04-13 09:02 — weekly_apify — SUCCESS — 12 posts analyzed, 8 backfilled
2026-04-20 09:02 — weekly_apify — FAILED — Apify call returned 503; retry manually
2026-05-04 09:02 — weekly_apify — SUCCESS — 14 posts analyzed
2026-05-04 09:04 — first_monday_chain — monthly_native — SKIPPED — no recent export found, ping sent
2026-05-04 09:05 — first_monday_chain — foundation_refresh — SUCCESS — reminder sent
```

If the run crashes before writing: the cron wrapper logs:
```
2026-04-20 09:02 — weekly_apify — CRASHED — skill did not return; check cron output
```

**At session start**, Claude reads each client's `run-log.md` and surfaces any FAILED, CRASHED, or SKIPPED entries from the last 14 days as a top-of-session reminder.

Never block a cron trigger waiting for input. Either run autonomously or exit with a clean ping and a logged status line.

---

## Changelog

v1.0 — April 2026 — initial build (Apify weekly + native export monthly)
v1.1 — April 2026 — corrected the architecture after verifying that LinkedIn native export does NOT split engagements into reactions/comments/reposts. Added WebFetch on individual post URLs as the third data source, mandatory for the 3-way split when Apify is unavailable. Added repost_share metric (follower acquisition signal). Made content classification (pillar/hook/post-type) automatic via WebFetch + content-pillars.md when learning-log entry is missing.

---

Performance analytics complete — [N] posts analyzed, [N] high-confidence backfills, [N] inferred via WebFetch.
Next step → trigger: run pattern-recognition for [client] (recommended every 5 sessions, or after a monthly native export run)
