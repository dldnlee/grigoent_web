'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CheckCircle, Users, Calendar, Music } from 'lucide-react';
import { Team } from '../types/dancer';

interface TeamCardProps {
  team: Team;
  onClick?: (team: Team) => void;
  showPlayButton?: boolean;
}

const cardVariants = {
  initial: { scale: 1, rotateY: 0 },
  hover: {
    scale: 1.02,
    rotateY: 2,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
};

const formatNumber = (num: number | undefined) => {
  if (!num) return '';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export function TeamCard({
  team,
  onClick,
  showPlayButton = true
}: TeamCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(team);
    } else {
      // Navigate to team profile using slug
      const slug = team.slug || team.id; // Fallback to ID if slug doesn't exist
      router.push(`/artists/${slug}`);
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      className="cursor-pointer group"
      onClick={handleClick}
    >
      <Card className="h-64 bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden relative rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${team.image})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Top Section - Badges */}
          <div className="p-4 flex justify-between items-start">
            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="bg-black/50 text-white border-none backdrop-blur-sm"
              >
                {team.specialty}
              </Badge>
              <Badge
                variant="outline"
                className="bg-black/30 text-white border-white/30 backdrop-blur-sm"
              >
                <Users className="h-3 w-3 mr-1" />
                {team.members.length}
              </Badge>
            </div>
            {team.isVerified && (
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>

          {/* Play Button (appears on hover) */}
          {showPlayButton && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Music className="h-6 w-6 text-primary-foreground ml-1" />
              </div>
            </div>
          )}

          {/* Bottom Section - Team Info */}
          <div className="mt-auto p-4 space-y-2">
            <div>
              <h3 className="text-lg font-bold text-white leading-tight mb-1">
                {team.teamName}
              </h3>
              {team.koreanName && (
                <p className="text-white/90 text-sm font-medium">
                  {team.koreanName}
                </p>
              )}
            </div>

            {/* Team Details */}
            <div className="flex items-center justify-between text-xs text-white/70">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Since {team.formedYear}</span>
              </div>
              {team.followers && (
                <span>{formatNumber(team.followers)} followers</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}