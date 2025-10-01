'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CheckCircle, Instagram, Youtube, Music } from 'lucide-react';
import { Dancer } from '../types/dancer';

interface DancerCardProps {
  dancer: Dancer;
  onClick?: (dancer: Dancer) => void;
  size?: 'small' | 'medium' | 'large';
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

export function DancerCard({
  dancer,
  onClick,
  size = 'medium',
  showPlayButton = true
}: DancerCardProps) {
  const router = useRouter();
  const cardHeight = size === 'large' ? 'h-96' : size === 'small' ? 'h-72' : 'h-80';

  const handleClick = () => {
    if (onClick) {
      onClick(dancer);
    } else {
      // Navigate to artist profile using slug from dancer ID or englishName
      const slug = dancer.id; // In real implementation, this should be the actual slug from database
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
      <Card className={`${cardHeight} bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden relative rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${dancer.image})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Top Section - Badges */}
          <div className="p-4 flex justify-between items-start">
            <Badge
              variant="secondary"
              className="bg-black/50 text-white border-none backdrop-blur-sm"
            >
              {dancer.specialty}
            </Badge>
            {dancer.isVerified && (
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>

          {/* Play Button (appears on hover) */}
          {showPlayButton && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Music className="h-8 w-8 text-primary-foreground ml-1" />
              </div>
            </div>
          )}

          {/* Bottom Section - Names and Info */}
          <div className="mt-auto p-4 space-y-2">
            <div>
              <h3 className="text-xl font-bold text-white leading-tight mb-1">
                {dancer.koreanName}
              </h3>
              <p className="text-white/90 text-base font-medium">
                {dancer.englishName}
              </p>
            </div>

            {/* Stats */}
            {(dancer.monthlyListeners || dancer.followers) && (
              <div className="flex items-center gap-4 text-xs text-white/70">
                {dancer.monthlyListeners && (
                  <span>{formatNumber(dancer.monthlyListeners)} monthly listeners</span>
                )}
                {dancer.followers && (
                  <span>{formatNumber(dancer.followers)} followers</span>
                )}
              </div>
            )}

            {/* Social Links */}
            {dancer.socialLinks && (
              <div className="flex gap-2 pt-2">
                {dancer.socialLinks.instagram && (
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Instagram className="h-3 w-3 text-white" />
                  </div>
                )}
                {dancer.socialLinks.youtube && (
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Youtube className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}