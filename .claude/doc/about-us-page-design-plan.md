# About Us Page Design Plan - GRIGO Entertainment

## Executive Summary

This document provides a comprehensive design plan for the GRIGO Entertainment "About Us" page, following the existing Spotify-inspired dark theme aesthetic while incorporating modern 2025 design trends for company storytelling and brand presentation.

**Design Philosophy**: Create a compelling narrative-driven page that showcases GRIGO's journey, culture, and achievements through a dark, modern interface with smooth animations and clear visual hierarchy.

---

## 1. Design System Reference

### Color Palette (Existing)
```css
/* Primary Colors */
background: #09090b (zinc-950)
card-background: #18181b (zinc-900)
card-hover: rgba(39, 39, 42, 0.9) (zinc-800/90)

/* Text Colors */
primary-text: #ffffff
secondary-text: rgba(255, 255, 255, 0.6) (white/60)
muted-text: rgba(255, 255, 255, 0.4) (white/40)

/* Accent Colors */
spotify-green: #1DB954
gradient-purple-pink: linear-gradient(to right, #a855f7, #ec4899)
gradient-blue: linear-gradient(135deg, #1e3c72, #2a5298)

/* Borders */
border: rgba(255, 255, 255, 0.1) (white/10)
border-hover: rgba(255, 255, 255, 0.2) (white/20)
```

### Typography
```css
font-family: Roboto, sans-serif

/* Heading Sizes */
h1: text-4xl md:text-5xl lg:text-6xl (36-60px)
h2: text-3xl md:text-4xl lg:text-5xl (30-48px)
h3: text-2xl md:text-3xl (24-30px)
h4: text-xl md:text-2xl (20-24px)

/* Body Text */
body: text-base md:text-lg (16-18px)
small: text-sm (14px)
xs: text-xs (12px)
```

### Spacing System
```css
/* Section Spacing */
mobile: px-4 py-8
tablet: px-6 py-10
desktop: px-8 py-12
max-width: max-w-7xl (1280px)

/* Grid Gaps */
mobile: gap-4
tablet: gap-6 md:gap-8
desktop: gap-8 lg:gap-12
```

### Border Radius
```css
small: rounded-md (6px)
medium: rounded-lg (8px)
large: rounded-xl (12px)
extra-large: rounded-2xl (16px)
```

---

## 2. Page Structure & Layout

### Overall Layout
```
┌─────────────────────────────────────────────────────────┐
│  Hero Section (Full-width)                              │
│  - Gradient background with company tagline             │
│  - Large heading + subtitle                             │
│  - Scroll indicator                                     │
├─────────────────────────────────────────────────────────┤
│  Mission & Vision (max-w-7xl)                          │
│  - Two-column grid (Mission | Vision)                   │
│  - Icon + heading + description                         │
├─────────────────────────────────────────────────────────┤
│  Our Story (max-w-7xl)                                 │
│  - Timeline layout with milestones                      │
│  - Year markers with descriptions                       │
├─────────────────────────────────────────────────────────┤
│  Statistics (Full-width dark section)                   │
│  - 4-column grid of key metrics                         │
│  - Animated counters                                    │
├─────────────────────────────────────────────────────────┤
│  Core Values (max-w-7xl)                               │
│  - 3-column grid of value cards                         │
│  - Icon + title + description                           │
├─────────────────────────────────────────────────────────┤
│  Team Section (max-w-7xl) - Optional                   │
│  - Grid of founder/leader cards                         │
│  - Photo + name + role + bio                            │
├─────────────────────────────────────────────────────────┤
│  Call to Action (max-w-7xl)                            │
│  - Centered content with gradient text                  │
│  - Primary CTA buttons                                  │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Section-by-Section Design Specifications

### 3.1 Hero Section

**Purpose**: Create immediate visual impact and communicate GRIGO's core identity

**Layout**:
```typescript
<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-zinc-900 to-zinc-950">
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_100%)]" />

  {/* Content */}
  <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center">
    {/* Main heading */}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
    >
      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
        {language === 'ko' ? '춤으로 세상을 움직입니다' : 'Moving the World Through Dance'}
      </span>
    </motion.h1>

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-xl md:text-2xl text-white/70 leading-relaxed"
    >
      {language === 'ko'
        ? 'GRIGO Entertainment는 K-POP 안무 제작부터 글로벌 공연까지\n예술과 열정으로 경계를 넘는 엔터테인먼트 컴퍼니입니다.'
        : 'From K-POP choreography to global performances,\nGRIGO Entertainment breaks boundaries through art and passion.'}
    </motion.p>
  </div>

  {/* Scroll indicator */}
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <ChevronDown className="w-6 h-6 text-white/40" />
  </motion.div>
