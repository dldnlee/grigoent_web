'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WorkWithUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const opportunities = [
    {
      title: "개인 댄서",
      description: "개인으로 활동중인 댄서들과\n협업을 원하시는 경우",
      action: "댄서 찾기",
      shadowColor: "shadow-red-500/50"
    },
    {
      title: "댄스 팀",
      description: "개인으로 활동중인 댄서들과\n협업을 원하시는 경우",
      action: "팀 찾기",
      shadowColor: "shadow-green-500/50"
    },
    {
      title: "일반 제안",
      description: "개인으로 활동중인 댄서들과\n협업을 원하시는 경우",
      action: "제안하기",
      shadowColor: "shadow-purple-500/50"
    }
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <section className="py-32 bg-primary text-primary-foreground" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="text-2xl text-gray-400 mb-2 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            프로젝트 제안
          </motion.p>
          <motion.h2
            className="text-6xl md:text-8xl font-light mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Work With Us
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            프로젝트 유형에 따라 적절한 제안 방법을 선택하세요
          </motion.p>
        </motion.div>

        {/* Opportunities Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delayChildren: 0.6, staggerChildren: 0.2 }}
        >
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={index}
              className={`bg-secondary rounded-3xl p-12 text-start shadow-2xl ${opportunity.shadowColor} hover:scale-105 transition-all duration-300`}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{
                duration: 0.6,
                delay: 0.7 + index * 0.2,
                ease: "easeOut"
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.h3
                className="text-4xl font-bold text-secondary-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
              >
                {opportunity.title}
              </motion.h3>
              <motion.p
                className="text-xl text-secondary-foreground/70 mb-12 leading-relaxed whitespace-pre-line"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.2 }}
              >
                {opportunity.description}
              </motion.p>
              <motion.button
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-6 rounded-2xl font-semibold text-lg transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {opportunity.action}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}