# Post: The 4-File Folder That Runs a Full Outbound Agent
**Date:** 2026-03-16
**Source:** Screenshot — Claude Code folder structure (Coldiq Webinar — Kenny, Head of GTM)
**Format:** Categorized List
**Hook Type:** Specific Number + Promise

---

This is the exact folder structure of a Claude Code outbound agent.

4 files. A fully autonomous outbound machine.

Here's what each one does:

---

**CLAUDE.md — The brain.**

Every session starts here. It tells the agent what tools exist, what API credentials to use, and the rules it must follow. Think of it as a map — without it, the agent has no direction.

**scoring-criteria.md — Your ICP rubric.**

Company size, industry, funding stage, web traffic. The agent reads this and scores every company automatically — no manual qualifying, no guesswork.

**copy-framework.md — Your playbook in plain English.**

The copy that's already working for you, saved permanently. The agent reads this and writes every email sequence in your voice, without you touching it.

**templates.md — Your output standard.**

Examples of what good output looks like. The agent uses these as a benchmark so every sequence follows the same format.

---

The pipeline runs like this:

companies.csv → Score (criteria) → Find T1/T2 contacts (Apollo) → Enrich emails → Write sequences (copy-framework) → Deploy to Instantly

5 steps. Zero manual work between them.

Before this:
→ Scoring criteria in a spreadsheet no one updates
→ Copy frameworks scattered across Google Docs
→ Credentials copy-pasted every session
→ Nothing talking to each other

Now it all lives in one folder.
The agent reads every file before it runs.
Update one file — every future campaign reflects it.

---

This isn't a chatbot. It's infrastructure.

How many of those 5 pipeline steps are you still doing manually?