</section>
```

**Components Used**:
- Framer Motion for animations
- Lucide React for ChevronDown icon
- Gradient text with `bg-clip-text`

**Responsive Breakpoints**:
- Mobile: text-5xl, px-4, py-8
- Tablet: text-6xl, px-8
- Desktop: text-7xl, min-h-screen

**Animation Pattern**:
- Stagger animation with 0.2s delay
- Fade in + slide up (y: 20 → 0)
- Continuous bounce for scroll indicator

---

### 3.2 Mission & Vision Section

**Purpose**: Clearly communicate company purpose and future direction

**Layout**:
```typescript
<section className="py-16 md:py-24 bg-zinc-950">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    {/* Section heading */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
    >
      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {t('about.missionVision.title')}
      </span>
    </motion.h2>

    {/* Two-column grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Mission Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-zinc-900 rounded-2xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors"
      >
        <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {t('about.mission.title')}
        </h3>
        <p className="text-lg text-white/70 leading-relaxed">
          {t('about.mission.description')}
        </p>
      </motion.div>

      {/* Vision Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-zinc-900 rounded-2xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors"
      >
        <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {t('about.vision.title')}
        </h3>
        <p className="text-lg text-white/70 leading-relaxed">
          {t('about.vision.description')}
        </p>
      </motion.div>
    </div>
  </div>
</section>
```

**Components Used**:
- `Card` component (custom or shadcn/ui)
- Lucide icons: `Target`, `Sparkles`
- Framer Motion `motion.div`

**Icon Options** (from Lucide React):
- Mission: Target, Compass, Flag, Rocket
- Vision: Sparkles, Eye, Lightbulb, TrendingUp

**Responsive Grid**:
- Mobile: Single column stack
- Desktop (lg): 2 columns

**Hover Effects**:
- Border color change: white/10 → white/20
- Smooth transition duration

---

### 3.3 Our Story (Timeline Section)

**Purpose**: Share company journey and key milestones

**Layout**:
```typescript
<section className="py-16 md:py-24 bg-zinc-950">
  <div className="max-w-5xl mx-auto px-4 md:px-8">
    {/* Section heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {t('about.story.title')}
        </span>
      </h2>
      <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
        {t('about.story.subtitle')}
      </p>
    </motion.div>

    {/* Timeline */}
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 opacity-30" />

      {/* Timeline items */}
      <div className="space-y-12">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
              index % 2 === 0 ? '' : 'md:grid-flow-dense'
            }`}
          >
            {/* Year marker */}
            <div className={`flex items-center ${
              index % 2 === 0 ? 'md:justify-end' : 'md:col-start-2'
            }`}>
              <div className="absolute left-8 md:left-1/2 -ml-4 md:-ml-6 w-8 md:w-12 h-8 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-4 border-zinc-950">
                <span className="text-white font-bold text-xs md:text-sm">
                  {item.year.slice(-2)}
                </span>
              </div>
              <div className="ml-12 md:ml-0">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {item.year}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className={`ml-12 md:ml-0 ${
              index % 2 === 0 ? 'md:col-start-2' : ''
            }`}>
              <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-colors">
                <h4 className="text-xl md:text-2xl font-bold mb-3">
                  {item.title}
                </h4>
                <p className="text-white/70 leading-relaxed">
                  {item.description}
                </p>
                {item.image && (
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>
```

