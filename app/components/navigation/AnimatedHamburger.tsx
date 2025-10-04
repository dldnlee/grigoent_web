'use client';

import { motion } from 'framer-motion';

interface AnimatedHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function AnimatedHamburger({ isOpen, onClick }: AnimatedHamburgerProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <div className="w-6 h-6 relative flex flex-col justify-center items-center">
        {/* Top line */}
        <motion.span
          className="absolute w-5 h-0.5 bg-white origin-center"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -6,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        />

        {/* Middle line */}
        <motion.span
          className="absolute w-5 h-0.5 bg-white"
          animate={{
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0.8 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
        />

        {/* Bottom line */}
        <motion.span
          className="absolute w-5 h-0.5 bg-white origin-center"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 6,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        />
      </div>
    </button>
  );
}