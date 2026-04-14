# Skill: Add a New Post to the Dashboard

## When to Use
Use this skill every time a new LinkedIn post is finalized and ready to be saved.

## Files to Update (both, every time)
1. `/Users/lucafelix/Desktop/claude projects /Linkedin /posts.json` — the data source
2. `/Users/lucafelix/Desktop/claude projects /Linkedin /dashboard.html` — the visual calendar

---

## Step 1 — Add to posts.json

Append a new object to the JSON array. Follow this exact format:

```json
{
  "id": "003",               ← increment from the last ID
  "title": "Post Title Here",
  "body": "Full post text here. Use \\n for line breaks.",
  "status": "draft",         ← always start as "draft"
  "publishDate": "2026-03-10", ← YYYY-MM-DD format
  "source": "Where the content came from (transcript, screenshots, etc.)",
  "tags": ["Tag1", "Tag2"]
}
```

---

## Step 2 — Add to dashboard.html

Find the `const POSTS = [` array inside `dashboard.html` and append the same object at the end of the array (before the closing `];`).

The object format is identical to posts.json.

---

## Status Values
- `draft` — post is written but not reviewed
- `ready` — post is approved and scheduled to go out
- `posted` — post has been published on LinkedIn

---

## Naming Convention for Post Files in /posts/
Save a copy of the post text as a .md file in `/posts/`:
Format: `[topic-slug]-[YYYY-MM-DD].md`
Example: `claude-code-gtm-workflows-2026-03-05.md`

---

## Quick Checklist
- [ ] New entry added to `posts.json`
- [ ] Same entry added to `const POSTS` in `dashboard.html`
- [ ] Post saved as .md file in `/posts/`
- [ ] ID is unique and incremented
- [ ] Status starts as `draft`
- [ ] Date is in YYYY-MM-DD format