**Timeline Data Structure**:
```typescript
interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2015",
    title: "GRIGO Entertainment 설립",
    description: "작은 댄스 스튜디오에서 시작하여 K-POP 안무의 새로운 비전을 꿈꾸다.",
  },
  {
    year: "2017",
    title: "첫 메이저 K-POP 안무 계약",
    description: "대형 엔터테인먼트 회사와 협업하며 업계에서 인정받기 시작.",
  },
  {
    year: "2019",
    title: "글로벌 확장",
    description: "아시아, 유럽, 북미에서 워크샵 및 공연 개최.",
  },
  {
    year: "2021",
    title: "팀 확장 및 전문화",
    description: "전문 안무팀 구성과 다양한 장르로의 확장.",
  },
  {
    year: "2023",
    title: "디지털 플랫폼 진출",
    description: "온라인 클래스 및 디지털 콘텐츠 제작 시작.",
  },
  {
    year: "2025",
    title: "새로운 도약",
    description: "AI 기술과 댄스의 융합, 차세대 엔터테인먼트 선도.",
  },
];
```

**Visual Features**:
- Gradient vertical timeline line
- Alternating left/right layout on desktop
- Circular year markers with gradient background
- Hover effects on content cards
- Optional images for each milestone

**Responsive Behavior**:
- Mobile: Single column with offset timeline
- Desktop: Alternating two-column grid

---

### 3.4 Statistics/Achievements Section

**Purpose**: Build credibility through quantifiable achievements

**Layout**:
```typescript
<section className="py-16 md:py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    {/* Section heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {t('about.stats.title')}
        </span>
      </h2>
    </motion.div>

    {/* Stats grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-white/10 hover:border-white/20 transition-all hover:scale-105"
        >
          <div className="mb-4 flex justify-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm md:text-base text-white/60 font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

**Stats Data Structure**:
```typescript
import { Users, Briefcase, Globe, Award } from 'lucide-react';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

