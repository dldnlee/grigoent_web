# Team Profile Page - Visual Design Guide
**GRIGO Entertainment - Spotify-Style Team Profile**

## 🎨 Visual Layout Overview

### Desktop Layout (1280px+)
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    TEAM COVER IMAGE                             │
│                    (550px height)                               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ← Back                                    [Gradient]     │  │
│  │                                                           │  │
│  │                                                           │  │
│  │                                                           │  │
│  │                                                           │  │
│  │                    TEAM NAME HERE                        │  │
│  │                    [👥 8 Members]         [Gradient]     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  [📷] [🎬] [🐦] [📤 Share]                                      │
└─────────────────────────────────────────────────────────────────┘

┌────────────────────┬────────────────────────────────────────────┐
│                    │                                            │
│   TEAM INFO        │   ABOUT TEAM NAME                         │
│   ─────────        │   ──────────────────                      │
│                    │   Team description goes here with rich     │
│   📅 Formed        │   formatting and multiple lines...         │
│      2020          │                                            │
│                    │                                            │
│   👥 Members       │   ──────────────────────────────────────  │
│      8             │                                            │
│                    │   TEAM MEMBERS                             │
│   👑 Leader        │   ────────────                             │
│      John Doe      │                                            │
│                    │   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│                    │   │     │ │     │ │     │ │     │        │
│                    │   │ 👑  │ │     │ │     │ │     │        │
│                    │   │ MEM1│ │ MEM2│ │ MEM3│ │ MEM4│        │
│                    │   └─────┘ └─────┘ └─────┘ └─────┘        │
│                    │                                            │
│                    │   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│                    │   │     │ │     │ │     │ │     │        │
│                    │   │ MEM5│ │ MEM6│ │ MEM7│ │ MEM8│        │
│                    │   └─────┘ └─────┘ └─────┘ └─────┘        │
│                    │                                            │
│                    │   [Show 2 More Members →]                  │
│                    │                                            │
└────────────────────┴────────────────────────────────────────────┘
```

### Mobile Layout (< 768px)
```
┌─────────────────────────┐
│                         │
│   TEAM COVER IMAGE      │
│   (400px height)        │
│                         │
│  ┌──────────────────┐   │
│  │ ← Back  [Grad]   │   │
│  │                  │   │
│  │  TEAM NAME       │   │
│  │  [👥 8 Members]  │   │
│  └──────────────────┘   │
└─────────────────────────┘

┌─────────────────────────┐
│ [📷][🎬][🐦][📤]       │
└─────────────────────────┘

┌─────────────────────────┐
│  TEAM INFO              │
│  ─────────              │
│  📅 Formed: 2020        │
│  👥 Members: 8          │
│  👑 Leader: John Doe    │
└─────────────────────────┘

┌─────────────────────────┐
│  ABOUT TEAM NAME        │
│  ──────────────         │
│  Team description...    │
└─────────────────────────┘

┌─────────────────────────┐
│  TEAM MEMBERS           │
│  ────────────           │
│  ┌─────┐    ┌─────┐    │
│  │ 👑  │    │     │    │
│  │ MEM1│    │ MEM2│    │
│  └─────┘    └─────┘    │
│                         │
│  ┌─────┐    ┌─────┐    │
│  │     │    │     │    │
│  │ MEM3│    │ MEM4│    │
│  └─────┘    └─────┘    │
│                         │
│  [Show 4 More →]        │
└─────────────────────────┘
```

## 🎭 Component Breakdown

### 1. Hero Section Components

#### Cover Image Container
- **Dimensions**: Full width × Responsive height
- **Background**: Team cover_image or logo_url
- **Fallback**: Gradient `from-purple-900 via-zinc-900 to-zinc-950`
- **Overlay Effects**:
  - Top: Black gradient fade (32-40px height)
  - Bottom: Black gradient fade (32-40px height)

#### Team Name Display
```
┌─────────────────────────────────┐
│  TEAM REVOLUTION                │  ← 3xl-6xl font, bold
│  [👥 8 Members]                 │  ← Badge, white/20 bg
└─────────────────────────────────┘
```

### 2. Member Card Design (TeamMemberCard)

#### Card Structure
```
┌─────────────────┐
│                 │
│  [Profile Img]  │  ← 192px height
│                 │
│  ────────────── │
│  👑 Leader      │  ← Conditional badge
│  John Doe       │  ← Primary name
│  존 도          │  ← Secondary name
│  [📷][🎬][🐦]  │  ← Social icons
└─────────────────┘
```

#### States & Interactions
- **Default**: `bg-zinc-900/80 border-zinc-800/50`
- **Hover**:
  - Scale: 1.03
  - Y-offset: -4px
  - Border: `border-zinc-700/50`
  - Shadow: Enhanced
- **Active/Tap**: Scale 0.98
- **Transition**: 200ms ease-out

#### Leader Badge
```
┌──────────────┐
│ 👑 Leader    │  ← Crown icon + text
└──────────────┘
```
- Background: `bg-primary/20` (green tint)
- Text: `text-primary` (Spotify green)
- Border: `border-primary/30`

### 3. Team Stats Card

#### Layout
```
┌─────────────────────┐
│ TEAM INFO           │
│ ─────────           │
│                     │
│ 📅  Formed          │
│     2020            │
│                     │
│ 👥  Members         │
│     8               │
│                     │
│ 👑  Leader          │
│     John Doe        │
│                     │
└─────────────────────┘
```

#### Icon Colors
- Icon: `text-white/60`
- Label: `text-white/60 text-xs`
- Value: `text-white font-semibold`

### 4. Social Bar

#### Button Styles
```
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│  📷  │  │  🎬  │  │  🐦  │  │  📤  │
└──────┘  └──────┘  └──────┘  └──────┘
   IG        YT        TW      Share
