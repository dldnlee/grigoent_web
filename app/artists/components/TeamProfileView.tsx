'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Users, Calendar, Crown, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TeamMemberCard } from './TeamMemberCard';

interface Team {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  cover_image: string | null;
  status: string;
  leader_id: string | null;
  created_at: string;
}

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

interface TeamProfileViewProps {
  team: Team;
  teamMembers: TeamMember[];
  teamName: string;
  language: string;
}

const MAX_VISIBLE_ITEMS = 8;

export function TeamProfileView({ team, teamMembers, teamName, language }: TeamProfileViewProps) {
  const router = useRouter();
  const leaderMember = teamMembers.find(m => m.id === team.leader_id);

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="max-w-2xl">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden flex justify-center bg-black">
          {team.cover_image || team.logo_url ? (
            <div className="relative w-full max-w-5xl h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]">
              <Image
                src={team.cover_image || team.logo_url || ''}
                alt={teamName}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          ) : (
            <div className="w-full max-w-5xl h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] bg-gradient-to-br from-purple-900 via-zinc-900 to-zinc-950 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl font-bold">
                  {teamName.charAt(0)}
                </div>
                <p className="text-white/40 text-sm">No team image</p>
              </div>
            </div>
          )}
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-b from-black via-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-black via-black/60 to-transparent" />
          {/* Back Button */}
          <button
            onClick={() => router.push('/artists')}
            className="absolute top-6 left-4 md:left-8 lg:left-12 z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span className="text-sm">Back</span>
          </button>
          {/* Team Name and Member Count */}
          <div className="absolute bottom-6 left-4 md:left-8 lg:left-12 md:bottom-8 lg:bottom-10 right-4 md:right-8 lg:right-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3">
              {teamName}
            </h1>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-white/20 backdrop-blur-sm border-none text-white text-sm px-4 py-1.5"
              >
                <Users className="h-4 w-4 mr-2" />
                {teamMembers.length} {teamMembers.length === 1 ? 'Member' : 'Members'}
              </Badge>
            </div>
          </div>
        </div>
        {/* Social Buttons Section */}
        <div className="max-w-3xl mx-auto px-4 md:px-8 pt-6 pb-4">
          <div className="flex gap-3 items-center">
            {/* Share Button */}
            <button
              onClick={async () => {
                const currentUrl = window.location.href;
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: `${teamName} - GRIGO Entertainment`,
                      url: currentUrl
                    });
                  } catch (err) {
                    console.log('Share cancelled:', err);
                  }
                } else {
                  try {
                    await navigator.clipboard.writeText(currentUrl);
                    alert('Link copied to clipboard!');
                  } catch (err) {
                    console.error('Failed to copy:', err);
                  }
                }
              }}
              className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
              aria-label="Share team profile"
            >
              <Share2 className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Single Column Layout */}
          <div className="space-y-8">
            {/* Stats and Info */}
            <div className="space-y-8">
              {/* Team Stats */}
              <div>
                <h2 className="text-xl font-bold text-white mb-3">Team Info</h2>
                <div className="space-y-3">
                  {/* Formation Year */}
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-white/60" />
                    <div>
                      <p className="text-white/60 text-xs">Formed</p>
                      <p className="text-white font-semibold">
                        {new Date(team.created_at).getFullYear()}
                      </p>
                    </div>
                  </div>
                  {/* Member Count */}
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-white/60" />
                    <div>
                      <p className="text-white/60 text-xs">Members</p>
                      <p className="text-white font-semibold">{teamMembers.length}</p>
                    </div>
                  </div>
                  {/* Leader Info */}
                  {leaderMember && (
                    <div className="flex items-center gap-3">
                      <Crown className="h-5 w-5 text-white/60" />
                      <div>
                        <p className="text-white/60 text-xs">Leader</p>
                        <p className="text-white font-semibold">
                          {language === 'en' && leaderMember.name_en
                            ? leaderMember.name_en
                            : leaderMember.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Description and Members */}
            <div className="space-y-8">
              {/* Team Description */}
              {team.description && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    About {teamName}
                  </h2>
                  <p className="text-white/80 leading-relaxed whitespace-pre-line">
                    {team.description}
                  </p>
                </div>
              )}
              {/* Team Members Grid */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Team Members</h2>
                <div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
                  style={{ maxHeight: teamMembers.length > MAX_VISIBLE_ITEMS ? '600px' : 'none' }}
                >
                  {teamMembers.map((member) => (
                    <TeamMemberCard
                      key={member.id}
                      member={member}
                      isLeader={member.id === team.leader_id}
                      onClick={() => router.push(`/artists/${member.slug}`)}
                    />
                  ))}
                </div>
                {teamMembers.length > MAX_VISIBLE_ITEMS && (
                  <p className="mt-2 text-xs text-white/40 text-center">Scroll to see all {teamMembers.length} members</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
