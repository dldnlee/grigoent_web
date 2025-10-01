'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  count: number;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function SectionHeader({
  title,
  count,
  subtitle,
  actions
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-6"
    >
      <div>
        <div className="flex items-baseline gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {title}
          </h2>
          <motion.span
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-medium text-muted-foreground"
          >
            ({count})
          </motion.span>
        </div>
        {subtitle && (
          <p className="text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </motion.div>
  );
}