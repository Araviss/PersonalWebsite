# Design Spec — Profile Page

> Nintendo Switch "My Page" adapted for a portfolio site.
> Route: `/profile` · Inside the `(shell)` layout group · Dark default, light supported.

---

## Reference: Switch "My Page" Anatomy

The real Switch user-profile screen ("My Page") has these zones:

1. **Header band** — dark panel (~30% of viewport), centered avatar (large circle), user nickname directly below, friend code under that. No busy decoration.
2. **Content area** — slightly lighter background, scrollable, contains "Play Activity" (list of games + hours), "Friend List", and "User Settings" link.
3. **Play Activity rows** — each row: game icon (square, rounded), game title, playtime text right-aligned. Subtle separator between rows. The list is spare: icon, name, metric. Nothing else.
4. **Overall feel** — warm gray backgrounds, generous vertical breathing room, no cards/shadows, information is _listed_ not _carded_.

---

## 1. Layout — Page Structure

The profile page lives inside `SwitchShell`, so TopBar, BottomNav, and BottomBar are already rendered. The page component fills the `<main>` content area (which has `px-5` and `flex-1`).

```
┌──────────────────────────────────────────────────────────────────────┐
│  TopBar  (avatar · name · time · wifi · battery)                     │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                    HEADER ZONE                                 │  │
│  │              bg-surface-deep  (darkest)                        │  │
│  │                                                                │  │
│  │         ┌──────────┐                                           │  │
│  │         │          │  ← 96×96 avatar video                     │  │
│  │         │  avatar  │     3px ring #e60012                      │  │
│  │         │  .mp4    │     rounded-full                          │  │
│  │         └──────────┘                                           │  │
│  │                                                                │  │
│  │         Jzon Livingston          ← 22px bold white             │  │
│  │         Full-Stack Developer     ← 14px regular muted          │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                   CONTENT ZONE                                 │  │
│  │              bg-surface  (default surface)                     │  │
│  │                                                                │  │
│  │  ┌── Bio ──────────────────────────────────────────────────┐   │  │
│  │  │  "I build things…" paragraph                            │   │  │
│  │  └────────────────────────────────────────────────────────┘   │  │
│  │                                                                │  │
│  │  ── separator (1px) ────────────────────────────────────────   │  │
│  │                                                                │  │
│  │  SKILL ACTIVITY                 ← 12px semibold uppercase     │  │
│  │                                                                │  │
│  │  ┌─────┐  React          ██████████░░  Expert                  │  │
│  │  │ ⚛️  │  First used 6 years ago                               │  │
│  │  └─────┘                                                       │  │
│  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │  │
│  │  ┌─────┐  TypeScript     █████████░░░  Advanced                │  │
│  │  │ TS  │  First used 5 years ago                               │  │
│  │  └─────┘                                                       │  │
│  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │  │
│  │  ┌─────┐  Node.js        ████████░░░░  Advanced                │  │
│  │  │ N   │  First used 6 years ago                               │  │
│  │  └─────┘                                                       │  │
│  │  … (more skills)                                               │  │
│  │                                                                │  │
│  │  ── separator (1px) ────────────────────────────────────────   │  │
│  │                                                                │  │
│  │  ONLINE STATUS                  ← 12px semibold uppercase     │  │
│  │                                                                │  │
│  │  ⦿ GitHub     ⦿ LinkedIn     ⦿ Email                          │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  BottomNav  (Home · News · Resume · Contact · Settings)              │
├──────────────────────────────────────────────────────────────────────┤
│  BottomBar  (device mode · −/+ · B Back · A OK)                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Scrolling behavior

The entire content area (`<main>`) scrolls vertically. The header zone scrolls _with_ the content — it is not sticky. This matches the Switch profile where the header scrolls away.

### Max width

Content has a max-width of `720px`, centered. This keeps lines readable and mirrors the Switch's narrow content column. Achieved with `mx-auto w-full max-w-[720px]`.

---

## 2. Header Zone

The header replicates the Switch "My Page" hero: a quiet, dark panel showcasing just the avatar, name, and tagline.

### Background

- Dark mode: `bg-surface-deep` (`#161616`)
- Light mode: `bg-surface-deep` (`#ffffff`)
- Full width of the content area (bleeds to `px-5` edges via negative margin `−mx-5` + `px-5` padding)
- Rounded bottom corners: `rounded-b-lg` (8px) — subtle visual lift