const statsData: Stat[] = [
  {
    value: 50,
    suffix: "+",
    label: language === 'ko' ? '전문 아티스트' : 'Professional Artists',
    icon: <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  },
  {
    value: 200,
    suffix: "+",
    label: language === 'ko' ? '완료 프로젝트' : 'Completed Projects',
    icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  },
  {
    value: 15,
    suffix: "+",
    label: language === 'ko' ? '협력 국가' : 'Countries Reached',
    icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  },
  {
    value: 10,
    suffix: "+",
    label: language === 'ko' ? '수상 경력' : 'Awards Won',
    icon: <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  },
];
```

**Counter Animation Component**:
```typescript
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, suffix = '', duration = 2 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration * 60); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}
```

**Visual Features**:
- Animated number counters
- Gradient icon backgrounds
- Hover scale effect (scale-105)
- Backdrop blur on cards
- Stagger animation (0.1s delay per item)

**Responsive Grid**:
- Mobile: 2 columns
- Desktop (lg): 4 columns

---

### 3.5 Core Values Section

**Purpose**: Communicate company principles and culture

**Layout**:
```typescript
<section className="py-16 md:py-24 bg-zinc-950">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    {/* Section heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {t('about.values.title')}
        </span>
      </h2>
      <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
        {t('about.values.subtitle')}
      </p>
    </motion.div>

    {/* Values grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {valuesData.map((value, index) => (
        <motion.div
          key={value.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-zinc-900 rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
        >
          {/* Icon */}
          <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            {value.icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
            {value.title}
          </h3>

          {/* Description */}
          <p className="text-white/70 leading-relaxed">
            {value.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

**Values Data Structure**:
```typescript
import { Heart, Zap, Users, Trophy } from 'lucide-react';

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const valuesData: Value[] = [
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: language === 'ko' ? '열정' : 'Passion',
    description: language === 'ko'
      ? '춤에 대한 순수한 열정으로 모든 작품에 생명을 불어넣습니다. 우리의 에너지는 무대 위에서 빛을 발합니다.'
      : 'We breathe life into every performance with pure passion for dance. Our energy shines brightest on stage.',
  },
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: language === 'ko' ? '혁신' : 'Innovation',
    description: language === 'ko'
      ? '전통과 현대를 융합하여 새로운 안무 언어를 창조합니다. 끊임없는 도전으로 댄스의 미래를 만듭니다.'
      : 'We create new choreographic languages by blending tradition with modernity. Continuous innovation shapes the future of dance.',
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: language === 'ko' ? '협력' : 'Collaboration',
    description: language === 'ko'
      ? '전 세계 아티스트들과 함께하며 문화의 경계를 넘어 하나의 작품을 만듭니다.'
      : 'We work with artists worldwide, crossing cultural boundaries to create unified masterpieces.',
  },
  {
    icon: <Trophy className="w-8 h-8 text-white" />,
    title: language === 'ko' ? '탁월함' : 'Excellence',
    description: language === 'ko'
      ? '완벽을 추구하며 모든 디테일에 최선을 다합니다. 타협 없는 품질로 최고의 결과물을 만듭니다.'
      : 'We pursue perfection and give our best in every detail. Uncompromising quality delivers the best results.',
  },
];
```

**Icon Options** (Lucide React):
- Passion: Heart, Flame, Sparkles
- Innovation: Zap, Lightbulb, Rocket, TrendingUp
- Collaboration: Users, Handshake, Network
- Excellence: Trophy, Award, Star, Target
- Creativity: Palette, Wand, Sparkle
- Integrity: Shield, CheckCircle

**Visual Features**:
- Icon scale on hover (scale-110)
- Border color change on hover (white/10 → purple-500/50)
- Title color change on hover (white → purple-400)
- Stagger animation

**Responsive Grid**:
- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

---

### 3.6 Team Section (Optional)

**Purpose**: Humanize the brand and showcase leadership

**Layout**:
```typescript
<section className="py-16 md:py-24 bg-zinc-950">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    {/* Section heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {t('about.team.title')}
        </span>
      </h2>
      <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
        {t('about.team.subtitle')}
      </p>
    </motion.div>

    {/* Team grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamData.map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
        >
          {/* Photo */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
          </div>

          {/* Info */}
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
            <p className="text-purple-400 text-sm font-medium mb-3">
              {member.role}
            </p>
            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
              {member.bio}
            </p>

            {/* Social links */}
            {member.social && (
              <div className="flex gap-3 mt-4">
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-purple-400 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {member.social.youtube && (
                  <a
                    href={member.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-purple-400 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

**Team Data Structure**:
```typescript
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  social?: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
  };
}

const teamData: TeamMember[] = [
  {
    name: "김지훈",
    role: "Founder & Creative Director",
    bio: "15년 이상의 K-POP 안무 경력을 가진 크리에이티브 디렉터. SM, YG, JYP 등 주요 엔터테인먼트와 협업.",
    photo: "/team/founder.jpg",
    social: {
      instagram: "https://instagram.com/example",
      youtube: "https://youtube.com/example",
    },
  },
  // ... more team members
];
```

**Visual Features**:
- Photo zoom on hover
- Gradient overlay on images
- Bio text with line-clamp-3
- Social icon links
- Stagger animation

**Responsive Grid**:
- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

**Alternative: Simple Card Layout** (if photos not available):
```typescript
<div className="bg-zinc-900 rounded-xl p-6 border border-white/10">
  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
    {member.name.charAt(0)}
  </div>
  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
  <p className="text-purple-400 text-sm mb-3">{member.role}</p>
  <p className="text-white/70 text-sm">{member.bio}</p>