```

- Size: 40×40px circular
- Background: `bg-zinc-900`
- Hover: `bg-zinc-800`
- Icon size: 18-20px
- Gap: 12px between buttons

## 🎨 Color Palette

### Background Colors
```css
/* Primary Backgrounds */
--bg-hero: #000000            /* Pure black */
--bg-main: #000000            /* Main content black */
--bg-card: rgba(39,39,42,0.8) /* zinc-900/80 */
--bg-card-hover: rgba(39,39,42,0.9) /* zinc-800/90 */

/* Overlays */
--overlay-top: linear-gradient(to bottom, #000, rgba(0,0,0,0.6), transparent)
--overlay-bottom: linear-gradient(to top, #000, rgba(0,0,0,0.6), transparent)
```

### Text Colors
```css
--text-primary: #FFFFFF       /* Pure white */
--text-secondary: rgba(255,255,255,0.9)  /* white/90 */
--text-muted: rgba(255,255,255,0.8)      /* white/80 */
--text-dimmed: rgba(255,255,255,0.6)     /* white/60 */
--text-subtle: rgba(255,255,255,0.4)     /* white/40 */
```

### Accent Colors
```css
--spotify-green: #1DB954      /* Primary/Leader badge */
--purple-gradient: from-purple-900 via-zinc-900 to-zinc-950
--border-default: rgba(255,255,255,0.1)
--border-hover: rgba(255,255,255,0.2)
```

## 📐 Spacing & Typography

### Spacing Scale
```
gap-2   = 8px    (Social icon gaps)
gap-3   = 12px   (Social button gaps)
gap-4   = 16px   (Member card grid - mobile/tablet)
gap-6   = 24px   (Member card grid - desktop)
gap-8   = 32px   (Section gaps)
gap-12  = 48px   (Column gaps - desktop)
```

### Typography Scale
```
/* Team Name (Hero) */
Mobile:   text-3xl (30px)
Tablet:   text-4xl (36px)
Desktop:  text-5xl (48px)
XL:       text-6xl (60px)

/* Section Headers */
text-2xl (24px) font-bold

/* Subsection Headers */
text-xl (20px) font-bold

/* Member Names */
text-lg (18px) font-bold         (Primary)
text-sm (14px) text-white/70     (Secondary)

/* Stats Labels */
text-xs (12px) text-white/60
```

### Border Radius
```
rounded-xl  = 12px   (Cards)
rounded-lg  = 8px    (Buttons)
rounded-full         (Social icons, badges)
```

## 🎬 Animation Specifications

### Hero Fade In
```javascript
// Hero section entry
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}
```

### Member Grid Stagger
```javascript
// Container
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { staggerChildren: 0.1 }
}

// Individual cards
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
}
```

### Card Hover
```javascript
// Member card hover
{
  whileHover: { scale: 1.03, y: -4 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: "easeOut" }
}
```

### Button Transitions
```css
/* Social buttons */
transition: background-color 200ms ease-in-out;

