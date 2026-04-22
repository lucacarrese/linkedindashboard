---
name: foundation-refresh-ping
description: Lightweight monthly reminder to check if a client's foundation docs (voice-profile, ICP, content-pillars, cta-templates) need refreshing. Does NOT auto-scan or auto-update — just pings. Runs on a monthly cron schedule per client. The user decides whether to act on the reminder. Triggers include "ping foundation refresh for [client]" or scheduled monthly execution.
---

# Foundation Refresh Ping

Foundation docs (voice profile, ICP, content pillars, CTA templates) drift slowly. Most months nothing meaningful changes — but every few months a client raises a round, shifts ICP, drops a product, or finds a new angle, and the foundation docs go stale without anyone noticing. The cost of stale foundation isn't loud — it's a slow erosion of "this doesn't quite sound like me anymore" until the whole engine is producing content for the previous version of the client.

This skill is a calendar reminder, not an analyzer. It pings you once a month per client. You decide whether to act. No auto-scan, no auto-update, no recommendations — those exist already in [monthly-voice-refresh](../monthly-voice-refresh/SKILL.md), [content-auditor](../content-auditor/SKILL.md), and [pattern-recognition](../pattern-recognition/SKILL.md) when you actually want them.

**Pre-flight:** Run preflight.md. Client: [name].
**Required:** Client folder exists. Nothing else.

## Quality Gate

Missing client folder → stop. State gap. Never invent a client.

---

## What this skill does

Exactly one thing: prints a reminder. Nothing else. No file reads, no API calls, no analysis.

```
═══════════════════════════════════════════════════════════
FOUNDATION REFRESH CHECK — [Client Name]
Monthly reminder · [YYYY-MM-DD]
═══════════════════════════════════════════════════════════

Time to check if any of these foundation docs need a refresh:

  □ voice-profile.md     — Has the client's voice or beliefs shifted?
  □ icp.md               — Has the ICP changed (new tier, dropped tier, pivoted segment)?
  □ content-pillars.md   — Are the pillars still relevant? Any market shift?
  □ cta-templates.md     — Has the offer changed (new lead magnet, new product, dropped offer)?

Last refresh dates (from file modified time):
- voice-profile.md:   [YYYY-MM-DD]
- icp.md:             [YYYY-MM-DD]
- content-pillars.md: [YYYY-MM-DD]
- cta-templates.md:   [YYYY-MM-DD]

If nothing has changed → ignore this ping. No action needed.

If something has changed → run one of:
- "run voice-analyzer for [client]"        (rebuild voice profile)
- "run icp-analyzer for [client]"          (rebuild ICP)
- "run content-pillars for [client]"       (rebuild pillars)
- "run monthly-voice-refresh for [client]" (drift-check voice against recent transcripts)
- "run content-auditor for [client]"       (full quarterly-style audit)

CTA templates have no skill yet — edit cta-templates.md manually if the client's offer has changed.
═══════════════════════════════════════════════════════════
```

## How to read "last refresh dates"

For each of the 4 foundation files in `clients/[name]/`, get the file's last modified timestamp. Display as `YYYY-MM-DD`. If the file does not exist, display `(missing)` and flag it as a higher-priority item.

That's the only file operation this skill performs. No content reading. No diffs.

---

## What this skill does NOT do

- **Does not read file contents.** That's [content-auditor](../content-auditor/SKILL.md)'s job.
- **Does not analyze drift.** That's [monthly-voice-refresh](../monthly-voice-refresh/SKILL.md)'s job.
- **Does not recommend specific updates.** That's [pattern-recognition](../pattern-recognition/SKILL.md)'s job.
- **Does not edit any files.** Only prints the reminder.
- **Does not pull transcripts or check Fireflies.** This skill is intentionally dumb — it's a calendar entry, not an investigator.

The user explicitly chose option (a) pure reminder over option (b) reminder + auto-scan. Honor that. The whole point is that most months there's nothing to do, and the skill should not spend time pretending otherwise.

---

## When called by a scheduled cron trigger

Cron fires with: `ping foundation refresh for [client]`. The skill runs to completion in seconds and prints the reminder block. No interaction. No file edits. The reminder lands wherever the cron output goes (Discord, email, Claude Code session, etc.) and the user decides what to do with it.

---

## Verification

**Correctness:**
```
□ Skill printed only the reminder block — no auto-scan, no file content analysis, no recommendations? Yes → pass. No → remove the extra work.
□ Last modified dates pulled from actual file timestamps, not invented? Yes → pass. No → fix.
□ Missing files flagged as "(missing)" not silently skipped? Yes → pass. No → flag them.
```

**Completeness:**
```
□ All 4 foundation files checked (voice, icp, pillars, cta)? Yes → pass. No → add the missing one.
□ Trigger commands listed for each refresh option? Yes → pass. No → add them.
□ Note that cta-templates has no skill — must be edited manually? Yes → pass. No → add it.
```

**Context-fit:**
```
□ Client name appears in the header? Yes → pass. No → add it.
□ Date is today's date, not a stale value? Yes → pass. No → fix.
```

---

Foundation refresh ping complete for [client]. No action taken — this was a reminder only.