</div>
```

---

### 3.7 Call-to-Action Section

**Purpose**: Drive user engagement and next steps

**Layout**:
```typescript
<section className="py-16 md:py-24 bg-gradient-to-b from-zinc-950 via-purple-900/10 to-zinc-950">
  <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          {t('about.cta.title')}
        </span>
      </h2>

      {/* Description */}
      <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
        {t('about.cta.description')}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => router.push('/contact')}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 active:scale-95"
        >
          {t('about.cta.contactButton')}
        </button>

        <button
          onClick={() => router.push('/artists')}
          className="px-8 py-4 bg-zinc-900 text-white font-semibold rounded-xl border border-white/20 hover:border-purple-500/50 hover:bg-zinc-800 transition-all"
        >
          {t('about.cta.artistsButton')}
        </button>
      </div>
    </motion.div>
  </div>
</section>
```

**Button Variants**:

Primary (Gradient):
```css
bg-gradient-to-r from-purple-500 to-pink-500
hover:shadow-lg hover:shadow-purple-500/50
hover:scale-105
```

Secondary (Outlined):
```css
bg-zinc-900 border border-white/20
hover:border-purple-500/50
hover:bg-zinc-800
```

**CTA Options**:
- Contact Us → `/contact`
- View Artists → `/artists`
- Join Our Team → `/careers` (if applicable)
- Watch Our Work → `/works`

---

## 4. Animation Patterns

### Scroll Animations (Framer Motion)

**Standard Section Entry**:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

**Stagger Children**:
```typescript
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item) => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

**Slide from Left/Right**:
```typescript
// From left
initial={{ opacity: 0, x: -20 }}
whileInView={{ opacity: 1, x: 0 }}

// From right
initial={{ opacity: 0, x: 20 }}
whileInView={{ opacity: 1, x: 0 }}
```

**Scale Animation**:
```typescript
initial={{ opacity: 0, scale: 0.9 }}
whileInView={{ opacity: 1, scale: 1 }}
```

**Continuous Animations**:
```typescript
// Bounce
animate={{ y: [0, 10, 0] }}
transition={{ repeat: Infinity, duration: 2 }}

// Pulse
animate={{ scale: [1, 1.05, 1] }}
transition={{ repeat: Infinity, duration: 3 }}
```

---

## 5. Responsive Breakpoints Strategy

### Container Sizes
```typescript
// Max-width containers
max-w-5xl  // 1024px - Timeline, narrow content
max-w-7xl  // 1280px - Main sections

// Padding
mobile:   px-4  py-8   // 16px, 32px
tablet:   px-6  py-10  // 24px, 40px
desktop:  px-8  py-12  // 32px, 48px
```

### Grid Breakpoints
```typescript
// Values, Team sections
grid-cols-1           // Mobile
md:grid-cols-2        // Tablet (768px)
lg:grid-cols-3        // Desktop (1024px)

// Mission/Vision
grid-cols-1           // Mobile
lg:grid-cols-2        // Desktop (1024px)

// Statistics
grid-cols-2           // Mobile (2x2)
lg:grid-cols-4        // Desktop (1x4)
```

### Typography Scale
```typescript
// Headings
text-3xl md:text-4xl lg:text-5xl  // 30-48px
text-2xl md:text-3xl              // 24-30px
text-xl md:text-2xl               // 20-24px

// Body
text-base md:text-lg              // 16-18px
text-sm                           // 14px
text-xs                           // 12px
```

### Spacing Scale
```typescript
// Gaps
gap-4                 // Mobile: 16px
gap-6 md:gap-8        // Tablet: 24-32px
gap-8 lg:gap-12       // Desktop: 32-48px

// Section spacing
py-16 md:py-24        // 64-96px
mb-12 md:mb-16        // 48-64px
```

---

## 6. Internationalization (i18n) Structure

