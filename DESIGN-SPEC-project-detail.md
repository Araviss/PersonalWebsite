# Project Detail — Full-Page Takeover Design Specification

> **Version:** 1.0  
> **Status:** Design spec — ready for implementation  
> **Context:** Nintendo Switch OS clone portfolio site (`prsnl`)

---

## 1. Reference: Which Switch Screens This Draws From

The project detail page is a **hybrid** drawing from three specific Switch UI contexts:

### Primary: eShop Game Detail Page
The eShop detail page is the closest 1:1 analogue. Key patterns to borrow:
- **Left column** for metadata (title, publisher, description, tags)
- **Right column** for hero media (screenshot carousel)
- **Sticky action bar** at the bottom with purchase/download buttons
- **Vertical scroll** on the left column only (right column is fixed)
- **Category breadcrumb** above the title (e.g., "Platformer" → we use the first tech stack item)
- **Star rating row** → we repurpose this as tech stack pills

### Secondary: News Article Reader
The Switch News app provides the pattern for **full-page content takeover**:
- **No shell chrome** — the TopBar, BottomNav, and BottomBar disappear entirely
- **Self-contained back button** — a floating `B` prompt in the top-right corner
- The content owns the **entire viewport**
- **Gradient scrim** over the hero image for title readability
- **Smooth fade-in** entrance, not a directional slide

### Tertiary: Game Suspend / Software Close Screen
Provides the pattern for the **B-button return**:
- A subtle `B Back` pill overlay, not a full navigation bar
- The overlay floats above content with a backdrop blur

### Explicitly NOT borrowing from:
- System Settings (sidebar + detail pattern — wrong for this)
- Album/Screenshot viewer (grid pattern — wrong for this)
- User profile pages (too simple)

---

## 2. Layout Architecture

### The Grid

```
┌─────────────────────────────────────────────────────────────────┐
│ [full-page takeover — no SwitchShell chrome]                    │
│                                                                 │
│  ┌─────────────────────────────┬───────────────────────────────┐│
│  │                             │                               ││
│  │      LEFT COLUMN            │      RIGHT COLUMN             ││
│  │      (metadata)             │      (media)                  ││
│  │      width: 45%             │      width: 55%               ││
│  │                             │                               ││
│  │  ┌─── category label ────┐  │  ┌─────────────────────────┐  ││
│  │  │  NEXT.JS • REACT      │  │  │                         │  ││
│  │  └───────────────────────┘  │  │                         │  ││
│  │                             │  │     HERO PREVIEW         │  ││
│  │  ┌─── title ─────────────┐  │  │     (16:9 aspect)       │  ││
│  │  │  Project Name          │  │  │                         │  ││
│  │  └───────────────────────┘  │  │                         │  ││
│  │                             │  │                         │  ││
│  │  ┌─── description ───────┐  │  └─────────────────────────┘  ││
│  │  │  Two to three lines   │  │                               ││
│  │  │  of description text  │  │  ┌───┐ ┌───┐ ┌───┐ ┌───┐     ││
│  │  │  max, then truncate.  │  │  │ 1 │ │ 2 │ │ 3 │ │ 4 │     ││
│  │  └───────────────────────┘  │  └───┘ └───┘ └───┘ └───┘     ││
│  │                             │  (thumbnail strip, 4 max)     ││
│  │  ┌─── tech pills ────────┐  │                               ││
│  │  │ React  TypeScript  …  │  │                               ││
│  │  └───────────────────────┘  │                               ││
│  │                             │                               ││
│  │  ┌─── separator ─────────┐  │                               ││
│  │  │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │  │                               ││
│  │  └───────────────────────┘  │                               ││
│  │                             │                               ││
│  │  ┌─── action buttons ────┐  │                               ││
│  │  │ [A] Live Demo         │  │                               ││
│  │  │ [Y] Source Code       │  │                               ││
│  │  └───────────────────────┘  │                               ││
│  │                             │                               ││
│  └─────────────────────────────┴───────────────────────────────┘│
│                                                                 │
│  ┌─── floating bottom bar ──────────────────────────────────────┤
│  │  [B] Back                                  [−/+] Options    ││
│  └──────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Column Split: `45% / 55%`
- Not 50/50 — the Switch eShop gives slightly more visual real estate to media
- Gap between columns: `40px` (`2.5rem`)
- Page padding: `40px` on all sides (`clamp(20px, 3vw, 40px)`)

### Visual Hierarchy (top to bottom, left column):

| Element | Token |
|---------|-------|
| 1. Category label | `xs` (12px), `font-semibold`, `uppercase`, `tracking-[0.15em]`, accent color |
| 2. Title | `clamp(24px, 3vw, 36px)`, `font-bold`, white |
| 3. Description | `sm` (14px), `font-regular`, `on-surface-muted`, `leading-relaxed` (1.7) |
| 4. Tech stack pills | `xs` (12px), `font-medium`, accent-tinted pills |
| 5. Separator | 1px `--separator` color, full width of left column |
| 6. Action buttons | `sm` (14px), `font-medium`, full-width stacked buttons |

---

## 3. Component Specification

### 3.1 `ProjectTakeover` (Root Container)

```
Position: fixed, inset-0
z-index: 50 (above everything — same as rotatePrompt)
Background: var(--surface-deep)
Display: flex
Align: center (vertical + horizontal)
```

The takeover **replaces** the SwitchShell entirely. It doesn't render inside `<main>` — it's a portal or a conditional render that hides the shell.

**Implementation approach:** The project route (`/projects/[id]`) should NOT use `SwitchShell`. Either:
- (A) Conditionally exclude the shell in `layout.tsx` for project routes, OR
- (B) Render the takeover as a `fixed inset-0` overlay above the shell (simpler, allows the shell to remain mounted for quick back-navigation)

**Recommended: Option B** — overlay approach. The shell stays mounted but invisible behind the takeover. This means:
- Faster "back" transitions (shell is already rendered)
- The launch overlay fades out, revealing the takeover underneath
- The takeover fades out, revealing the shell underneath

### 3.2 `ProjectDetailContent` (Inner Layout)

```
Max-width: 1200px
Width: 100%
Height: 100%
Display: grid
Grid: "meta media" 1fr / 45fr 55fr
Gap: 40px (clamp(20px, 3vw, 40px))
Padding: clamp(20px, 3vw, 40px)
Padding-bottom: clamp(60px, 10vh, 80px) — room for floating bar
Overflow: hidden (children scroll independently)
```

### 3.3 Category Label

```tsx
<span className="text-xs font-semibold uppercase tracking-[0.15em]"
      style={{ color: project.theme?.accentColor ?? 'var(--color-accent)' }}>
  {project.techStack.slice(0, 2).join(' • ')}
