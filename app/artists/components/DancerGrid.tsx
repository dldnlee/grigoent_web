'use client';

import { motion } from 'framer-motion';
import { Dancer, Team } from '../types/dancer';
import { DancerCard } from './DancerCard';
import { TeamCard } from './TeamCard';

interface DancerGridProps {
  dancers?: Dancer[];
  teams?: Team[];
  onDancerClick?: (dancer: Dancer) => void;
  onTeamClick?: (team: Team) => void;
  isLoading?: boolean;
}

const gridVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function DancerGrid({
  dancers = [],
  teams = [],
  onDancerClick,
  onTeamClick,
  isLoading = false
}: DancerGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-80 bg-card/50 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  const isEmpty = dancers.length === 0 && teams.length === 0;

  if (isEmpty) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎭</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No artists found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
    >
      {/* Render dancers */}
      {dancers.map((dancer) => (
        <motion.div key={dancer.id} variants={itemVariants}>
          <DancerCard
            dancer={dancer}
            onClick={onDancerClick}
          />
        </motion.div>
      ))}

      {/* Render teams */}
      {teams.map((team) => (
        <motion.div key={team.id} variants={itemVariants}>
          <TeamCard
            team={team}
            onClick={onTeamClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}