### Translation Keys
```typescript
// Add to LanguageContext.tsx translations object

about: {
  hero: {
    title: {
      ko: '춤으로 세상을 움직입니다',
      en: 'Moving the World Through Dance'
    },
    subtitle: {
      ko: 'GRIGO Entertainment는 K-POP 안무 제작부터 글로벌 공연까지\n예술과 열정으로 경계를 넘는 엔터테인먼트 컴퍼니입니다.',
      en: 'From K-POP choreography to global performances,\nGRIGO Entertainment breaks boundaries through art and passion.'
    }
  },

  missionVision: {
    title: {
      ko: '미션 & 비전',
      en: 'Mission & Vision'
    }
  },

  mission: {
    title: {
      ko: '미션',
      en: 'Our Mission'
    },
    description: {
      ko: '춤을 통해 사람들에게 감동과 영감을 전하며, K-POP 문화를 세계에 알립니다. 우리는 모든 공연과 안무에 진심을 담아 예술의 가치를 높입니다.',
      en: 'We deliver inspiration and emotion through dance while spreading K-POP culture worldwide. We pour our hearts into every performance and choreography to elevate the value of art.'
    }
  },

  vision: {
    title: {
      ko: '비전',
      en: 'Our Vision'
    },
    description: {
      ko: '글로벌 댄스 엔터테인먼트의 선두주자로서, 혁신적인 안무와 공연으로 새로운 표준을 제시합니다. 문화와 국경을 넘어 하나의 언어로 소통하는 세상을 만듭니다.',
      en: 'As a global leader in dance entertainment, we set new standards through innovative choreography and performances. We create a world where dance speaks as one universal language across cultures and borders.'
    }
  },

  story: {
    title: {
      ko: '우리의 이야기',
      en: 'Our Story'
    },
    subtitle: {
      ko: '작은 댄스 스튜디오에서 시작하여 글로벌 엔터테인먼트로 성장한 GRIGO의 여정',
      en: "GRIGO's journey from a small dance studio to a global entertainment powerhouse"
    }
  },

  stats: {
    title: {
      ko: '숫자로 보는 GRIGO',
      en: 'GRIGO by the Numbers'
    },
    artists: {
      ko: '전문 아티스트',
      en: 'Professional Artists'
    },
    projects: {
      ko: '완료 프로젝트',
      en: 'Completed Projects'
    },
    countries: {
      ko: '협력 국가',
      en: 'Countries Reached'
    },
    awards: {
      ko: '수상 경력',
      en: 'Awards Won'
    }
  },

  values: {
    title: {
      ko: '핵심 가치',
      en: 'Core Values'
    },
    subtitle: {
      ko: 'GRIGO를 움직이는 원동력',
      en: 'What Drives GRIGO Forward'
    }
  },

  team: {
    title: {
      ko: '우리 팀',
      en: 'Meet Our Team'
    },
    subtitle: {
      ko: 'GRIGO를 만들어가는 크리에이터들',
      en: 'The Creators Behind GRIGO'
    }
  },

  cta: {
    title: {
      ko: '함께 춤추실 준비가 되셨나요?',
      en: 'Ready to Dance With Us?'
    },
    description: {
      ko: 'GRIGO Entertainment와 함께 새로운 무대를 만들어보세요. 협업, 공연, 워크샵 문의를 환영합니다.',
      en: 'Create new stages with GRIGO Entertainment. We welcome inquiries for collaborations, performances, and workshops.'
    },
    contactButton: {
      ko: '문의하기',
      en: 'Contact Us'
    },
    artistsButton: {
      ko: '아티스트 보기',
      en: 'View Artists'
    }
  }
}
```

### Usage in Components
```typescript
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <h1>{t('about.hero.title')}</h1>
  );
}
```

---

## 7. shadcn/ui Components Usage

### Components to Install
```bash
# Already installed
- card
- badge
- avatar
- separator
- skeleton
- scroll-area

# May need to install
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add accordion  # For FAQ section if needed
```

### Component Examples

**Card Component**:
```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card className="bg-zinc-900 border-white/10 hover:border-white/20">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

**Badge Component**:
```typescript
import { Badge } from "@/components/ui/badge";

<Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
  Featured
</Badge>
```

**Separator Component**:
```typescript
import { Separator } from "@/components/ui/separator";

<Separator className="bg-white/10" />
```

**Avatar Component** (for Team section):
```typescript
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

<Avatar className="w-20 h-20">
  <AvatarImage src={member.photo} alt={member.name} />
  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">
    {member.name.charAt(0)}
  </AvatarFallback>
</Avatar>
```

---

## 8. Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image';

// Use Next.js Image component
<Image
  src={member.photo}
  alt={member.name}
  width={400}
  height={400}
  className="rounded-xl"
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/png;base64,..."
/>
```

### Lazy Loading
```typescript
// Lazy load heavy components
const Timeline = dynamic(() => import('./Timeline'), {
  loading: () => <Skeleton className="h-96" />,
  ssr: false
});
```

### Viewport Detection
```typescript
// Only animate when in viewport
const ref = useRef(null);
const isInView = useInView(ref, {
  once: true,      // Animate only once
  amount: 0.3      // Trigger when 30% visible
});
```

---

## 9. File Structure

```
app/
├── about/
│   ├── page.tsx                 # Main About page
│   └── components/
│       ├── HeroSection.tsx
│       ├── MissionVision.tsx
│       ├── Timeline.tsx
│       ├── Statistics.tsx
│       ├── CoreValues.tsx
│       ├── TeamSection.tsx
│       └── CallToAction.tsx
├── contexts/
│   └── LanguageContext.tsx      # Add translations
└── components/
    └── ui/                       # shadcn components
```

---

## 10. Implementation Checklist

### Phase 1: Setup & Structure
- [ ] Create `/app/about/page.tsx`
- [ ] Add translation keys to `LanguageContext.tsx`
- [ ] Install missing shadcn/ui components (if any)
- [ ] Create section components folder

### Phase 2: Build Sections
- [ ] Hero Section with gradient background
- [ ] Mission & Vision two-column layout
- [ ] Timeline with alternating layout
- [ ] Statistics with animated counters
- [ ] Core Values grid
- [ ] Team Section (optional)
- [ ] Call-to-Action section

### Phase 3: Polish & Optimization
- [ ] Add Framer Motion animations
- [ ] Implement responsive breakpoints
- [ ] Add hover effects and transitions
- [ ] Test bilingual switching
- [ ] Optimize images with Next.js Image
- [ ] Add loading states
- [ ] Test on mobile devices

### Phase 4: Content & Testing
- [ ] Write actual company content
- [ ] Gather team photos (if using Team section)
- [ ] Set realistic statistics numbers
- [ ] Review SEO meta tags
- [ ] Cross-browser testing
- [ ] Performance audit

---

## 11. Example Code: Complete Mission/Vision Component

```typescript
// app/about/components/MissionVision.tsx
'use client';

import { motion } from 'framer-motion';
import { Target, Sparkles } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function MissionVision() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: <Target className="w-8 h-8 text-white" />,
      gradient: 'from-purple-500 to-pink-500',
      title: t('about.mission.title'),
      description: t('about.mission.description'),
      direction: -20, // slide from left
    },
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      gradient: 'from-blue-500 to-purple-500',
      title: t('about.vision.title'),
      description: t('about.vision.description'),
      direction: 20, // slide from right
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('about.missionVision.title')}
          </span>
        </motion.h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: card.direction }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-zinc-900 rounded-2xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              {/* Icon */}
              <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-lg text-white/70 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 12. SEO & Meta Tags

```typescript
// app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - GRIGO Entertainment',
  description: 'Learn about GRIGO Entertainment, a leading K-POP choreography and dance entertainment company. Discover our mission, values, and the team behind the movement.',
  keywords: 'GRIGO Entertainment, K-POP choreography, dance company, entertainment, about us',
  openGraph: {
    title: 'About GRIGO Entertainment',
    description: 'Moving the world through dance. Learn about our journey, mission, and the talented team behind GRIGO.',
    images: ['/og-about.jpg'],
  },
};
```

---

## 13. Accessibility Considerations

### ARIA Labels
```typescript
<button aria-label="Contact GRIGO Entertainment">
  {t('about.cta.contactButton')}
