# LinkedIn Post Designer Agent

## Purpose
This agent reads a design brief for a LinkedIn post, generates an HTML mockup of the post card, and pushes it automatically into Figma using the Figma MCP.

## Figma Target File
- **File Key**: `kTv3cfCN5EEOL6OxqGcsFj`
- **Figma URL**: https://www.figma.com/design/kTv3cfCN5EEOL6OxqGcsFj/Untitled
- Always push to this file using `outputMode: "existingFile"` with the fileKey above.

## Folder Structure
```
designer/
├── briefs/       ← Read design briefs from here (written by post agent)
├── examples/     ← Visual reference files and style guidelines added by user
├── output/       ← Save HTML mockup + Figma push confirmation here
└── CLAUDE.md     ← This file
```

## Workflow — Follow This Every Time

### Step 1 — Read the Brief
- Read the latest `.md` file in `briefs/` (or the one specified by the user)
- Extract: post text, tone, layout type, key visual message, color mood

### Step 2 — Read Visual Examples
- **Always read `examples/style_guide.md` first** — this is the source of truth for all visual decisions
- It contains the full design system extracted from real ColdIQ LinkedIn posts
- Do not deviate from the colors, fonts, card styles, or layout patterns defined there

### Step 3 — Generate HTML Mockup
- Build a self-contained HTML file (inline CSS, no external dependencies) that represents the LinkedIn post as a visual card
- Save the HTML file to `output/[post-name].html`
- Follow the design rules below

### Step 4 — Push to Figma
- Use the `generate_figma_design` Figma MCP tool
- Set `outputMode` to `"existingFile"`
- Set `fileKey` to `kTv3cfCN5EEOL6OxqGcsFj`
- This will push the HTML mockup as a frame into the Figma file
- Poll until status is `completed`

### Step 5 — Save Output Summary
- Save a summary to `output/[post-name]-result.md` with:
  - Post title / filename
  - Design decisions made (layout chosen, colors, why)
  - Figma frame link (if returned)

---

## Design System
**Full design system is in `examples/style_guide.md` — read it before every design.**

Summary of non-negotiables:
- **Canvas**: 1080×1350px (portrait, 4:5)
- **Background**: Radial gradient — `#C4384A` center → `#8B1A2A` mid → `#2E0810` edges + grain texture
- **Font**: Inter, imported from Google Fonts
- **Cards**: `border-radius: 18px`, `background: rgba(60,10,20,0.65)`, `border: 1px solid rgba(255,255,255,0.10)`
- **Author pill**: Always top-center — circular avatar + "Luca Carrese"
- **Footer**: COLDIQ pill always at bottom center
- **Layout**: Choose A/B/C/D from style_guide.md based on post type

---

## HTML Mockup Base
All mockups start from this shell — populate content and choose the layout template from `style_guide.md`:

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px;
    height: 1350px;
    font-family: 'Inter', system-ui, sans-serif;
    background: radial-gradient(ellipse at 35% 40%, #C4384A 0%, #8B1A2A 40%, #2E0810 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 56px;
    gap: 24px;
  }
  /* Grain texture overlay */
  body::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }
  .content { position: relative; z-index: 1; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 24px; flex: 1; }

  /* Author pill */
  .author-pill {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 999px;
    padding: 6px 18px 6px 8px;
    backdrop-filter: blur(8px);
  }
  .author-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: #8B1A2A; /* placeholder — replace with actual img if available */
    overflow: hidden;
  }
  .author-name { color: #fff; font-size: 15px; font-weight: 600; }

  /* Hero title */
  .hero { font-size: 60px; font-weight: 800; color: #fff; text-align: center; line-height: 1.15; }
  .hero i { font-style: italic; }

  /* Subtitle strip */
  .subtitle-strip {
    background: rgba(60,10,20,0.50); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px; padding: 16px 28px; text-align: center;
    font-size: 20px; font-weight: 500; color: rgba(255,255,255,0.9);
    width: 100%;
  }

  /* Pipeline steps */
  .pipeline { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center; }
  .step-pill {
    background: rgba(20,5,10,0.75); border: 1px solid rgba(255,255,255,0.15);
    border-radius: 999px; padding: 8px 18px;
    color: #fff; font-size: 13px; font-weight: 600; white-space: nowrap;
  }
  .step-arrow { color: rgba(255,255,255,0.6); font-size: 16px; }

  /* Content card */
  .card {
    background: rgba(60,10,20,0.65); border: 1px solid rgba(255,255,255,0.10);
    border-radius: 18px; padding: 24px 28px; width: 100%;
  }
  .card-title { font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 14px; }

  /* Section label pill */
  .label-pill {
    display: inline-block; background: #C4384A; border-radius: 999px;
    padding: 4px 14px; font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 10px;
  }

  /* Toggle row */
  .toggle-row { display: flex; align-items: center; gap: 12px; padding: 8px 0; font-size: 15px; color: rgba(255,255,255,0.85); }
  .toggle-icon { width: 36px; height: 20px; background: #C4384A; border-radius: 999px; flex-shrink: 0; }

  /* Stats grid */
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; }
  .stat-card {
    background: rgba(60,10,20,0.65); border: 1px solid rgba(255,255,255,0.10);
    border-radius: 14px; padding: 20px; text-align: center;
  }
  .stat-number { font-size: 40px; font-weight: 800; color: #fff; }
  .stat-label { font-size: 13px; color: rgba(255,255,255,0.7); margin-top: 6px; }

  /* COLDIQ footer */
  .coldiq-pill {
    display: flex; align-items: center; justify-content: center;
    background: rgba(20,5,10,0.85); border: 1px solid rgba(255,255,255,0.15);
    border-radius: 999px; padding: 10px 32px;
    color: #fff; font-size: 18px; font-weight: 800; letter-spacing: 3px;
    margin-top: auto;
  }
</style>
</head>
<body>
  <div class="content">

    <!-- Author pill -->
    <div class="author-pill">
      <div class="author-avatar"></div>
      <span class="author-name">Luca Carrese</span>
    </div>

    <!-- Hero title -->
    <div class="hero"><!-- TITLE HERE --></div>

    <!-- Subtitle strip -->
    <div class="subtitle-strip"><!-- SUBTITLE HERE --></div>

    <!-- Pipeline steps -->
    <div class="pipeline">
      <div class="step-pill">Step 1</div>
      <span class="step-arrow">→</span>
      <div class="step-pill">Step 2</div>
      <span class="step-arrow">→</span>
      <div class="step-pill">Step 3</div>
    </div>

    <!-- Content cards go here — adapt to Layout A/B/C/D from style guide -->

  </div>

  <!-- COLDIQ footer -->
  <div class="coldiq-pill">COLDIQ</div>
</body>
</html>
```

---

## Key Rules
- **Always push to Figma** — never just save HTML and stop
- Match the tone to the visual style table above
- If the post is a list, use the list card layout — render `→` items as styled rows
- If the post has a stat in the hook, make that number visually dominant (larger, accented color)
- Do not add Lorem Ipsum — only use real content from the brief
- One frame per post in Figma — label the frame with the post filename
