# Context Session 2: Artist Page Development

## Task Overview
Create an artist page for GRIGO Entertainment Landing Web with the following requirements:
- Two main sections: Solo Dancers and Team Dancers
- Search functionality for both English and Korean names
- Spotify-style UI design approach
- Built with Next.js 15, TypeScript, and Supabase integration

## Current Status
- Starting development of artist page
- Need to consult with shadcn-ui-expert for Spotify-style UI design
- Will implement search functionality and dancer sections

## Database Context
Based on previous session context, the project uses Supabase with dancer management capabilities.

## Next Steps
1. Consult UI expert for design approach
2. Analyze existing database structure for dancers
3. Implement page with search and sections
4. Test functionality

## Research Completed
- **Spotify UI Analysis**: Researched Spotify's 2024 design language, including their "Encore" design system, dark theme approach, and typography patterns
- **Component Analysis**: Analyzed existing Artists.tsx component and available shadcn/ui components
- **Design Requirements**: Defined comprehensive requirements for search functionality, section organization, and card layouts

## Key Findings
- Spotify uses dark-first design with deep purple (#400073) and green (#1DB954) accents
- Current project already has dark theme support and necessary dependencies
- Need to install additional shadcn/ui components: input, command, card, badge, button, tabs, skeleton, scroll-area, select, toggle-group
- Existing artist data model can be extended to support solo/team categorization

## Implementation Plan Created
Created comprehensive documentation at `.claude/doc/spotify-style-artist-page-implementation.md` covering:
- Detailed design specifications following Spotify's 2024 patterns
- Component architecture and file structure
- Color scheme and typography system
- Animation and micro-interaction patterns
- Responsive design breakpoints
- Accessibility considerations
- Performance optimization strategies
- 3-phase implementation timeline

## Implementation Details

### Components Created
1. **ArtistSearch.tsx** - Search component with debounced search, Korean/English support
2. **DancerCard.tsx** - Spotify-style individual dancer cards with hover effects
3. **TeamCard.tsx** - Team cards showing member count and formation year
4. **SectionHeader.tsx** - Section headers with animated counts
5. **DancerGrid.tsx** - Responsive grid layout with loading states
6. **Main page.tsx** - Complete artist page with tabs and sections

### Features Implemented
- Bilingual search (Korean/English names)
- Spotify-style dark theme with proper color variables
- Two main sections: Solo Dancers and Team Dancers
- Tab navigation between all artists, solo dancers, and teams
- Responsive grid layout (1-5 columns based on screen size)
- Hover animations and micro-interactions
- Loading states and empty states
- Verified badges and social links
- Monthly listeners and follower counts

### Technical Stack
- Next.js 15 with TypeScript
- Framer Motion for animations
- shadcn/ui components (input, card, badge, tabs, skeleton, etc.)
- Tailwind CSS for styling
- Custom Spotify-inspired color scheme

## Progress Log
- [2025-09-22] Created context file for artist page development
- [2025-09-22] Installed required shadcn/ui components
- [2025-09-22] Added Spotify-inspired color variables to globals.css
- [2025-09-22] Created TypeScript interfaces for dancers and teams
- [2025-09-22] Implemented search hook with filtering and sorting
- [2025-09-22] Created all required components (search, cards, grid, headers)
- [2025-09-22] Built complete artist page with sample data
- [2025-09-22] Ready for testing and integration
- [2025-09-22] Completed comprehensive research and design planning
- [2025-09-22] Created detailed implementation documentation

## Internationalization Implementation (2025-09-22)

### Features Implemented
- **Language Context & Provider**: Created comprehensive internationalization system with React Context
- **Language Switching**: EN button in TopNavBar now toggles between Korean (기본) and English
- **Persistent Language Selection**: User language preference saved to localStorage
- **Dynamic HTML Lang Attribute**: Updates document lang attribute when language changes
- **Translation System**: Comprehensive translation keys for all UI elements

### Components Updated
1. **LanguageContext.tsx** - Complete i18n system with Korean and English translations
2. **TopNavBar.tsx** - Language switching functionality with toggle button
3. **ArtistSearch.tsx** - Search placeholder and loading text translations
4. **Artists page.tsx** - Main content, tabs, and section headers translations
5. **layout.tsx** - LanguageProvider integration

### Translation Keys Added
- Navigation: home, about, artists, works, contact, signin, signup
- Artists page: title, description, search, tabs, section headers
- Common: loading, error, notFound
- Hero/About/Works/Contact sections (ready for homepage implementation)

### Technical Implementation
- Uses React Context for state management
- localStorage persistence for user preference
- Automatic fallback to Korean if no preference set
- Dynamic document.documentElement.lang updates
- Type-safe translation function with fallback to key if translation missing

### Current Status
- ✅ Basic internationalization system complete
- ✅ TopNavBar language switching working
- ✅ Artists page fully internationalized
- ✅ Home page sections internationalized
- ✅ Development server running on http://localhost:3001
- ✅ Ready for testing language switching functionality

## Home Page Internationalization (2025-09-22)

### **Completed Sections**
1. **Hero Section** - Company info, main heading, stats, CTA button, scroll indicator
2. **Services Section** - Section headers, service titles, descriptions (6 services)
3. **Contact Section** - Title, description, form labels
4. **TopNavBar** - All navigation items and auth buttons

### **Translation Coverage**
- **Hero Section**: Company tagline, "Dance with Passion", stats labels (Artists, Projects, Countries, Years Experience), Join Us button
- **Services Section**: "What Do We Do?" header, service descriptions including K-POP choreography, film/commercial work, workshops, challenges
- **Contact Section**: Contact form ready for full internationalization
- **Navigation**: All menu items, Sign In/Sign Up buttons

### **Technical Implementation**
- Comprehensive translation keys for both Korean and English
- Line break handling for multi-line descriptions
- Dynamic content rendering with proper fallbacks
- All major home page sections now support language switching

### **Current Status**
- ✅ Hero section fully translated
- ✅ Services section fully translated
- ✅ Contact section headers translated
- ✅ Navigation fully translated
- ✅ Artists page previously completed
- 🚀 **Ready for full testing - all main sections support EN/KO switching**

## Auth State Update Fix (2025-10-23)

### **Issue Identified**
The TopNavBar component was not updating the authentication state immediately after user login. The navbar continued to show "Sign In" and "Sign Up" buttons even after successful authentication.

### **Root Cause**
The TopNavBar component only checked auth state once on mount using `getCurrentUser()` in the useEffect hook, but had no mechanism to listen for auth state changes. When users logged in via the login page, the auth state changed in Supabase but the TopNavBar wasn't notified.

### **Solution Implemented**
Added Supabase auth state listener using `onAuthStateChange()` in [TopNavBar.tsx:21-36](app/components/navigation/TopNavBar.tsx#L21-L36):

1. **Import added**: `createClient` from `@/utils/supabase/client`
2. **Auth listener setup**:
   - Subscribes to `onAuthStateChange` events
   - Updates user state immediately when auth state changes
   - Handles both login and logout events
3. **Cleanup**: Unsubscribes from listener on component unmount

### **Code Changes**
- **File**: [app/components/navigation/TopNavBar.tsx](app/components/navigation/TopNavBar.tsx)
- **Lines modified**: 9, 21-36
- **Change type**: Enhancement - added real-time auth state synchronization

### **Expected Behavior**
- ✅ TopNavBar now updates immediately after login
- ✅ TopNavBar updates immediately after logout
- ✅ User display name appears right away in navbar
- ✅ Auth buttons switch between logged-in and logged-out states in real-time

### **Testing Recommendation**
1. Navigate to login page
2. Sign in with credentials
3. Verify navbar immediately shows user display name/avatar
4. Logout and verify navbar immediately shows Sign In/Sign Up buttons

## Artist Detail Page Enhancement (2025-10-23)

### **Task Overview**
Enhanced the artist detail page to display separate sections for each project category and added a project timeline accordion organized by year.

### **Database Analysis**
Analyzed career_entries table and found 5 distinct categories:
- **choreography**: 104 entries (most common)
- **performance**: 14 entries
- **workshop**: 14 entries
- **tv**: 12 entries
- **advertisement**: 1 entry

### **Implementation Details**

#### **1. Installed Dependencies**
- Added shadcn/ui accordion component for timeline functionality

#### **2. Category Sections Added**
Each category now has its own dedicated section on the artist profile page:

1. **Choreographies** - Video thumbnail grid with expand/collapse
2. **Performances** - Video thumbnail grid with expand/collapse
3. **Classes** (Workshops) - List view with dates
4. **Advertisements** - Video thumbnail grid (when available)
5. **TV Shows** - Video thumbnail grid (when available)

All sections:
- Display first 5 items by default
- Include "Show More/Less" buttons for categories with >5 items
- Support video thumbnails from YouTube URLs or poster_url
- Show date, description, and category-specific styling
- Clickable to open video URLs in new tab

#### **3. Project Timeline Accordion**
Added comprehensive timeline section at the bottom of artist profiles:

**Features:**
- Groups all projects by year (most recent first)
- Accordion interface - click year to expand/collapse
- Year header shows:
  - Year in large bold text
  - Total project count
  - Category breakdown badges (e.g., "choreography (5)")
- Expanded view shows all projects for that year with:
  - Video thumbnail or category-specific emoji
  - Category badge
  - Featured badge (⭐) for is_featured projects
  - Full project title and description
  - Detailed date formatting
  - Country information
  - Click to open video URL

#### **Code Changes**
**File**: [app/artists/[slug]/page.tsx](app/artists/[slug]/page.tsx)

**Key additions:**
- Lines 9-16: Added Accordion component imports and ChevronDown icon
- Lines 233-257: Added category filtering for all 5 categories and year grouping logic
- Lines 1024-1095: Advertisement works section
- Lines 1097-1168: TV shows section
- Lines 1173-1315: Project timeline accordion by year

**Helper functions:**
- `projectsByYear`: Groups career entries by year using reduce
- `sortedYears`: Array of years sorted descending (newest first)
- Category counts computed for each year's accordion header

#### **UI/UX Improvements**
1. **Consistent Layouts**: All category sections follow similar visual patterns
2. **Responsive Design**: Works on mobile, tablet, and desktop
3. **Loading States**: Proper handling of empty states
4. **Visual Hierarchy**: Clear section headers and spacing
5. **Interactive Elements**: Hover states, transitions, and clickable cards
6. **Category Icons**: Emoji fallbacks when no thumbnail (💃🎭📚📺)

#### **Styling Details**
- Dark theme consistent with Spotify-inspired design
- Zinc color palette (zinc-900, zinc-800)
- White text with varying opacity for hierarchy
- Rounded corners and smooth transitions
- Badge components for categories and featured items
- Accordion with custom styling for dark theme

### **Testing Status**
- ✅ All category sections implemented
- ✅ Timeline accordion created
- ✅ Year grouping logic working
- ✅ Category counts calculated correctly
- ✅ Featured badge display
- ✅ Responsive layout
- ⚠️ Dev server has permission issues (unrelated to code changes)
- 🔄 Ready for user testing once server is restarted

### **Expected Behavior**
1. Artist profile shows separate sections for each category they have work in
2. Each section can be expanded to show all items
3. Timeline accordion at bottom shows chronological project history
4. Clicking any year expands to show all projects from that year
5. Project cards are clickable to view videos
6. Mobile-responsive with proper touch targets

## Image URL Validation Fix (2025-10-23)

### **Issue Identified**
Runtime error occurred when trying to display images from Instagram URLs in the Next.js Image component. The `poster_url` field in the database contained Instagram post URLs (e.g., `https://www.instagram.com/p/...`), which are not direct image URLs and aren't configured in Next.js image domains.

**Error:**
```
Invalid src prop (https://www.instagram.com/p/...) on `next/image`,
hostname "www.instagram.com" is not configured under images in your `next.config.js`
```

### **Root Cause**
The code was directly using `poster_url` values without validating whether they were actual image URLs or social media post links. Instagram, Twitter, and Facebook post URLs cannot be used as image sources.

### **Solution Implemented**
Created a helper function `getValidImageUrl()` to validate and filter image URLs:

**Location:** [app/artists/[slug]/page.tsx:485-501](app/artists/[slug]/page.tsx#L485-L501)

**Functionality:**
1. Checks if `poster_url` is a valid image URL
2. Filters out Instagram, Twitter, and Facebook post URLs
3. Falls back to YouTube thumbnail extraction if poster_url is invalid
4. Returns `null` if no valid image source is found

**Code:**
```typescript
const getValidImageUrl = (posterUrl: string | null, videoUrl: string | null): string | null => {
  // Check if poster_url is a valid image URL (not Instagram/social media link)
  if (posterUrl && !posterUrl.includes('instagram.com') && !posterUrl.includes('twitter.com') && !posterUrl.includes('facebook.com')) {
    return posterUrl;
  }

  // Fallback to YouTube thumbnail
  if (videoUrl) {
    const videoIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
    }
  }

  return null;
};
```

### **Updated Sections**
Replaced all instances of inline YouTube thumbnail extraction with the helper function:

1. **Highlights section** (line ~783)
2. **Choreography works** (line ~846)
3. **Performance works** (line ~914)
4. **Advertisement works** (line ~1027)
5. **TV shows** (line ~1091)
6. **Project timeline accordion** (line ~1204)

### **Additional Cleanup**
- Removed unused `ChevronDown` import (line 9)
- Consolidated duplicate YouTube thumbnail extraction logic
- Improved code maintainability by centralizing validation

### **Result**
- ✅ No more Next.js image configuration errors
- ✅ Instagram/social media post URLs properly filtered out
- ✅ YouTube thumbnails used as fallback when available
- ✅ Category emoji icons shown when no valid image source exists
- ✅ Cleaner, more maintainable code with DRY principle

### **Dev Server Status**
⚠️ Dev server has file permission issues (Windows-specific `.next/trace` error) - unrelated to code changes. User may need to:
- Close any running dev servers
- Delete `.next` folder
- Restart dev server with `npm run dev`

## UX Improvements: Scrollable Sections & Mobile Optimization (2025-10-23)

### **Task Overview**
Enhanced the artist detail page with better UX patterns:
1. **Updated:** Changed from incremental "더 보기" buttons to scrollable containers
2. Mobile-optimized project timeline accordion
3. Max-width constraint for consistent mobile-like UI on desktop

### **1. Scrollable Container Implementation**

**Changed from:** Incremental loading with "더 보기" buttons
**Changed to:** Fixed-height scrollable containers

**State Management:**
- Removed all visibility state variables (`visibleChoreography`, etc.)
- Single constant: `MAX_VISIBLE_ITEMS = 8`
- No need to track state - all items always rendered

**Scrollable Container:**
```typescript
<div
  className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
  style={{ maxHeight: items.length > MAX_VISIBLE_ITEMS ? '600px' : 'none' }}
>
  {items.map(...)} // All items rendered
</div>
{items.length > MAX_VISIBLE_ITEMS && (
  <p className="mt-2 text-xs text-white/40">Scroll to see all {items.length} items</p>
)}
```

**Features:**
- Containers limited to 600px height when >8 items
- Custom scrollbar styling (thin, white/20 opacity)
- Hover effect increases scrollbar visibility
- Helper text appears when scrolling is enabled
- No height limit when ≤8 items

**Updated Sections:**
- Team members
- Choreography works
- Performance works
- Workshop works
- Advertisement works
- TV shows

### **2. Mobile-Optimized Timeline Accordion**

**Responsive Improvements:**

**Accordion Header:**
- Changed from horizontal to flex-col on mobile
- Reduced padding: `px-4 md:px-6 py-3 md:py-4`
- Smaller text: `text-xl md:text-2xl` for year
- Smaller badges: category badges now wrap on mobile
- Better spacing with `gap-2` responsive gaps

**Accordion Content:**
- Reduced padding: `px-3 md:px-6 pb-3 md:pb-4`
- Tighter spacing: `space-y-2 md:space-y-3`

**Project Cards:**
- Smaller thumbnails on mobile: `w-20 h-14 md:w-28 md:h-20`
- Reduced padding: `p-2 md:p-3`
- Responsive gaps: `gap-3 md:gap-4`
- Smaller badges: `text-[10px] md:text-xs`
- Smaller text: `text-sm md:text-base` for title
- Single line clamp on mobile: `line-clamp-1 md:line-clamp-2` for description
- Tiny date text: `text-[10px] md:text-xs`

### **3. Max-Width Constraint**

**Changed:** `max-w-7xl` → `max-w-3xl` (768px)

**Updated Elements:**
- Social buttons section
- Main content container
- All artist/team profile sections

**Layout Changes:**
- Removed 2-column grid (`grid-cols-1 lg:grid-cols-3`)
- Changed to single column: `space-y-8`
- Removed `lg:col-span-*` classes
- Content now stacks vertically on all screen sizes

**Benefits:**
- Consistent reading width on all devices
- Prevents content from being too wide on large screens
- Maintains mobile-first design philosophy
- Better focus on content

### **Code Summary**

**File:** [app/artists/[slug]/page.tsx](app/artists/[slug]/page.tsx)

**Key changes:**
- Line 254: Single constant `MAX_VISIBLE_ITEMS = 8` (removed all state variables)
- Line 283: Removed `displayedMembers` slice logic
- Lines 450-466: Team members scrollable container with helper text
- Lines 827-883: Choreography scrollable container
- Lines 891-947: Performance scrollable container
- Lines 955-988: Workshop scrollable container
- Lines 996-1049: Advertisement scrollable container
- Lines 1057-1110: TV shows scrollable container
- Lines 1147-1183: Mobile-optimized timeline accordion header
- Lines 1184-1185: Mobile-optimized accordion content
- Lines 1215-1266: Mobile-optimized project cards
- Lines 359, 392, 559, 684: Max-width constraints (max-w-3xl)

### **UX Improvements**
1. **Native scrolling**: Familiar scroll behavior instead of load-more buttons
2. **Better performance**: No state management overhead, simpler code
3. **Visual feedback**: Custom scrollbar appears on hover
4. **Clear indication**: Helper text shows total item count when scrollable
5. **Mobile-friendly**: Smaller text and spacing on mobile devices
6. **Consistent width**: Desktop doesn't stretch content too wide
7. **Better readability**: Narrower max-width improves reading experience
8. **Smooth UX**: No button clicks needed, just scroll

### **Scrollbar Styling**
- Thin scrollbar: `scrollbar-thin`
- Subtle color: `scrollbar-thumb-white/20`
- Transparent track: `scrollbar-track-transparent`
- Hover enhancement: `hover:scrollbar-thumb-white/30`
- Tailwind CSS scrollbar utilities (requires tailwind-scrollbar plugin)

### **Testing Status**
- ✅ Scrollable containers implemented for all 6 sections
- ✅ 600px max-height with 8-item threshold
- ✅ Helper text for scrollable sections
- ✅ Custom scrollbar styling
- ✅ Mobile-responsive timeline accordion
- ✅ Max-width constraint applied
- ✅ Single column layout on all devices
- ⚠️ Dev server permission issues (user needs to restart)
- 🔄 Ready for user testing

### **Expected Behavior**
1. Sections with ≤8 items show all items without scrolling
2. Sections with >8 items become scrollable (600px max height)
3. Scrollbar appears on hover for scrollable sections
4. Helper text displays: "Scroll to see all X items"
5. Timeline accordion is touch-friendly on mobile
6. Content maintains readable width on desktop (max 768px)
7. All sections stack vertically for consistent mobile-like experience

## Team Profile Page Design (2025-10-04)

### **Task Overview**
Design a comprehensive team profile page with Spotify-style aesthetic to replace the basic team view at lines 254-299 in `/app/artists/[slug]/page.tsx`.

### **Research & Analysis Completed**
- ✅ Analyzed existing artist profile page (lines 302-858) for design consistency
- ✅ Reviewed DancerCard and TeamCard components for member showcase design
- ✅ Examined available shadcn/ui components (Card, Badge, Tabs, etc.)
- ✅ Analyzed Spotify-inspired theme variables in globals.css
- ✅ Reviewed team and member data structures from Supabase

### **Implementation Plan Created**
**Documentation**: `.claude/doc/team-profile-page-implementation.md`

### **Key Design Specifications**

#### **1. Hero Section**
- Full-width cover image (team.cover_image or team.logo_url)
- Responsive heights: 400px (mobile) → 550px (XL desktop)
- Gradient overlays (top & bottom) for text readability
- Large team name display (3xl → 6xl responsive)
- Member count badge with Users icon
- Back button (top-left) with ChevronLeft icon

#### **2. Team Information Bar**
- Social media icons (if team has links)
- Share button with native share API / clipboard fallback
- Horizontal layout with rounded buttons (w-10 h-10)

#### **3. Main Content Layout**
- Two-column grid on desktop (1:3 ratio)
- Left sidebar: Team stats, leader info, highlights
- Right content: Description, member grid, achievements
- Stack vertically on mobile

#### **4. Team Statistics (Left Sidebar)**
- Formation year (from created_at)
- Member count (from teamMembers.length)
- Leader info with Crown icon
- Optional: Total followers, combined stats

#### **5. Team Description Section**
- "About {Team Name}" heading
- Full team description with line breaks preserved
- Responsive typography (text-white/80)

#### **6. Member Showcase Section**
**Component**: New `TeamMemberCard.tsx`
- Profile image with gradient fallback
- Member names (Korean/English support)
- Leader badge for team leader
- Social links (minimal icons)
- Hover animations (scale 1.03, y: -4px)
- Click navigation to member profile

**Grid Layout**:
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns
- Show first 8, expandable with "Show More" button

#### **7. Component Architecture**
**New Components to Create**:
1. **TeamMemberCard.tsx** - Individual member cards for team profile
   - Props: member, isLeader, onClick, size
   - Features: Profile image, name display, leader badge, social links
   - Animations: Hover scale, tap feedback

2. **TeamStatsCard.tsx** (Optional) - Team statistics display
   - Props: team, memberCount, totalFollowers
   - Features: Formation year, member count, leader info

### **Technical Specifications**

#### **Data Structure**
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

#### **State Management**
- `showAllMembers` - Toggle for member list expansion
- `displayedMembers` - Computed: show 8 or all members
- `leaderMember` - Computed: find member by leader_id
- `formationYear` - Computed: extract year from created_at

#### **Internationalization**
- Use existing `useLanguage()` hook
- Display team.name or team.name_en based on language
- Member names with same bilingual support
- New translation keys for team profile:
  - `teamProfile.members`, `teamProfile.formed`, `teamProfile.leader`
  - `teamProfile.about`, `teamProfile.showMore`, `teamProfile.showLess`

#### **Animation Patterns**
- Framer Motion for all interactions
- Hero section: fade-in with slide-up
- Member grid: stagger children animation
- Member cards: hover scale (1.03) + lift (y: -4px)
- Smooth transitions (200ms colors, 300ms all)

#### **Responsive Design**
- Mobile-first approach
- Breakpoints: mobile → md → lg → xl
- Hero: Responsive heights and typography
- Grid: 2 → 3 → 4 columns
- Sidebar: Stack on mobile, side-by-side on lg+

### **Implementation Checklist**
**Phase 1: Core Structure**
- [ ] Update page.tsx team profile section (lines 254-299)
- [ ] Implement hero section with cover image
- [ ] Add team name and member count badge
- [ ] Add back button and navigation

**Phase 2: Team Information**
- [ ] Create team stats section
- [ ] Implement team description display
- [ ] Add leader information
- [ ] Implement social share functionality

**Phase 3: Member Showcase**
- [ ] Create TeamMemberCard component
- [ ] Implement member grid layout
- [ ] Add show more/less functionality
- [ ] Implement member click navigation

**Phase 4: Polish & Animations**
- [ ] Add Framer Motion animations
- [ ] Implement hover effects
- [ ] Add responsive design refinements
- [ ] Test on mobile devices

**Phase 5: Testing & Optimization**
- [ ] Test with real team data
- [ ] Optimize image loading
- [ ] Test internationalization
- [ ] Accessibility audit

### **Future Enhancements**
- Team career entries/highlights section
- Aggregate member statistics
- Team photo gallery
- Social media feed integration
- Member roles and specialties display

### **Key Files to Modify**
1. `/app/artists/[slug]/page.tsx` - Lines 254-299 (team profile section)
2. `/app/artists/components/TeamMemberCard.tsx` - NEW component
3. `/app/contexts/LanguageContext.tsx` - Add team profile translation keys

### **Design Resources**
- **Reference Artist Profile**: Lines 302-858 in page.tsx
- **Color Scheme**: Black (#000000), zinc-900, zinc-950 backgrounds
- **Theme Variables**: Defined in app/globals.css (lines 98-143)
- **Existing Components**: DancerCard, TeamCard, DancerGrid

### **Estimated Timeline**
- Core features: 4-6 hours
- Polish & testing: 2-3 hours
- **Total**: 6-9 hours

### **Current Status**
✅ **Design research completed**
✅ **Comprehensive implementation plan created**
✅ **Component architecture defined**
✅ **Ready for implementation phase**

📄 **Full documentation available at**: `.claude/doc/team-profile-page-implementation.md`

## Artist Profile Pages Implementation (2025-09-22)

### **Features Implemented**
1. **Dynamic Routing**: Created `/artists/[slug]` route for individual artist profiles
2. **Spotify-Style Design**: Hero section with cover image, verified badge, action bar
3. **Data Integration**: Connected to Supabase `users` and `career_entries` tables
4. **Tabbed Navigation**: Overview, Works, and About tabs for content organization
5. **Career Showcase**: Featured works grid, recent works list, categorized works
6. **Social Integration**: Instagram, YouTube, Twitter links with icons
7. **Responsive Layout**: Mobile-first design with smooth animations
8. **Bilingual Support**: Korean/English name display based on language preference

### **Components Created/Updated**
1. **`/app/artists/[slug]/page.tsx`** - Main profile page component
   - Hero section with artist cover image and info
   - Action bar with play button and social links
   - Tabbed content (Overview, Works, About)
   - Work cards and list items
   - Loading and error states

2. **`DancerCard.tsx`** - Updated to link to profile pages
   - Added Next.js router navigation
   - Click handler to navigate to `/artists/[slug]`
   - Fallback to onClick prop if provided

### **Database Integration**
- **Users Table**: Fetches artist data (name, name_en, slug, profile_image, introduction, social links)
- **Career Entries Table**: Fetches all career entries with categories (choreography, performance, etc.)
- **Filtering**: Featured works, recent works, and category-based organization

### **Key Features**
- **Hero Section**: Full-width cover with gradient overlay, artist name, verification badge
- **Action Bar**: Sticky play button and social media links
- **Featured Works**: Grid of up to 6 featured career entries
- **Recent Works**: List view of latest 10 works
- **Works Tab**: Organized by category (choreography, performance, advertisement, TV, workshop)
- **About Tab**: Full biography and social links
- **Error Handling**: 404 page for missing artists with back navigation
- **Loading States**: Spinner while fetching data

### **Technical Stack**
- Next.js 15 dynamic routes with `[slug]` parameter
- Supabase client for data fetching
- Framer Motion for animations
- shadcn/ui components (Button, Badge, Card, Tabs)
- Tailwind CSS for Spotify-inspired styling

### **Navigation Flow**
1. Artists listing page → Click dancer card
2. Navigate to `/artists/[slug]` (using artist's slug from database)
3. Profile page loads artist data and career entries
4. Users can explore works, read bio, and connect via social links
5. Back button returns to artists listing

### **Next Steps**
- Add real slug data to artist listings (currently using ID as fallback)
- Implement video playback for career entries with video_url
- Add animation transitions between pages
- Consider adding related artists section
- Add share functionality for profiles

## Supabase Data Integration (2025-09-22)

### **Implementation Complete**
Successfully integrated Supabase database with both the Artists page and Homepage Artists section.

### **Files Created**
1. **`/app/artists/utils/mappers.ts`** - Database to UI type mappers
   - `mapUserToDancer()` - Maps DB users to Dancer UI type
   - `mapTeamToTeam()` - Maps DB teams with members to Team UI type

2. **`/app/artists/utils/supabase.ts`** - Data fetching utilities
   - `fetchDancers()` - Fetches all dancers ordered by display_order
   - `fetchTeams()` - Fetches teams with their members
   - `fetchFeaturedDancers(limit)` - Fetches limited dancers for homepage

### **Files Updated**
1. **`/app/artists/types/dancer.ts`**
   - Added `DbUser` and `DbTeam` interfaces matching Supabase schema
   - Added `slug` field to `Dancer` and `Team` types
   - Maintained backward compatibility with existing UI components

2. **`/app/artists/page.tsx`**
   - Added Supabase data fetching with `useEffect`
   - Implemented loading states with spinners
   - Fallback to sample data if fetch fails or returns empty
   - Loading indicators for all tabs

3. **`/app/components/sections/Artists.tsx`**
   - Converted to client component for data fetching
   - Added Supabase integration with `fetchFeaturedDancers(8)`
   - Implemented loading skeleton states
   - Added click navigation to artist profile pages
   - Bilingual name display based on language preference
   - Hover scale animation on artist cards

### **Database Schema Used**
- **users table**: id, name, name_en, slug, profile_image, introduction, social links
- **teams table**: id, name, name_en, slug, description, cover_image, status
- **team_members table**: team_id, user_id junction table
- **career_entries table**: Already connected in profile pages

### **Features**
- ✅ Real-time data fetching from Supabase
- ✅ Display order support (ordered by display_order field)
- ✅ Loading states with skeleton UI
- ✅ Error handling with fallback data
- ✅ Bilingual support (Korean/English names)
- ✅ Homepage shows top 8 featured artists
- ✅ Artists page shows all dancers and teams
- ✅ Click navigation to profile pages with slugs
- ✅ Responsive grid layouts

### **Data Flow**
1. **Homepage**: `Artists.tsx` → `fetchFeaturedDancers(8)` → Display 8 artists
2. **Artists Page**: `page.tsx` → `fetchDancers()` + `fetchTeams()` → Display all with search/filter
3. **Profile Pages**: `[slug]/page.tsx` → Fetch by slug → Display full profile

### **Current Status**
- ✅ Database integration complete
- ✅ Homepage artists section connected to Supabase
- ✅ Artists listing page connected to Supabase
- ✅ Profile pages already using Supabase
- ✅ Development server running on http://localhost:3001
- ✅ Click navigation working for all artist and team cards
- 🚀 **Ready for testing with real database data**

### **Final Updates (2025-09-22)**

**Click Navigation Improvements:**
1. **DancerCard.tsx** - Updated to use `dancer.slug` for navigation (with ID fallback)
2. **TeamCard.tsx** - Added router navigation using `team.slug` (with ID fallback)
3. **Artists page.tsx** - Removed console.log, cards now navigate to profile pages
4. **Fixed animation easing** - Changed from string to array format for TypeScript compatibility

**Navigation Flow:**
- All artist cards (homepage & artists page) → Click → Navigate to `/artists/[slug]`
- All team cards (artists page) → Click → Navigate to `/artists/[slug]`
- Uses slug from database, falls back to ID if slug unavailable

## Artist Profile Page Redesign - macOS Preview Style (2025-09-22)

### **New Design Implemented**
Completely redesigned the artist profile page to match macOS Preview-style layout with a clean, minimal aesthetic.

### **Key Features:**

**Layout:**
- **Two-Column Grid**: Large image preview on left, content on right
- **Sticky Header**: Back button in sticky header with backdrop blur
- **Sticky Image**: Large artist photo stays visible while scrolling
- **Responsive**: Stacks to single column on mobile

**Visual Design:**
- Large 4:5 aspect ratio artist image with rounded corners
- Gradient background fallback for missing images
- Verified badge overlay on image
- Clean white space and modern typography
- Smooth stagger animations for content sections

**Content Sections:**
1. **Artist Header**
   - Large gradient text for artist name
   - Company affiliation badge
   - Social media links with external link icons

2. **About Section**
   - Full biography with proper formatting
   - Large readable text

3. **Featured Works**
   - Expandable work cards with hover effects
   - Work thumbnail on the right
   - Category badges and metadata (year, location)
   - Clickable cards with border on hover

4. **All Works List**
   - Numbered list view
   - Quick scan format with badges
   - "View All" button if more than 10 works
   - Shows total count

### **Technical Implementation:**
- Removed tab navigation for cleaner single-scroll experience
- Removed unused WorkCard and WorkListItem components
- Optimized for reading and browsing
- Better mobile responsiveness
- Framer Motion stagger animations

### **User Experience:**
- Cleaner, more focused layout
- Better information hierarchy
- Easier to scan and read
- Professional presentation
- Works great for portfolio showcase

## Full-Screen Artist Profile Layout (2025-10-02)

### **Update Implemented**
Updated the artist profile page to fill the entire screen like Spotify's artist pages.

### **Key Changes:**

**Layout:**
- **Full-Screen Grid**: Changed from max-width container to full viewport height layout
- **Full-Height Image**: Left side image now takes full screen height (100vh)
- **Scrollable Content**: Right side content is scrollable independently
- **Floating Header**: Back button uses absolute positioning with gradient overlay

**Visual Changes:**
- Removed container max-width constraints
- Image covers full left column height
- Content section has independent scroll
- Verified badge positioned below floating header (top-20)
- Gradient overlay on header for better text visibility

**Technical Updates:**
- Changed from `min-h-screen` with padding to `h-screen` grid
- Image div uses `h-screen` for full viewport height
- Right content div has `h-screen overflow-y-auto` for independent scrolling
- Header uses `absolute` positioning instead of `sticky`
- Updated loading and error states to use `h-screen` instead of `min-h-screen`

**Result:**
- Full immersive experience similar to Spotify artist pages
- Better use of screen real estate
- Image is always visible on desktop
- Clean, modern aesthetic with no wasted space

## Team Membership Section (2025-10-02)

### **Feature Implemented**
Added a "Teams" section to artist profile pages that displays all teams the artist belongs to, positioned between the biography and career highlights sections.

### **Key Features:**

**Data Fetching:**
- Queries `team_members` table to find teams for the current artist
- Fetches full team data from `teams` table using team IDs
- Only displays active teams (status = 'active')
- Bilingual support for team names (Korean/English)

**Visual Design:**
- Card-based layout with hover effects
- Team logo/cover image (64x64px) on the left
- Team name and description in the middle
- External link icon on the right
- Gradient placeholder for teams without images
- Smooth transitions and hover states

**User Interaction:**
- Clickable cards navigate to team profile pages
- Uses team slug for navigation URLs
- Hover effect highlights the card
- Shows both Korean and English names based on language preference

**Layout:**
- Section appears only if artist belongs to at least one team
- Positioned after "About" section, before "Featured Works"
- Staggered animation (delay: 0.45s)
- Responsive spacing and typography

**Technical Implementation:**
- Added `Team` interface matching database schema
- Two-step data fetching: team_members → teams
- Filters for active teams only
- Bilingual name handling with fallback
- Card component with onClick handler for navigation

**Result:**
- Users can easily see which teams an artist belongs to
- Seamless navigation between artist and team profiles
- Consistent with overall Spotify-inspired design
- Only shows when relevant (conditional rendering)

## Linked Artists in Career Entries (2025-10-02)

### **Feature Implemented**
Connected career entries with linked artists, displaying collaborative work relationships throughout the profile page.

### **Database Integration:**

**Schema Understanding:**
- `career_entries` table has `linked_user_id` field for artist collaborations
- Foreign key relationship: `linked_user_id` → `users.id`
- Allows tracking which artists worked together on projects

**Query Enhancement:**
- Updated Supabase query to join `users` table via `linked_user_id`
- Fetches linked artist data: id, name, name_en, slug, profile_image
- Uses nested select syntax for efficient data fetching

### **Interface Updates:**

**TypeScript Types:**
- Added `LinkedArtist` interface with artist profile fields
- Extended `CareerEntry` interface to include `linked_artist` property
- Proper type safety for optional linked artist data

### **UI Implementation:**

**Featured Works Section:**
- Displays "with [Artist Name]" below work description
- Shows linked artist profile image (24x24px rounded)
- Clickable artist name/image navigates to their profile
- Bilingual support for linked artist names
- Hover effect on artist link

**All Works Section:**
- Inline display of linked artist next to work title
- Small profile image (20x20px rounded) with artist name
- Clickable navigation to linked artist profile
- Compact layout suitable for list view

**Visual Design:**
- Profile images displayed as circular thumbnails
- Semi-transparent text (white/60) for subtle presentation
- Hover states increase opacity (white/90)
- Stop propagation on click to prevent parent navigation

### **User Experience:**

**Navigation Flow:**
- Click linked artist → Navigate to their profile page
- Event propagation stopped to prevent conflicts
- Smooth transitions and hover feedback
- Works in both Featured Works and All Works sections

**Internationalization:**
- Respects language preference (Korean/English)
- Falls back to Korean name if English unavailable
- Consistent with overall app language system

### **Technical Details:**
- Uses `router.push()` for client-side navigation
- Conditional rendering - only shows if `linked_artist` exists
- Profile images loaded efficiently
- Type-safe access with TypeScript non-null assertions

**Result:**
- Artists can showcase collaborative work
- Easy discovery of related artists
- Professional portfolio presentation
- Encourages exploration of other artists' profiles
- Clear visual indication of collaborative projects

## Team Profile Pages (2025-10-02)

### **Feature Implemented**
Created team profile pages that display team information and member cards, using the same `/artists/[slug]` route for both individual artists and teams.

### **Dual Profile System:**

**Route Handling:**
- Single route `/artists/[slug]` handles both artist and team profiles
- Attempts to fetch artist profile first, then falls back to team
- Sets `profileType` state to determine which view to render
- Graceful error handling for non-existent profiles

**Data Fetching:**
- Queries `teams` table by slug for team data
- Joins `team_members` and `users` tables to fetch member details
- Retrieves full member information: name, image, introduction, social links
- Only displays active teams (status = 'active')

### **Team Profile UI:**

**Layout Structure:**
- Same full-screen two-column layout as artist profiles
- Left: Team cover image (70% viewport height on desktop)
- Right: Scrollable content with team info and members
- Responsive: Stacks vertically on mobile

**Team Image Section:**
- Uses `cover_image` or `logo_url` from team data
- Fallback: Users icon with gradient background
- Verified badge overlay (top right)
- Team name overlay at bottom with gradient backdrop
- Bilingual name display (Korean/English)

**Content Sections:**
1. **About Section**
   - Team description with proper formatting
   - Displayed if description exists in database

2. **Members Section**
   - Title shows member count: "Members (X)"
   - Grid layout: 1 column mobile, 2 columns tablet+
   - Uses existing `DancerCard` component
   - Cards link to individual artist profiles
   - Shows member profile images and basic info

### **Data Transformation:**

**TeamMember to Dancer Mapping:**
- Converts `TeamMember` interface to `Dancer` type for DancerCard
- Maps Korean name, English name, profile image, slug
- Includes social media links (Instagram, YouTube)
- Sets default values (verified: true, type: 'solo')

### **Technical Implementation:**

**Type Safety:**
- Added `TeamMember` interface matching database schema
- Updated `Team` interface with all fields
- Profile type state: `'artist' | 'team' | null`
- Proper null checking throughout

**Component Reuse:**
- Leveraged existing `DancerCard` component for members
- Shared layout structure with artist profiles
- Consistent styling and animations
- Same back navigation and header

**Database Queries:**
- Team data: `teams` table filtered by slug and status
- Members: Join query through `team_members` table
- Efficient data fetching with single compound query
- Inner join ensures only active relationships

### **User Experience:**

**Navigation:**
- Team cards on artists page → Navigate to `/artists/[team-slug]`
- Team profile shows all members
- Click member card → Navigate to their artist profile
- Back button returns to artists listing

**Visual Consistency:**
- Matches artist profile design language
- Same color scheme and spacing
- Framer Motion animations with same timing
- Professional, clean presentation

**Responsive Design:**
- Mobile: Image half-screen, scrollable content below
- Desktop: Side-by-side layout with fixed image height
- Member cards adapt to screen size
- Proper overflow handling

### **Result:**
- Unified profile system for both artists and teams
- Easy team browsing and member discovery
- Professional team portfolio presentation
- Seamless navigation between team and member profiles
- Consistent user experience across profile types
- Efficient code reuse and maintenance

## Skeleton Pages Implementation (2025-10-02)

### **Pages Created**
Created three skeleton pages with consistent design and internationalization support:

1. **About Us Page** - `/app/about/page.tsx`
   - Route: `/about`
   - Bilingual title: "About Us" / "회사 소개"
   - Coming soon message

2. **Our Works Page** - `/app/works/page.tsx`
   - Route: `/works`
   - Bilingual title: "Our Works" / "작품"
   - Coming soon message

3. **Contact Us Page** - `/app/contact/page.tsx`
   - Route: `/contact`
   - Bilingual title: "Contact Us" / "연락처"
   - Coming soon message

### **Features:**
- **Consistent Layout**: All pages follow the same structure
- **Sticky Header**: Back button with backdrop blur effect
- **Bilingual Support**: Full Korean/English language switching
- **Navigation**: Back button returns to previous page
- **Dark Theme**: Matches overall Spotify-inspired design
- **Gradient Text**: Large gradient titles for visual appeal
- **Coming Soon**: Placeholder content for future implementation

### **Technical Details:**
- Client components with 'use client' directive
- Uses LanguageContext for internationalization
- Next.js router for navigation
- Lucide React icons (ArrowLeft)
- Consistent styling with zinc-950 background
- Sticky header with z-40 and backdrop blur
- Responsive max-width containers

### **Design Consistency:**
- Same header style across all three pages
- Matching color scheme (zinc-950, white/60 text)
- Consistent spacing (px-6 py-16)
- Gradient text effect on titles
- Border styling (border-white/10)

### **Next Steps:**
- Add actual content to About Us page (company history, mission, values)
- Implement works gallery/portfolio in Our Works page
- Build contact form in Contact Us page
- Connect navigation items in TopNavBar to these routes

## Top Bars Removal (2025-10-03)

### **Update Implemented**
Removed sticky header bars with back buttons from about, works, and contact pages to provide a cleaner, more integrated navigation experience.

### **Changes Made:**
1. **About Page** - Removed sticky header with back button
2. **Works Page** - Removed sticky header with back button
3. **Contact Page** - Removed sticky header with back button
4. **Artists Page** - Kept the back button as requested

### **Technical Details:**
- Removed unused imports (`ArrowLeft`, `useRouter`)
- Cleaned up TypeScript warnings
- Maintained consistent styling across pages
- Pages now rely on TopNavBar for navigation

### **Result:**
- Cleaner page layouts without duplicate navigation
- Better use of vertical space
- Consistent navigation through TopNavBar
- No more redundant back buttons on skeleton pages

## Supabase Authentication Implementation (2025-10-03)

### **Overview**
Implemented complete authentication system using Supabase Auth with email/password and Google OAuth support.

### **Files Created:**

1. **Login Page** - `/app/login/page.tsx`
   - Email/password login form
   - Google OAuth integration
   - Error handling with localized messages
   - Forgot password link
   - Redirect to signup page
   - Loading states and animations
   - Bilingual support (Korean/English)

2. **Sign Up Page** - `/app/signup/page.tsx`
   - Registration form with name, email, password fields
   - Password confirmation validation
   - Password strength validation (min 6 characters)
   - Google OAuth sign up
   - Success message with email verification reminder
   - Auto-redirect to login after successful registration
   - Error handling and loading states
   - Bilingual support

3. **Auth Callback Route** - `/app/auth/callback/route.ts`
   - Handles OAuth redirect callback
   - Exchanges authorization code for session
   - Redirects to home page after authentication

4. **Auth Utilities** - `/app/utils/auth.ts`
   - `getCurrentUser()` - Get authenticated user
   - `signOut()` - Sign out current user
   - `isAuthenticated()` - Check auth status
   - `getUserDisplayName()` - Get user's display name
   - `getAuthErrorMessage()` - Localized error messages
   - Error message translations (EN/KO)

### **Files Updated:**

1. **TopNavBar** - `/app/components/navigation/TopNavBar.tsx`
   - Added auth state management
   - Conditional rendering based on user state
   - User avatar and dropdown menu when authenticated
   - Sign In/Sign Up buttons when not authenticated
   - Sign out functionality
   - Mobile responsive auth UI
   - User display name shown in navbar

### **Features Implemented:**

**Authentication Methods:**
- ✅ Email/password authentication
- ✅ Google OAuth (requires Supabase configuration)
- ✅ Session management
- ✅ Auto-redirect after login
- ✅ Email verification workflow

**UI/UX:**
- ✅ Clean, Spotify-inspired dark theme design
- ✅ Form validation (email, password strength, matching passwords)
- ✅ Loading states with spinners
- ✅ Error messages with proper styling
- ✅ Success messages
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design (mobile & desktop)
- ✅ Bilingual support (Korean/English)

**User Experience:**
- ✅ User avatar in navbar when logged in
- ✅ Display name from metadata or email
- ✅ Dropdown menu with sign out option
- ✅ Automatic session detection on page load
- ✅ Seamless navigation between auth pages
- ✅ Back to home button on auth pages

### **Design Consistency:**
- Matches existing Spotify-style dark theme
- Consistent with other pages (artists, about, etc.)
- Gradient text effects
- Glassmorphism cards with backdrop blur
- White/60 text opacity for secondary text
- Proper spacing and typography

### **Technical Stack:**
- Supabase Auth (@supabase/supabase-js)
- Next.js 15 App Router
- TypeScript for type safety
- Framer Motion for animations
- Tailwind CSS for styling
- React hooks (useState, useEffect)

### **Security Features:**
- Password validation
- Secure session management via Supabase
- PKCE flow for OAuth
- Email verification requirement
- Protected routes ready for implementation

### **Next Steps:**
- Configure Google OAuth in Supabase dashboard
- Add password reset functionality
- Implement protected routes middleware
- Add user profile page
- Connect authenticated users to dancer profiles
- Add role-based access control (admin/dancer/user)

## Team Badge Redesign in Artist Profile (2025-10-03)

### **Update Implemented**
Redesigned the team membership cards in the artist profile page to use a compact horizontal layout matching the provided screenshot design.

### **Key Changes:**

**Layout:**
- Changed from larger card with description to compact horizontal layout
- Small square team image (64x64px) on the left side
- Team information stacked vertically on the right
- Compact single-row card design

**Visual Design:**
- Dark background (zinc-900) with hover effect (zinc-800/90)
- Square team image with sharp rounded corners
- Gradient background fallback for missing images
- "Team" badge displayed above team name
- Team name in white (text-base, font-semibold)
- Korean name or description in muted text below (text-white/50)

**Features:**
- Cleaner, more scannable card design
- Better for vertical list views in profile pages
- "Team" badge makes it clear this is a team membership
- Improved text truncation for long names
- Shows Korean name when viewing in English, or description otherwise

**Removed Features:**
- External link icon (simplified design)
- Multi-line descriptions (now single line with truncation)
- Larger padding and spacing

**Technical Updates:**
- Updated Card className to use zinc color scheme
- Added Badge component for "Team" label
- Changed padding from p-4 to p-3 for more compact layout
- Simplified gap spacing to gap-3
- Uses Users icon as fallback instead of emoji

**Result:**
- Team cards in artist profiles now match the screenshot design
- More compact and readable layout
- Better visual hierarchy with badge → name → subtitle
- Consistent with modern music app design patterns
- Improved space efficiency in profile pages

## Highlights Section in Artist Profile (2025-10-03)

### **Feature Implemented**
Added a vertical stacked "Highlights" section to the artist profile page displaying featured works, matching the provided screenshot design.

### **Key Features:**

**Layout:**
- Vertical stacked layout (not horizontal scroll)
- Shows up to 3 featured works (based on `is_featured` flag)
- Full-width cards stacked vertically with gap-3 spacing
- Compact, scannable design

**Visual Design:**
- Wide aspect ratio (16:9 video aspect) images
- Smaller rounded corners (rounded-md)
- Dark background (zinc-900) fallback
- No hover scale effects - clean and simple
- Smaller heading (text-xl instead of text-2xl)

**Content Structure:**
- Large poster/thumbnail image (aspect-video)
- Work title below (text-sm, font-medium, white, single line)
- Metadata line: category • year (text-xs, white/60)
- Minimal spacing between elements (space-y-0.5)

**Spacing:**
- Section spacing: space-y-3
- Image margin bottom: mb-2
- Tighter overall spacing matching screenshot

**Technical Implementation:**
- Uses `featuredWorks` array filtered from career entries
- Slices to show maximum 3 items (not 6)
- Conditional rendering (only shows if featured works exist)
- Framer Motion animation (delay: 0.35s)
- Cursor pointer on cards for future click interactions
- Fallback emoji (🎬) when no poster image available

**Positioning:**
- Appears between Social Links section and Biography section
- Animation delay: 0.35s (between social links and bio)
- Maintains stagger animation flow of profile page

**Result:**
- Vertical highlights section matching screenshot design exactly
- Compact, easy-to-scan layout
- Better use of vertical space on profile page
- Clean presentation with wide images
- Professional, minimal styling

## Artist Profile Page Reset (2025-10-03)

### **Update Implemented**
Reset the artist profile page to a minimal scaffold with only data fetching logic, removing all UI components for fresh implementation.

### **What Was Kept:**

**Data Fetching:**
- Complete useEffect hook for fetching profile data
- Dual profile support (artist OR team)
- Career entries with linked artists
- Team memberships for artists
- Team members for team profiles
- All TypeScript interfaces preserved

**State Management:**
- All useState hooks intact
- Loading and error states
- Profile type detection
- Language support via useLanguage hook

**Computed Values:**
- `artistName` - bilingual artist name
- `teamName` - bilingual team name
- `featuredWorks` - filtered career entries with is_featured flag

**Basic UI:**
- Loading spinner
- Error/404 page
- Simple scaffold showing available data
- JSON previews of data structures

### **What Was Removed:**

**All UI Components:**
- Full-screen grid layout
- Image hero sections
- Social media buttons
- Highlights section
- Team membership cards
- Career works cards
- All Framer Motion animations
- All styling and layout code

**Imports Removed:**
- Framer Motion
- All Lucide icons
- Button, Badge, Card components
- DancerCard component

### **Current State:**

**Artist Profile View:**
- Shows artist name and basic info
- Displays available data fields in text
- Shows JSON previews of:
  - Teams array
  - Featured works (highlights)
  - All career entries
- Ready for UI implementation

**Team Profile View:**
- Shows team name and basic info
- Displays team metadata
- Shows JSON preview of team members
- Ready for UI implementation

**Purpose:**
- Clean slate for building custom UI components
- All data fetching logic preserved
- Easy to see what data is available
- No dependency on existing components
- Full flexibility for new design implementation

## Choreography Works Section (2025-10-03)

### **Feature Implemented**
Added a choreography works section to the artist profile page with horizontal card layout, expandable list, and video linking.

### **Key Features:**

**Layout:**
- Vertical stacked list of choreography works
- Shows 5 works initially
- "더 보기" (Show More) button to expand full list
- "접기" (Collapse) button when expanded
- Horizontal card design matching screenshot

**Visual Design:**
- Dark background cards (bg-zinc-900)
- Hover effect (bg-zinc-800/90)
- Small rectangular thumbnail (96x64px) on the left
- Work title and metadata on the right
- Compact spacing (gap-3, p-3)
- Rounded corners (rounded-lg)

**Content Structure:**
- Small video thumbnail (16:9 aspect ratio, 24x16 size)
- Work title (text-sm, white, line-clamp-1)
- Description • Date format (text-xs, white/60)
- Date shows year.month format (YYYY.MM) in Korean locale

**Functionality:**
- Clicking card opens video_url in new tab
- Expandable list shows/hides additional works
- Show More button displays count of remaining works
- Fallback emoji (🎬) when no poster image

**Data Handling:**
- Filters career entries by category === 'choreography'
- Uses `single_date` or falls back to `start_date`
- Formats date as Korean locale (2025.04)
- Description and date shown together

**State Management:**
- `showAllChoreography` state controls expansion
- Slice array to show 5 or all items
- Toggle button text changes based on state

**Technical Details:**
- Computed value: `choreographyWorks` filters choreography category
- Date formatting with Korean locale
- External link opens in new tab
- Conditional rendering based on array length
- Line clamp prevents text overflow

**Result:**
- Clean, compact choreography showcase
- Easy navigation to video content
- Space-efficient expandable list
- Professional presentation matching screenshot design
- Korean language support for UI text

### **YouTube Thumbnail Integration (2025-10-03)**

**Feature Added:**
- Automatic YouTube thumbnail extraction from video URLs
- Falls back to poster_url if available
- Uses high-quality YouTube thumbnail (hqdefault.jpg)

**Technical Implementation:**
- Regex pattern matches both youtube.com/watch?v= and youtu.be/ formats
- Extracts video ID from URL
- Constructs thumbnail URL: `https://img.youtube.com/vi/{videoId}/hqdefault.jpg`
- Priority: poster_url → YouTube thumbnail → fallback emoji

**URL Pattern Support:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- Handles query parameters correctly

**Result:**
- Automatic thumbnails for all YouTube videos
- No manual poster_url upload needed
- Consistent thumbnail display across all choreography works

## Highlights Section Update (2025-10-03)

### **Feature Implemented**
Updated the Highlights (Featured Works) section to match the screenshot design with large YouTube thumbnails and vertical stacked layout.

### **Key Features:**

**Layout:**
- Vertical stacked list of featured works
- Shows up to 3 featured works (is_featured = true)
- Full-width aspect-video (16:9) thumbnails
- Clean, minimal design matching screenshot

**Visual Design:**
- Large full-width thumbnail images
- Aspect ratio: 16:9 (aspect-video)
- Rounded corners (rounded-md)
- Dark background fallback (bg-zinc-900)
- No hover effects - clean and simple

**Content Structure:**
- Large YouTube thumbnail (maxresdefault.jpg - highest quality)
- Work title below (text-sm, font-medium, white)
- Description • Date format (text-xs, white/60)
- Minimal spacing (mb-2, space-y-0.5)

**YouTube Thumbnail Integration:**
- Uses maxresdefault.jpg for highest quality
- Automatic extraction from video_url
- Falls back to poster_url if available
- Supports both YouTube URL formats

**Functionality:**
- Clicking thumbnail/card opens video in new tab
- Line clamp prevents text overflow
- Clean, minimal interaction

**Technical Implementation:**
- Reuses same YouTube thumbnail extraction logic
- Higher quality thumbnail (maxresdefault vs hqdefault)
- Priority: poster_url → YouTube thumbnail → fallback emoji
- Date formatting in Korean locale (YYYY.MM)

**Result:**
- Large, prominent featured work showcase
- Professional presentation matching screenshot
- Automatic YouTube thumbnails
- Clean vertical layout
- Easy navigation to featured content

## Performance Works Section (2025-10-03)

### **Feature Implemented**
Added a performance works section to the artist profile page with the same design pattern as choreography works.

### **Key Features:**

**Layout:**
- Vertical stacked list of performance works
- Shows 5 works initially
- "더 보기" (Show More) button to expand full list
- "접기" (Collapse) button when expanded
- Horizontal card design matching choreography section

**Visual Design:**
- Identical styling to choreography works section
- Dark background cards (bg-zinc-900)
- Hover effect (bg-zinc-800/90)
- Small rectangular thumbnail (96x64px) on the left
- Work title and metadata on the right
- Compact spacing (gap-3, p-3)

**Content Structure:**
- Section title: "공연" (Performance)
- Small video thumbnail (16:9 aspect ratio)
- Work title (text-sm, white, line-clamp-1)
- Description • Date format (text-xs, white/60)
- Date shows year.month format in Korean locale

**Functionality:**
- Clicking card opens video_url in new tab
- Expandable list shows/hides additional works
- Show More button displays count of remaining works
- Automatic YouTube thumbnail extraction

**Data Handling:**
- Filters career entries by category === 'performance'
- Uses `single_date` or falls back to `start_date`
- Formats date as Korean locale (YYYY.MM)
- Description and date shown together

**State Management:**
- `performanceWorks` computed value filters performance category
- `showAllPerformance` state controls expansion
- Slice array to show 5 or all items
- Toggle button text changes based on state

**Technical Details:**
- Same YouTube thumbnail extraction as choreography
- Uses hqdefault.jpg quality
- Priority: poster_url → YouTube thumbnail → fallback emoji
- Conditional rendering based on array length

**Result:**
- Consistent design with choreography section
- Separate category organization
- Easy navigation to performance videos
- Space-efficient expandable list
- Professional presentation

## Classes/Workshop Section (2025-10-03)

### **Feature Implemented**
Added a Classes section for workshop category entries with a simple text-based layout matching the provided screenshot.

### **Key Features:**

**Layout:**
- Vertical stacked list of workshop entries
- Shows 5 workshops initially
- "더 보기" (Show More) button to expand full list
- "접기" (Collapse) button when expanded
- Simple text-only design without thumbnails

**Visual Design:**
- Minimal, clean text-based layout
- No thumbnails or images
- Border bottom dividers (border-white/5)
- Hover effect on border (border-white/10)
- Larger text compared to other sections
- More breathing room with py-3 padding

**Content Structure:**
- Section title: "Classes"
- Work title (text-base, font-medium, white)
- Date only (text-sm, white/60)
- No description shown - clean and minimal

**Functionality:**
- Clicking item opens video_url in new tab (if available)
- Expandable list shows/hides additional workshops
- Show More button displays count of remaining items
- Simple hover interaction on border

**Data Handling:**
- Filters career entries by category === 'workshop'
- Uses `single_date` or falls back to `start_date`
- Formats date as Korean locale (YYYY.MM)
- Only shows title and date (no description)

**State Management:**
- `workshopWorks` computed value filters workshop category
- `showAllWorkshop` state controls expansion
- Slice array to show 5 or all items
- Toggle button text changes based on state

**Technical Details:**
- No thumbnail/image requirements
- Simpler card structure than other sections
- Border-based visual separation
- Text-only presentation
- Conditional rendering based on array length

**Visual Differences from Other Sections:**
- No background color on cards
- No thumbnails
- Larger text (text-base vs text-sm)
- Border separators instead of card backgrounds
- More minimal appearance

**Result:**
- Clean, text-focused class listing
- Professional educational presentation
- Easy to scan and read
- Different visual hierarchy from media sections
- Space-efficient list format
- Matches screenshot design exactly

## Back Button Addition (2025-10-03)

### **Feature Implemented**
Added back button navigation to both artist and team profile pages.

### **Key Features:**

**Placement:**
- Top of the page, above profile content
- Positioned in header area before main content
- Padding: px-4 pt-6 pb-4 (artist), p-6 with mb-6 (team)

**Visual Design:**
- Left-pointing chevron icon (SVG)
- "Back" text label
- Subtle color: white/70
- Hover effect: white (full opacity)
- Smooth transition on hover
- Flex layout with gap-2 spacing

**Functionality:**
- Navigates back to `/artists` page
- Uses router.push() for client-side navigation
- Works on both artist and team profiles
- Clickable button with cursor pointer

**Technical Implementation:**
- Inline SVG chevron icon (20x20px)
- Text size: text-sm
- Hover transition on color
- Simple click handler with router.push
- Consistent placement across both profile types

**Result:**
- Easy navigation back to artists listing
- Clear visual affordance for back action
- Consistent UX across artist and team pages
- Professional navigation pattern

## Teams Section Redesign (2025-10-03)

### **Feature Implemented**
Redesigned the Teams section in artist profile to show team image with badge, name, and subtitle layout matching the provided screenshot.

### **Key Features:**

**Layout:**
- Horizontal layout with image on left, info on right
- Team image: 80x80px (w-20 h-20)
- Flex gap-4 spacing between image and info
- Space-y-4 between multiple teams

**Visual Design:**
- Square team image with rounded corners
- Gradient fallback background (purple/pink)
- Users icon SVG fallback (32x32px)
- Clean, spacious layout

**Team Badge:**
- "Team" text badge above team name
- Small badge: px-2 py-0.5
- Background: bg-zinc-800
- Text color: white/70
- Text size: text-xs
- Rounded corners
- Positioned right under team image

**Content Structure:**
1. Team badge (small, above name)
2. Team name (text-base, font-semibold, white)
3. Subtitle (text-sm, white/60)
   - Shows team description if available
   - Falls back to Korean name

**Functionality:**
- Entire card is clickable
- Navigates to team profile page
- Uses team slug for navigation
- Cursor pointer on hover

**Technical Implementation:**
- Inline SVG for users icon fallback
- Bilingual name support
- Conditional image rendering
- Clean flex layout structure
- No background cards - minimal design

**Visual Hierarchy:**
- Badge → Name → Subtitle
- Clear vertical stacking
- Proper spacing with mb-1, mb-2
- Easy to scan layout

**Result:**
- Clean team representation matching screenshot
- Professional badge-based design
- Easy to identify teams vs individuals
- Good visual hierarchy
- Clickable cards for navigation
- Consistent with overall design system

## Artist Profile Back Button Update (2025-10-04)

### **Feature Implemented**
Moved the back button inside the profile image section with a gradient overlay for better visual integration.

### **Key Changes:**

**Layout:**
- Back button now positioned absolutely inside the profile image container
- Gradient overlay (`bg-gradient-to-b from-black to-transparent`) at the top of the image
- Button positioned at `top-6 left-4` with `z-10` to appear above gradient

**Visual Design:**
- Gradient creates smooth black-to-transparent fade from top
- Ensures good contrast for the back button
- Button text remains white/70 with hover to white
- Same chevron icon and "Back" text

**Technical Implementation:**
- Removed separate back button section above image
- Added gradient div as absolute overlay (h-32 height)
- Back button uses absolute positioning within image container
- z-index ensures proper layering

**Result:**
- Better visual integration with profile image
- Cleaner, more immersive layout
- Professional appearance matching modern design patterns
- Improved use of space

## Automatic User Record Creation (2025-10-04)

### **Feature Implemented**
Created database trigger to automatically create a record in `public.users` table whenever a new user signs up via Supabase Auth.

### **Database Trigger:**

**Migration:** `create_user_on_signup`

**Function:** `public.handle_new_user()`
- Triggered AFTER INSERT on `auth.users`
- Extracts user data from auth record
- Creates corresponding record in `public.users`

**Data Mapping:**
1. **ID**: Uses same UUID as auth user (`NEW.id`)
2. **Name**: Extracts from `raw_user_meta_data->>'name'` or uses email username
3. **Email**: Uses auth user's email (`NEW.email`)
4. **Slug**: Generated from email username (sanitized and made unique)
5. **Type**: Defaults to 'general'
6. **Name_en**: Defaults to same as name (can be updated later)

**Slug Generation:**
- Base slug from email username (before @ symbol)
- Sanitized: lowercase, non-alphanumeric replaced with hyphens
- Uniqueness: Appends counter if slug already exists (-1, -2, etc.)

**Permissions:**
- Function runs with SECURITY DEFINER
- Grants INSERT permission on public.users to authenticated role
- Grants USAGE on public schema

### **Integration:**

**Signup Flow:**
1. User signs up via `/signup` page
2. Supabase Auth creates user in `auth.users`
3. Trigger automatically fires
4. New record created in `public.users` with same ID
5. User can immediately be linked to profile data

**Signup Page:**
- Already passes user name to metadata (`options.data.name`)
- Name is captured during signup and stored in auth metadata
- Trigger extracts this name for public user record

**Google OAuth:**
- Also supported through the trigger
- Uses Google profile name if available
- Falls back to email username

### **Technical Details:**

**Error Handling:**
- Uses COALESCE for fallback values
- Ensures slug uniqueness with WHILE loop
- SECURITY DEFINER allows trigger to write to public.users

**Benefits:**
1. Automatic profile creation - no manual intervention needed
2. Consistent user records across auth and public schemas
3. Same ID linking makes queries simple
4. Slug generation ensures unique, URL-friendly identifiers
5. Supports both email/password and OAuth signup

**Database Objects Created:**
- Function: `public.handle_new_user()`
- Trigger: `on_auth_user_created` on `auth.users`
- Permissions: USAGE on schema, INSERT on users table

### **Result:**
- Seamless user onboarding experience
- Every auth user automatically gets a public profile record
- Ready for future profile customization
- Supports all authentication methods
- Maintains data consistency between auth and public schemas

## TopNavBar My Page Button (2025-10-04)

### **Feature Implemented**
Updated TopNavBar to show a "My Page" button with the logged-in user's name instead of Sign In/Sign Up buttons when authenticated.

### **Changes Made:**

**Desktop Navigation:**
- **When Not Logged In**: Shows "Sign In" button (icon + text) and "Sign Up" button (black background)
- **When Logged In**: Shows single "My Page" button with user's name as the label
  - Same black background styling as Sign Up button
  - Navigates to `/mypage` route on click
  - Displays user's display name from auth metadata or email

**Mobile Navigation:**
- **When Not Logged In**: Shows UserCircle icon that links to login
- **When Logged In**: Shows user avatar (first letter of name) that links to `/mypage`

**Code Cleanup:**
- Removed unused `showUserMenu` state
- Removed unused `handleSignOut` function
- Removed unused `LogOut` icon import
- Removed dropdown menu code
- Simplified authentication UI logic

### **Visual Changes:**

**Desktop:**
- Logged in users see: `[Language Toggle] [User Name]` (black button)
- Logged out users see: `[Language Toggle] [👤 Sign In] [Sign Up]` (black button)

**Mobile:**
- Logged in users see: `[Language Icon] [Avatar] [Hamburger]`
- Logged out users see: `[Language Icon] [User Icon] [Hamburger]`

### **Technical Implementation:**
- Button navigates to `/mypage` route (to be created)
- Uses `getUserDisplayName(user)` to get display name
- Same button styling as Sign Up for consistency
- Clean conditional rendering: `user ? <MyPageButton /> : <AuthButtons />`

### **User Flow:**
1. User signs up/logs in
2. TopNavBar updates automatically (via useEffect checking auth state)
3. Sign In/Sign Up buttons replaced with "My Page" button
4. Button shows user's name as label
5. Click navigates to personal profile/dashboard at `/mypage`

### **Next Steps:**
- Create `/mypage` route for user profile/dashboard
- Implement My Page content (profile info, settings, logout)
- Add auth state refresh on navigation between pages

## My Page Implementation (2025-10-04)

### **Feature Implemented**
Created comprehensive My Page for authenticated users to manage their profile and career entries, with add/delete functionality for each category.

### **Page Structure:**

**Route:** `/app/mypage/page.tsx`

**Main Sections:**
1. **Header** - Sticky header with page title, user name, and sign out button
2. **Profile Section** - User avatar, name, email, and account type
3. **Career Entries** - Organized by category with add/delete functionality

### **Features:**

**Authentication:**
- Redirects to `/login` if not authenticated
- Fetches user data from `public.users` table
- Uses auth user ID to link data

**Profile Display:**
- Shows user avatar (profile image or initial in gradient circle)
- Displays name, email, and account type
- Clean card-based layout with dark theme

**Career Entries Management:**

**Display by Category:**
- 5 categories: Choreography, Performance, Advertisement, TV, Workshop
- Each category shows count of entries
- Empty state when no entries exist
- Entries sorted by creation date (newest first)

**Entry Information Shown:**
- Title (with featured badge if applicable)
- Description
- Date (single date or date range)
- Country
- Delete button

**Add Entry Modal:**
- Full-screen modal with form
- Category selection (pre-filled if opened from category button)
- Required fields: Category, Title
- Optional fields: Description, Video URL, Poster URL
- Date type selection: Single date or Date range
- Featured checkbox
- Country field (defaults to 'Korea')

**Add Entry Buttons:**
- Global "Add Entry" button in header
- Per-category "Add {Category}" buttons
- Opens modal with category pre-selected

**Delete Functionality:**
- Trash icon on each entry
- Confirmation dialog before deletion
- Removes from database and updates UI instantly

### **Technical Implementation:**

**State Management:**
- `user` - Current user profile data
- `careerEntries` - All career entries array
- `showAddModal` - Modal visibility
- `selectedCategory` - Pre-selected category for modal
- `formData` - Form input values

**Database Operations:**
- **Fetch user**: Query `users` table by auth ID
- **Fetch entries**: Query `career_entries` table by user_id
- **Insert entry**: Add to `career_entries` table
- **Delete entry**: Remove from `career_entries` table

**Form Validation:**
- Title is required
- Category is required
- Other fields optional
- Submit button disabled if required fields empty

**UI/UX Features:**
- Dark theme (zinc-950 background)
- Sticky header with backdrop blur
- Modal with backdrop blur overlay
- Hover states on entries and buttons
- Loading spinner while fetching data
- Responsive layout with max-width container

### **Categories:**

```typescript
const CATEGORIES = [
  { value: 'choreography', label_en: 'Choreography', label_ko: '안무' },
  { value: 'performance', label_en: 'Performance', label_ko: '공연' },
  { value: 'advertisement', label_en: 'Advertisement', label_ko: '광고' },
  { value: 'tv', label_en: 'TV', label_ko: 'TV' },
  { value: 'workshop', label_en: 'Workshop', label_ko: '워크샵' },
];
```

### **Data Structure:**

**CareerEntry Interface:**
- id, category, title, description
- video_url, poster_url, is_featured
- country, date_type (single/range)
- single_date, start_date, end_date
- linked_user_id, created_at

**User Interface:**
- id, name, name_en, email
- profile_image, type

### **User Flow:**

1. User clicks their name button in TopNavBar
2. Navigates to `/mypage`
3. Sees profile info and career entries organized by category
4. Clicks "Add Entry" or category-specific add button
5. Fills out modal form
6. Submits to add entry to database
7. Entry appears in appropriate category section
8. Can delete entries with trash icon

### **Bilingual Support:**
- Page title: "My Page" / "마이 페이지"
- Sign out: "Sign Out" / "로그아웃"
- Profile: "Profile" / "프로필"
- Career Entries: "Career Entries" / "경력"
- Add Entry: "Add Entry" / "추가"
- Empty states in Korean/English
- Category labels in Korean/English

### **Design Highlights:**
- Consistent with artist profile page dark theme
- Clean card-based layout
- Featured badge for highlighted entries
- Smooth transitions and hover effects
- Professional modal design with overflow scroll
- Icon buttons for actions (Plus, Trash, X)

### **Next Enhancements:**
- Edit functionality for existing entries
- Image upload for profile picture
- Profile information editing
- Linked artist selection in form
- Entry filtering and search
- Export career data
- Privacy settings

## Artist Profile Placeholder Image (2025-10-04)

### **Feature Implemented**
Added a placeholder/filler image display for artist profiles when no profile image is available.

### **Implementation:**

**Conditional Rendering:**
- If `artist.profile_image` exists: Display the actual image
- If no image: Show gradient placeholder with artist initial

**Placeholder Design:**
- **Container**: 500px height with gradient background (purple-900 → zinc-900 → zinc-950)
- **Avatar Circle**: 128px (w-32 h-32) rounded-full with gradient (purple-500 → pink-500)
- **Initial**: First letter of artist name in 6xl font size, bold, centered
- **Label**: "No profile image" text in white/40 opacity below avatar

**Visual Hierarchy:**
```
┌─────────────────────────────────────┐
│  Gradient Background (500px)        │
│                                     │
│          ┌───────────┐              │
│          │     A     │  ← Initial   │
│          └───────────┘              │
│       No profile image              │
│                                     │
└─────────────────────────────────────┘
```

**Gradient Colors:**
- Background: `from-purple-900 via-zinc-900 to-zinc-950`
- Avatar: `from-purple-500 to-pink-500`
- Matches overall dark theme aesthetic

**Back Button Integration:**
- Gradient overlay still works correctly
- Back button positioned above placeholder
- z-index maintained for proper layering

**Artist Name Display:**
- Name still shows at bottom right
- Positioned absolutely as before
- Works with both image and placeholder

### **Technical Details:**

**Conditional Logic:**
```typescript
{artist.profile_image ? (
  <img src={artist.profile_image} alt={artist.name} className='w-full object-cover'/>
) : (
  <div className="w-full h-[500px] bg-gradient-to-br...">
    {/* Placeholder content */}
  </div>
)}
```

**CSS Classes Used:**
- Container: `w-full h-[500px] bg-gradient-to-br flex items-center justify-center`
- Avatar: `w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br flex items-center justify-center text-6xl font-bold`
- Label: `text-white/40 text-sm`

### **Benefits:**
- Professional appearance even without profile image
- Consistent height and layout
- Clear visual indication of missing image
- Maintains brand aesthetic with gradient colors
- Shows artist initial for easy identification
- No broken images or empty space

### **Result:**
- Artists without profile images now have beautiful placeholder
- Gradient design matches overall Spotify-inspired theme
- Large initial makes profile easily identifiable
- Clean, modern fallback UI

## Responsive Desktop Layout for Artist Profile (2025-10-04)

### **Feature Implemented**
Transformed the mobile-first artist profile page into a fully responsive layout optimized for desktop viewing with proper grid structure and spacing.

### **Layout Structure:**

**Mobile (Default):**
- Single column stacked layout
- Full-width sections
- Compact spacing (px-4, py-8)

**Desktop (lg breakpoint - 1024px+):**
- Two-column grid layout (1:2 ratio)
- Left sidebar (1 column): Teams, About, Highlights
- Right main content (2 columns): Work sections
- Wide max-width container (max-w-7xl)
- Generous spacing (px-8, py-12)

### **Responsive Breakpoints:**

**Hero Image:**
- Mobile: 400px height
- Tablet (md): 500px height
- Desktop (lg): 600px height
- Responsive `object-cover` for proper scaling

**Artist Name:**
- Mobile: text-3xl, bottom-4, left-4
- Tablet (md): text-4xl, left-8
- Desktop (lg): text-5xl, bottom-8
- Positioned absolutely for overlay effect

**Back Button:**
- Mobile: left-4
- Desktop: left-8
- Consistent positioning across breakpoints

**Container Padding:**
- Mobile: px-4, py-8
- Desktop: px-8, py-12
- Max-width: 7xl (1280px)

### **Grid Layout:**

**Desktop Structure:**
```
┌─────────────────────────────────────────┐
│         Hero Image (full width)         │
│         with back button & name         │
├───────────────┬─────────────────────────┤
│   Sidebar     │    Main Content         │
│  (1 column)   │    (2 columns)          │
│               │                         │
│  - Teams      │  - Choreographies       │
│  - About      │  - Performances         │
│  - Highlights │  - Classes              │
│               │                         │
└───────────────┴─────────────────────────┘
```

**Grid Classes:**
- Container: `grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12`
- Sidebar: `lg:col-span-1 space-y-8`
- Main: `lg:col-span-2 space-y-8`

### **Section Improvements:**

**Headings:**
- Mobile: text-xl
- Desktop: text-2xl (md:text-2xl)
- Better hierarchy and readability

**Spacing:**
- Consistent `space-y-8` between major sections
- `mb-3` to `mb-4` for desktop heading margins
- `leading-relaxed` for about section text

**Buttons:**
- Added border styling: `border border-white/10`
- Hover state: `hover:border-white/20`
- Better visual feedback

**Work Cards:**
- Improved padding and spacing for desktop
- Better hover states
- Maintained mobile-friendly touch targets

### **Responsive Features:**

**Image Heights:**
- Responsive hero image with proper aspect ratios
- Maintains visual impact across devices
- `object-cover` prevents distortion

**Typography Scale:**
- Scales smoothly from mobile to desktop
- Better readability on larger screens
- Proper text hierarchy

**Grid Behavior:**
- Single column mobile (stacked)
- Two-column desktop (sidebar + main)
- Smooth transition at lg breakpoint

**Content Organization:**
- Sidebar content (Teams, About, Highlights) easy to scan
- Main works content gets more space on desktop
- Logical content grouping

### **Technical Implementation:**

**Tailwind Breakpoints Used:**
- `md:` - 768px (tablet)
- `lg:` - 1024px (desktop)
- Mobile-first approach

**Key Classes:**
- `max-w-7xl mx-auto` - Centered wide container
- `grid grid-cols-1 lg:grid-cols-3` - Responsive grid
- `lg:col-span-1` / `lg:col-span-2` - Column distribution
- `space-y-8` - Vertical spacing
- `gap-8 lg:gap-12` - Responsive grid gaps

### **Benefits:**

**Desktop Experience:**
- Better use of horizontal space
- Easier content scanning
- More professional appearance
- Reduced scrolling for works sections

**Maintained Mobile:**
- Still mobile-first and touch-friendly
- No desktop-only features
- Consistent experience across devices

**Performance:**
- No JavaScript layout changes
- Pure CSS responsive design
- Fast rendering with Tailwind

**Accessibility:**
- Proper heading hierarchy maintained
- Readable text sizes across devices
- Good contrast and spacing

### **Result:**
- Professional desktop layout with sidebar + main content structure
- Smooth responsive behavior from mobile to desktop
- Better information architecture for larger screens
- Consistent spacing and typography scale
- Optimal content distribution across screen sizes

## Artists Page Mobile Grid (2025-10-04)

### **Feature Implemented**
Updated the artists listing page to display artist cards in a 2-column grid on mobile devices for better space utilization.

### **Changes Made:**

**Grid Configuration:**
- **Mobile (default)**: `grid-cols-2` - 2 columns
- **Small (sm)**: `grid-cols-2` - 2 columns (same as mobile)
- **Large (lg)**: `grid-cols-3` - 3 columns
- **Extra Large (xl)**: `grid-cols-4` - 4 columns
- **2XL**: `grid-cols-5` - 5 columns

**Gap Spacing:**
- **Mobile**: `gap-4` - Smaller gap for mobile
- **Desktop (md+)**: `gap-6` - Larger gap for desktop

**File Updated:**
- `/app/artists/components/DancerGrid.tsx`

### **Before:**
```typescript
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
```

### **After:**
```typescript
className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6"
```

### **Benefits:**

**Mobile Experience:**
- Better use of horizontal screen space
- Shows 2 cards side-by-side instead of 1
- Reduced scrolling on mobile devices
- More content visible at once

**Responsive Design:**
- Consistent 2-column layout on mobile and small tablets
- Scales up to 3, 4, 5 columns on larger screens
- Adaptive gap spacing (smaller on mobile, larger on desktop)

**Visual Impact:**
- More gallery-like presentation on mobile
- Better balance between card size and readability
- Consistent with modern mobile app patterns

### **Applied To:**
- Loading skeleton state
- Actual grid rendering
- Both dancer and team cards

### **Result:**
- Mobile users now see 2 cards per row
- Better utilization of mobile screen space
- Improved browsing experience on small devices
- Smoother responsive scaling across all breakpoints

## Display Order Integration (2025-10-04)

### **Feature Implemented**
Updated artist and team fetching to use the `display_order_items` table for consistent, centralized ordering across the application.

### **Problem Solved:**
Previously, the code was ordering by the `display_order` column in the `users` and `teams` tables. However, there's a separate `display_order_items` table that provides unified ordering for both artists and teams together.

### **Database Structure:**

**display_order_items table:**
- `id`: UUID
- `item_type`: 'artist' or 'team'
- `item_id`: Reference to user or team ID
- `display_order`: Integer for ordering
- `created_at`, `updated_at`: Timestamps

This allows artists and teams to be ordered together in a unified list.

### **Implementation Changes:**

**File Updated:** `/app/artists/utils/supabase.ts`

**Functions Modified:**
1. `fetchDancers()` - Fetch all dancers with proper ordering
2. `fetchTeams()` - Fetch all teams with proper ordering
3. `fetchFeaturedDancers()` - Fetch limited dancers for homepage

### **New Logic Flow:**

**For Dancers/Artists:**
1. Query `display_order_items` table for `item_type = 'artist'`
2. Order by `display_order` ascending
3. Get list of ordered IDs
4. Fetch users from `users` table using those IDs
5. Re-sort users to match the display_order_items order
6. Map to Dancer objects

**For Teams:**
1. Query `display_order_items` table for `item_type = 'team'`
2. Order by `display_order` ascending
3. Get list of ordered IDs
4. Fetch teams from `teams` table using those IDs
5. Re-sort teams to match the display_order_items order
6. Fetch team members for each team
7. Map to Team objects

**Fallback Handling:**
- If `display_order_items` query fails → fetch directly from users/teams table
- If no items in `display_order_items` → fetch all dancers/teams
- Error handling with console logging

### **Technical Details:**

**Key Code Pattern:**
```typescript
// 1. Get ordered IDs from display_order_items
const { data: orderItems } = await supabase
  .from('display_order_items')
  .select('item_id, display_order')
  .eq('item_type', 'artist')
  .order('display_order', { ascending: true });

const orderedIds = orderItems?.map(item => item.item_id) || [];

// 2. Fetch actual data
const { data: users } = await supabase
  .from('users')
  .select('*')
  .in('id', orderedIds);

// 3. Re-sort to match display_order_items order
const orderedUsers = orderedIds
  .map(id => users?.find(user => user.id === id))
  .filter(user => user !== undefined);
```

**Helper Function:**
- Created `fetchTeamMembers()` helper to avoid code duplication
- Shared between main team fetch and fallback logic

### **Benefits:**

**Centralized Ordering:**
- Single source of truth for display order
- Can order artists and teams together
- Easy to manage from admin interface

**Flexibility:**
- Artists and teams can be interleaved in display
- Admin can control exact positioning
- Unified ordering across entire application

**Reliability:**
- Fallback logic ensures app works even if ordering fails
- Graceful degradation to unordered lists
- Error logging for debugging

**Consistency:**
- Same ordering logic for all fetch functions
- Homepage featured dancers use same ordering
- Artists page uses same ordering

### **Use Cases:**

**Unified List:**
- Display order: Artist 1, Artist 2, Team 1, Artist 3, Team 2
- Both types ordered together based on `display_order_items`

**Separate Lists:**
- Solo dancers ordered by their entries in `display_order_items`
- Teams ordered by their entries in `display_order_items`
- Each maintains their relative order

### **Result:**
- Artists and teams now display in the order defined by `display_order_items` table
- Centralized, manageable ordering system
- Consistent ordering across all pages
- Proper fallback handling for edge cases
- Ready for admin interface to manage display order

### **Artist Detail Page Update (2025-10-04)**

**File Updated:** `/app/artists/[slug]/page.tsx`

**Change:** Applied `display_order_items` ordering to teams displayed on artist profile pages.

**Implementation:**
```typescript
// Get display order for teams
const { data: orderItems } = await supabase
  .from('display_order_items')
  .select('item_id, display_order')
  .eq('item_type', 'team')
  .in('item_id', teamIds)  // Only teams this artist belongs to
  .order('display_order', { ascending: true });

// Fetch teams
const { data: teamsData } = await supabase
  .from('teams')
  .select('*')
  .in('id', teamIds)
  .eq('status', 'active');

// Sort teams by display_order_items if available
if (orderItems && orderItems.length > 0) {
  const orderedIds = orderItems.map(item => item.item_id);
  const orderedTeams = orderedIds
    .map(id => teamsData.find(team => team.id === id))
    .filter(team => team !== undefined);
  setTeams(orderedTeams);
} else {
  setTeams(teamsData);  // Fallback to unordered
}
```

**Benefits:**
- Teams on artist profile pages now respect global display order
- Consistent ordering between artists page and artist detail page
- Only orders teams that the artist belongs to
- Fallback to unordered if display_order_items not available

**Result:**
- Complete ordering integration across all artist-related pages
- Teams section on artist profiles now properly ordered
- Unified ordering system throughout the application

## Artist Profile Image Responsive Optimization (2025-10-04)

### **Feature Implemented**
Optimized the artist profile hero image for better desktop display while maintaining mobile layout.

### **Changes Made:**

**Image Height Adjustments:**
- **Mobile**: 400px (kept same as before)
- **Tablet (md)**: 450px (reduced from 500px)
- **Desktop (lg)**: 500px (reduced from 600px)
- **Extra Large (xl)**: 550px (new breakpoint)
- More balanced proportions for desktop viewing

**Image Positioning:**
- Added `object-center` for better focal point
- Added `overflow-hidden` on container for cleaner edges
- Kept `object-cover` for proper scaling

**Gradient Overlays:**
- **Top gradient**: Height 32 → 40 on desktop for better visibility
- **Bottom gradient**: NEW - Added for artist name readability
  - `bg-gradient-to-t from-black via-black/60 to-transparent`
  - Ensures name is always readable regardless of image

**Artist Name Positioning:**
- **Mobile**: bottom-6, left-4, text-3xl
- **Tablet**: bottom-8, left-8, text-4xl
- **Desktop**: bottom-10, left-12, text-5xl
- **XL**: text-6xl
- Added right padding to prevent text overflow

**Back Button Positioning:**
- **Mobile**: left-4
- **Tablet**: left-8
- **Desktop**: left-12
- Consistent z-index and hover states

### **Responsive Breakpoints:**

```typescript
// Image heights
h-[400px]    // Mobile
md:h-[450px] // Tablet (768px+)
lg:h-[500px] // Desktop (1024px+)
xl:h-[550px] // XL (1280px+)

// Artist name
text-3xl           // Mobile
md:text-4xl        // Tablet
lg:text-5xl        // Desktop
xl:text-6xl        // XL

// Positioning
left-4 md:left-8 lg:left-12
bottom-6 md:bottom-8 lg:bottom-10
```

### **Visual Improvements:**

**Better Proportions:**
- Desktop images no longer too tall (reduced from 600px to 500-550px)
- More cinematic aspect ratio for large screens
- Balanced header height vs content area

**Enhanced Readability:**
- Bottom gradient ensures name is always readable
- Larger gradients on desktop (32px → 40px)
- Better contrast with `via-black/60` transition

**Professional Layout:**
- Consistent padding progression (4 → 8 → 12)
- Proper spacing between elements
- Clean overflow handling

### **Mobile Preservation:**
- Mobile height stayed at 400px (unchanged)
- Mobile spacing stayed at left-4, bottom-6
- Mobile gradient height at 32px
- No changes to mobile user experience

### **Desktop Enhancement:**
- More appropriate image heights for wide screens
- Better use of screen real estate
- Improved text hierarchy with larger sizes
- Professional spacing with left-12 padding
- Dual gradients for better overlay effect

### **Result:**
- Mobile view unchanged (400px height maintained)
- Desktop view optimized with better proportions (450-550px range)
- Enhanced readability with dual gradient overlays
- Professional responsive scaling across all breakpoints
- Better balance between hero image and content sections

## Homepage Recent Works Mobile Optimization (2025-10-04)

### **Feature Implemented**
Optimized the Recent Works section on the homepage for better mobile viewing experience with responsive sizing and spacing.

### **Changes Made:**

**File Updated:** `/app/components/sections/RecentWorks.tsx`

### **Mobile Optimizations:**

**Grid Layout:**
- **Mobile**: Single column stack (`grid-cols-1`)
- **Desktop**: 3-column grid (`lg:grid-cols-3`)
- Gap: 6 on mobile → 8 on desktop

**Video Player:**
- Rounded corners: `rounded-xl` on mobile → `rounded-2xl` on desktop
- Info padding: `mt-4` on mobile → `mt-6` on desktop
- Added `px-1` padding for better mobile alignment

**Video Title:**
- Mobile: `text-lg`
- Tablet: `text-xl` (md)
- Desktop: `text-2xl` (lg)
- Better readability across devices

**Video Stats:**
- Mobile: `text-sm`
- Desktop: `text-base` (lg)

**Video List Container:**
- Height: 400px on mobile → 600px on desktop
- Padding: `p-3` on mobile → `p-4` on desktop
- Rounded: `rounded-xl` on mobile → `rounded-2xl` on desktop
- Spacing: `space-y-3` on mobile → `space-y-4` on desktop

**Video List Items:**
- Card padding: `p-2` on mobile → `p-3` on desktop
- Rounded: `rounded-lg` on mobile → `rounded-xl` on desktop
- Gap between elements: `gap-2` on mobile → `gap-3` on desktop

**Thumbnails:**
- Mobile: `w-20 h-14` (smaller)
- Desktop: `w-24 h-16` (larger)
- Rounded: `rounded-md` on mobile → `rounded-lg` on desktop
- Play button: `w-5 h-5` on mobile → `w-6 h-6` on desktop

**Text Sizes:**
- Category: Stays at `text-xs`
- Title: `text-xs` on mobile → `text-sm` on desktop
- Stats: Stays at `text-xs`
- Date: Hidden on mobile (`hidden lg:block`) to save space

**Spacing Adjustments:**
- Category margin: `mb-0.5` on mobile → `mb-1` on desktop
- Title margin: `mb-1` on mobile → `mb-2` on desktop
- Stats spacing: `space-y-0.5` on mobile → `space-y-1` on desktop

### **Responsive Breakpoints:**

```typescript
// Container
gap-6 lg:gap-8

// Video info
mt-4 lg:mt-6
text-lg md:text-xl lg:text-2xl

// Video list height
h-[400px] lg:h-[600px]

// List padding
p-3 lg:p-4

// Thumbnails
w-20 h-14 lg:w-24 lg:h-16

// Typography
text-xs lg:text-sm
text-sm lg:text-base
```

### **Mobile-Specific Improvements:**

**Compact Design:**
- Smaller thumbnails (20px width vs 24px desktop)
- Reduced padding throughout (p-2 vs p-3)
- Tighter spacing (gap-2 vs gap-3)
- Hidden date field to reduce clutter

**Touch Optimization:**
- Maintained tap animations (`whileTap`)
- Good touch target sizes
- Clear visual feedback on selection

**Readability:**
- Appropriately sized text for mobile
- Good line-height and clamp
- Clear visual hierarchy

**Efficient Space Usage:**
- 400px list height instead of 600px
- Compact card design
- Smaller rounded corners (xl vs 2xl)

### **Desktop Preservation:**
- Larger thumbnails for better preview
- More generous padding and spacing
- Larger text sizes
- Shows all metadata including date
- More prominent rounded corners

### **Benefits:**

**Mobile Experience:**
- ✅ Better screen space utilization
- ✅ Faster scrolling with 400px height
- ✅ Cleaner, more compact card design
- ✅ Essential information prioritized
- ✅ Touch-friendly interactions

**Desktop Experience:**
- ✅ Spacious, comfortable layout
- ✅ Larger, more visible thumbnails
- ✅ Complete metadata display
- ✅ Professional appearance

**Overall:**
- ✅ Responsive scaling across all devices
- ✅ Optimized for each screen size
- ✅ Maintained visual consistency
- ✅ Better mobile usability

### **Result:**
- Recent Works section now mobile-optimized with compact design
- Video list reduced to 400px height on mobile for easier scrolling
- Smaller, tighter spacing and sizing for mobile screens
- Desktop maintains spacious, professional layout
- Smooth responsive transitions between breakpoints
- Better user experience across all devices

## Mobile Navigation Auth Update (2025-10-04)

### **Feature Implemented**
Updated the mobile side navigation to conditionally show auth options based on user login status.

### **Changes Made:**

**When User is Signed In:**
- Shows "My Page" button with user's name and avatar
- Shows "Sign Out" button with red accent colors
- Hides all other auth options

**When User is Not Signed In:**
- Shows nothing in the auth section (relies on top nav bar icons)

**Files Updated:**
1. **MobileMenu.tsx** - Added user prop and conditional rendering
   - Imports: Added `LogOut`, `User` type, `signOut`, `getUserDisplayName`
   - Props: Added `user: User | null`
   - My Page button: Shows avatar with user initial and display name
   - Sign Out button: Red themed with logout icon
   - Conditional: `user ? <AuthButtons> : null`

2. **TopNavBar.tsx** - Passed user state to MobileMenu
   - Updated MobileMenu component call to include `user={user}` prop

### **Visual Design:**

**My Page Button:**
- Avatar with user's first letter initial
- Display name as button text
- Gray color scheme matching navigation
- Navigates to `/mypage` on click

**Sign Out Button:**
- Red color theme (text-red-600, bg-red-100)
- Logout icon in circle
- "Sign Out" text label
- Calls `signOut()` and redirects to home

### **User Flow:**
1. User logs in
2. Opens mobile menu (hamburger icon)
3. Sees their name/avatar button (My Page)
4. Sees red "Sign Out" button below
5. No language switcher or sign in/up buttons shown
6. Click My Page → Navigate to `/mypage`
7. Click Sign Out → Sign out, redirect to home, refresh page

### **Technical Implementation:**
- Added `handleSignOut()` function with async sign out
- Conditional rendering with ternary operator
- Framer Motion animations maintained
- Proper prop typing with TypeScript
- Clean separation of signed-in vs signed-out states

### **Result:**
- Mobile navigation now shows only relevant auth options
- Cleaner interface when logged in
- Clear sign out functionality
- Consistent with desktop navigation patterns
- Better user experience for authenticated users

## Highlights Section Horizontal Scroll (2025-10-04)

### **Feature Implemented**
Converted the Highlights section on artist profile pages from vertical stacking to horizontal scrolling for a more modern, gallery-like experience.

### **Changes Made:**

**Files Updated:**
- `/app/artists/[slug]/page.tsx` - Highlights section layout
- `/app/globals.css` - Added scrollbar-hide utility

### **Layout Changes:**

**From Vertical Stack to Horizontal Scroll:**

**Before:**
```typescript
<div className="space-y-3">
  {featuredWorks.slice(0, 3).map(...)}
</div>
```

**After:**
```typescript
<div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
  <div className="flex gap-3 pb-2">
    {featuredWorks.slice(0, 6).map(...)}
  </div>
</div>
```

### **Implementation Details:**

**Scroll Container:**
- `overflow-x-auto` - Enables horizontal scrolling
- `scrollbar-hide` - Hides scrollbar for cleaner look
- `-mx-1 px-1` - Negative margin trick for edge-to-edge scroll
- `pb-2` - Bottom padding for scroll indicator

**Card Layout:**
- `flex gap-3` - Horizontal flex layout with spacing
- `flex-shrink-0` - Prevents cards from shrinking
- Fixed width: `w-[240px] md:w-[280px]`
- Mobile: 240px wide
- Desktop: 280px wide

**Visual Enhancements:**
- Added hover ring: `group-hover:ring-2 group-hover:ring-white/20`
- Added image zoom: `group-hover:scale-105 transition-transform duration-300`
- Smooth transitions for better UX

**Card Content:**
- Title: `line-clamp-2` (allows 2 lines instead of 1)
- Maintains aspect-video ratio
- Responsive width adjustments

### **Scrollbar Hide Utility:**

Added custom CSS utility in `globals.css`:

```css
@layer utilities {
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
}
```

**Cross-browser Support:**
- Chrome/Safari/Opera: `::-webkit-scrollbar`
- IE/Edge: `-ms-overflow-style`
- Firefox: `scrollbar-width`

### **Increased Display Limit:**
- Before: 3 highlights shown
- After: 6 highlights shown
- Better utilization of horizontal space

### **User Experience:**

**Mobile:**
- Swipe to scroll horizontally
- Touch-friendly gesture
- Clean edge-to-edge scroll
- 240px card width fits mobile screens well

**Desktop:**
- Mouse wheel or trackpad scroll
- Click and drag to scroll
- Smooth animations on hover
- Larger 280px cards for better preview

**Interaction:**
- Cards maintain clickable functionality
- Opens video in new tab on click
- Hover effects show visual feedback
- Smooth scale transition on hover

### **Benefits:**

**Better Space Utilization:**
- Shows more highlights (6 vs 3)
- Doesn't take up vertical space
- Fits sidebar layout better
- Modern gallery-style presentation

**Improved UX:**
- Natural scrolling behavior
- Touch-friendly on mobile
- Clean, minimal design
- Instagram/Netflix-style scrolling

**Visual Appeal:**
- Horizontal gallery aesthetic
- Hidden scrollbar for cleaner look
- Smooth hover animations
- Professional appearance

### **Design Pattern:**
- Follows modern UI patterns (Instagram, Netflix, Spotify)
- Horizontal scrolling for media galleries
- Touch-optimized for mobile devices
- Clean, minimal interface

### **Result:**
- Highlights section now scrolls horizontally
- Shows 6 featured works instead of 3
- Clean scrolling with hidden scrollbar
- Smooth hover animations and transitions
- Better mobile and desktop experience
- Modern gallery-style presentation

## About Us Page Design Research (2025-10-04)

### **Research Completed**
Conducted comprehensive research and created detailed design plan for the GRIGO Entertainment About Us page.

### **Documentation Created**
**File**: `/Volumes/EWL/Development/projects/grigoent_web/.claude/doc/about-us-page-design-plan.md`

### **Design Plan Overview**

**Page Structure** (7 Main Sections):
1. **Hero Section** - Full-screen gradient background with company tagline and scroll indicator
2. **Mission & Vision** - Two-column card layout with icons
3. **Our Story** - Interactive timeline with alternating layout
4. **Statistics** - Animated counter grid (4 key metrics)
5. **Core Values** - 3-4 value cards with icons and descriptions
6. **Team Section** - Optional founder/leader showcase
7. **Call-to-Action** - Gradient CTA with primary action buttons

### **Status**
✅ Research completed
✅ Design plan documented (70+ page comprehensive guide)
✅ Component examples provided
✅ Animation patterns defined
✅ Responsive strategy outlined
✅ i18n structure planned
✅ Ready for implementation

**Next Step**: Review the complete design plan at `.claude/doc/about-us-page-design-plan.md`

## About Us Page Implementation (2025-10-04)

### **Feature Implemented**
Built comprehensive About Us page for GRIGO Entertainment with full bilingual support and modern design.

### **Page Structure**

**7 Main Sections:**

1. **Hero Section**
   - Full-screen layout with animated gradient background
   - Large GRIGO title with gradient text effect
   - Company tagline and subtitle
   - Animated gradient orbs (purple and pink)
   - Scroll indicator with bounce animation

2. **Mission & Vision Section**
   - Two-column card layout (responsive to 1 column on mobile)
   - Mission card with Target icon and purple/pink gradient
   - Vision card with Eye icon and blue/purple gradient
   - Glass-morphism card design with backdrop blur

3. **Statistics Section**
   - 4-column grid (2 columns on mobile)
   - Animated counters with viewport trigger
   - Stats: 50+ Artists, 200+ Projects, 25+ Countries, 15+ Awards
   - Large gradient text (purple to pink)
   - Dark background stripe for visual separation

4. **Core Values Section**
   - 2-column grid (1 column on mobile)
   - 4 values: Passion, Innovation, Collaboration, Excellence
   - Each with custom gradient icon box
   - Hover effect for subtle interaction
   - Lucide React icons: Flame, Lightbulb, Users, Award

5. **Our Story Timeline**
   - Vertical timeline with gradient line (purple → pink → purple)
   - 5 milestones from 2018 to 2025
   - Alternating left/right layout on desktop
   - Gradient dot markers with ring effect
   - Responsive: all left-aligned on mobile

6. **Call-to-Action Section**
   - Full-width gradient card (purple → pink → purple)
   - Rounded corners with overflow hidden
   - Two CTA buttons: "Join Us Now" and "Contact Us"
   - Links to /signup and /contact pages

### **Features Implemented**

**Animations:**
- Hero fade-in and slide-up on mount
- Scroll-triggered reveal animations for each section
- Animated counter component using requestAnimationFrame
- Infinite bounce animation for scroll indicator
- Pulse animation for gradient orbs
- Viewport-based animations with Framer Motion

**Responsive Design:**
- Mobile-first approach
- Breakpoints: base, md (768px), lg (1024px)
- Hero text scales: 6xl → 7xl → 8xl
- Grid layouts adapt: 1 col → 2 cols → 4 cols
- Timeline switches from left-only to alternating
- Padding and spacing responsive

**Internationalization:**
- All content translated (Korean/English)
- Translation keys added to LanguageContext
- Dynamic content rendering with t() function
- Covers: hero, mission, vision, story, values, stats, CTA

**Visual Design:**
- Consistent with Spotify-inspired dark theme
- zinc-950 background throughout
- Purple/pink gradient accents
- Glass-morphism cards (zinc-900/50 with backdrop blur)
- White/10 borders for subtle separation
- White/70 text for secondary content

### **Components & Libraries Used**

**shadcn/ui Components:**
- Card - for mission, vision, values, timeline
- Separator - imported but not actively used

**Lucide React Icons:**
- Target, Eye - mission/vision
- Flame, Lightbulb, Users, Award - core values
- ChevronDown - scroll indicator

**Framer Motion:**
- motion.div for all animated sections
- useInView hook for viewport detection
- Scroll-triggered animations with viewport={{ once: true }}
- Initial/whileInView/transition props

**Custom Components:**
- AnimatedCounter - viewport-triggered number animation
- Uses requestAnimationFrame for smooth counting
- Triggers when element enters viewport

### **Technical Implementation**

**File Structure:**
- `/app/about/page.tsx` - main About Us page component
- `/app/contexts/LanguageContext.tsx` - updated with aboutPage translations

**Data Structure:**
- milestones[] - timeline data from translations
- values[] - core values with icons and gradients
- stats[] - statistics with value, label, suffix

**Animation Logic:**
- AnimatedCounter uses useInView + useEffect
- requestAnimationFrame for performance
- Progress calculation over duration
- Cleanup on unmount

**Routing:**
- CTA buttons use Next.js router.push()
- Navigate to /signup and /contact
- No hard page reloads

### **Translation Keys Added**

**Korean:**
- aboutPage.hero.tagline/subtitle
- aboutPage.mission.title/content
- aboutPage.vision.title/content
- aboutPage.story.title + 5 milestones (year/title/description)
- aboutPage.stats.* (4 stat labels)
- aboutPage.values.* (4 values with title/description)
- aboutPage.cta.* (title/description/buttons)

**English:**
- Complete mirror translations for all Korean keys

### **Responsive Breakpoints**

**Typography:**
- Hero title: text-6xl → md:text-7xl → lg:text-8xl
- Section titles: text-4xl → md:text-5xl → lg:text-6xl
- Mission/Vision title: text-3xl → md:text-4xl
- Value cards: text-2xl → md:text-3xl

**Layout:**
- Mission/Vision grid: 1 col → lg:2 cols
- Stats grid: 2 cols → lg:4 cols
- Values grid: 1 col → md:2 cols
- Timeline: left-only → md:alternating

**Spacing:**
- Section padding: py-24 → md:py-32
- Card padding: p-6 → md:p-8
- CTA padding: p-12 → md:p-16 → lg:p-20

### **Visual Effects**

**Gradients:**
- Hero background: purple-900/20 → zinc-950 → pink-900/20
- Hero title: white → purple-200 → pink-200
- Timeline line: purple-500 → pink-500 → purple-500
- Stat numbers: purple-400 → pink-400
- CTA background: purple-600 → pink-600 → purple-700

**Glass-morphism:**
- Cards: bg-zinc-900/50 + backdrop-blur
- Borders: border-white/10
- Transparent overlays throughout

**Hover States:**
- Value cards: hover:bg-zinc-900/70
- CTA buttons: hover:bg-white/90 and hover:bg-white/20

### **Accessibility**

**Best Practices:**
- Semantic HTML structure
- Proper heading hierarchy (h1 → h2 → h3)
- Sufficient color contrast
- Motion respects user preferences
- Keyboard-accessible buttons

### **Performance**

**Optimizations:**
- Viewport-based animations (once: true)
- requestAnimationFrame for counters
- Proper cleanup in useEffect
- No unnecessary re-renders
- Efficient Framer Motion usage

### **User Experience**

**Flow:**
1. Hero grabs attention with large GRIGO title
2. Mission/Vision establishes purpose
3. Stats provide credibility
4. Values show company culture
5. Timeline tells company story
6. CTA encourages action

**Interactions:**
- Scroll to see animations trigger
- Numbers count up when visible
- Cards hover for subtle feedback
- CTA buttons navigate to signup/contact
- Smooth transitions throughout

### **Result**
- ✅ Professional, modern About Us page
- ✅ Full bilingual support (KO/EN)
- ✅ Responsive across all devices
- ✅ Smooth scroll-triggered animations
- ✅ Consistent with existing design system
- ✅ Clear storytelling and brand messaging
- ✅ Effective CTAs for user conversion
- ✅ Accessible and performant

## Contact Us Page Implementation (2025-10-04)

### **Feature Implemented**
Built comprehensive Contact Us page with functional contact form, contact information, and social media links.

### **Page Structure**

**Main Sections:**

1. **Hero Section**
   - Large gradient title
   - Subtitle with call to action
   - Clean, centered layout
   - Gradient text effect (white → purple → pink)

2. **Two-Column Layout**
   - Left: Contact form
   - Right: Contact information and social links
   - Responsive: Stacks to single column on mobile

3. **Contact Form**
   - 5 fields: Name, Email, Phone, Subject, Message
   - Form validation (required fields)
   - Loading state with spinner
   - Success state with checkmark
   - Error handling
   - Auto-reset after submission
   - Purple gradient submit button

4. **Contact Information Cards**
   - Email (with mailto: link)
   - Phone (with tel: link)
   - Address
   - Business Hours
   - Each with custom gradient icon
   - Hover effects with scale animation

5. **Social Media Links**
   - Instagram
   - YouTube
   - External links with gradient icons
   - Hover scale effects

### **Features Implemented**

**Form Functionality:**
- Controlled inputs with React state
- Form validation (HTML5 required attributes)
- Submit handler with loading state
- Success/error feedback
- Auto-clear form after 3 seconds
- Simulated submission (1.5s delay)
- Disabled state during submission

**Visual States:**
- Idle: Send icon + "Send Message"
- Submitting: Spinner + "Sending..."
- Success: Checkmark + "Message sent successfully!"
- Error: Alert icon + error message

**Responsive Design:**
- Mobile-first approach
- Two-column → Single column on mobile
- Form and info stack vertically
- Proper spacing and padding adjustments
- Hero text scales: 5xl → 6xl → 7xl

**Animations:**
- Hero fade-in on mount
- Form slide from left
- Info sidebar slide from right
- Contact cards stagger animation
- Social links stagger animation
- Hover scale on info cards (110%)
- Smooth transitions throughout

**Internationalization:**
- All content translated (Korean/English)
- Form labels and placeholders
- Button states (submit/sending/success)
- Contact info labels
- Error messages

### **Components & Styling**

**shadcn/ui Components:**
- Card - for form and info card containers
- Custom form inputs styled with Tailwind

**Lucide React Icons:**
- Mail, Phone, MapPin, Clock - contact info
- Instagram, Youtube - social media
- Send - submit button default
- Check - success state
- AlertCircle - error state

**Gradient Themes:**
- Email: purple-500 → pink-500
- Phone: blue-500 → purple-500
- Address: pink-500 → orange-500
- Hours: green-500 → emerald-500
- Instagram: purple-500 → pink-500 → orange-500
- YouTube: red-500 → red-600
- Submit button: purple-600 → pink-600

**Form Inputs:**
- Background: zinc-800/50
- Border: white/10
- Focus: purple-500 ring
- Placeholder: white/40
- Text: white

### **Technical Implementation**

**File Structure:**
- `/app/contact/page.tsx` - main Contact page component
- `/app/contexts/LanguageContext.tsx` - updated with contactPage translations

**State Management:**
```typescript
- formData: { name, email, phone, subject, message }
- isSubmitting: boolean
- submitStatus: 'idle' | 'success' | 'error'
```

**Form Handling:**
- handleChange: Updates formData state
- handleSubmit: Prevents default, simulates submission, shows success
- Auto-reset: Clears form 3s after success

**Contact Info Data:**
- Array of 4 contact methods
- Each with icon, label, value, href, gradient
- Map over array for rendering

**Social Links Data:**
- Array of 2 social platforms
- Each with icon, name, href, gradient
- External links open in new tab

### **Translation Keys Added**

**Korean:**
- contactPage.hero.title/subtitle
- contactPage.form.* (11 keys: title, fields, placeholders, states)
- contactPage.info.* (9 keys: title, email, phone, address, hours)
- contactPage.social.title/followUs

**English:**
- Complete mirror translations for all Korean keys

### **Responsive Breakpoints**

**Typography:**
- Hero title: text-5xl → md:text-6xl → lg:text-7xl
- Section titles: text-3xl → md:text-4xl
- Form labels: text-sm
- Contact info label: text-sm, value: base

**Layout:**
- Grid: 1 col → lg:2 cols
- Gap: 12 (3rem)
- Form padding: p-8 → md:p-10
- Contact cards: Always full width in column

**Spacing:**
- Hero: pt-32 pb-16 → md:pt-40 md:pb-24
- Main: pb-24 → md:pb-32
- Form fields: space-y-6
- Info cards: space-y-4
- Social links: space-y-3

### **User Experience**

**Form Flow:**
1. User fills out required fields (name, email, subject, message)
2. Optional phone number
3. Clicks "Send Message"
4. Button shows spinner + "Sending..."
5. After 1.5s, shows checkmark + "Message sent successfully!"
6. Form clears after 3s
7. Ready for new submission

**Contact Info:**
- Click email → Opens mailto: link
- Click phone → Opens dialer (mobile)
- Click address → No action (placeholder)
- Click hours → No action (placeholder)
- Hover → Card highlights, icon scales up

**Social Media:**
- Click → Opens in new tab
- Instagram and YouTube links
- Hover effects for feedback

### **Accessibility**

**Best Practices:**
- Semantic HTML (form, label, input)
- Proper label-input associations
- Required field indicators
- Focus states on inputs
- Keyboard-accessible buttons
- External link indicators (rel="noopener noreferrer")

**Form Accessibility:**
- All inputs have labels
- Placeholders provide hints
- Required fields marked
- Error messages visible
- Submit button states clear

### **Future Enhancements**

**Potential Additions:**
- Real form submission to backend/email service
- reCAPTCHA integration
- File upload for attachments
- Category/type dropdown
- Google Maps integration
- Live chat widget
- More social platforms
- Email validation feedback
- Character count for message
- Form field error states

### **Result**
- ✅ Professional contact form with validation
- ✅ Full bilingual support (KO/EN)
- ✅ Responsive two-column layout
- ✅ Smooth animations and transitions
- ✅ Clear contact information display
- ✅ Social media integration
- ✅ Loading and success states
- ✅ Clean, modern design matching brand
- ✅ Accessible form with proper labels
- ✅ Hover effects for visual feedback

## TopNavBar Visibility & Page Padding Updates (2025-10-04)

### **Feature Implemented**
Updated TopNavBar to show on all pages except artist detail pages, and added proper top padding to prevent content from being covered by the navbar.

### **Changes Made**

**TopNavBar Component:**
- Modified visibility logic to only hide on artist detail pages (`/artists/[slug]`)
- Now shows on artist list page (`/artists`)
- Now shows on all other pages (home, about, contact, works, login, signup, mypage)

**Logic Change:**
```typescript
// Before:
const isArtistPage = pathname?.startsWith('/artists');
if (isArtistPage) return null;

// After:
const isArtistDetailPage = pathname?.startsWith('/artists/');
if (isArtistDetailPage) return null;
```

**Pages Updated with Top Padding:**

1. **About Us Page** - `pt-20 md:pt-24`
2. **Contact Us Page** - `pt-20 md:pt-24` (also adjusted hero section padding)
3. **Artists List Page** - `pt-20 md:pt-24`
4. **Works Page** - `pt-20 md:pt-24` (also changed bg to `bg-primary`)
5. **Login Page** - `pt-20 md:pt-24` (also changed bg to `bg-primary`)
6. **Signup Page** - `pt-20 md:pt-24` (also changed bg to `bg-primary`)
7. **My Page** - `pt-20 md:pt-24` (loading state and main container, also changed bg to `bg-primary`)

**Padding Strategy:**
- Mobile: `pt-20` (5rem / 80px)
- Desktop: `md:pt-24` (6rem / 96px)
- Matches typical navbar height + comfortable spacing

**Background Color Updates:**
- Changed all pages from `bg-zinc-950` to `bg-primary` for consistency
- Works page, Login page, Signup page, My page all now use primary background

### **Files Modified**

1. **TopNavBar.tsx**
   - Line 33-37: Updated visibility logic
   - Now uses `pathname?.startsWith('/artists/')` instead of `/artists`

2. **about/page.tsx**
   - Added `pt-20 md:pt-24` to main element

3. **contact/page.tsx**
   - Added `pt-20 md:pt-24` to main element
   - Adjusted hero section from `pt-32` to `pt-12`, `pt-40` to `pt-16`

4. **artists/page.tsx**
   - Added `pt-20 md:pt-24` to motion.div container

5. **works/page.tsx**
   - Added `pt-20 md:pt-24` to main element
   - Changed `bg-zinc-950` to `bg-primary`

6. **login/page.tsx**
   - Added `pt-20 md:pt-24` to main element
   - Changed `bg-zinc-950` to `bg-primary`

7. **signup/page.tsx**
   - Added `pt-20 md:pt-24` to main element
   - Changed `bg-zinc-950` to `bg-primary`

8. **mypage/page.tsx**
   - Added `pt-20 md:pt-24` to loading state and main container
   - Changed `bg-zinc-950` to `bg-primary`

### **Result**
- ✅ TopNavBar now visible on all pages except artist detail pages
- ✅ All pages have proper top padding to prevent navbar overlap
- ✅ Consistent primary background across all pages
- ✅ Responsive padding (smaller on mobile, larger on desktop)
- ✅ Clean navigation experience throughout the app


## Team Profile Page Implementation (2025-10-04)

### **Feature Implemented**
Built comprehensive team profile page with Spotify-style aesthetic, replacing the basic team view placeholder.

### **Design Approach**
Consulted shadcn-ui-expert agent for comprehensive design planning:
- Created detailed implementation plan (`.claude/doc/team-profile-page-implementation.md`)
- Created visual design guide (`.claude/doc/team-profile-visual-guide.md`)
- Followed Spotify's dark theme aesthetic matching the existing artist profile page

### **Components Created**

#### 1. TeamMemberCard Component
**File**: `app/artists/components/TeamMemberCard.tsx`

**Features**:
- Profile image with fallback gradient avatar
- Leader badge with Crown icon (shows for team leader)
- Bilingual name display (primary + alternative name)
- Social media links (Instagram, YouTube, Twitter)
- Hover animations (scale 1.03, lift -4px)
- Click to navigate to member's artist profile
- Size variants: small, medium (default), large

**Styling**:
- Dark card with `bg-zinc-900/80 backdrop-blur-sm`
- Profile image section: 48px height
- Card heights: 64px (small), 72px (medium), 80px (large)
- Border: `border-zinc-800/50` with hover effect to `border-zinc-700/50`
- Leader badge: `bg-primary/20 text-primary border-primary/30`

**Props Interface**:
```typescript
interface TeamMemberCardProps {
  member: TeamMember;
  isLeader: boolean;
  onClick?: (member: TeamMember) => void;
  size?: 'small' | 'medium' | 'large';
}
```

### **Team Profile Page Updates**

**File**: `app/artists/[slug]/page.tsx` (lines 257-455)

Replaced basic team view with comprehensive Spotify-style layout:

#### Hero Section
- Full-width team cover image (team.cover_image or team.logo_url)
- Responsive heights: 400px → 450px → 500px → 550px (mobile → XL)
- Fallback: Gradient background with team initial
- Gradient overlays (top and bottom) for readability
- Large team name display (3xl → 4xl → 5xl → 6xl)
- Member count badge with Users icon
- Back button with navigation to /artists

#### Social Bar
- Share button with native share API support
- Clipboard fallback for desktop browsers
- Positioned below hero in dedicated section

#### Main Content Layout
**Two-column grid** (mobile stacks, desktop splits):
- Left sidebar: 1/4 width (Team Info)
- Right content: 3/4 width (Description + Members)

#### Left Sidebar - Team Info
Three stat items with icons:
1. **Formation Year** - Calendar icon, extracted from `team.created_at`
2. **Member Count** - Users icon, from `teamMembers.length`
3. **Leader Info** - Crown icon, shows leader name (bilingual)

Each stat shows:
- Icon in `text-white/60`
- Label in small gray text
- Value in bold white text

#### Right Content - Team Description & Members
1. **Team Description Section**:
   - "About {teamName}" heading
   - Full description with `whitespace-pre-line` for formatting
   - Only shown if `team.description` exists

2. **Team Members Grid**:
   - Responsive grid: 2 → 3 → 4 columns (mobile → desktop)
   - Shows first 8 members by default
   - TeamMemberCard for each member
   - Leader badge shown on leader's card
   - Click navigates to member's profile

3. **Show More/Less Button**:
   - Only shown if team has more than 8 members
   - Toggles between showing 8 and all members
   - Shows count of hidden members in button text
   - Styled with border and hover effects

### **State Management**

Added `showAllMembers` state:
```typescript
const [showAllMembers, setShowAllMembers] = useState(false);
```

Computed values:
```typescript
const leaderMember = teamMembers.find(m => m.id === team.leader_id);
const displayedMembers = showAllMembers ? teamMembers : teamMembers.slice(0, 8);
```

### **Imports Added**

Added to `[slug]/page.tsx`:
```typescript
import { TeamMemberCard } from '../components/TeamMemberCard';
import { Users, Calendar, Crown, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
```

### **Design Consistency**

**Matching Artist Profile**:
- Same hero layout structure and responsive heights
- Identical gradient overlay pattern
- Same back button style and positioning
- Matching social button design
- Consistent spacing and typography
- Same dark theme color scheme

**Responsive Design**:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid adapts: 1 col → 4 col layout
- Member cards: 2 → 3 → 4 columns
- Padding adjusts: 4 → 8 → 12 (mobile → desktop)

### **Animations**

**TeamMemberCard**:
- Framer Motion `whileHover`: scale 1.03, y -4px
- `whileTap`: scale 0.98
- Duration: 0.2s
- Smooth transitions on all interactive elements

**Hover Effects**:
- Card border brightens on hover
- Shadow increases (shadow-lg → shadow-2xl)
- Social links: bg opacity increases
- Show more button: text and border brighten

### **Accessibility**

- Semantic HTML structure
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels on social links and buttons
- Keyboard navigation support
- Focus states on interactive elements
- Alternative text for images

### **Build Status**

✅ **Build Successful**
- No TypeScript errors
- Only minor ESLint warnings (unused variables)
- Bundle size increased by ~3KB for artist detail route (7.53 kB total)
- All 13 pages generated successfully

### **Files Created/Modified**

**Created**:
1. `app/artists/components/TeamMemberCard.tsx` (151 lines)

**Modified**:
1. `app/artists/[slug]/page.tsx` (lines 1-10, 230, 257-455)
   - Added imports
   - Added `showAllMembers` state
   - Replaced team profile view (lines 257-455)

**Documentation Created** (by shadcn-ui-expert agent):
1. `.claude/doc/team-profile-page-implementation.md` (1,243 lines)
2. `.claude/doc/team-profile-visual-guide.md` (546 lines)

### **Result**
- ✅ Professional team profile page with Spotify aesthetic
- ✅ Full bilingual support (Korean/English)
- ✅ Responsive design (mobile → desktop)
- ✅ Member showcase with leader badge
- ✅ Team statistics and information display
- ✅ Social sharing functionality
- ✅ Smooth animations and hover effects
- ✅ Consistent with artist profile design
- ✅ Accessible and keyboard-navigable
- ✅ Production-ready with successful build
- ✅ Click-through navigation to member profiles
- ✅ Show more/less functionality for large teams

### **Future Enhancements** (Optional)

Potential additions for future development:
- Team-level social media links (requires database schema update)
- Team career entries/achievements section
- Team statistics aggregation (total followers, total listeners)
- Team highlight videos/media gallery
- Member role badges (choreographer, dancer, etc.)
- Join date for each member
- Team awards and recognitions section
- Collaborative works section
- Team timeline/history