/* Show more button */
transition: all 300ms ease-in-out;
```

## 📱 Responsive Breakpoints

### Grid Columns by Breakpoint
```
Mobile (< 768px):      grid-cols-2
Tablet (768-1023px):   grid-cols-3
Desktop (1024-1279px): grid-cols-4
XL (≥ 1280px):         grid-cols-4
```

### Layout Changes
```
Mobile:
- Stack all sections vertically
- Hero: 400px height
- Team name: text-3xl
- 2-column member grid

Tablet:
- Stack sections vertically
- Hero: 450px height
- Team name: text-4xl
- 3-column member grid

Desktop:
- 2-column layout (1:3 sidebar:content)
- Hero: 500px height
- Team name: text-5xl
- 4-column member grid

XL:
- Same as desktop with wider container
- Hero: 550px height
- Team name: text-6xl
```

## 🔤 Bilingual Display Examples

### Team Name Display
```tsx
// Korean primary
teamName = "팀 레볼루션"
```

```tsx
// English primary
teamName = "Team Revolution"
```

### Member Name Display
```tsx
// Card shows both
┌─────────────┐
│  John Doe   │  ← English (if language = 'en')
│  존 도      │  ← Korean (alt name)
└─────────────┘

// OR

┌─────────────┐
│  존 도      │  ← Korean (if language = 'ko')
│  John Doe   │  ← English (alt name)
└─────────────┘
```

## 🎯 Key Visual Principles

### 1. **Hierarchy**
- Large hero image establishes team identity
- Team name dominates hero section
- Clear visual separation between info sections
- Member cards are equal prominence

### 2. **Consistency**
- Matches existing artist profile aesthetic
- Uses established color palette and spacing
- Follows same animation patterns
- Maintains design language across platform

### 3. **Clarity**
- Team information immediately visible
- Leader clearly identified with badge
- Member count prominent in hero
- Easy navigation to member profiles

### 4. **Responsiveness**
- Mobile-first approach
- Touch-friendly targets (44×44px minimum)
- Readable typography at all sizes
- Adaptive grid layouts

### 5. **Performance**
- Lazy load below-fold images
- Optimized Next.js Image components
- Smooth 60fps animations
- Minimal re-renders

## 📊 Component Size Reference

### Hero Section
```
Height:
- Mobile:  400px
- Tablet:  450px
- Desktop: 500px
- XL:      550px

Gradients:
- Top overlay:    32px (mobile) → 40px (desktop)
- Bottom overlay: 32px (mobile) → 40px (desktop)
```

### Team Member Card
```
Dimensions:
- Height: 288px (h-72)
- Width: 100% (responsive to grid)

Profile Image:
- Height: 192px (h-48)
- Width: 100%

Content Area:
- Padding: 16px (p-4)
```

### Social Icons
```
Container:
- Size: 40×40px (w-10 h-10)
- Shape: Circle (rounded-full)

Icon:
- Size: 18-20px
- Color: white
```

### Badges
```
Member Count:
- Padding: 16px × 4px (px-4 py-1)
- Icon: 16px (h-4 w-4)
- Text: 14px (text-sm)

Leader Badge:
- Padding: 8px × 4px
- Icon: 12px (h-3 w-3)
- Text: 12px (text-xs)
```

## 🎨 Design Tokens Summary

```css
/* Spacing */
--space-xs: 8px
--space-sm: 12px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px

/* Typography */
--font-display: text-6xl (60px)
--font-heading-1: text-2xl (24px)
--font-heading-2: text-xl (20px)
--font-body-lg: text-lg (18px)
--font-body: text-base (16px)
--font-body-sm: text-sm (14px)
--font-caption: text-xs (12px)

/* Colors */
--bg-primary: #000000
--bg-card: rgba(39,39,42,0.8)
--text-primary: #FFFFFF
--text-muted: rgba(255,255,255,0.8)
--accent-primary: #1DB954
--border: rgba(255,255,255,0.1)

/* Effects */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1)
--blur-sm: 4px
```

---

## 🚀 Quick Implementation Reference

### Import Statements Needed
```tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ChevronLeft, Users, Calendar, Crown,
  Share2, Instagram, Youtube, Twitter
} from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
```

### Key CSS Classes
```tsx
// Hero container
className="relative w-full overflow-hidden"

// Cover image
className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]"

// Team name
className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"

// Member grid
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"

// Member card
className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800/50 hover:border-zinc-700/50"
```

This visual guide provides all the design specifications needed for pixel-perfect implementation of the team profile page! 🎨
