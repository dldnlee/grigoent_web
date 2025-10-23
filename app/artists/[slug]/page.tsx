'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { TeamMemberCard } from '../components/TeamMemberCard';
import { Users, Calendar, Crown, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Artist {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  profile_image: string | null;
  introduction: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  twitter_url: string | null;
  type: string;
  display_order: number | null;
  created_at: string;
}

interface LinkedArtist {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  profile_image: string | null;
}

interface CareerEntry {
  id: string;
  category: string;
  title: string;
  description: string | null;
  video_url: string | null;
  poster_url: string | null;
  is_featured: boolean;
  country: string | null;
  start_date: string | null;
  end_date: string | null;
  single_date: string | null;
  date_type: string;
  linked_user_id: string | null;
  linked_artist?: LinkedArtist | null;
}

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

export default function ArtistProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [profileType, setProfileType] = useState<'artist' | 'team' | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [careerEntries, setCareerEntries] = useState<CareerEntry[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slug = params.slug as string;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();

        // Try to fetch as artist first
        const { data: artistData, error: artistError } = await supabase
          .from('users')
          .select('*')
          .eq('slug', slug)
          .eq('type', 'dancer')
          .maybeSingle();

        if (artistData) {
          // It's an artist profile
          setProfileType('artist');
          setArtist(artistData);

          // Fetch career entries with linked artists
          const { data: careerData, error: careerError } = await supabase
            .from('career_entries')
            .select(`
              *,
              linked_artist:linked_user_id (
                id,
                name,
                name_en,
                slug,
                profile_image
              )
            `)
            .eq('user_id', artistData.id)
            .order('start_date', { ascending: false });

          if (careerError) throw careerError;
          setCareerEntries(careerData || []);

          // Fetch team memberships
          const { data: teamMemberships, error: teamError } = await supabase
            .from('team_members')
            .select('team_id')
            .eq('user_id', artistData.id);

          if (!teamError && teamMemberships && teamMemberships.length > 0) {
            const teamIds = teamMemberships.map(tm => tm.team_id);

            // Get display order for teams
            const { data: orderItems } = await supabase
              .from('display_order_items')
              .select('item_id, display_order')
              .eq('item_type', 'team')
              .in('item_id', teamIds)
              .order('display_order', { ascending: true });

            const { data: teamsData } = await supabase
              .from('teams')
              .select('*')
              .in('id', teamIds)
              .eq('status', 'active');

            if (teamsData) {
              // Sort teams by display_order_items if available
              if (orderItems && orderItems.length > 0) {
                const orderedIds = orderItems.map(item => item.item_id);
                const orderedTeams = orderedIds
                  .map(id => teamsData.find(team => team.id === id))
                  .filter(team => team !== undefined);
                setTeams(orderedTeams);
              } else {
                setTeams(teamsData);
              }
            }
          }
        } else {
          // Try to fetch as team
          const { data: teamData, error: teamError } = await supabase
            .from('teams')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'active')
            .maybeSingle();

          if (teamData) {
            // It's a team profile
            setProfileType('team');
            setTeam(teamData);

            // Fetch team members
            const { data: membersData } = await supabase
              .from('team_members')
              .select(`
                users!inner (
                  id,
                  name,
                  name_en,
                  slug,
                  profile_image,
                  introduction,
                  instagram_url,
                  youtube_url,
                  twitter_url
                )
              `)
              .eq('team_id', teamData.id);

            if (membersData) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const members = membersData.map((m: any) => m.users);
              setTeamMembers(members);
            }
          } else {
            throw new Error('Profile not found');
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProfileData();
    }
  }, [slug]);

  // Computed values for easier access
  const artistName = artist ? (language === 'en' && artist.name_en ? artist.name_en : artist.name) : '';
  const teamName = team ? (language === 'en' && team.name_en ? team.name_en : team.name) : '';
  const featuredWorks = careerEntries.filter(entry => entry.is_featured);
  const choreographyWorks = careerEntries.filter(entry => entry.category === 'choreography');
  const performanceWorks = careerEntries.filter(entry => entry.category === 'performance');
  const workshopWorks = careerEntries.filter(entry => entry.category === 'workshop');
  const advertisementWorks = careerEntries.filter(entry => entry.category === 'advertisement');
  const tvWorks = careerEntries.filter(entry => entry.category === 'tv');

  // Group projects by year for timeline
  const projectsByYear = careerEntries.reduce((acc, entry) => {
    const date = entry.single_date || entry.start_date;
    if (date) {
      const year = new Date(date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(entry);
    }
    return acc;
  }, {} as Record<number, CareerEntry[]>);

  const sortedYears = Object.keys(projectsByYear)
    .map(Number)
    .sort((a, b) => b - a); // Most recent first

  // Max items to show before scrolling
  const MAX_VISIBLE_ITEMS = 8;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || (!artist && !team)) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-4xl font-bold text-white">Profile Not Found</h1>
        <p className="text-white/70 text-center max-w-md">
          The profile you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <button
          onClick={() => router.push('/artists')}
          className="mt-4 px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90"
        >
          Back to Artists
        </button>
      </div>
    );
  }

  // Team Profile View
  if (team && profileType === 'team') {
    const leaderMember = teamMembers.find(m => m.id === team.leader_id);

    return (
      <div className="min-h-screen text-white bg-black">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden">
          {team.cover_image || team.logo_url ? (
            <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]">
              <Image
                src={team.cover_image || team.logo_url || ''}
                alt={teamName}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] bg-gradient-to-br from-purple-900 via-zinc-900 to-zinc-950 flex items-center justify-center">
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
    );
  }

  // Helper function to validate image URLs
  const getValidImageUrl = (posterUrl: string | null, videoUrl: string | null): string | null => {
    // Check if poster_url is a valid image URL (not Instagram/social media link)
    if (posterUrl && !posterUrl.includes('instagram.com') && !posterUrl.includes('twitter.com') && !posterUrl.includes('facebook.com')) {
      return posterUrl;
    }

    // Fallback to YouTube thumbnail
    if (videoUrl) {
      const videoIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
      }
    }

    return null;
  };

  // Artist Profile View
  if (artist && profileType === 'artist') {
    return (
      <div className="min-h-screen text-white bg-black">
          <div className='relative w-full overflow-hidden'>
            {artist.profile_image ? (
              <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]">
                <Image
                  src={artist.profile_image}
                  alt={artist.name}
                  fill
                  className='object-cover object-center'
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] bg-gradient-to-br from-purple-900 via-zinc-900 to-zinc-950 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl font-bold">
                    {artistName.charAt(0)}
                  </div>
                  <p className="text-white/40 text-sm">No profile image</p>
                </div>
              </div>
            )}

            {/* Gradient overlay for back button */}
            <div className="absolute top-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-b from-black via-black/60 to-transparent" />

            {/* Bottom gradient for name */}
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

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold absolute bottom-6 left-4 md:left-8 lg:left-12 md:bottom-8 lg:bottom-10 right-4 md:right-8 lg:right-12">{artistName}</h1>
          </div>

          {/* Social Buttons Section */}
          <div className="max-w-3xl mx-auto px-4 md:px-8 pt-6 pb-4">
            <div className="flex gap-3 items-center">
              {artist.instagram_url && (
                <a
                  href={artist.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
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
                    className="text-white"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
              )}

              {artist.twitter_url && (
                <a
                  href={artist.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}

              {/* Threads - will be visible when URL is added to database */}
              {/* Placeholder for future Threads URL field */}
              {false && (
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
                  aria-label="Threads"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 15.527c-.202.488-.54.903-.984 1.204-.444.301-.971.465-1.531.476h-.062c-.946 0-1.794-.411-2.353-1.073-.277.134-.571.231-.877.289-.305.058-.619.087-.938.087-1.446 0-2.698-.745-3.294-1.956-.232-.473-.349-1.003-.349-1.574 0-1.446.847-2.698 2.181-3.294.473-.232 1.003-.349 1.574-.349.571 0 1.101.117 1.574.349.946.465 1.636 1.359 1.869 2.421h2.181c-.117-1.794-.946-3.353-2.305-4.415-1.359-1.062-3.062-1.636-4.872-1.636-2.072 0-3.996.819-5.433 2.305-1.437 1.486-2.247 3.468-2.247 5.589 0 2.121.81 4.103 2.247 5.589 1.437 1.486 3.361 2.305 5.433 2.305 1.81 0 3.513-.574 4.872-1.636 1.359-1.062 2.188-2.621 2.305-4.415h-2.181c-.058.232-.134.457-.232.674z"/>
                  </svg>
                </a>
              )}

              {/* Share Profile Button */}
              <button
                onClick={async () => {
                  const currentUrl = window.location.href;

                  // Try native share API first (mobile)
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: `${artistName} - GRIGO Entertainment`,
                        url: currentUrl
                      });
                    } catch (err) {
                      // User cancelled or error occurred
                      console.log('Share cancelled or failed:', err);
                    }
                  } else {
                    // Fallback to clipboard
                    try {
                      await navigator.clipboard.writeText(currentUrl);
                      // You could add a toast notification here
                      alert('Link copied to clipboard!');
                    } catch (err) {
                      console.error('Failed to copy:', err);
                    }
                  }
                }}
                className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition-colors"
                aria-label="Share profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/>
                  <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>
                </svg>
              </button>
            </div>
          </div>

        <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Single Column Layout */}
          <div className="space-y-8">
            {/* Teams, About, Highlights */}
            <div className="space-y-8">
              {/* Teams */}
              {teams.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Teams</h2>
              <div className="space-y-4">
                {teams.map((team) => {
                  const teamName = language === 'en' && team.name_en ? team.name_en : team.name;
                  const koreanName = team.name;

                  return (
                    <div
                      key={team.id}
                      className="flex gap-4 cursor-pointer"
                      onClick={() => router.push(`/artists/${team.slug}`)}
                    >
                      {/* Team Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-primary">
                        {team.cover_image || team.logo_url ? (
                          <Image
                            src={team.cover_image || team.logo_url || ''}
                            alt={teamName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-white/40"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Team Info */}
                      <div className="flex-1">
                        {/* Team Badge */}
                        <div className="inline-block px-2 py-0.5 bg-zinc-800 text-white/70 text-xs rounded mb-2">
                          Team
                        </div>

                        {/* Team Name */}
                        <h3 className="text-white font-semibold text-base mb-1">
                          {teamName}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-white/60 text-sm">
                          {team.description || koreanName}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
                </div>
              )}

              {/* Artist Introduction */}
              {artist.introduction && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-white/80 leading-relaxed">{artist.introduction}</p>
                </div>
              )}

              {/* Highlights */}
              {featuredWorks.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Highlights</h2>
                  {/* Horizontal Scroll Container */}
                  <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
                    <div className="flex gap-3 pb-2">
                      {featuredWorks.slice(0, 6).map((work) => {
                        const workDate = work.single_date
                          ? new Date(work.single_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                          : work.start_date
                          ? new Date(work.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                          : '';

                        const thumbnailUrl = getValidImageUrl(work.poster_url, work.video_url)
                          || (work.video_url && work.video_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
                            ? `https://img.youtube.com/vi/${work.video_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)![1]}/maxresdefault.jpg`
                            : null);

                        return (
                          <div
                            key={work.id}
                            className="group cursor-pointer flex-shrink-0 w-[240px] md:w-[280px]"
                            onClick={() => {
                              if (work.video_url) {
                                window.open(work.video_url, '_blank');
                              }
                            }}
                          >
                            {/* Image Container */}
                            <div className="relative w-full aspect-video rounded-md overflow-hidden bg-zinc-900 mb-2 group-hover:ring-2 group-hover:ring-white/20 transition-all">
                              {thumbnailUrl ? (
                                <Image
                                  src={thumbnailUrl}
                                  alt={work.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-4xl opacity-40">🎬</span>
                                </div>
                              )}
                            </div>

                            {/* Work Info */}
                            <div className="space-y-0.5">
                              <h3 className="font-medium text-white text-sm line-clamp-2">
                                {work.title}
                              </h3>
                              <p className="text-white/60 text-xs line-clamp-1">
                                {work.description} • {workDate}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Works Sections */}
            <div className="space-y-8">
              {/* Choreography Works */}
              {choreographyWorks.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Choreographies</h2>
              <div
                className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
                style={{ maxHeight: choreographyWorks.length > MAX_VISIBLE_ITEMS ? '600px' : 'none' }}
              >
                {choreographyWorks.map((work) => {
                  const workDate = work.single_date
                    ? new Date(work.single_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : work.start_date
                    ? new Date(work.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : '';

                  const thumbnailUrl = getValidImageUrl(work.poster_url, work.video_url);

                  return (
                    <div
                      key={work.id}
                      className="group cursor-pointer hover:bg-zinc-800/90 rounded-lg overflow-hidden transition-colors"
                      onClick={() => {
                        if (work.video_url) {
                          window.open(work.video_url, '_blank');
                        }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Thumbnail */}
                        <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-zinc-800">
                          {thumbnailUrl ? (
                            <Image
                              src={thumbnailUrl}
                              alt={work.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl opacity-40">🎬</span>
                            </div>
                          )}
                        </div>

                        {/* Work Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white text-sm line-clamp-1 mb-0.5">
                            {work.title}
                          </h3>
                          <p className="text-white/60 text-xs line-clamp-1">
                            {work.description} • {workDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {choreographyWorks.length > MAX_VISIBLE_ITEMS && (
                <p className="mt-2 text-xs text-white/40">Scroll to see all {choreographyWorks.length} items</p>
              )}
                </div>
              )}

              {/* Performance Works */}
              {performanceWorks.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Performances</h2>
              <div
                className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
                style={{ maxHeight: performanceWorks.length > MAX_VISIBLE_ITEMS ? '600px' : 'none' }}
              >
                {performanceWorks.map((work) => {
                  const workDate = work.single_date
                    ? new Date(work.single_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : work.start_date
                    ? new Date(work.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : '';

                  const thumbnailUrl = getValidImageUrl(work.poster_url, work.video_url);

                  return (
                    <div
                      key={work.id}
                      className="group cursor-pointer bg-zinc-900 hover:bg-zinc-800/90 rounded-lg overflow-hidden transition-colors"
                      onClick={() => {
                        if (work.video_url) {
                          window.open(work.video_url, '_blank');
                        }
                      }}
                    >
                      <div className="flex items-center gap-3 p-3">
                        {/* Thumbnail */}
                        <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-zinc-800">
                          {thumbnailUrl ? (
                            <Image
                              src={thumbnailUrl}
                              alt={work.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl opacity-40">🎬</span>
                            </div>
                          )}
                        </div>

                        {/* Work Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white text-sm line-clamp-1 mb-0.5">
                            {work.title}
                          </h3>
                          <p className="text-white/60 text-xs line-clamp-1">
                            {work.description} • {workDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {performanceWorks.length > MAX_VISIBLE_ITEMS && (
                <p className="mt-2 text-xs text-white/40">Scroll to see all {performanceWorks.length} items</p>
              )}
                </div>
              )}

              {/* Workshop/Classes */}
              {workshopWorks.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Classes</h2>
              <div
                className="space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
                style={{ maxHeight: workshopWorks.length > MAX_VISIBLE_ITEMS ? '600px' : 'none' }}
              >
                {workshopWorks.map((work) => {
                  const workDate = work.single_date
                    ? new Date(work.single_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : work.start_date
                    ? new Date(work.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : '';

                  return (
                    <div
                      key={work.id}
                      className="group cursor-pointer py-3 border-b border-white/5 hover:border-white/10 transition-colors"
                      onClick={() => {
                        if (work.video_url) {
                          window.open(work.video_url, '_blank');
                        }
                      }}
                    >
                      <h3 className="font-medium text-white text-base line-clamp-1 mb-1">
                        {work.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {work.description} • {workDate}
                      </p>
                    </div>
                  );
                })}
              </div>
              {workshopWorks.length > MAX_VISIBLE_ITEMS && (
                <p className="mt-2 text-xs text-white/40">Scroll to see all {workshopWorks.length} items</p>
              )}
                </div>
              )}

              {/* Advertisement Works */}
              {advertisementWorks.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Advertisements</h2>
              <div
                className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
                style={{ maxHeight: advertisementWorks.length > MAX_VISIBLE_ITEMS ? '600px' : 'none' }}
              >
                {advertisementWorks.map((work) => {
                  const workDate = work.single_date
                    ? new Date(work.single_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : work.start_date
                    ? new Date(work.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : '';

                  const thumbnailUrl = getValidImageUrl(work.poster_url, work.video_url);

                  return (
                    <div
                      key={work.id}
                      className="group cursor-pointer bg-zinc-900 hover:bg-zinc-800/90 rounded-lg overflow-hidden transition-colors"
                      onClick={() => {
                        if (work.video_url) {
                          window.open(work.video_url, '_blank');
                        }
                      }}
                    >
                      <div className="flex items-center gap-3 p-3">
                        <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-zinc-800">
                          {thumbnailUrl ? (
                            <Image
                              src={thumbnailUrl}
                              alt={work.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl opacity-40">📺</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white text-sm line-clamp-1 mb-0.5">
                            {work.title}
                          </h3>
                          <p className="text-white/60 text-xs line-clamp-1">
                            {work.description} • {workDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {advertisementWorks.length > MAX_VISIBLE_ITEMS && (
                <p className="mt-2 text-xs text-white/40">Scroll to see all {advertisementWorks.length} items</p>
              )}
                </div>
              )}

              {/* TV Works */}
              {tvWorks.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4">TV Shows</h2>
              <div
                className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30"
                style={{ maxHeight: tvWorks.length > MAX_VISIBLE_ITEMS ? '600px' : 'none' }}
              >
                {tvWorks.map((work) => {
                  const workDate = work.single_date
                    ? new Date(work.single_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : work.start_date
                    ? new Date(work.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : '';

                  const thumbnailUrl = getValidImageUrl(work.poster_url, work.video_url);

                  return (
                    <div
                      key={work.id}
                      className="group cursor-pointer bg-zinc-900 hover:bg-zinc-800/90 rounded-lg overflow-hidden transition-colors"
                      onClick={() => {
                        if (work.video_url) {
                          window.open(work.video_url, '_blank');
                        }
                      }}
                    >
                      <div className="flex items-center gap-3 p-3">
                        <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-zinc-800">
                          {thumbnailUrl ? (
                            <Image
                              src={thumbnailUrl}
                              alt={work.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl opacity-40">📺</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white text-sm line-clamp-1 mb-0.5">
                            {work.title}
                          </h3>
                          <p className="text-white/60 text-xs line-clamp-1">
                            {work.description} • {workDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {tvWorks.length > MAX_VISIBLE_ITEMS && (
                <p className="mt-2 text-xs text-white/40">Scroll to see all {tvWorks.length} items</p>
              )}
                </div>
              )}
            </div>

          </div>

          {/* Project Timeline by Year */}
          {sortedYears.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Project Timeline</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {sortedYears.map((year) => {
                  const yearProjects = projectsByYear[year];
                  const categoryCount = yearProjects.reduce((acc, project) => {
                    acc[project.category] = (acc[project.category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);

                  return (
                    <AccordionItem
                      key={year}
                      value={year.toString()}
                      className="border border-white/10 rounded-lg overflow-hidden bg-zinc-900/50"
                    >
                      <AccordionTrigger className="px-4 md:px-6 py-3 md:py-4 hover:bg-zinc-800/50 transition-colors [&[data-state=open]]:bg-zinc-800/70">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full pr-4 gap-2">
                          <div className="flex items-center gap-3 md:gap-4">
                            <span className="text-xl md:text-2xl font-bold text-white">{year}</span>
                            <span className="text-xs md:text-sm text-white/60">
                              {yearProjects.length} {yearProjects.length === 1 ? 'project' : 'projects'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {Object.entries(categoryCount).map(([category, count]) => (
                              <Badge
                                key={category}
                                variant="secondary"
                                className="bg-white/10 text-white/80 text-xs capitalize"
                              >
                                {category} ({count})
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 md:px-6 pb-3 md:pb-4 pt-2">
                        <div className="space-y-2 md:space-y-3">
                          {yearProjects.map((project) => {
                            const projectDate = project.single_date
                              ? new Date(project.single_date).toLocaleDateString('ko-KR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : project.start_date && project.end_date
                              ? `${new Date(project.start_date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} - ${new Date(project.end_date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}`
                              : project.start_date
                              ? new Date(project.start_date).toLocaleDateString('ko-KR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : '';

                            const thumbnailUrl = getValidImageUrl(project.poster_url, project.video_url);

                            return (
                              <div
                                key={project.id}
                                className="group cursor-pointer bg-zinc-900 hover:bg-zinc-800 rounded-lg overflow-hidden transition-colors"
                                onClick={() => {
                                  if (project.video_url) {
                                    window.open(project.video_url, '_blank');
                                  }
                                }}
                              >
                                <div className="flex items-center gap-3 md:gap-4 p-2 md:p-3">
                                  {/* Thumbnail */}
                                  <div className="relative w-20 h-14 md:w-28 md:h-20 flex-shrink-0 rounded overflow-hidden bg-zinc-800">
                                    {thumbnailUrl ? (
                                      <Image
                                        src={thumbnailUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-3xl opacity-40">
                                          {project.category === 'choreography' ? '💃' :
                                           project.category === 'performance' ? '🎭' :
                                           project.category === 'workshop' ? '📚' :
                                           project.category === 'tv' ? '📺' :
                                           project.category === 'advertisement' ? '📺' : '🎬'}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Project Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1">
                                      <Badge
                                        variant="outline"
                                        className="border-white/20 text-white/70 text-[10px] md:text-xs capitalize"
                                      >
                                        {project.category}
                                      </Badge>
                                      {project.is_featured && (
                                        <Badge
                                          variant="secondary"
                                          className="bg-yellow-500/20 text-yellow-300 text-[10px] md:text-xs border-none"
                                        >
                                          ⭐ Featured
                                        </Badge>
                                      )}
                                    </div>
                                    <h3 className="font-semibold text-white text-sm md:text-base line-clamp-1 mb-0.5 md:mb-1">
                                      {project.title}
                                    </h3>
                                    <p className="text-white/60 text-xs md:text-sm line-clamp-1 md:line-clamp-2 mb-0.5 md:mb-1">
                                      {project.description}
                                    </p>
                                    <p className="text-white/40 text-[10px] md:text-xs">
                                      {projectDate}
                                      {project.country && ` • ${project.country}`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
