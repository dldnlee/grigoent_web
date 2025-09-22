'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Music, Video, Tv, Globe, Zap, Trophy } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  const services = [
    {
      titleKey: "services.kpop.title",
      descriptionKey: "services.kpop.description",
      icon: Music
    },
    {
      titleKey: "services.movie.title",
      descriptionKey: "services.movie.description",
      icon: Video
    },
    {
      titleKey: "services.broadcast.title",
      descriptionKey: "services.broadcast.description",
      icon: Tv
    },
    {
      titleKey: "services.workshop.title",
      descriptionKey: "services.workshop.description",
      icon: Globe
    },
    {
      titleKey: "services.challenge.title",
      descriptionKey: "services.challenge.description",
      icon: Zap
    },
    {
      titleKey: "services.competition.title",
      descriptionKey: "services.competition.description",
      icon: Trophy
    }
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <section className="py-30 bg-secondary flex flex-col items-center" id="about" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="flex flex-col lg:flex-row w-full mb-20"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="mb-8 lg:mb-0 w-full">
            <motion.p
              className="text-lg font-medium text-secondary-foreground/60 mb-4 tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('services.aboutUs')}
            </motion.p>
            <div className="flex justify-between items-center">
              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl font-normal text-secondary-foreground leading-tight mr-12"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {t('services.whatDoWeDo')}
              </motion.h2>
              <motion.p
                className="text-xl text-secondary-foreground/70 leading-relaxed"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('services.description').split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t('services.description').split('\n').length - 1 && <br />}
                  </span>
                ))}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-12 max-w-[90%]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-200 rounded-2xl p-6 hover:bg-gray-300 transition-all duration-300"
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Service Icon */}
              <motion.div
                className="w-12 h-12 rounded-full mb-6 flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <service.icon className="w-10 h-10 text-primary" />
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-secondary-foreground mb-3 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                {t(service.titleKey)}
              </motion.h3>
              <motion.p
                className="text-md text-secondary-foreground/70 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                {t(service.descriptionKey)}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
    </section>
  );
}