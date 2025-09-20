'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const services = [
    {
      title: "K-POP & 앨범 안무 제작",
      description: "아이돌 그룹, 솔로 아티스트의 타이틀곡 및 수록곡 안무 제작"
    },
    {
      title: "영화 & 광고 안무",
      description: "영화, 드라마, 광고 CF 안무 제작 및 출연"
    },
    {
      title: "방송 & 행사 출연",
      description: "TV 프로그램, 콘서트, 행사 댄서 및 팀 섭외"
    },
    {
      title: "해외 & 국내 워크샵",
      description: "전 세계 K-POP 댄스 레슨 및 워크샵 진행"
    },
    {
      title: "댄스 챌린지",
      description: "제품, 공감, 릴레이 홍보를 위한 댄스 챌린지 제작"
    },
    {
      title: "댄스 대회 & 행사",
      description: "댄스 대회 주최, 운영 및 다양한 행사 기획"
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
    <section className="py-24 bg-secondary flex flex-col items-center" id="about" ref={ref}>
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
              className="text-sm font-medium text-secondary-foreground/60 mb-4 tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ABOUT US
            </motion.p>
            <div className="flex justify-between items-center">
              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl font-normal text-secondary-foreground leading-tight mr-12"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                WHAT DO WE DO?
              </motion.h2>
              <motion.p
                className="text-lg text-secondary-foreground/70 leading-relaxed"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                저희는 세계적인 안무가들과 댄서들을 연결하여<br />
                혁신적이고 감동적인 공연을 만들어갑니다.
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
              {/* Icon Placeholder */}
              <motion.div
                className="w-12 h-12 bg-gray-400 rounded-full mb-6"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              ></motion.div>

              <motion.h3
                className="text-lg font-bold text-secondary-foreground mb-3 leading-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                {service.title}
              </motion.h3>
              <motion.p
                className="text-sm text-secondary-foreground/70 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
    </section>
  );
}