### Avatar

| Property | Value |
|----------|-------|
| Size | `96 × 96px` (`w-24 h-24`) |
| Shape | `rounded-full` |
| Ring | `ring-[3px] ring-[#e60012]` (Nintendo red, slightly thicker than TopBar's 2px) |
| Ring offset | `ring-offset-2 ring-offset-surface-deep` (2px gap between ring and video) |
| Overflow | `overflow-hidden` |
| Content | `<video>` — `/avatar.mp4`, autoPlay, loop, muted, playsInline |
| Object fit | `object-cover`, `object-position: center top` |

### Name

| Property | Value |
|----------|-------|
| Text | `"Jzon Livingston"` |
| Size | `text-[22px]` / `1.375rem` (xxl from scale) |
| Weight | `font-bold` (700) |
| Color | `text-on-surface` (white / dark) |
| Margin top | `mt-4` (16px below avatar) |
| Line height | `leading-tight` (1.25) |

### Tagline (subtitle — replaces "Friend Code")

| Property | Value |
|----------|-------|
| Text | `"Full-Stack Developer · Creative Technologist"` |
| Size | `text-sm` (14px) |
| Weight | `font-regular` (400) |
| Color | `text-on-surface-muted` (`#737a80`) |
| Margin top | `mt-1` (4px below name) |
| Style | No uppercase, no letter-spacing — relaxed, like the friend code |

### Padding

- Vertical: `py-8` (32px top and bottom)
- Horizontal: inherits from parent `px-5` (20px)
- Avatar + text are **center-aligned** horizontally: `items-center text-center flex flex-col`

---

## 3. Content Zone

Below the header. Uses `bg-surface` (default page background — already set by `<body>`). No extra background needed.

### Inner padding

- Top: `pt-6` (24px) — gap between header bottom-edge and first content
- Bottom: `pb-8` (32px) — bottom breathing room before BottomNav
- Horizontal: 0 (inherits from the `max-w-[720px]` container which is already inside the `px-5` shell)

---

## 4. Bio Section

A single paragraph. No heading — it's obvious from context. Switch profile doesn't label things heavily.

| Property | Value |
|----------|-------|
| Size | `text-sm` (14px) |
| Weight | `font-regular` (400) |
| Color | `text-on-surface` |
| Line height | `leading-relaxed` (1.7) |
| Max width | Natural (constrained by the 720px container) |
| Bottom margin | `mb-6` (24px) below bio, before separator |

**Content (placeholder):**

> I'm a software engineer who builds polished, high-performance web applications. I care about great user experience, clean architecture, and shipping things that actually work. Currently based in \[city\], working on \[current thing\].

---

## 5. Skills Section — "Skill Activity" (Play Activity Analogue)

This is the centerpiece. On the real Switch, "Play Activity" shows:

```
[Game Icon]   Game Title                   Played for 120 hours or more
              First played 2 years ago
```

We replicate this exactly, replacing game → technology, playtime → proficiency level, "first played" → experience duration.

### Section label

| Property | Value |
|----------|-------|
| Text | `"Skill Activity"` |
| Size | `text-xs` (12px) |
| Weight | `font-semibold` (600) |
| Color | `text-on-surface-muted` |
| Transform | `uppercase` |
| Letter spacing | `tracking-[0.15em]` |
| Margin | `mt-6` (24px) above, `mb-4` (16px) below |

### Skill row anatomy

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌────────┐                                                      │
│  │        │   Skill Name                    Proficiency Label ──▶│
│  │  Icon  │   First used N years ago                             │
│  │ 40×40  │                                                      │
│  └────────┘                                                      │
│                                                                  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░  ← proficiency bar     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

Each row is a horizontal flexbox:

```
[icon] ── gap-3 ── [text column (flex-1)] ── [proficiency label]
                    └ skill name (row 1)
                    └ experience text (row 2)
[proficiency bar spanning full width below, mt-2]
```

### Skill icon

| Property | Value |
|----------|-------|
| Container | `w-10 h-10` (40×40px) |
| Background | `bg-icon-bg` (`#454545` dark / `#ffffff` light) |
| Shape | `rounded-lg` (8px) — like Switch game icons |
| Content | SVG icon or emoji glyph, centered, `text-accent` color |
| Alignment | `flex items-center justify-center` |
| Flex shrink | `shrink-0` |

### Skill name

| Property | Value |
|----------|-------|
| Size | `text-base` (16px) |
| Weight | `font-medium` (500) |
| Color | `text-on-surface` |

### Experience text (replaces "First played X ago")

| Property | Value |
|----------|-------|
| Text | e.g. `"First used 6 years ago"` |
| Size | `text-xs` (12px) |
| Weight | `font-regular` (400) |
| Color | `text-on-surface-muted` |
| Margin | `mt-0.5` (2px) below skill name |

### Proficiency label (right-aligned, replaces "Played for X hours")

| Property | Value |
|----------|-------|
| Text | `"Expert"` / `"Advanced"` / `"Proficient"` / `"Familiar"` |
| Size | `text-xs` (12px) |
| Weight | `font-medium` (500) |
| Color | `text-highlight` (`#5ccded` dark / `#4ce5c6` light) |
| Alignment | `ml-auto text-right` |

### Proficiency bar

A thin horizontal bar below the icon+text row. Replaces numeric hours with a visual fill.

| Property | Value |
|----------|-------|
| Container | Full width, `h-1` (4px), `rounded-full`, `bg-surface-elevated` |
| Fill | Inner div, `h-full`, `rounded-full`, `bg-highlight` |
| Fill width | Percentage based on proficiency (Expert=90%, Advanced=75%, Proficient=60%, Familiar=40%) |
| Margin | `mt-2` (8px) below the icon+text row |
| Transition | `transition-all duration-500 ease-out` (bar fills on entrance) |

### Row separator

Between each skill row: `border-b border-separator` (1px, `#3a3a3a` dark / `#d0d0d0` light).

### Row spacing

- Each row: `py-4` (16px vertical padding)
- The last row has no bottom border

### Skill data shape

```typescript
interface Skill {
  name: string;
  icon: React.ReactNode;    // SVG or emoji
  level: 'Expert' | 'Advanced' | 'Proficient' | 'Familiar';
  yearsUsed: number;        // renders as "First used N years ago"
}
```

### Skill list (suggested initial data)

| Skill | Level | Years | Icon concept |
|-------|-------|-------|-------------|
| React | Expert | 6 | ⚛ atom |
| TypeScript | Advanced | 5 | TS letters |
| Node.js | Advanced | 6 | hexagon |
| Next.js | Advanced | 4 | ▲ triangle |
| Python | Proficient | 5 | 🐍 snake |
| PostgreSQL | Proficient | 4 | 🐘 elephant |
| AWS | Familiar | 3 | ☁ cloud |
| Docker | Familiar | 3 | 🐋 whale |

---

## 6. Social Links — "Online Status" (replaces Friend List)

### Section label

Same style as "Skill Activity" label:

| Property | Value |
|----------|-------|
| Text | `"Online Status"` |
| Size | `text-xs` (12px) |
| Weight | `font-semibold` (600) |
| Color | `text-on-surface-muted` |
| Transform | `uppercase tracking-[0.15em]` |
| Margin | `mt-6 mb-4` (24px above separator, 16px below label) |

Preceded by a full separator: `border-t border-separator`.

### Link rendering

Horizontal row of pill-shaped links. The Switch shows friend codes and online status — we show social links with a green "online" dot.

```
[ ● GitHub ]   [ ● LinkedIn ]   [ ● Email ]
```

Each link:

| Property | Value |
|----------|-------|
| Container | `inline-flex items-center gap-2` |
| Background | `bg-surface-elevated` (`#383a3d` / `#f5f5f5`) |
| Padding | `px-4 py-2` (16px horizontal, 8px vertical) |
| Border radius | `rounded-full` |
| Text size | `text-sm` (14px) |
| Text weight | `font-medium` (500) |
| Text color | `text-on-surface` |
| Online dot | `w-2 h-2 rounded-full bg-[#48d597]` — green dot, like Switch "online" indicator |
| Gap between links | `gap-3` (12px) |
| Hover | `hover:bg-[#454545]` dark / `hover:bg-[#eaeaea]` light, 150ms transition |
| Row layout | `flex flex-wrap gap-3` |

### Link data

```typescript
interface SocialLink {
  label: string;
  href: string;
  icon?: React.ReactNode;  // optional SVG, but the green dot is default
}
```

| Link | URL pattern |
|------|-------------|
| GitHub | `https://github.com/username` |
| LinkedIn | `https://linkedin.com/in/username` |
| Email | `mailto:email@example.com` |

---

## 7. Typography Summary

| Element | Size | Weight | Color | Extra |
|---------|------|--------|-------|-------|
| Name (header) | 22px (`text-[22px]`) | 700 bold | `on-surface` | `leading-tight` |
| Tagline | 14px (`text-sm`) | 400 regular | `on-surface-muted` | — |
| Bio paragraph | 14px (`text-sm`) | 400 regular | `on-surface` | `leading-relaxed` |
| Section label | 12px (`text-xs`) | 600 semibold | `on-surface-muted` | `uppercase tracking-[0.15em]` |
| Skill name | 16px (`text-base`) | 500 medium | `on-surface` | — |
| Skill experience | 12px (`text-xs`) | 400 regular | `on-surface-muted` | — |
| Proficiency label | 12px (`text-xs`) | 500 medium | `highlight` | — |
| Social link text | 14px (`text-sm`) | 500 medium | `on-surface` | — |

---

## 8. Complete Color Map

### Dark mode (`:root` default)

| Element | Token | Hex |
|---------|-------|-----|
| Header background | `surface-deep` | `#161616` |
| Content background | `surface` | `#2d2d2d` |
| Skill icon bg | `icon-bg` | `#454545` |
| Social pill bg | `surface-elevated` | `#383a3d` |
| Social pill hover | — | `#454545` |
| Primary text | `on-surface` | `#ffffff` |
| Secondary text | `on-surface-muted` | `#737a80` |
| Accent/highlight | `highlight` | `#5ccded` |
| Proficiency bar track | `surface-elevated` | `#383a3d` |
| Proficiency bar fill | `highlight` | `#5ccded` |
| Separators | `separator` | `#3a3a3a` |
| Avatar ring | — | `#e60012` (Nintendo red) |
| Online dot | — | `#48d597` (green) |

### Light mode (`[data-theme="light"]`)

| What changes | Dark → Light |
|---|---|
| Header bg | `#161616` → `#ffffff` |
| Content bg | `#2d2d2d` → `#eaeaea` |
| Icon bg | `#454545` → `#ffffff` |
| Pill bg | `#383a3d` → `#f5f5f5` |
| Pill hover | `#454545` → `#eaeaea` |
| Primary text | `#ffffff` → `#2d2d2d` |
| Highlight | `#5ccded` → `#4ce5c6` |
| Bar track | `#383a3d` → `#f5f5f5` |
| Separators | `#3a3a3a` → `#d0d0d0` |

Everything else (muted text, avatar ring, online dot, accent) stays the same.

---

## 9. Spacing Map (4px grid)

| Location | Value | Tailwind |
|----------|-------|----------|
| Header vertical padding | 32px | `py-8` |
| Avatar → name | 16px | `mt-4` |
| Name → tagline | 4px | `mt-1` |
| Header → content | 24px | `pt-6` |
| Bio → separator | 24px | `mb-6` |
| Separator → section label | 24px | `mt-6` |
| Section label → first row | 16px | `mb-4` |
| Skill row internal padding | 16px top+bottom | `py-4` |
| Icon → text | 12px | `gap-3` |
| Proficiency bar → above | 8px | `mt-2` |
| Social links gap | 12px | `gap-3` |
| Content bottom padding | 32px | `pb-8` |

---

## 10. Animations

### Page entrance

Uses existing `PageTransition` (slide from right, 250ms, Switch easing). The profile content _within_ the page also has a staggered fade-in:

**Container:** Uses `staggerContainer` variant from `@/lib/animations`:
```
staggerChildren: 0.06s, delayChildren: 0.1s
```

**Stagger order:**
1. Header zone (avatar + name + tagline — single unit)
2. Bio paragraph
3. "Skill Activity" label
4. Skill rows (each row staggers 60ms apart)
5. "Online Status" label
6. Social link pills

Each child uses `staggerItem` variant:
```
hidden: { opacity: 0, y: 10 }
visible: { opacity: 1, y: 0, transition: switchTransition }
```

### Proficiency bar fill

The bars animate their width from `0%` to final value on mount. This happens _after_ the row fades in:

```
initial: { width: '0%' }
animate: { width: '90%' }  // (or whatever the proficiency %)
transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }
```

The `delay: 0.3` ensures the bar fill starts after the row has faded in.

### Hover states

| Element | Hover effect |
|---------|-------------|
| Skill row | `bg-surface-elevated/50` (subtle background highlight), 150ms transition |
| Social link pill | Background shifts to next shade (`surface-elevated` → `icon-bg`), 150ms |

### No animation

Respect `prefers-reduced-motion`: wrap all motion in `<motion.div>` which Framer Motion automatically handles via `useReducedMotion()`. Bar fills skip to final width instantly.

---

## 11. Responsive Behavior

The page is already gated to landscape-only via `RotatePrompt`. Within landscape:

| Breakpoint | Behavior |
|---|---|
| < 720px | Avatar shrinks to `w-20 h-20` (80px), name to `text-xl` (20px) |
| 720–1024px | Default sizes (96px avatar, 22px name) |
| > 1024px | No change — max-width 720px keeps it contained |

Skills list and social links remain single-column / wrapping — no layout shifts needed.

---

## 12. What Makes This Feel "Switch" (vs Generic About Page)

1. **Two-tone vertical split** — dark header panel + slightly lighter content. Not a card layout, not a hero image. Just a quiet tonal shift.
2. **Avatar as identity, not decoration** — centered, generously sized, with the Nintendo-red ring. It's the focal point, not a sidebar thumbnail.
3. **"Play Activity" list pattern** — skills are listed exactly like games: square icon, name, metric. Not a grid of badges, not a tag cloud. A _list_. Ordered by proficiency. With thin separators.
4. **Proficiency bars, not stars or numbers** — thin 4px bars that fill. Minimal. The Switch shows "Played for X hours" as text + implicit ordering. We add a quiet bar for scannability.
5. **Warm grays** — `#2d2d2d`, `#383a3d`, `#161616`. These are the Switch's warm neutrals, not the blue-tinted grays of macOS or Material.
6. **Uppercase section labels** — `"SKILL ACTIVITY"`, `"ONLINE STATUS"`. The Switch uses these sparingly to label zones without heavy headings.
7. **Generous breathing room** — 32px header padding, 16px row padding, 24px section gaps. Nothing is cramped. The Switch is _spacious_.
8. **No cards, no shadows, no borders around content blocks** — content floats directly on the surface. Separation comes from spacing and background-color shifts, not from box decoration.
9. **Social links as pills, not icon buttons** — like how the Switch shows friend codes in rounded pill containers. Green online dot = status indicator.
10. **Staggered entrance animation** — items appear one by one, top to bottom, like the Switch UI powering up a menu. Not a simultaneous pop-in.

---

## 13. Navigation Integration

### How users reach `/profile`

The avatar in `TopBar` becomes a clickable `<Link>` to `/profile`. On the profile page, the avatar in TopBar gets an active ring (highlight glow) to indicate "you're here."

### TopBar modification

```tsx
// In TopBar.tsx — wrap the avatar+name group
<Link href="/profile" className="flex items-center gap-2 group">
  <div className={`h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#e60012]
    ${isProfilePage ? 'shadow-[0_0_8px_2px] shadow-highlight-glow' : ''}
  `}>
    <video ... />
  </div>
  <span className="text-base font-medium text-on-surface
    group-hover:text-highlight transition-colors duration-150">
    Jzon Livingston
  </span>
</Link>
```

### BottomBar on profile page

- `B Back` → visible (navigates back to previous page)
- `A OK` → visible (generic)
- No special profile-specific controller prompts needed

---

## 14. Component Tree

```
ProfilePage (src/app/(shell)/profile/page.tsx)
  └─ ProfileSection (src/components/profile/ProfileSection.tsx) — 'use client'
       ├─ motion.div [staggerContainer]
       │    ├─ motion.div [staggerItem] — Header Zone
       │    │    ├─ Avatar (video)
       │    │    ├─ Name (h1)
       │    │    └─ Tagline (p)
       │    │
       │    ├─ motion.p [staggerItem] — Bio
       │    │
       │    ├─ Separator (div.border-t)
       │    │
       │    ├─ motion.div [staggerItem] — Section label "Skill Activity"
       │    │
       │    ├─ motion.div [staggerItem] × N — SkillRow
       │    │    ├─ SkillIcon (div > svg)
       │    │    ├─ Skill name + experience text (div)
       │    │    ├─ Proficiency label (span)
       │    │    └─ ProficiencyBar (motion.div)
       │    │
       │    ├─ Separator (div.border-t)
       │    │
       │    ├─ motion.div [staggerItem] — Section label "Online Status"
       │    │
       │    └─ motion.div [staggerItem] — Social links row
       │         └─ SocialPill × N (a)
       │              ├─ Online dot (span)
       │              └─ Label (span)
       │
       └─ (end)
```

---

## 15. File Structure

```
src/
  app/(shell)/profile/
    page.tsx              ← server component, metadata
  components/profile/
    ProfileSection.tsx    ← client component, all UI
    index.ts              ← barrel export
  data/
    profile.ts            ← skills array, social links, bio text
```

---

## 16. Accessibility

| Concern | Solution |
|---|---|
| Page heading | `<h1>` on name "Jzon Livingston" (visually 22px, semantically H1) |
| Avatar alt | Video has no alt; wrap in div with `aria-label="Profile photo"` |
| Skill list | `<ul role="list">` with `<li>` per skill |
| Proficiency bar | `role="meter" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} aria-label="React proficiency"` |
| Social links | `<a>` tags with `target="_blank" rel="noopener noreferrer"`, visible text labels |
| Section labels | Use `<h2>` (visually styled as uppercase 12px) for proper document outline |
| Color contrast | All text meets WCAG AA: white on `#2d2d2d` = 11.7:1, `#737a80` on `#2d2d2d` = 3.9:1 (AA for large/UI text) |
| Reduced motion | Framer Motion respects `prefers-reduced-motion` automatically |

---

## 17. Data Schema

```typescript
// src/data/profile.ts

export interface Skill {
  name: string;
  icon: string;           // emoji or SVG identifier
  level: 'Expert' | 'Advanced' | 'Proficient' | 'Familiar';
  yearsUsed: number;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const bio = `I'm a software engineer who builds polished, high-performance web applications. I care about great user experience, clean architecture, and shipping things that actually work.`;

export const skills: Skill[] = [
  { name: 'React', icon: 'react', level: 'Expert', yearsUsed: 6 },
  { name: 'TypeScript', icon: 'typescript', level: 'Advanced', yearsUsed: 5 },
  { name: 'Node.js', icon: 'node', level: 'Advanced', yearsUsed: 6 },
  { name: 'Next.js', icon: 'nextjs', level: 'Advanced', yearsUsed: 4 },
  { name: 'Python', icon: 'python', level: 'Proficient', yearsUsed: 5 },
  { name: 'PostgreSQL', icon: 'postgresql', level: 'Proficient', yearsUsed: 4 },
  { name: 'AWS', icon: 'aws', level: 'Familiar', yearsUsed: 3 },
  { name: 'Docker', icon: 'docker', level: 'Familiar', yearsUsed: 3 },
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/username' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/username' },
  { label: 'Email', href: 'mailto:hello@example.com' },
];

export const proficiencyPercent: Record<Skill['level'], number> = {
  Expert: 90,
  Advanced: 75,
  Proficient: 60,
  Familiar: 40,
};
```
