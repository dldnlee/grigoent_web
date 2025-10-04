# Team Profile Page Implementation Plan
**GRIGO Entertainment - Spotify-Style Team Profile Design**

## 📋 Table of Contents
1. [Overview](#overview)
2. [Design Specifications](#design-specifications)
3. [Component Architecture](#component-architecture)
4. [Implementation Details](#implementation-details)
5. [Animation Patterns](#animation-patterns)
6. [Responsive Design](#responsive-design)
7. [Technical Considerations](#technical-considerations)

---

## 1. Overview

### Goal
Transform the basic team profile view (lines 254-299 in `/app/artists/[slug]/page.tsx`) into a comprehensive, Spotify-inspired team profile page that showcases team information, members, and achievements.

### Key Requirements
- Hero section with team cover image
- Team information display (name, description, stats)
- Member showcase with individual cards
- Team highlights/featured works
- Social media integration
- Bilingual support (Korean/English)
- Responsive, mobile-first design

### Design Philosophy
- **Dark-First Theme**: Black (#000000), zinc-900, zinc-950 backgrounds
- **Spotify Aesthetic**: Clean, minimal, card-based layouts with subtle gradients
- **Smooth Interactions**: Framer Motion animations with hover effects
- **Information Hierarchy**: Clear visual separation between sections

---

## 2. Design Specifications

### 2.1 Hero Section

#### Layout Structure
```
┌─────────────────────────────────────────────┐
│                                             │
│  [Team Cover Image - Full Width]           │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Gradient Overlay (Top)               │  │
│  │   [Back Button]                      │  │
│  │                                      │  │
│  │                                      │  │
│  │   [Team Name - Large]                │  │
│  │   [Member Count Badge]               │  │
│  │ Gradient Overlay (Bottom)            │  │
│  └──────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

#### Specifications
- **Height**: Responsive
  - Mobile: 400px
  - Tablet: 450px
  - Desktop: 500px
  - Large Desktop: 550px
- **Cover Image**:
  - Use `team.cover_image` (primary) or `team.logo_url` (fallback)
  - Full width, object-cover, object-center
  - Fallback: Gradient background `from-purple-900 via-zinc-900 to-zinc-950` with team initial
- **Overlays**:
  - Top: `bg-gradient-to-b from-black via-black/60 to-transparent` (h-32 md:h-40)
  - Bottom: `bg-gradient-to-t from-black via-black/60 to-transparent` (h-32 md:h-40)
- **Team Name**:
  - Position: Absolute bottom-6 left-4 (responsive padding)
  - Font: Bold, responsive sizing
    - Mobile: text-3xl
    - Tablet: text-4xl
    - Desktop: text-5xl
    - XL: text-6xl
  - Color: White
  - Language support: `team.name` (Korean) or `team.name_en` (English)
- **Member Count Badge**:
  - Position: Below team name
  - Style: `bg-white/20 backdrop-blur-sm rounded-full px-4 py-1`
  - Icon: Users icon from Lucide
  - Text: `{teamMembers.length} Members`

#### Back Button
- Position: Absolute top-6 left-4 (responsive padding)
- Style: `text-white/70 hover:text-white transition-colors`
- Icon: ChevronLeft from Lucide
- Action: `router.push('/artists')`

---

### 2.2 Team Information Bar

#### Layout Structure
```
┌─────────────────────────────────────────────┐
│  [Social Icons] [Share Button]              │
│  [Instagram] [YouTube] [Twitter] [Share]    │
└─────────────────────────────────────────────┘
```

#### Specifications
- **Container**: `max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-4`
- **Social Icons**:
  - Size: w-10 h-10
  - Style: `rounded-full bg-zinc-900 hover:bg-zinc-800`
  - Gap: gap-3
  - Icons: Instagram, YouTube, Twitter (from existing artist implementation)
  - Conditional rendering based on team data (if team has social links)
- **Share Button**:
  - Same style as social icons
  - Uses native share API on mobile, clipboard fallback
  - Icon: Share2 from Lucide

---

### 2.3 Main Content Layout

#### Two-Column Grid (Desktop)
```
┌──────────────────┬────────────────────────────┐
│                  │                            │
│  LEFT SIDEBAR    │  MAIN CONTENT             │
│  (1/4 width)     │  (3/4 width)              │
│                  │                            │
│  - Team Stats    │  - Team Description       │
│  - Formation     │  - Member Grid            │
│  - Leader Info   │  - Featured Works         │
│  - Highlights    │  - Team Achievements      │
│                  │                            │
└──────────────────┴────────────────────────────┘
```

#### Grid Specifications
- **Container**: `max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12`
- **Grid**: `grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12`
- **Left Column**: `lg:col-span-1 space-y-8`
- **Right Column**: `lg:col-span-3 space-y-8`

---

### 2.4 Team Statistics Section (Left Sidebar)

#### Components
1. **Team Stats Card**
   - Total Followers (if available from team data)
   - Combined Monthly Listeners (aggregate from members)
   - Total Performances/Works count
   - Formation Year

#### Implementation
```tsx
<div className="space-y-6">
  <div>
    <h2 className="text-xl font-bold text-white mb-3">Team Stats</h2>
    <div className="space-y-3">
      {/* Formation Year */}
      <div className="flex items-center gap-3">
        <Calendar className="h-5 w-5 text-white/60" />
        <div>
          <p className="text-white/60 text-xs">Formed</p>
          <p className="text-white font-semibold">
            {new Date(team.created_at).getFullYear()}
          </p>
        </div>
      </div>

      {/* Member Count */}
      <div className="flex items-center gap-3">
        <Users className="h-5 w-5 text-white/60" />
        <div>
          <p className="text-white/60 text-xs">Members</p>
          <p className="text-white font-semibold">{teamMembers.length}</p>
        </div>
      </div>

      {/* Total Followers (if available) */}
      {totalFollowers > 0 && (
        <div className="flex items-center gap-3">
          <Heart className="h-5 w-5 text-white/60" />
          <div>
            <p className="text-white/60 text-xs">Total Followers</p>
            <p className="text-white font-semibold">
              {formatNumber(totalFollowers)}
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
```

---

### 2.5 Team Description Section (Main Content)

#### Layout
```
┌─────────────────────────────────────────────┐
│  About {Team Name}                          │
│  ─────────────────                          │
│                                             │
│  {Team description text with rich          │
│   formatting and line breaks}              │
│                                             │
└─────────────────────────────────────────────┘
```

#### Specifications
- **Title**: `text-2xl font-bold text-white mb-4`
- **Description**:
  - Use `team.description` field
  - Style: `text-white/80 leading-relaxed`
  - Preserve line breaks: `whitespace-pre-line`
- **Fallback**: If no description, show placeholder text

---

### 2.6 Member Showcase Section

#### Layout - Grid System
```
┌──────────────────────────────────────────────┐
│  Team Members                               │
│  ──────────                                 │
│                                             │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐   │
│  │      │  │      │  │      │  │      │   │
│  │ Mem1 │  │ Mem2 │  │ Mem3 │  │ Mem4 │   │
│  │      │  │      │  │      │  │      │   │
│  └──────┘  └──────┘  └──────┘  └──────┘   │
│                                             │
│  [Show More/Less Button]                    │
└──────────────────────────────────────────────┘
```

#### Member Card Component (TeamMemberCard)
**New Component**: `/app/artists/components/TeamMemberCard.tsx`

##### Card Structure
- **Container**:
  - Base: `Card` with `bg-zinc-900/80 backdrop-blur-sm border-zinc-800/50`
  - Hover: `hover:bg-zinc-800/80 transition-all duration-300`
  - Height: `h-72` (fixed for consistency)
- **Profile Image**:
  - Container: `relative w-full h-48 overflow-hidden`
  - Image: Next.js Image component, `object-cover object-center rounded-t-xl`
  - Fallback: Gradient circle with member initial
- **Content Section**:
  - Padding: `p-4`
  - Name display:
    - Korean name: `text-lg font-bold text-white`
    - English name: `text-sm text-white/80`
  - Role/Specialty: `text-xs text-white/60` (if available)
  - Leader Badge: Show if `member.id === team.leader_id`

##### Leader Badge
```tsx
{member.id === team.leader_id && (
  <Badge
    variant="secondary"
    className="bg-primary/20 text-primary border-primary/30"
  >
    <Crown className="h-3 w-3 mr-1" />
    Leader
  </Badge>
)}
```

##### Social Links (Minimal)
- Show icons only if member has social links
- Style: Small circular icons, `w-6 h-6`, subtle white/20 background
- Icons: Instagram, YouTube, Twitter

##### Hover Effect
```tsx
<motion.div
  whileHover={{ scale: 1.03, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
  {/* Card content */}
</motion.div>
```

##### Click Action
- Navigate to member's artist profile: `router.push(`/artists/${member.slug}`)`

#### Grid Specifications
- **Container**: `grid gap-4 md:gap-6`
- **Responsive Columns**:
  - Mobile: `grid-cols-2` (2 cards)
  - Tablet: `grid-cols-3` (3 cards)
  - Desktop: `grid-cols-4` (4 cards)
  - XL: `grid-cols-5` (5 cards)
- **Initial Display**: Show first 8 members
- **Show More**: Button to expand/collapse

---

### 2.7 Team Highlights Section (Left Sidebar)

#### Layout
Similar to artist profile highlights (lines 569-635)

```tsx
<div>
  <h2 className="text-xl font-bold text-white mb-3">Team Highlights</h2>
  <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
    <div className="flex gap-3 pb-2">
      {teamHighlights.map((work) => (
        <HighlightCard key={work.id} work={work} />
      ))}
    </div>
  </div>
</div>
```

#### Specifications
- Horizontal scroll on mobile
- Card width: `w-[240px] md:w-[280px]`
- Aspect ratio: `aspect-video` for thumbnails
- Click: Open video in new tab

**Note**: Team highlights would need to be fetched separately or derived from member works

---

### 2.8 Team Achievements Section (Optional)

#### Layout
```
┌─────────────────────────────────────────────┐
│  Achievements                               │
│  ──────────                                 │
│                                             │
│  ┌─────────────┐  ┌─────────────┐          │
│  │  🏆         │  │  🎯         │          │
│  │  Award Name │  │  Milestone  │          │
│  │  Year       │  │  Count      │          │
│  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────┘
```

#### Implementation (Future Enhancement)
- Grid of achievement cards
- Icons for different achievement types
- Animated count-up numbers
- Timeline of major milestones

---

## 3. Component Architecture

### 3.1 File Structure

```
app/
└── artists/
    ├── [slug]/
    │   └── page.tsx                 # Main page (UPDATE)
    └── components/
        ├── TeamMemberCard.tsx       # NEW - Member card for team profile
        ├── TeamStatsCard.tsx        # NEW - Team statistics display
        ├── TeamHighlights.tsx       # NEW - Team highlights section
        └── DancerCard.tsx           # EXISTING - Reference for design
```

### 3.2 New Components to Create

#### 1. TeamMemberCard Component
**Path**: `/app/artists/components/TeamMemberCard.tsx`

**Props Interface**:
```typescript
interface TeamMemberCardProps {
  member: TeamMember;
  isLeader: boolean;
  onClick?: (member: TeamMember) => void;
  size?: 'small' | 'medium' | 'large';
}
```

**Features**:
- Profile image with fallback
- Name display (Korean/English)
- Leader badge
- Social links (minimal)
- Hover animations
- Click navigation to artist profile

---

#### 2. TeamStatsCard Component
**Path**: `/app/artists/components/TeamStatsCard.tsx`

**Props Interface**:
```typescript
interface TeamStatsCardProps {
  team: Team;
  memberCount: number;
  totalFollowers?: number;
  totalListeners?: number;
}
```

**Features**:
- Formation year display
- Member count
- Aggregate statistics
- Icon-based layout
- Responsive design

---

#### 3. TeamHighlights Component (Optional)
**Path**: `/app/artists/components/TeamHighlights.tsx`

**Props Interface**:
```typescript
interface TeamHighlightsProps {
  highlights: CareerEntry[];
  maxItems?: number;
}
```

**Features**:
- Horizontal scroll on mobile
- Video thumbnail display
- Click to open video
- Lazy loading for images

---

### 3.3 Component Relationships

```
page.tsx (Team Profile)
├── Hero Section (inline)
│   ├── Cover Image
│   ├── Team Name
│   └── Back Button
├── Social Bar (inline)
├── Main Grid
│   ├── Left Sidebar
│   │   ├── TeamStatsCard
│   │   └── TeamHighlights
│   └── Right Content
│       ├── Team Description
│       ├── Member Grid
│       │   └── TeamMemberCard (multiple)
│       └── Team Achievements (future)
```

---

## 4. Implementation Details

### 4.1 Data Flow

#### Team Data Structure
```typescript
interface Team {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  cover_image: string | null;
  status: string;
  leader_id: string | null;
  created_at: string;
}

interface TeamMember {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  profile_image: string | null;
  introduction: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  twitter_url: string | null;
}
```

#### Computed Values
```typescript
// In page.tsx
const teamName = team ? (language === 'en' && team.name_en ? team.name_en : team.name) : '';
const formationYear = team ? new Date(team.created_at).getFullYear() : null;
const leaderMember = teamMembers.find(m => m.id === team.leader_id);
const [showAllMembers, setShowAllMembers] = useState(false);
const displayedMembers = showAllMembers ? teamMembers : teamMembers.slice(0, 8);
```

---

### 4.2 Team Profile Page Implementation

#### Replace Current Team View (lines 254-299)

```tsx
// Team Profile View
if (team && profileType === 'team') {
  return (
    <div className="min-h-screen text-white bg-black">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        {team.cover_image || team.logo_url ? (
          <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]">
            <Image
              src={team.cover_image || team.logo_url || ''}
              alt={teamName}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] bg-gradient-to-br from-purple-900 via-zinc-900 to-zinc-950 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl font-bold">
                {teamName.charAt(0)}
              </div>
              <p className="text-white/40 text-sm">No team image</p>
            </div>
          </div>
        )}

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-b from-black via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => router.push('/artists')}
          className="absolute top-6 left-4 md:left-8 lg:left-12 z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm">Back</span>
        </button>

        {/* Team Name and Member Count */}
        <div className="absolute bottom-6 left-4 md:left-8 lg:left-12 md:bottom-8 lg:bottom-10 right-4 md:right-8 lg:right-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3">
            {teamName}
          </h1>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-white/20 backdrop-blur-sm border-none text-white text-sm px-4 py-1.5"
            >
              <Users className="h-4 w-4 mr-2" />
              {teamMembers.length} {teamMembers.length === 1 ? 'Member' : 'Members'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Social Buttons Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-4">
        <div className="flex gap-3 items-center">
          {/* Add team social links here if available */}
          {/* Share Button */}
          <button
            onClick={async () => {
              const currentUrl = window.location.href;
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: `${teamName} - GRIGO Entertainment`,
                    url: currentUrl
                  });
                } catch (err) {
                  console.log('Share cancelled:', err);
                }
              } else {
                try {
                  await navigator.clipboard.writeText(currentUrl);
                  alert('Link copied to clipboard!');
                } catch (err) {
                  console.error('Failed to copy:', err);
                }
              }
            }}
            className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
            aria-label="Share team profile"
          >
            <Share2 className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Two Column Layout for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Left Sidebar - Stats and Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Team Stats */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3">Team Info</h2>
              <div className="space-y-3">
                {/* Formation Year */}
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-white/60" />
                  <div>
                    <p className="text-white/60 text-xs">Formed</p>
                    <p className="text-white font-semibold">
                      {new Date(team.created_at).getFullYear()}
                    </p>
                  </div>
                </div>

                {/* Member Count */}
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-white/60" />
                  <div>
                    <p className="text-white/60 text-xs">Members</p>
                    <p className="text-white font-semibold">{teamMembers.length}</p>
                  </div>
                </div>

                {/* Leader Info */}
                {leaderMember && (
                  <div className="flex items-center gap-3">
                    <Crown className="h-5 w-5 text-white/60" />
                    <div>
                      <p className="text-white/60 text-xs">Leader</p>
                      <p className="text-white font-semibold">
                        {language === 'en' && leaderMember.name_en
                          ? leaderMember.name_en
                          : leaderMember.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Description and Members */}
          <div className="lg:col-span-3 space-y-8">
            {/* Team Description */}
            {team.description && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  About {teamName}
                </h2>
                <p className="text-white/80 leading-relaxed whitespace-pre-line">
                  {team.description}
                </p>
              </div>
            )}

            {/* Team Members Grid */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Team Members</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayedMembers.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    isLeader={member.id === team.leader_id}
                    onClick={() => router.push(`/artists/${member.slug}`)}
                  />
                ))}
              </div>

              {/* Show More/Less Button */}
              {teamMembers.length > 8 && (
                <button
                  onClick={() => setShowAllMembers(!showAllMembers)}
                  className="mt-6 w-full py-3 text-sm text-white/70 hover:text-white transition-colors border border-white/10 rounded-lg hover:border-white/20"
                >
                  {showAllMembers
                    ? 'Show Less'
                    : `Show ${teamMembers.length - 8} More Members`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### 4.3 TeamMemberCard Component Implementation

**File**: `/app/artists/components/TeamMemberCard.tsx`

```tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Crown, Instagram, Youtube, Twitter } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface TeamMember {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  profile_image: string | null;
  introduction: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  twitter_url: string | null;
}

interface TeamMemberCardProps {
  member: TeamMember;
  isLeader: boolean;
  onClick?: (member: TeamMember) => void;
  size?: 'small' | 'medium' | 'large';
}

export function TeamMemberCard({
  member,
  isLeader,
  onClick,
  size = 'medium'
}: TeamMemberCardProps) {
  const { language } = useLanguage();
  const memberName = language === 'en' && member.name_en ? member.name_en : member.name;
  const memberNameAlt = language === 'en' ? member.name : member.name_en;

  const cardHeight = size === 'large' ? 'h-80' : size === 'small' ? 'h-64' : 'h-72';

  const handleClick = () => {
    if (onClick) {
      onClick(member);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer group"
      onClick={handleClick}
    >
      <Card className={`${cardHeight} bg-zinc-900/80 backdrop-blur-sm border-zinc-800/50 overflow-hidden relative rounded-xl shadow-lg hover:shadow-2xl hover:border-zinc-700/50 transition-all duration-300`}>
        {/* Profile Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-purple-900/20 via-zinc-900 to-zinc-950">
          {member.profile_image ? (
            <Image
              src={member.profile_image}
              alt={memberName}
              fill
              className="object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">
                {memberName.charAt(0)}
              </div>
            </div>
          )}

          {/* Leader Badge Overlay */}
          {isLeader && (
            <div className="absolute top-3 right-3">
              <Badge
                variant="secondary"
                className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm"
              >
                <Crown className="h-3 w-3 mr-1" />
                Leader
              </Badge>
            </div>
          )}
        </div>

        {/* Member Info */}
        <div className="p-4 space-y-2">
          <div>
            <h3 className="text-lg font-bold text-white leading-tight line-clamp-1">
              {memberName}
            </h3>
            {memberNameAlt && (
              <p className="text-sm text-white/70 line-clamp-1">
                {memberNameAlt}
              </p>
            )}
          </div>

          {/* Social Links */}
          {(member.instagram_url || member.youtube_url || member.twitter_url) && (
            <div className="flex gap-2 pt-1">
              {member.instagram_url && (
                <a
                  href={member.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-3 w-3 text-white" />
                </a>
              )}
              {member.youtube_url && (
                <a
                  href={member.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-3 w-3 text-white" />
                </a>
              )}
              {member.twitter_url && (
                <a
                  href={member.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-3 w-3 text-white" />
                </a>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
```

---

## 5. Animation Patterns

### 5.1 Framer Motion Variants

#### Hero Section Animations
```tsx
const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
```

#### Member Grid Stagger
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};
```

#### Member Card Hover
```tsx
<motion.div
  whileHover={{ scale: 1.03, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
>
  {/* Card content */}
</motion.div>
```

### 5.2 CSS Transitions

#### Smooth Color Transitions
```css
.transition-colors {
  transition: color 200ms ease-in-out;
}

.transition-all {
  transition: all 300ms ease-in-out;
}
```

#### Backdrop Blur Effects
```css
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
```

---

## 6. Responsive Design

### 6.1 Breakpoint Strategy

#### Tailwind Breakpoints
- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (768px - 1023px)
- **Desktop**: `lg:` (1024px - 1279px)
- **Large Desktop**: `xl:` (≥ 1280px)

### 6.2 Responsive Patterns

#### Hero Section
```tsx
// Height responsive
h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]

// Typography responsive
text-3xl md:text-4xl lg:text-5xl xl:text-6xl

// Padding responsive
px-4 md:px-8 lg:px-12
```

#### Member Grid
```tsx
// Columns responsive
grid-cols-2         // Mobile: 2 columns
md:grid-cols-3      // Tablet: 3 columns
lg:grid-cols-4      // Desktop: 4 columns
```

#### Sidebar/Main Content
```tsx
// Stack on mobile, side-by-side on desktop
grid-cols-1 lg:grid-cols-4

// Left sidebar
lg:col-span-1

// Main content
lg:col-span-3
```

### 6.3 Mobile Optimizations

#### Touch Targets
- Minimum size: 44x44px for buttons
- Adequate spacing between interactive elements
- Larger tap areas for mobile

#### Performance
- Lazy load images below the fold
- Use Next.js Image optimization
- Implement skeleton loading states

---

## 7. Technical Considerations

### 7.1 Data Requirements

#### Supabase Queries

**Fetch Team with Members**:
```sql
-- Already implemented in page.tsx (lines 165-199)
SELECT * FROM teams WHERE slug = ? AND status = 'active';

SELECT
  users.id,
  users.name,
  users.name_en,
  users.slug,
  users.profile_image,
  users.introduction,
  users.instagram_url,
  users.youtube_url,
  users.twitter_url
FROM team_members
INNER JOIN users ON team_members.user_id = users.id
WHERE team_members.team_id = ?;
```

**Optional: Fetch Team Career Entries** (Future Enhancement):
```sql
SELECT * FROM career_entries
WHERE team_id = ?
AND is_featured = true
ORDER BY start_date DESC;
```

### 7.2 State Management

#### Local State
```tsx
const [showAllMembers, setShowAllMembers] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

#### Computed Values
```tsx
const teamName = team ? (language === 'en' && team.name_en ? team.name_en : team.name) : '';
const formationYear = team ? new Date(team.created_at).getFullYear() : null;
const leaderMember = teamMembers.find(m => m.id === team.leader_id);
const displayedMembers = showAllMembers ? teamMembers : teamMembers.slice(0, 8);
```

### 7.3 Internationalization

#### Language Context Usage
```tsx
import { useLanguage } from '@/app/contexts/LanguageContext';

const { t, language } = useLanguage();

// Team name display
const teamName = language === 'en' && team.name_en ? team.name_en : team.name;

// Member name display
const memberName = language === 'en' && member.name_en ? member.name_en : member.name;
```

#### Translation Keys (Add to LanguageContext)
```typescript
teamProfile: {
  members: { ko: '멤버', en: 'Members' },
  formed: { ko: '결성', en: 'Formed' },
  leader: { ko: '리더', en: 'Leader' },
  about: { ko: '소개', en: 'About' },
  showMore: { ko: '더 보기', en: 'Show More' },
  showLess: { ko: '접기', en: 'Show Less' },
  teamInfo: { ko: '팀 정보', en: 'Team Info' }
}
```

### 7.4 Performance Optimizations

#### Image Optimization
```tsx
<Image
  src={member.profile_image}
  alt={memberName}
  fill
  className="object-cover"
  loading="lazy"  // Lazy load below-fold images
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>
```

#### Memoization
```tsx
const displayedMembers = useMemo(() =>
  showAllMembers ? teamMembers : teamMembers.slice(0, 8),
  [showAllMembers, teamMembers]
);
```

### 7.5 Error Handling

#### Fallbacks
- No cover image: Show gradient with team initial
- No member image: Show gradient circle with member initial
- No description: Hide section or show placeholder
- Empty members array: Show appropriate message

#### Loading States
```tsx
if (isLoading) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );
}
```

### 7.6 Accessibility

#### ARIA Labels
```tsx
<button aria-label="Share team profile">
  <Share2 />
</button>

<a aria-label="Instagram" href={member.instagram_url}>
  <Instagram />
</a>
```

#### Keyboard Navigation
- All interactive elements focusable
- Clear focus indicators
- Logical tab order

#### Screen Readers
- Semantic HTML structure
- Descriptive alt text for images
- ARIA labels for icon-only buttons

---

## 8. Implementation Checklist

### Phase 1: Core Structure
- [ ] Update page.tsx team profile section (lines 254-299)
- [ ] Implement hero section with cover image
- [ ] Add team name and member count badge
- [ ] Add back button and navigation

### Phase 2: Team Information
- [ ] Create team stats section (formation year, member count)
- [ ] Implement team description display
- [ ] Add leader information display
- [ ] Implement social share functionality

### Phase 3: Member Showcase
- [ ] Create TeamMemberCard component
- [ ] Implement member grid layout
- [ ] Add show more/less functionality
- [ ] Implement member click navigation

### Phase 4: Polish & Animations
- [ ] Add Framer Motion animations
- [ ] Implement hover effects
- [ ] Add responsive design refinements
- [ ] Test on mobile devices

### Phase 5: Testing & Optimization
- [ ] Test with real team data
- [ ] Optimize image loading
- [ ] Test internationalization
- [ ] Accessibility audit
- [ ] Performance testing

---

## 9. Future Enhancements

### Potential Features
1. **Team Career Entries**
   - Fetch team-specific career entries
   - Display team performances and achievements
   - Timeline view of team history

2. **Team Statistics**
   - Aggregate member statistics
   - Total followers/listeners across team
   - Performance metrics and analytics

3. **Team Highlights Video**
   - Featured video section
   - YouTube/video integration
   - Auto-play hero video background

4. **Member Roles**
   - Display member roles/positions
   - Skill badges and specialties
   - Years active display

5. **Team Gallery**
   - Photo gallery of team events
   - Performance photos
   - Behind-the-scenes content

6. **Team Social Feed**
   - Instagram feed integration
   - Latest team posts
   - Social media aggregation

---

## 10. Notes & Warnings

### Important Considerations
1. **Data Availability**: Current database only has basic team info. Some features (team social links, highlights) may need schema updates.

2. **Leader Display**: Leader is based on `team.leader_id`. Ensure this field is populated in the database.

3. **Image Assets**: Team cover images and member profile images should be optimized for web (WebP format recommended).

4. **Performance**: With large teams (>20 members), consider implementing pagination or virtual scrolling instead of show more/less.

5. **Social Links**: Current implementation assumes members have social links. Team-level social links would require database schema update.

6. **Bilingual Content**: Ensure both `name` and `name_en` fields are populated for all teams and members for proper language switching.

### Known Limitations
- No team-level career entries (would need schema update)
- No team statistics aggregation (would need calculation logic)
- No team social links (would need schema update)
- Member showcase limited to basic info (could expand with more metadata)

---

## 11. Summary

This implementation plan provides a comprehensive, Spotify-inspired team profile page that:

✅ Maintains visual consistency with the existing artist profile
✅ Showcases team information and members elegantly
✅ Provides smooth, responsive user experience
✅ Supports bilingual content (Korean/English)
✅ Implements modern animations and interactions
✅ Follows accessibility best practices
✅ Optimizes for performance and mobile devices

The design leverages existing components and patterns while introducing new, reusable components specifically for team profiles. The implementation is structured for easy maintenance and future enhancements.

**Key Deliverables**:
1. Updated team profile section in `page.tsx`
2. New `TeamMemberCard.tsx` component
3. Responsive grid layout for members
4. Team statistics and information display
5. Smooth animations and hover effects
6. Mobile-optimized design

**Estimated Implementation Time**: 4-6 hours for core features, additional 2-3 hours for polish and testing.
