'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Target, Eye, Flame, Lightbulb, Users, Award, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Animated Counter Component
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function AboutPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const milestones = [
    {
      year: t('aboutPage.story.milestone1.year'),
      title: t('aboutPage.story.milestone1.title'),
      description: t('aboutPage.story.milestone1.description'),
    },
    {
      year: t('aboutPage.story.milestone2.year'),
      title: t('aboutPage.story.milestone2.title'),
      description: t('aboutPage.story.milestone2.description'),
    },
    {
      year: t('aboutPage.story.milestone3.year'),
      title: t('aboutPage.story.milestone3.title'),
      description: t('aboutPage.story.milestone3.description'),
    },
    {
      year: t('aboutPage.story.milestone4.year'),
      title: t('aboutPage.story.milestone4.title'),
      description: t('aboutPage.story.milestone4.description'),
    },
    {
      year: t('aboutPage.story.milestone5.year'),
      title: t('aboutPage.story.milestone5.title'),
      description: t('aboutPage.story.milestone5.description'),
    },
  ];

  const values = [
    {
      icon: Flame,
      title: t('aboutPage.values.passion.title'),
      description: t('aboutPage.values.passion.description'),
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Lightbulb,
      title: t('aboutPage.values.innovation.title'),
      description: t('aboutPage.values.innovation.description'),
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Users,
      title: t('aboutPage.values.collaboration.title'),
      description: t('aboutPage.values.collaboration.description'),
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      icon: Award,
      title: t('aboutPage.values.excellence.title'),
      description: t('aboutPage.values.excellence.description'),
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { label: t('aboutPage.stats.artists'), value: 50, suffix: '+' },
    { label: t('aboutPage.stats.projects'), value: 200, suffix: '+' },
    { label: t('aboutPage.stats.countries'), value: 25, suffix: '+' },
    { label: t('aboutPage.stats.awards'), value: 15, suffix: '+' },
  ];

  return (
    <main className="min-h-screen bg-primary text-white pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-zinc-950 to-pink-900/20" />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              GRIGO
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 mb-4">
              {t('aboutPage.hero.tagline')}
            </p>
            <p className="text-lg md:text-xl text-white/60 mb-12">
              {t('aboutPage.hero.subtitle')}
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center text-white/40"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 md:p-10 bg-zinc-900/50 border-white/10 backdrop-blur h-full text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {t('aboutPage.mission.title')}
                  </h2>
                </div>
                <p className="text-white/70 text-lg leading-relaxed">
                  {t('aboutPage.mission.content')}
                </p>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 md:p-10 bg-zinc-900/50 border-white/10 backdrop-blur h-full text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {t('aboutPage.vision.title')}
                  </h2>
                </div>
                <p className="text-white/70 text-lg leading-relaxed">
                  {t('aboutPage.vision.content')}
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 md:py-32 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-white/60 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t('aboutPage.values.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8 bg-zinc-900/50 border-white/10 backdrop-blur h-full hover:bg-zinc-900/70 transition-colors text-white">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{value.title}</h3>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline Section */}
      <section className="py-24 md:py-32 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t('aboutPage.story.title')}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500" />

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 transform -translate-x-1/2 ring-4 ring-primary" />

                  {/* Content */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card className="p-6 bg-zinc-900/50 border-white/10 backdrop-blur text-white">
                      <div className="text-sm font-bold text-purple-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                        {milestone.title}
                      </h3>
                      <p className="text-white/70">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            <div className="relative z-10 p-12 md:p-16 lg:p-20 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t('aboutPage.cta.title')}
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-10">
                {t('aboutPage.cta.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/signup')}
                  className="px-8 py-4 bg-white text-purple-600 rounded-lg text-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  {t('aboutPage.cta.joinUs')}
                </button>
                <button
                  onClick={() => router.push('/contact')}
                  className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  {t('aboutPage.cta.contact')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
