'use client';

import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 1.2
      }
    }
  };

  return (
    <section className="min-h-screen bg-primary text-primary-foreground flex items-center relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Company Info */}
            <motion.div className="text-gray-400" variants={itemVariants}>
              <p className="text-xl md:text-2xl lg:text-3xl">GRIGO 엔터테인먼트 | A Global Dance Company</p>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 className="leading-none" variants={itemVariants}>
              <motion.p
                className='font-light text-5xl sm:text-6xl md:text-7xl lg:text-[3rem] xl:text-[7rem]'
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                DANCE WITH
              </motion.p>
              <motion.p
                className="text-primary-foreground font-extrabold text-7xl sm:text-9xl md:text-[7rem] lg:text-[10rem] xl:text-[12rem]"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                PASSION
              </motion.p>
            </motion.h1>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-8 md:gap-12 text-base font-medium"
              variants={statsVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="text-left"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-light">100+</div>
                <div className="text-gray-400 text-lg md:text-xl">아티스트</div>
              </motion.div>
              <motion.div
                className="text-left"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-light">500+</div>
                <div className="text-gray-400 text-lg md:text-xl">프로젝트</div>
              </motion.div>
              <motion.div
                className="text-left"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-light">30+</div>
                <div className="text-gray-400 text-lg md:text-xl">국가</div>
              </motion.div>
              <motion.div
                className="text-left"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-light">15+</div>
                <div className="text-gray-400 text-lg md:text-xl">년 경력</div>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="pt-4"
              variants={itemVariants}
            >
              <motion.button
                className="border border-primary-foreground/30 text-primary-foreground px-10 py-4 md:px-12 md:py-5 rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300 font-medium text-lg md:text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                JOIN US NOW
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Placeholder for 3D Design */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.div
              className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl border border-primary-foreground/10 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-gray-400 text-center">
                <motion.div
                  className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full opacity-50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <p>3D Design Placeholder</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <p className="text-gray-400 text-sm mb-2">SCROLL DOWN</p>
        <ChevronDown className="w-6 h-6 text-gray-400 mx-auto animate-bounce" />
      </motion.div>
    </section>
  );
}