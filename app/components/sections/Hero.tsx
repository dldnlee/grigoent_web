'use client';

import { ChevronDown } from 'lucide-react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ value, suffix = '', delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const controls = animate(count, value, {
          duration: 2,
          ease: "easeOut",
        });
        return controls.stop;
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, count, value, delay]);

  return (
    <motion.div ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-light">
      <motion.span>{rounded}</motion.span>{suffix}
    </motion.div>
  );
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const statsVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  return (
    <section className="min-h-screen bg-primary text-primary-foreground flex items-center relative overflow-hidden w-full">
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-4 w-48 h-48 sm:w-64 sm:h-64 lg:top-20 lg:left-20 lg:w-96 lg:h-96 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-2xl lg:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-8 w-40 h-40 sm:w-56 sm:h-56 lg:bottom-20 lg:right-20 lg:w-80 lg:h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl lg:blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-2xl lg:blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Side - Content */}
          <motion.div
            className="space-y-8 w-full overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Company Info */}
            <motion.div className="text-gray-400" variants={itemVariants}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">GRIGO 엔터테인먼트 | A Global Dance Company</p>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 className="leading-none overflow-hidden" variants={itemVariants}>
              <motion.p
                className='font-light text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[7rem] whitespace-nowrap overflow-hidden'
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                DANCE WITH
              </motion.p>
              <motion.p
                className="text-primary-foreground font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[8rem] xl:text-[10rem] "
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                PASSION
              </motion.p>
            </motion.h1>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4 sm:gap-6 lg:flex lg:gap-12 text-base font-medium"
              variants={statsVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="text-left cursor-pointer lg:cursor-default p-2 -m-2 rounded-lg active:bg-white/5 lg:active:bg-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light">
                  <AnimatedCounter value={100} suffix="+" delay={1200} />
                </div>
                <div className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl">아티스트</div>
              </motion.div>
              <motion.div
                className="text-left cursor-pointer lg:cursor-default p-2 -m-2 rounded-lg active:bg-white/5 lg:active:bg-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light">
                  <AnimatedCounter value={500} suffix="+" delay={1400} />
                </div>
                <div className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl">프로젝트</div>
              </motion.div>
              <motion.div
                className="text-left cursor-pointer lg:cursor-default p-2 -m-2 rounded-lg active:bg-white/5 lg:active:bg-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light">
                  <AnimatedCounter value={30} suffix="+" delay={1600} />
                </div>
                <div className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl">국가</div>
              </motion.div>
              <motion.div
                className="text-left cursor-pointer lg:cursor-default p-2 -m-2 rounded-lg active:bg-white/5 lg:active:bg-transparent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light">
                  <AnimatedCounter value={15} suffix="+" delay={1800} />
                </div>
                <div className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl">년 경력</div>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="pt-4"
              variants={itemVariants}
            >
              <motion.button
                className="border border-primary-foreground/30 text-primary-foreground px-8 py-4 sm:px-10 sm:py-4 md:px-12 md:py-5 rounded-full hover:bg-primary-foreground hover:text-primary active:bg-primary-foreground/90 transition-all duration-300 font-medium text-base sm:text-lg md:text-xl min-h-[44px] w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                JOIN US NOW
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - YouTube Video */}
          <motion.div
            className="relative flex items-center justify-center order-first lg:order-last"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div
              className="w-full h-60 sm:h-80 lg:h-[400px] overflow-hidden shadow-2xl"
            >
              <iframe
                className="w-full h-full border-0"
                src="https://www.youtube.com/embed/ktWrP16ZpTk?autoplay=1&mute=1&loop=1&playlist=ktWrP16ZpTk&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0"
                title="GRIGO Entertainment Dance Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{ pointerEvents: 'none' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <p className="text-gray-400 text-sm sm:text-base lg:text-xl mb-2">SCROLL DOWN</p>
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-400 mx-auto animate-bounce" />
      </motion.div>
    </section>
  );
}