</button>
```

### Heading Hierarchy
```
h1: Page title (Hero section)
h2: Section titles (Mission, Story, Values, etc.)
h3: Subsection titles (Mission/Vision cards, Value cards)
h4: Card titles if needed
```

### Keyboard Navigation
```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
```

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-950
```

---

## 14. Design Inspiration References

### Dark Theme Entertainment Sites
- Spotify Artist Pages (dark aesthetic, gradient accents)
- Netflix About Page (storytelling, stats)
- Disney+ Company Info (values, team showcase)
- Apple Music (clean typography, animations)

### Modern About Pages 2025
- Stripe (timeline, statistics)
- Figma (team grid, values)
- Notion (mission/vision, culture)
- Linear (minimal, dark theme)

### Key Takeaways from Research
1. **Storytelling First**: Lead with narrative, not just facts
2. **Humanize**: Show real people, real photos
3. **Data Visualization**: Stats build credibility
4. **Culture Showcase**: Values matter to modern audiences
5. **Clear CTAs**: Guide next steps

---

## 15. Content Writing Guidelines

### Voice & Tone
- **Passionate**: Show energy and dedication
- **Professional**: Maintain credibility
- **Inspirational**: Motivate and engage
- **Authentic**: Be genuine and honest

### Writing Tips
1. **Keep it scannable**: Short paragraphs, clear headings
2. **Use active voice**: "We create" not "is created by us"
3. **Show, don't just tell**: Use specific examples
4. **Bilingual consistency**: Ensure meaning matches across languages
5. **Avoid jargon**: Keep language accessible

### Example Content Structure

**Mission (80-120 words)**:
- What we do
- Why we do it
- Impact we create

**Vision (80-120 words)**:
- Future goals
- Industry leadership
- Long-term impact

**Values (40-60 words each)**:
- Specific principle
- How it manifests
- Real-world example

---

## 16. Next Steps After Implementation

1. **Analytics Setup**
   - Track scroll depth
   - Monitor CTA clicks
   - Measure time on page

2. **A/B Testing**
   - Test CTA button text
   - Try different hero headlines
   - Experiment with section order

3. **Content Updates**
   - Update statistics quarterly
   - Add new team members
   - Refresh timeline with milestones

4. **Enhancement Ideas**
   - Video background in hero
   - Interactive timeline
   - Team member modal details
   - Company culture photos gallery
   - FAQ accordion section

---

## Summary

This design plan provides a comprehensive blueprint for creating a modern, engaging About Us page that:

✅ **Matches existing design**: Spotify-inspired dark theme with zinc-950 background and gradient accents
✅ **Tells a story**: Hero → Mission/Vision → Story → Stats → Values → Team → CTA
✅ **Responsive**: Mobile-first with proper breakpoints
✅ **Animated**: Smooth Framer Motion animations throughout
✅ **Bilingual**: Full Korean/English support
✅ **Professional**: Clean, modern aesthetic suitable for entertainment industry
✅ **Accessible**: Proper semantics, ARIA labels, keyboard navigation
✅ **Performant**: Optimized images, lazy loading, viewport detection

**Estimated Development Time**: 8-12 hours for full implementation

**Recommended Order**:
1. Hero Section (1-2 hours)
2. Mission & Vision (1-2 hours)
3. Statistics (2 hours - includes counter animation)
4. Core Values (1-2 hours)
5. Timeline (2-3 hours - most complex)
6. Team Section (1-2 hours - if included)
7. CTA (1 hour)
8. Polish & Testing (2 hours)

The design balances visual impact with usability, creating a compelling narrative that showcases GRIGO Entertainment's journey, values, and team while maintaining consistency with the existing site aesthetic.
