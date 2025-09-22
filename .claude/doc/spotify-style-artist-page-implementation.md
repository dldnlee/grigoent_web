# Spotify-Style Artist Page Implementation Plan

## Overview
This document provides a comprehensive implementation plan for creating a Spotify-style artist page for GRIGO Entertainment. The design follows Spotify's 2024 design language with dark themes, clean typography, and card-based layouts.

## Research Findings

### Spotify's Design Language (2024)
Based on extensive research of Spotify's current design patterns:

**Core Design Principles:**
- **Dark-first approach**: Signature dark theme established in 2013-14 "Paint it black" redesign
- **Typography as design element**: Bold, oversized typography with gradients and geometric patterns
- **Modular component system**: "Encore" design system with shared components and design tokens
- **Visual hierarchy**: Clear information architecture with consistent spacing
- **Carousel patterns**: Horizontal scrolling layouts for content organization

**Color Palette:**
- Primary: Deep purple (#400073) and variations
- Accent: Bright green (#1DB954) and yellow tones (#CBF55C)
- Background gradients: From dark (#1E073C) to lighter tints
- Text: High contrast white/light gray on dark backgrounds

**Typography:**
- Primary font: Circular Sp UI (Spotify's custom font family)
- Fallback: Modern sans-serif stack
- Bold weights for emphasis and hierarchy
- Oversized numbers and text for visual impact

## Current State Analysis

### Existing Artist Component Structure
- Location: `/app/components/sections/Artists.tsx`
- Current data model includes: `koreanName`, `englishName`, `specialty`, `image`
- Uses 3:4 aspect ratio cards with gradient overlays
- Grid layout: responsive (1-4 columns based on screen size)
- Dark theme with gradient backgrounds

### Available shadcn/ui Components
- `avatar.tsx` - For user/dancer profile images
- `separator.tsx` - For section dividers
- `sheet.tsx` - For mobile navigation/filters

### Dependencies Ready for Enhancement
- Radix UI components for accessibility
- Framer Motion for animations
- Lucide React for icons
- Tailwind CSS v4 for styling
- TypeScript for type safety

## Implementation Plan

### 1. Enhanced Color Scheme and Theme

**Spotify-Inspired Color Variables (to add to globals.css):**
```css
.dark {
  /* Spotify-inspired colors */
  --spotify-green: #1DB954;
  --spotify-black: #191414;
  --spotify-dark-gray: #121212;
  --spotify-gray: #282828;
  --spotify-light-gray: #B3B3B3;
  --spotify-white: #FFFFFF;

  /* Background gradients */
  --gradient-primary: linear-gradient(135deg, #1e3c72, #2a5298);
  --gradient-card: linear-gradient(145deg, rgba(40,40,40,0.9), rgba(25,20,20,0.95));

  /* Update existing variables for Spotify style */
  --background: var(--spotify-dark-gray);
  --card: var(--spotify-gray);
  --primary: var(--spotify-green);
}
```

### 2. Required shadcn/ui Components to Install

**Essential Components Needed:**
```bash
# Search and input components
npx shadcn@latest add input
npx shadcn@latest add search
npx shadcn@latest add command

# Layout and content components
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add button
npx shadcn@latest add tabs

# Data display
npx shadcn@latest add skeleton
npx shadcn@latest add scroll-area

# Navigation and interaction
npx shadcn@latest add select
npx shadcn@latest add toggle-group
```

### 3. Search Component Design

**Search Interface Specifications:**
- Location: Top of the artist page
- Functionality: Search by English OR Korean names
- Design: Spotify-style search bar with rounded corners
- Features: Real-time filtering, debounced input, clear button
- Icons: Search icon (left), clear icon (right when active)

**Component Structure:**
```typescript
interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

// Features:
// - Real-time search with 300ms debounce
// - Supports Korean and English text
// - Keyboard navigation (Escape to clear)
// - Accessibility with proper ARIA labels
```

### 4. Section Organization: Solo vs Team Dancers

**Layout Structure:**
```
Artist Page
├── Search Section (top)
├── Solo Dancers Section
│   ├── Section Header with count
│   ├── Filter/Sort options (specialty, alphabetical)
│   └── Dancer Cards Grid
└── Team Dancers Section
    ├── Section Header with count
    ├── Filter/Sort options
    └── Team Cards Grid
```

**Data Model Extension:**
```typescript
interface Dancer {
  id: string;
  koreanName: string;
  englishName: string;
  specialty: string;
  image: string;
  type: 'solo' | 'team';
  // Additional Spotify-style fields
  isVerified?: boolean;
  followers?: number;
  monthlyListeners?: number; // Equivalent to performance stats
  genres?: string[];
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
}

interface Team {
  id: string;
  teamName: string;
  koreanName?: string;
  members: Dancer[];
  image: string;
  specialty: string;
  formedYear: number;
}
```

### 5. Dancer Card Layouts - Spotify Style

**Solo Dancer Cards:**
- **Size**: 320x400px (4:5 aspect ratio, Spotify artist card standard)
- **Layout**: Image background with bottom gradient overlay
- **Content Hierarchy**:
  1. Background image (full card)
  2. Gradient overlay (bottom 40%)
  3. Primary name (Korean, larger)
  4. Secondary name (English, smaller)
  5. Specialty badge (top-right corner)
  6. Verified badge (if applicable)

**Team Dancer Cards:**
- **Size**: 320x240px (4:3 aspect ratio, Spotify playlist style)
- **Layout**: Team photo with member count indicator
- **Content**: Team name, member count, formation year

**Interactive States:**
- **Hover**: Subtle scale (1.02x), shadow enhancement, play button overlay
- **Active**: Pressed state with slight scale down (0.98x)
- **Loading**: Skeleton animation matching card dimensions

### 6. Typography System

**Hierarchy (following Spotify's approach):**
```css
/* Page Title */
.title-xl { font-size: 3rem; font-weight: 900; line-height: 1.1; }

/* Section Headers */
.title-lg { font-size: 2rem; font-weight: 700; line-height: 1.2; }

/* Card Primary Text (Korean names) */
.text-card-primary { font-size: 1.125rem; font-weight: 600; line-height: 1.3; }

/* Card Secondary Text (English names) */
.text-card-secondary { font-size: 0.875rem; font-weight: 400; line-height: 1.4; }

/* Specialty Badges */
.text-badge { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.05em; }
```

### 7. Animation and Micro-interactions

**Framer Motion Animations:**
```typescript
// Card hover animation
const cardVariants = {
  initial: { scale: 1, rotateY: 0 },
  hover: {
    scale: 1.02,
    rotateY: 2,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

// Stagger animation for card grid
const gridVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Page load animation
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
```

### 8. File Structure and Components

**New Files to Create:**
```
app/artists/
├── page.tsx                 # Main artist page
├── components/
│   ├── ArtistSearch.tsx     # Search component
│   ├── DancerCard.tsx       # Individual dancer card
│   ├── TeamCard.tsx         # Team card component
│   ├── SectionHeader.tsx    # Section title with count
│   ├── FilterBar.tsx        # Filter and sort options
│   └── DancerGrid.tsx       # Grid layout component
├── hooks/
│   ├── useSearch.ts         # Search functionality hook
│   ├── useFilter.ts         # Filter and sort hook
│   └── useDancers.ts        # Data fetching hook
└── types/
    └── dancer.ts            # TypeScript interfaces
```

**Updated Files:**
```
app/globals.css              # Add Spotify color variables
components/ui/               # Add new shadcn components
```

### 9. Component Specifications

#### ArtistSearch Component
```typescript
interface ArtistSearchProps {
  onSearch: (query: string) => void;
  totalResults: number;
  isLoading?: boolean;
}

// Features:
// - Debounced search (300ms)
// - Placeholder text with Korean/English examples
// - Results counter
// - Clear button with smooth animation
// - Keyboard shortcuts (/ to focus, Escape to clear)
```

#### DancerCard Component
```typescript
interface DancerCardProps {
  dancer: Dancer;
  onClick?: (dancer: Dancer) => void;
  size?: 'small' | 'medium' | 'large';
  showPlayButton?: boolean;
}

// Features:
// - Lazy loading images with skeleton
// - Progressive image enhancement
// - Accessibility with proper alt text
// - Hover animations with Framer Motion
// - Badge system for verification/specialty
```

#### SectionHeader Component
```typescript
interface SectionHeaderProps {
  title: string;
  count: number;
  subtitle?: string;
  actions?: React.ReactNode;
}

// Features:
// - Animated count updates
// - Consistent spacing with Spotify style
// - Optional action buttons (filters, sort)
```

### 10. Responsive Design Breakpoints

**Grid Layouts:**
- **Mobile (320-768px)**: 1 column, vertical stack
- **Tablet (768-1024px)**: 2-3 columns
- **Desktop (1024-1440px)**: 4 columns
- **Large Desktop (1440px+)**: 5-6 columns

**Search Bar:**
- **Mobile**: Full width with bottom margin
- **Desktop**: Centered, max-width 600px

### 11. Accessibility Considerations

**ARIA Implementation:**
- Search landmarks and live regions
- Card role and state descriptions
- Keyboard navigation support
- Screen reader announcements for dynamic content
- High contrast mode support

**Keyboard Navigation:**
- Tab order: Search → Filter → Cards (left-to-right, top-to-bottom)
- Enter/Space: Activate cards
- Arrow keys: Navigate between cards
- Escape: Clear search/close modals

### 12. Performance Optimizations

**Image Handling:**
- WebP format with JPEG fallback
- Responsive images with srcSet
- Lazy loading with intersection observer
- Progressive loading with blur placeholders

**Data Management:**
- Virtual scrolling for large datasets
- Debounced search to prevent API spam
- Caching with React Query or SWR
- Pagination for team lists

### 13. Dark Theme Implementation

**Enhanced Dark Mode:**
- Spotify's signature dark backgrounds
- Proper contrast ratios (WCAG AA compliant)
- Subtle gradients for depth
- Consistent with existing project theme

### 14. Integration with Existing Codebase

**Navigation Integration:**
- Update main navigation to include Artists page
- Breadcrumb navigation for deep links
- Consistent header/footer integration

**State Management:**
- Use existing patterns from project
- Consider Zustand or Context for search state
- URL state synchronization for sharing

## Implementation Priority

### Phase 1: Core Structure (Week 1)
1. Set up basic page structure and routing
2. Install required shadcn/ui components
3. Create basic DancerCard and search components
4. Implement responsive grid layout

### Phase 2: Enhanced UI (Week 2)
1. Apply Spotify color scheme and styling
2. Add animations and micro-interactions
3. Implement advanced search functionality
4. Add filter and sort capabilities

### Phase 3: Polish & Performance (Week 3)
1. Optimize images and loading states
2. Add accessibility features
3. Performance testing and optimization
4. Cross-browser testing

## Testing Strategy

**Component Testing:**
- Unit tests for search functionality
- Visual regression tests for cards
- Accessibility testing with jest-axe

**Integration Testing:**
- Search and filter interactions
- Responsive behavior across devices
- Performance under load

## Success Metrics

**User Experience:**
- Search results appear within 200ms
- Cards load smoothly without layout shift
- Smooth 60fps animations on modern devices
- 100% keyboard navigable

**Performance:**
- Page load time < 2 seconds
- Image loading optimized with lazy loading
- Lighthouse score > 90 for accessibility and performance

## Conclusion

This implementation plan provides a comprehensive roadmap for creating a Spotify-style artist page that enhances the existing GRIGO Entertainment website. The design maintains consistency with Spotify's proven patterns while adapting to the specific needs of a dance entertainment company.

The modular approach ensures maintainability, while the focus on accessibility and performance guarantees a professional user experience that matches modern web standards.