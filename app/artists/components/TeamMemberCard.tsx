'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Crown, Instagram, Youtube, Twitter } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface TeamMember {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  profile_image: string | null;
  introduction: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  twitter_url: string | null;
}

interface TeamMemberCardProps {
  member: TeamMember;
  isLeader: boolean;
  onClick?: (member: TeamMember) => void;
  size?: 'small' | 'medium' | 'large';
}

export function TeamMemberCard({
  member,
  isLeader,
  onClick,
  size = 'medium'
}: TeamMemberCardProps) {
  const { language } = useLanguage();
  const memberName = language === 'en' && member.name_en ? member.name_en : member.name;
  const memberNameAlt = language === 'en' ? member.name : member.name_en;

  const cardHeight = size === 'large' ? 'h-80' : size === 'small' ? 'h-64' : 'h-72';

  const handleClick = () => {
    if (onClick) {
      onClick(member);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer group"
      onClick={handleClick}
    >
      <Card className={`${cardHeight} bg-zinc-900/80 backdrop-blur-sm border-zinc-800/50 overflow-hidden relative rounded-xl shadow-lg hover:shadow-2xl hover:border-zinc-700/50 transition-all duration-300`}>
        {/* Profile Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-purple-900/20 via-zinc-900 to-zinc-950">
          {member.profile_image ? (
            <Image
              src={member.profile_image}
              alt={memberName}
              fill
              className="object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">
                {memberName.charAt(0)}
              </div>
            </div>
          )}

          {/* Leader Badge Overlay */}
          {isLeader && (
            <div className="absolute top-3 right-3">
              <Badge
                variant="secondary"
                className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm"
              >
                <Crown className="h-3 w-3 mr-1" />
                Leader
              </Badge>
            </div>
          )}
        </div>

        {/* Member Info */}
        <div className="p-4 space-y-2">
          <div>
            <h3 className="text-lg font-bold text-white leading-tight line-clamp-1">
              {memberName}
            </h3>
            {memberNameAlt && (
              <p className="text-sm text-white/70 line-clamp-1">
                {memberNameAlt}
              </p>
            )}
          </div>

          {/* Social Links */}
          {(member.instagram_url || member.youtube_url || member.twitter_url) && (
            <div className="flex gap-2 pt-1">
              {member.instagram_url && (
                <a
                  href={member.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-3 w-3 text-white" />
                </a>
              )}
              {member.youtube_url && (
                <a
                  href={member.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-3 w-3 text-white" />
                </a>
              )}
              {member.twitter_url && (
                <a
                  href={member.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-3 w-3 text-white" />
                </a>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
