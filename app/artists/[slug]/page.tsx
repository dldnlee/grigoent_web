'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/app/contexts/LanguageContext';

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
            const { data: teamsData } = await supabase
              .from('teams')
              .select('*')
              .in('id', teamIds)
              .eq('status', 'active');

            if (teamsData) {
              setTeams(teamsData);
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
  const [showAllChoreography, setShowAllChoreography] = useState(false);
  const [showAllPerformance, setShowAllPerformance] = useState(false);
  const [showAllWorkshop, setShowAllWorkshop] = useState(false);

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
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="p-6">
          {/* Back Button */}
          <button
            onClick={() => router.push('/artists')}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
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

          <h1 className="text-4xl font-bold mb-4">{teamName}</h1>
          <p className="text-white/60 mb-8">Team Profile</p>

          {/* Available data for UI building */}
          <div className="space-y-4 text-sm text-white/40">
            <p>Team ID: {team.id}</p>
            <p>Description: {team.description || 'N/A'}</p>
            <p>Members: {teamMembers.length}</p>
            <p>Cover Image: {team.cover_image || team.logo_url || 'N/A'}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Team Members ({teamMembers.length})</h2>
            {/* Build your team members UI here */}
            <pre className="text-xs text-white/40 overflow-auto">
              {JSON.stringify(teamMembers, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  // Artist Profile View
  if (artist && profileType === 'artist') {
    return (
      <div className="min-h-screen text-white bg-black">
          <div className='relative w-full'>
            <img src={artist.profile_image || ""} alt={artist.name} className='w-full'/>

            {/* Gradient overlay for back button */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />

            {/* Back Button */}
            <button
              onClick={() => router.push('/artists')}
              className="absolute top-6 left-4 z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
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

            <h1 className="text-4xl font-bold mb-4 absolute bottom-2 right-10">{artistName}</h1>
          </div>
        <div className="px-4 flex flex-col gap-8">
          {/* Teams */}
          {teams.length > 0 && (
            <div className="">
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
                      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                        {team.cover_image || team.logo_url ? (
                          <img
                            src={team.cover_image || team.logo_url || ''}
                            alt={teamName}
                            className="w-full h-full object-cover"
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
            <div className="">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-white/80">{artist.introduction}</p>
            </div>
          )}

          {/* Highlights */}
          {featuredWorks.length > 0 && (
            <div className="">
              <h2 className="text-xl font-bold text-white mb-3">Highlights</h2>
              <div className="space-y-3">
                {featuredWorks.slice(0, 3).map((work) => {
                  const workDate = work.single_date
                    ? new Date(work.single_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : work.start_date
                    ? new Date(work.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : '';

                  // Extract YouTube video ID for thumbnail
                  const getYouTubeThumbnail = (url: string | null) => {
                    if (!url) return null;
                    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
                    if (videoIdMatch && videoIdMatch[1]) {
                      return `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`;
                    }
                    return null;
                  };

                  const thumbnailUrl = work.poster_url || getYouTubeThumbnail(work.video_url);

                  return (
                    <div
                      key={work.id}
                      className="group cursor-pointer"
                      onClick={() => {
                        if (work.video_url) {
                          window.open(work.video_url, '_blank');
                        }
                      }}
                    >
                      {/* Image Container */}
                      <div className="relative w-full aspect-video rounded-md overflow-hidden bg-zinc-900 mb-2">
                        {thumbnailUrl ? (
                          <img
                            src={thumbnailUrl}
                            alt={work.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl opacity-40">🎬</span>
                          </div>
                        )}
                      </div>

                      {/* Work Info */}
                      <div className="space-y-0.5">
                        <h3 className="font-medium text-white text-sm line-clamp-1">
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
          )}

          {/* Choreography Works */}
          {choreographyWorks.length > 0 && (
            <div className="">
              <h2 className="text-xl font-bold text-white mb-3">Choreographies</h2>
              <div className="space-y-3">
                {choreographyWorks.slice(0, showAllChoreography ? choreographyWorks.length : 5).map((work) => {
                  const workDate = work.single_date
                    ? new Date(work.single_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : work.start_date
                    ? new Date(work.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : '';

                  // Extract YouTube video ID for thumbnail
                  const getYouTubeThumbnail = (url: string | null) => {
                    if (!url) return null;
                    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
                    if (videoIdMatch && videoIdMatch[1]) {
                      return `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
                    }
                    return null;
                  };

                  const thumbnailUrl = work.poster_url || getYouTubeThumbnail(work.video_url);

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
                            <img
                              src={thumbnailUrl}
                              alt={work.title}
                              className="w-full h-full object-cover"
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

              {/* Show More Button */}
              {choreographyWorks.length > 5 && (
                <button
                  onClick={() => setShowAllChoreography(!showAllChoreography)}
                  className="mt-3 w-full py-2 text-sm text-white/70 hover:text-white transition-colors border rounded-lg"
                >
                  {showAllChoreography ? '접기' : `더 보기 (${choreographyWorks.length - 5})`}
                </button>
              )}
            </div>
          )}

          {/* Performance Works */}
          {performanceWorks.length > 0 && (
            <div className="">
              <h2 className="text-xl font-bold text-white mb-3">Performances</h2>
              <div className="space-y-3">
                {performanceWorks.slice(0, showAllPerformance ? performanceWorks.length : 5).map((work) => {
                  const workDate = work.single_date
                    ? new Date(work.single_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : work.start_date
                    ? new Date(work.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                    : '';

                  // Extract YouTube video ID for thumbnail
                  const getYouTubeThumbnail = (url: string | null) => {
                    if (!url) return null;
                    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
                    if (videoIdMatch && videoIdMatch[1]) {
                      return `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
                    }
                    return null;
                  };

                  const thumbnailUrl = work.poster_url || getYouTubeThumbnail(work.video_url);

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
                            <img
                              src={thumbnailUrl}
                              alt={work.title}
                              className="w-full h-full object-cover"
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

              {/* Show More Button */}
              {performanceWorks.length > 5 && (
                <button
                  onClick={() => setShowAllPerformance(!showAllPerformance)}
                  className="mt-3 w-full py-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  {showAllPerformance ? '접기' : `더 보기 (${performanceWorks.length - 5})`}
                </button>
              )}
            </div>
          )}

          {/* Workshop/Classes */}
          {workshopWorks.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-3">Classes</h2>
              <div className="space-y-1">
                {workshopWorks.slice(0, showAllWorkshop ? workshopWorks.length : 5).map((work) => {
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
                        {work.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Show More Button */}
              {workshopWorks.length > 5 && (
                <button
                  onClick={() => setShowAllWorkshop(!showAllWorkshop)}
                  className="mt-3 w-full py-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  {showAllWorkshop ? '접기' : `더 보기 (${workshopWorks.length - 5})`}
                </button>
              )}
            </div>
          )}

          {/* All Career Entries */}
          {/* {careerEntries.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">All Works ({careerEntries.length})</h2>
              <pre className="text-xs text-white/40 overflow-auto max-h-96">
                {JSON.stringify(careerEntries.slice(0, 5), null, 2)}
              </pre>
            </div>
          )} */}
        </div>
      </div>
    );
  }

  return null;
}
