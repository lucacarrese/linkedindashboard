# Visual Style Guide — Luca Carrese / ColdIQ

Extracted from 4 real high-performing LinkedIn post designs. Designer agent must follow this exactly.

---

## Brand Identity
- **Author name**: Luca Carrese
- **Company**: ColdIQ (always written as `COLDIQ` in footer)
- **Avatar**: Circular profile photo — always shown in the top-center author pill
- **Website**: coldiq.com

---

## Canvas
- **Size**: 1080×1350px (portrait) — standard for all posts
- **Aspect ratio**: 4:5

---

## Background
The background is the most recognizable element. Must be replicated precisely:
- **Type**: Radial gradient + grain/noise texture overlay
- **Center color**: `#C4384A` (bright crimson red)
- **Mid color**: `#8B1A2A` (medium burgundy)
- **Edge/dark color**: `#2E0810` (near-black deep maroon)
- **Gradient direction**: Radial from center-left, fading to dark at all edges
- **Grain texture**: Subtle noise overlay at ~8–12% opacity — use CSS `filter` or SVG noise
- **Effect**: Like a glowing red ember in a dark room

```css
background: radial-gradient(ellipse at 35% 40%, #C4384A 0%, #8B1A2A 40%, #2E0810 100%);
```

---

## Typography
- **Font**: Inter (or system-ui fallback). Import from Google Fonts.
- **Hero headline**: 52–72px, weight 800 (ExtraBold). Mix bold + regular in same line for contrast.
  - Example: `<b>Claude Code</b> vs Claude Cowork` — bold part white, regular part slightly lighter
  - Italic used for emphasis: `<i>AI Workforce</i>` — in a slightly lighter tone or same white
- **Subtitle/subhead**: 22–26px, weight 500, white or `rgba(255,255,255,0.85)`
- **Card title**: 18–22px, weight 700, white
- **Card body**: 15–17px, weight 400, `rgba(255,255,255,0.85)`
- **Stats**: 36–48px, weight 800, white
- **Footer brand (COLDIQ)**: 18–20px, weight 800, letter-spacing 3px, all caps

---

## Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Background center | `#C4384A` | Radial gradient core |
| Background mid | `#8B1A2A` | Radial gradient mid |
| Background edge | `#2E0810` | Radial gradient edges |
| Card background | `rgba(60, 10, 20, 0.65)` | All content cards |
| Card border | `rgba(255, 255, 255, 0.10)` | Subtle card outline |
| Text primary | `#FFFFFF` | Headlines, card titles |
| Text secondary | `rgba(255, 255, 255, 0.80)` | Body text, descriptions |
| Accent red (tags/badges) | `#C4384A` | Section label pills, toggle icons, CTAs |
| Step pill background | `rgba(30, 5, 10, 0.70)` | Pipeline step nodes |
| Step arrow | `#FFFFFF` or `rgba(255,255,255,0.6)` | → between pipeline steps |
| Author pill bg | `rgba(255, 255, 255, 0.15)` | Top author badge |
| Footer pill bg | `rgba(30, 5, 10, 0.80)` | COLDIQ bottom pill |

---

## Structural Components

### 1. Author Pill (always at top center)
```
[ ● avatar ] Luca Carrese
```
- Pill shape, semi-transparent white background (`rgba(255,255,255,0.15)`)
- Border: `1px solid rgba(255,255,255,0.25)`
- Circular avatar image on left (28–32px diameter)
- "Luca Carrese" in white, 15px, weight 600
- Centered horizontally, ~40px from top
- Backdrop blur: subtle (`blur(8px)`)

### 2. Hero Title
- Immediately below author pill, centered
- Very large (52–72px), bold weight
- White text — key terms in bold, supporting words lighter
- Italic for conceptual/era-type words (e.g., "AI Workforce Era")
- Max 2 lines

### 3. Subtitle / Stat Strip
- Below hero title
- Rounded rect card, `rgba(60,10,20,0.5)` bg, border `rgba(255,255,255,0.12)`
- Text centered, 20–24px, medium weight — bold emphasis on key numbers/words
- Example: "We replaced our scraping stack with **one Claude Code agent.**"