</span>
```

- Uses first 1-2 tech stack items as a "genre" label
- Mirrors eShop's "Platformer • Adventure" pattern
- Accent-colored to pop against the dark background
- Margin-bottom: `8px`

### 3.4 Title

```tsx
<h1 className="text-[clamp(24px,3vw,36px)] font-bold leading-tight text-on-surface">
  {project.title}
</h1>
```

- `leading-tight` (1.25) — Switch titles are compact
- Margin-bottom: `12px`
- Max 2 lines — truncate with `line-clamp-2` if needed

### 3.5 Description

```tsx
<p className="text-sm leading-relaxed text-on-surface-muted line-clamp-5">
  {project.description}
</p>
```

- `leading-relaxed` (1.7) — the Switch eShop uses generous line height for readability
- Max 5 lines, then truncate
- Margin-bottom: `20px`

### 3.6 Tech Stack Pills

```tsx
<div className="flex flex-wrap gap-2">
  {project.techStack.map((tech, i) => (
    <motion.span
      key={tech}
      className="rounded-full px-3 py-1 text-xs font-medium"
      style={{
        backgroundColor: `${accentColor}1A`, // 10% opacity
        color: accentColor,
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + i * 0.04, duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {tech}
    </motion.span>
  ))}
</div>
```

- Pill shape: `rounded-full` (fully rounded — Switch uses this for tags)
- Padding: `12px 12px` → `px-3 py-1`
- Stagger animation: 40ms per pill, 300ms initial delay
- Margin-bottom: `20px`

### 3.7 Separator

```tsx
<div className="h-px w-full bg-separator" />
```

- Matches the existing `border-separator` pattern used in `SwitchShell`
- Margin: `0` (the `gap` in the flex container handles spacing)

### 3.8 Action Buttons

These should look like eShop action buttons — **full-width, stacked, with controller button indicators**.

```tsx
<div className="flex flex-col gap-2">
  {project.links.map((link, i) => (
    <a
      key={link.url}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg bg-surface-elevated
                 px-4 py-3 text-sm font-medium text-on-surface
                 transition-all duration-150 ease-[var(--ease-snappy)]
                 hover:bg-accent hover:text-surface-deep
                 focus-visible:outline-2 focus-visible:outline-highlight"
    >
      {/* Controller button indicator */}
      <span className="flex h-6 w-6 shrink-0 items-center justify-center
                       rounded-full bg-on-surface-muted text-[10px] font-bold
                       text-surface transition-colors
                       group-hover:bg-surface-deep group-hover:text-accent">
        {['A', 'Y', 'X'][i] ?? 'A'}
      </span>
      <span className="flex-1">{link.label}</span>
      <span className="text-on-surface-muted group-hover:text-surface-deep">↗</span>
    </a>
  ))}
</div>
```

**Button mapping convention:**
- First link (usually "Live Demo"): **A** button (primary action — Switch convention)
- Second link (usually "GitHub"): **Y** button
- Third link: **X** button
- The `A` button pill uses the same `h-5 w-5 rounded-full bg-on-surface-muted` pattern from `BottomBar.tsx`
- Hover state: `bg-accent text-surface-deep` — same as existing link buttons

### 3.9 Hero Preview (Right Column)

```tsx
<div className="flex flex-col gap-3">
  {/* Main preview */}
  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-surface-elevated">
    {project.coverArt ? (
      <Image src={project.coverArt} alt="" fill className="object-cover" />
    ) : (
      <HeroPlaceholder project={project} />
    )}
  </div>
  
  {/* Thumbnail strip */}
  <div className="flex gap-2">
    {thumbnails.map((thumb, i) => (
      <button
        key={i}
        className={`aspect-video w-[calc(25%-6px)] overflow-hidden rounded
                    transition-all duration-150
                    ${i === activeThumb
                      ? 'ring-2 ring-highlight'
                      : 'opacity-60 hover:opacity-100'}`}
      >
        <Image src={thumb} alt="" fill className="object-cover" />
      </button>
    ))}
  </div>
</div>
```

**Hero placeholder** (when no screenshots exist):
- Reuse the `TileCover` gradient + icon pattern, but at 16:9 aspect ratio
- Scale the icon to 20% of container width
- Add a subtle vignette overlay: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)`

**Corner radius:** `rounded-lg` (8px) — the Switch uses 8px for cards/panels in eShop, distinct from the 4px tile radius

**Thumbnail strip:**
- Max 4 thumbnails
- `aspect-video` (16:9)
- Active thumbnail: `ring-2 ring-highlight`
- Inactive: `opacity-60`, hover → `opacity-100`
- If no thumbnails exist, hide the strip entirely

### 3.10 Floating Bottom Bar

```tsx
<div className="absolute inset-x-0 bottom-0 flex items-center justify-between
                px-[clamp(20px,3vw,40px)] py-3
                bg-gradient-to-t from-surface-deep/95 via-surface-deep/70 to-transparent">
  {/* B Back */}
  <button onClick={goBack} className="flex items-center gap-1.5 text-sm text-on-surface-muted
                                       transition-opacity hover:opacity-80">
    <span className="flex h-5 w-5 items-center justify-center rounded-full
                     bg-on-surface-muted text-[10px] font-bold text-surface">
      B
    </span>
    <span>Back</span>
  </button>
  
  {/* −/+ Options */}
  <span className="flex items-center gap-1.5 text-sm text-on-surface-muted">
    <span className="flex items-center gap-0.5 text-xs font-medium">
      <span className="flex h-5 w-5 items-center justify-center rounded-full
                       border border-current text-[10px]">−</span>
      <span>/</span>
      <span className="flex h-5 w-5 items-center justify-center rounded-full
                       border border-current text-[10px]">+</span>
    </span>
    <span>Options</span>
  </span>
</div>
```

- Position: `absolute` bottom of the takeover container
- **Gradient scrim**: fades from `surface-deep/95` at bottom to transparent at top
- Height: ~`60px`
- Reuses the **exact** button prompt pattern from `BottomBar.tsx`
- No device mode icon (we're "inside a game" — no handheld/docked indicator)

---

## 4. What Makes It Feel "Switch" vs. Generic

### 4.1 Corner Radii (Critical)

The Switch has a **two-tier radius system**:

| Context | Radius | Token |
|---------|--------|-------|
| Game tiles | `4px` | `--radius-tile` / `rounded-tile` |
| Cards, panels, buttons | `8px` | `rounded-lg` |
| Pills, tags | `9999px` | `rounded-full` |
| Page/modal | `0px` | Full-bleed, no radius |

The project detail page uses:
- `0px` for the takeover container (edge-to-edge)
- `8px` for the hero preview, action buttons, thumbnail frames
- `rounded-full` for tech pills and controller button indicators
- `4px` for nothing on this page (that's tile-specific)

### 4.2 Spacing Rhythm

The Switch uses a **4px base grid** with preferred stops at:
`4, 8, 12, 16, 20, 24, 32, 40`

This spec uses:
- `4px` — gap between category and title area sub-elements
- `8px` — gap between pills, between thumbnails, category → title
- `12px` — title → description, padding inside pills
- `16px` — internal padding in action buttons (py-3 = 12px, px-4 = 16px)
- `20px` — between sections (description → pills, pills → separator, etc.)
- `40px` — column gap, page padding

### 4.3 Controller Button Prompts

The **defining** Switch UI element. Specs (matching `BottomBar.tsx` exactly):

```
Size: 20px × 20px (h-5 w-5)
Shape: circle (rounded-full)
Background: var(--on-surface-muted) — filled circle
Text: 10px, font-bold, var(--surface) color
Letters: A (teal), B (red), X (blue), Y (yellow) — BUT we use monochrome
```

The Switch actually color-codes its buttons, but the **OS chrome** uses monochrome. Since we're mimicking the OS (not the Joy-Con hardware), we keep the existing monochrome style from `BottomBar.tsx`. **Do not** add colored button indicators — that would look like a third-party game UI, not the Switch OS.

### 4.4 Typography Weight Distribution

The Switch uses a very specific weight pattern:
- **Titles**: `bold` (700) — no heavier
- **Body**: `regular` (400) — never light for body text
- **Labels/Meta**: `semiBold` (600) + `uppercase` + `tracking-wide`
- **Buttons**: `medium` (500)
- **Muted**: same weight, just lower opacity color (`--on-surface-muted`)

The Switch **never** uses `light` (300) weight for UI text. The tile titles use `light italic` for aesthetic reasons (mimicking game box spine text), but all other text is 400+.

### 4.5 Color Temperature

The Switch dark theme uses **warm grays**, not cool grays:
- `#2D2D2D` (surface) — neutral, slightly warm
- `#383A3D` (elevated) — with a blue-ish tint
- `#161616` (deep) — near-black, neutral

The accent colors are **cool** (cyan `#00C3E3`, highlight `#5CCDED`), which creates a deliberate warm/cool contrast. The project detail page should:
- Use `--surface-deep` (`#161616`) as the base background (not `--surface`)
- This is because we're "inside a game" — deeper, more immersive
- The gradient from the project theme washes over this deep background

### 4.6 Decorative Patterns

The Switch eShop uses subtle patterns on detail pages:
- **Diagonal hatching** at 8% opacity (already in `TileCover.tsx`)
- **Dot grid** patterns on system screens
- **Gradient washes** that respect the game's key art colors

For the project detail, apply:
```css
/* Behind the left column — subtle branded gradient wash */
background: linear-gradient(
  135deg,
  ${project.theme.accentColor}0D 0%,   /* 5% opacity */
  transparent 60%
);
```

This gives the left column a faint color tint from the project's theme without overwhelming readability.

---

## 5. What's Missing from the Current Mockup (Option C)

### ✅ Keep:
- Two-column layout (left metadata, right media)
- B button hint
- Dark background with gradient
- Tech tags

### ❌ Remove / Change:

| Current | Problem | Fix |
|---------|---------|-----|
| Generic "← Home" link button | Not Switch-like at all | Replace with floating `B Back` pill prompt at bottom |
| Plain `text-2xl` title | Too small, no category label above it | `clamp(24px,3vw,36px)` with category label |
| Pills with `bg-accent/10` only | Correct color but no stagger animation | Add stagger entrance (40ms per pill) |
| Link buttons as inline pills | Not how eShop does it | Full-width stacked buttons with controller letter |
| No hero image / preview | Missing the entire right column | Add hero + thumbnail strip |
| Content inside SwitchShell | Still shows TopBar, BottomNav, BottomBar | Full-page takeover — hide all shell chrome |
| Simple `pageVariants` transition | Slides in from right like a normal page | Custom entrance: hold black → fade in content |
| No separator between sections | Sections run together | Add 1px `--separator` line before action buttons |
| No theme gradient influence | Page is flat dark | Apply subtle accent gradient wash on left column |
| No scroll handling | Content could overflow | Left column: `overflow-y-auto scrollbar-none` |

### ➕ Add:

1. **Floating bottom bar** with `B Back` + `−/+ Options` prompts
2. **Category label** above title (first 2 tech stack items, accent-colored)
3. **Hero placeholder** using `TileCover` gradient pattern at 16:9
4. **Thumbnail strip** below hero (for future screenshot support)
5. **Keyboard listener** for `Escape` / `B` key → navigate back
6. **Entrance animation** that chains from the launch overlay
7. **Project theme gradient wash** on the background

---

## 6. Animation Specification

### 6.1 Entrance Sequence

The entrance chains directly from `LaunchOverlay`:

```
Timeline:
0ms     — LaunchOverlay is visible (black + logo)
800ms   — LaunchOverlay calls onComplete, begins exit (200ms fade)
800ms   — ProjectTakeover mounts
850ms   — Background gradient fades in (300ms, ease-switch)
950ms   — Title fades in + slides up 12px (200ms, ease-switch)
1000ms  — Category label fades in (200ms)
1050ms  — Description fades in (200ms)
1100ms  — Tech pills stagger in (40ms each, 200ms duration)
1150ms  — Action buttons stagger in (60ms each, 200ms duration)
1000ms  — Hero preview scales from 0.96 → 1.0 + fades in (300ms, ease-switch)
1200ms  — Thumbnail strip fades in (200ms)
1400ms  — Floating bottom bar fades in (200ms)
```

**New animation variants to add to `animations.ts`:**

```typescript
/* ── Project takeover ── */

export const takeoverContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const takeoverMetaVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const takeoverHeroVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 },
  },
};

export const takeoverBottomBarVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, delay: 0.4 },
  },
};
```

### 6.2 Exit Sequence

When `B` / `Escape` is pressed:

```
0ms   — All content fades out simultaneously (200ms, ease-switch)
200ms — Takeover background fades out (150ms)
350ms — SwitchShell is revealed underneath, already mounted
```

This is a **reverse fade** — no directional slide. The Switch uses fades for "closing an app" and slides for "navigating between pages." Since this is app-close behavior, it's a fade.

### 6.3 Micro-interactions

| Element | Interaction | Animation |
|---------|------------|-----------|
| Action buttons | Hover | `bg-accent, text-surface-deep`, 150ms snappy |
| Action buttons | Focus (keyboard) | `outline-2 outline-highlight outline-offset-2` |
| Action buttons | Press/tap | `scale: 0.98`, 150ms |
| Thumbnails | Hover | `opacity: 0.6 → 1.0`, 150ms |
| Thumbnails | Select | `ring-2 ring-highlight`, 150ms |
| Tech pills | Mount | Stagger fade + slide up |
| B Back button | Hover | `opacity: 0.8`, 150ms |

---

## 7. Interaction Design

### 7.1 Keyboard / Controller Mapping

| Key | Action | Notes |
|-----|--------|-------|
| `Escape` | Go back to home | Same as `B` button |
| `B` / `b` | Go back to home | Switch convention |
| `A` / `a` / `Enter` | Activate first link (Live Demo) | Primary action |
| `Y` / `y` | Activate second link (GitHub) | Secondary action |
| `X` / `x` | Activate third link (if exists) | Tertiary action |
| `←` / `→` | Cycle through thumbnails | If screenshot strip exists |
| `Tab` | Move focus through action buttons | Standard a11y |

**Implementation:**

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' || e.key.toLowerCase() === 'b') {
      e.preventDefault();
      router.push('/');
    }
    if (e.key.toLowerCase() === 'a' || e.key === 'Enter') {
      if (project.links[0]) window.open(project.links[0].url, '_blank');
    }
    if (e.key.toLowerCase() === 'y') {
      if (project.links[1]) window.open(project.links[1].url, '_blank');
    }
    if (e.key.toLowerCase() === 'x') {
      if (project.links[2]) window.open(project.links[2].url, '_blank');
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [project, router]);
```

### 7.2 Focus Management

On mount, focus should NOT jump to any interactive element. The Switch shows content first, then waits for input. The page starts in a **passive viewing state**. `Tab` enters the interactive flow (action buttons → thumbnails → B back).

### 7.3 Back Navigation

- `router.push('/')` — not `router.back()` — because the user may have arrived via direct URL
- The exit animation plays first (200ms fade), then navigation occurs
- The SwitchShell remains mounted underneath, so home screen appears instantly

---

## 8. Theme Integration

### 8.1 How the Project Theme Influences the Page

Each project can define:
```typescript
theme: {
  gradient: string;      // e.g., "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
  icon: string;          // SVG path
  accentColor: string;   // e.g., "#00D4FF"
}
```

**Application:**

| Surface | Treatment |
|---------|-----------|
| Page background | `--surface-deep` base with a 5% opacity accent wash in top-left corner |
| Category label | `color: accentColor` |
| Tech pills | `background: accentColor at 10%`, `color: accentColor` |
| Hero placeholder bg | Uses the full `gradient` from theme |
| Action button hover | `bg-accent` (global, not per-project — consistency) |
| Floating bar | No theme influence — always neutral |

**Background gradient wash:**
```css
.takeover-bg {
  background:
    radial-gradient(
      ellipse at 10% 20%,
      ${accentColor}0D,     /* 5% opacity */
      transparent 50%
    ),
    var(--surface-deep);
}
```

This creates a subtle branded glow in the upper-left that your eye perceives but doesn't consciously register. It makes each project detail page feel distinct without sacrificing readability.

### 8.2 Fallback (No Theme)

If `project.theme` is undefined:
- `accentColor` defaults to `var(--color-accent)` (`#00C3E3`)
- `gradient` defaults to `linear-gradient(135deg, #454545 0%, #2d2d2d 100%)`
- Background wash is omitted (no tint)

### 8.3 Light Mode

In light mode (`[data-theme="light"]`):
- Background: `--surface-deep` is `#FFFFFF`
- The accent wash works the same (5% opacity on white is very subtle)
- Text colors auto-swap via CSS variables
- Hero placeholder gradient stays the same (the gradients are dark, which is fine — they're "game art")
- Action buttons use `--surface-elevated` (`#F5F5F5`) background
- Controller button indicators: `bg-on-surface-muted text-surface` still works

---

## 9. Responsive Specification

### 9.1 Breakpoints

| Breakpoint | Layout | Notes |
|------------|--------|-------|
| ≥960px | Two-column (45/55) | Full desktop layout |
| 720px–959px | Two-column (40/60) | Switch handheld resolution |
| <720px | Single column (stacked) | Mobile fallback |

The site already gates portrait orientation, so the <720px case only applies to narrow landscape viewports.

### 9.2 Switch Resolution (1280×720)

At exactly 1280×720:
- Page padding: `30px`
- Column gap: `30px`
- Title: `24px` (floor of clamp)
- Hero preview: `~380px` wide at 55% of content area
- Thumbnail strip: 4 thumbs at ~90px each
- Action buttons: full width of left column (~490px)

### 9.3 Large Desktop (1920×1080+)

- Max-width container: `1200px`, centered
- Page padding: `40px`
- Title: `36px` (ceiling of clamp)
- Hero preview: `~620px` wide
- Additional breathing room but same proportions

### 9.4 Single Column (Mobile Fallback)

```
Stack order:
1. Hero preview (full width, 16:9)
2. Thumbnail strip
3. Category label
4. Title
5. Description
6. Tech pills
7. Separator
8. Action buttons
9. Floating bottom bar
```

- Hero moves to top (visual hook first)
- Everything stacks vertically
- Padding: `20px`
- Title: `24px`
- Max-width: none (full width)

---

## 10. Complete Component Tree

```
ProjectTakeover (fixed, inset-0, z-50)
├── TakeoverBackground (gradient wash layer)
├── ProjectDetailContent (grid container, max-w-[1200px])
│   ├── MetaColumn (left, overflow-y-auto scrollbar-none)
│   │   ├── CategoryLabel
│   │   ├── ProjectTitle
│   │   ├── ProjectDescription
│   │   ├── TechStackPills
│   │   ├── Separator
│   │   └── ActionButtons
│   │       ├── ActionButton (A — primary link)
│   │       ├── ActionButton (Y — secondary link)
│   │       └── ActionButton (X — tertiary link, if exists)
│   └── MediaColumn (right)
│       ├── HeroPreview
│       │   ├── Image (if coverArt exists)
│       │   └── HeroPlaceholder (reuses TileCover pattern)
│       └── ThumbnailStrip (if screenshots exist)
│           └── ThumbnailButton × 4
└── FloatingBottomBar (absolute bottom)
    ├── BackPrompt (B)
    └── OptionsPrompt (−/+)
```

---

## 11. Data Model Extension

The current `Project` interface needs one addition for screenshots:

```typescript
interface Project {
  id: string;
  title: string;
  coverArt?: string;
  description: string;
  techStack: string[];
  links: { label: string; url: string }[];
  theme?: {
    gradient: string;
    icon: string;
    accentColor: string;
  };
  screenshots?: string[];   // ← NEW: array of image URLs for the thumbnail strip
}
```

This is optional — the detail page works without it (no thumbnail strip renders). But it enables future richness.

---

## 12. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Screen reader announcement | `aria-label="Project details: {title}"` on takeover container |
| Focus trap | Focus stays within takeover when open (not in hidden shell) |
| Escape closes | Keyboard handler on `Escape` |
| Link semantics | Action buttons are `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"` |
| Image alt text | Hero: `alt="{title} preview"`, Thumbnails: `alt="{title} screenshot {n}"` |
| Reduced motion | Wrap stagger animations in `prefers-reduced-motion` check — skip to final state |
| Color contrast | All text meets WCAG AA on `--surface-deep` background |

---

## 13. CSS Variable Summary (New Tokens)

No new CSS custom properties are needed. Everything is composed from existing tokens:

| Usage | Token |
|-------|-------|
| Background | `var(--surface-deep)` |
| Cards/buttons | `var(--surface-elevated)` |
| Primary text | `var(--on-surface)` |
| Muted text | `var(--on-surface-muted)` |
| Accent | `var(--color-accent)` or `project.theme.accentColor` |
| Highlight ring | `var(--highlight)` |
| Separator | `var(--separator)` |
| Easing | `var(--ease-switch)` |
| Tile radius | Not used (this is 8px cards, not 4px tiles) |

---

## 14. File Manifest (Implementation Plan)

| File | Action | Purpose |
|------|--------|---------|
| `src/lib/animations.ts` | EDIT | Add `takeover*Variants` |
| `src/data/projects.ts` | EDIT | Add `screenshots?: string[]` to interface |
| `src/components/project/ProjectTakeover.tsx` | CREATE | Root overlay component |
| `src/components/project/ProjectDetailContent.tsx` | CREATE | Grid layout with meta + media columns |
| `src/components/project/MetaColumn.tsx` | CREATE | Left column: title, desc, pills, actions |
| `src/components/project/MediaColumn.tsx` | CREATE | Right column: hero + thumbnails |
| `src/components/project/HeroPlaceholder.tsx` | CREATE | Generated 16:9 preview from theme |
| `src/components/project/FloatingBottomBar.tsx` | CREATE | B Back + Options prompts |
| `src/components/project/ActionButton.tsx` | CREATE | Full-width button with controller letter |
| `src/components/project/ProjectDetail.tsx` | REPLACE | Old component → new takeover |
| `src/app/projects/[id]/page.tsx` | EDIT | Wire up new components |
| `src/components/project/index.ts` | EDIT | Export new components |

---

## 15. Sound Design Notes (Future)

The Switch uses distinct audio cues:
- **App launch**: Low-pitched "thwomp" → rising hum (the launch overlay handles this)
- **Back/close**: Quick descending two-tone "du-dum"
- **Button hover**: Soft tick/click (on focus change)
- **Button select**: Crisp "click" (slightly louder than hover)

For web implementation, use the Web Audio API with very short synthesized tones:
- Hover: 50ms sine wave, 800Hz, volume 0.05
- Select: 30ms square wave, 1200Hz, volume 0.08
- Back: 60ms sine wave, 600Hz → 400Hz sweep, volume 0.06

These should be **opt-in** (default off) and respect `prefers-reduced-motion`. They're a nice-to-have for v2.
