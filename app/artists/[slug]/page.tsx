'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { TeamProfileView } from '../components/TeamProfileView';
import { ArtistProfileView } from '../components/ArtistProfileView';

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
    return (
      <TeamProfileView
        team={team}
        teamMembers={teamMembers}
        teamName={teamName}
        language={language}
      />
    );
  }

  // Artist Profile View
  if (artist && profileType === 'artist') {
    return (
      <ArtistProfileView
        artist={artist}
        artistName={artistName}
        careerEntries={careerEntries}
        teams={teams}
        language={language}
      />
    );
  }

  return null;
}