### 4. Pipeline / Step Indicator (horizontal flow)
- Horizontal row of pill-shaped step nodes connected by `→` arrows
- Each node: rounded pill, dark bg `rgba(20,5,10,0.75)`, white text 13–15px, border `rgba(255,255,255,0.15)`
- Active/highlighted node: slightly brighter border or accent outline
- Used to show the workflow sequence in GTM/process posts

### 5. Content Cards
- Rounded corners: `border-radius: 18px`
- Background: `rgba(60, 10, 20, 0.65)`
- Border: `1px solid rgba(255,255,255,0.10)`
- Padding: 24–32px
- Layout varies by post type:
  - **Toggle list**: Left-side toggle icon + label text per row (with app icons where relevant)
  - **Numbered steps**: Number badge `①` + bold title + bullet list below
  - **Can Do / Can't Do**: Green ✅ / Red ❌ badge row header + bullet list
  - **Stat cards**: Large stat number + description below + icon top-left
  - **Comparison columns**: 2 equal columns side by side, same card style

### 6. Section Label Pills (inline)
- Small pill with accent red bg `#C4384A`, white text, bold 13px
- Used inside cards or as section separators
- Example: "1. Sales teams", "CAN DO:", "Key statistics"

### 7. Emoji / 3D Icons
- Used as visual anchors in workflow diagrams (center column between alternating cards)
- Large: 64–80px display size
- Emojis or 3D-style product icons (LinkedIn, Clay, etc.)

### 8. COLDIQ Footer Pill (always at bottom center)
```
[ COLDIQ ]
```
- Rounded pill, dark bg `rgba(20,5,10,0.85)`, border `rgba(255,255,255,0.15)`
- Text: "COLDIQ", white, weight 800, letter-spacing 3px, 18–20px
- Centered horizontally, ~40px from bottom

### 9. CTA Button (optional, infographic style)
- Rounded pill, semi-transparent dark bg with subtle border
- White text, 18px bold
- Example: "Build Your AI Workforce"

---

## Layout Templates

### A — Process + Column Cards
```
[Author Pill]
[Hero Title]
[Horizontal Pipeline Steps]
[3-column cards with toggle rows]
[COLDIQ footer]
```
Use for: GTM motions, tool comparisons, multi-step workflows

### B — Alternating Workflow Diagram
```
[Author Pill]
[Hero Title]
[Subtitle strip]
[Horizontal pipeline steps]
[Alternating left/right cards with center icons]
[COLDIQ footer]
```
Use for: Step-by-step process breakdowns, pipeline explanations

### C — Two-Column Comparison
```
[Author Pill]
[Hero Title]
[Subtitle strip]
[2-column cards: each with sections]
[Footer tagline sentence]
[COLDIQ footer]
```
Use for: VS posts, option comparisons, before/after

### D — Infographic / Data-Heavy
```
[Author Pill top-center] + [COLDIQ top-right]
[Hero Title + subtitle]
[Stat strip]
[Before/After or timeline row]
[Stat grid — 4 cards]
[Categorized list section]
[CTA button]
[Dark footer bar]
```
Use for: Research posts, stat-heavy content, era/trend posts

---

## Layout Selection Rules
| Post type | Layout |
|-----------|--------|
| List post with `→` items | A (toggle card style) |
| Step-by-step workflow | B (alternating diagram) |
| X vs Y comparison | C (two-column) |
| Stat hook + data | D (infographic) |
| Story / insight | A or B (simplified) |
| Quote / single idea | A (single card, centered) |

---

## Things to Always Do
- Always include the author pill at top center with "Luca Carrese"
- Always include COLDIQ pill at bottom center (or top-right logo for infographic style)
- Always use the radial crimson gradient with grain texture as background
- Use rounded cards (`18px`) with semi-transparent dark red fill for all content blocks
- Make the headline dominant — it should be readable at thumbnail size
- Use bold + regular weight contrast in the same headline line
- Bold key numbers, bold key product names, italic for era/concept words

## Things to Never Do
- No solid flat backgrounds — always use the gradient
- No blue, green, or off-brand accent colors
- No sharp corners on cards
- No dense blocks of text — always broken into cards or rows
- No fonts other than Inter or system-ui
- No generic stock icons — use real app logos or emojis when needed
