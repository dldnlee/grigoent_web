'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Youtube, Twitter, Calendar, MapPin, CheckCircle, ExternalLink, Users } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/client';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { DancerCard } from '@/app/artists/components/DancerCard';
import type { Dancer } from '@/app/artists/types/dancer';

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

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } }
};

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

  if (isLoading) {
    return (
      <div className="h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || (!artist && !team)) {
    return (
      <div className="h-screen bg-primary flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-4xl font-bold text-white">Profile Not Found</h1>
        <p className="text-white/70 text-center max-w-md">
          The profile you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button onClick={() => router.push('/artists')} className="mt-4 bg-white text-primary hover:bg-white/90">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Artists
        </Button>
      </div>
    );
  }

  // Team Profile View
  if (team) {
    const teamName = language === 'en' && team.name_en ? team.name_en : team.name;
    const dancers: Dancer[] = teamMembers.map(member => ({
      id: member.id,
      koreanName: member.name,
      englishName: member.name_en,
      specialty: '',
      image: member.profile_image || '',
      slug: member.slug,
      type: 'solo',
      isVerified: true,
      socialLinks: {
        instagram: member.instagram_url || undefined,
        youtube: member.youtube_url || undefined,
      }
    }));

    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="min-h-screen bg-primary text-white"
      >
        {/* Header with Back Button */}
        <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 to-transparent">
          <div className="px-6 py-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/artists')}
              className="hover:bg-white/10 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Artists
            </Button>
          </div>
        </div>

        {/* Main Content - Full Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:h-screen bg-primary">
          {/* Left Side - 70% Height Image */}
          <div className="relative h-[50vh] lg:h-screen w-full bg-primary">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-full lg:h-[70vh] w-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden"
            >
              {team.cover_image || team.logo_url ? (
                <img
                  src={team.cover_image || team.logo_url || ''}
                  alt={teamName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-32 h-32 mx-auto mb-4 text-white/40" />
                    <p className="text-white/60">No Image</p>
                  </div>
                </div>
              )}

              {/* Verified Badge Overlay */}
              {team && (
                <div className="absolute top-6 right-6">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm text-white font-medium">Verified</span>
                  </div>
                </div>
              )}

              {/* Team Name Overlay - Bottom Left */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight text-white">
                    {teamName}
                  </h1>
                  {language === 'en' && team.name && team.name_en && team.name !== team.name_en && (
                    <p className="text-xl md:text-2xl text-white/70 mb-2">{team.name}</p>
                  )}
                  <p className="text-base md:text-lg text-white/70">GRIGO Entertainment Team</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Team Information */}
          <div className="min-h-screen lg:h-screen overflow-y-auto bg-primary">
            <div className="px-6 py-12 lg:py-20 lg:px-12 space-y-8">
              {/* Team Description */}
              {team.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-white">About</h2>
                  <p className="text-white/80 text-lg leading-relaxed whitespace-pre-wrap">
                    {team.description}
                  </p>
                </motion.div>
              )}

              {/* Team Members */}
              {teamMembers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-white">Members ({teamMembers.length})</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {dancers.map((dancer) => (
                      <DancerCard key={dancer.id} dancer={dancer} size="small" />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Artist Profile View
  const artistName = language === 'en' && artist!.name_en ? artist!.name_en : artist!.name;
  const featuredWorks = careerEntries.filter(entry => entry.is_featured).slice(0, 6);
  const recentWorks = careerEntries.slice(0, 10);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-primary text-white"
    >
      {/* Header with Back Button */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 to-transparent">
        <div className="px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/artists')}
            className="hover:bg-white/10 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Artists
          </Button>
        </div>
      </div>

      {/* Main Content - Full Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:h-screen bg-primary">
        {/* Left Side - 70% Height Image */}
        <div className="relative h-[50vh] lg:h-screen w-full bg-primary">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-full lg:h-[70vh] w-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden"
          >
            {artist.profile_image ? (
              <img
                src={artist.profile_image}
                alt={artistName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">👤</div>
                  <p className="text-white/60">No Image</p>
                </div>
              </div>
            )}

            {/* Verified Badge Overlay */}
            {artist && (
              <div className="absolute top-6 right-6">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-white font-medium">Verified</span>
                </div>
              </div>
            )}

            {/* Artist Name Overlay - Bottom Left */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight text-white">
                  {artistName}
                </h1>
                {language === 'en' && artist.name && artist.name_en && artist.name !== artist.name_en && (
                  <p className="text-xl md:text-2xl text-white/70 mb-2">{artist.name}</p>
                )}
                <p className="text-base md:text-lg text-white/70">GRIGO Entertainment Artist</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Artist Information */}
        <div className="min-h-screen lg:h-screen overflow-y-auto bg-primary">
          <div className="px-6 py-12 lg:py-20 lg:px-12 space-y-8">

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {artist.instagram_url && (
                <Button
                  variant="outline"
                  className="gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => window.open(artist.instagram_url!, '_blank')}
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                  <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
                </Button>
              )}
              {artist.youtube_url && (
                <Button
                  variant="outline"
                  className="gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => window.open(artist.youtube_url!, '_blank')}
                >
                  <Youtube className="h-4 w-4" />
                  YouTube
                  <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
                </Button>
              )}
              {artist.twitter_url && (
                <Button
                  variant="outline"
                  className="gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => window.open(artist.twitter_url!, '_blank')}
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                  <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
                </Button>
              )}
            </motion.div>

            {/* Biography */}
            {artist.introduction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-white">About</h2>
                <p className="text-white/80 text-lg leading-relaxed whitespace-pre-wrap">
                  {artist.introduction}
                </p>
              </motion.div>
            )}

            {/* Team Memberships */}
            {teams.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-white">Teams</h2>
                <div className="space-y-3">
                  {teams.map((team) => {
                    const teamName = language === 'en' && team.name_en ? team.name_en : team.name;
                    return (
                      <Card
                        key={team.id}
                        className="group bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden"
                        onClick={() => router.push(`/artists/${team.slug}`)}
                      >
                        <div className="flex items-center gap-4 p-4">
                          {/* Team Logo */}
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                            {team.cover_image || team.logo_url ? (
                              <img
                                src={team.cover_image || team.logo_url || ''}
                                alt={teamName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-2xl">👥</span>
                              </div>
                            )}
                          </div>

                          {/* Team Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1 group-hover:text-white transition-colors text-white/90">
                              {teamName}
                            </h3>
                            {language === 'en' && team.name && team.name_en && team.name !== team.name_en && (
                              <p className="text-sm text-white/60">{team.name}</p>
                            )}
                            {team.description && (
                              <p className="text-sm text-white/60 line-clamp-1 mt-1">
                                {team.description}
                              </p>
                            )}
                          </div>

                          {/* Arrow Icon */}
                          <div className="flex-shrink-0 text-white/40 group-hover:text-white/70 transition-colors">
                            <ExternalLink className="h-5 w-5" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Career Highlights */}
            {featuredWorks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-white">Featured Works</h2>
                <div className="space-y-3">
                  {featuredWorks.slice(0, 5).map((work) => {
                    const linkedArtistName = work.linked_artist
                      ? (language === 'en' && work.linked_artist.name_en ? work.linked_artist.name_en : work.linked_artist.name)
                      : null;

                    return (
                      <div
                        key={work.id}
                        className="group p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/20"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-white transition-colors text-white/90">
                              {work.title}
                            </h3>
                            {work.description && (
                              <p className="text-sm text-white/60 line-clamp-2">
                                {work.description}
                              </p>
                            )}
                            {work.linked_artist && (
                              <div className="flex items-center gap-2 mt-2">
                                <div
                                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/artists/${work.linked_artist!.slug}`);
                                  }}
                                >
                                  {work.linked_artist.profile_image && (
                                    <img
                                      src={work.linked_artist.profile_image}
                                      alt={linkedArtistName || ''}
                                      className="w-6 h-6 rounded-full object-cover"
                                    />
                                  )}
                                  <span className="text-xs text-white/70 hover:text-white/90">
                                    with {linkedArtistName}
                                  </span>
                                </div>
                              </div>
                            )}
                            <div className="flex items-center gap-3 mt-2">
                              <Badge variant="secondary" className="capitalize bg-white/10 text-white border-white/20">
                                {work.category}
                              </Badge>
                              {work.start_date && (
                                <div className="flex items-center gap-1 text-xs text-white/60">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(work.start_date).getFullYear()}</span>
                                </div>
                              )}
                              {work.country && (
                                <div className="flex items-center gap-1 text-xs text-white/60">
                                  <MapPin className="h-3 w-3" />
                                  <span>{work.country}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {work.poster_url && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={work.poster_url}
                                alt={work.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* All Works */}
            {recentWorks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-white">All Works ({careerEntries.length})</h2>
                <div className="space-y-2">
                  {recentWorks.map((work, index) => {
                    const linkedArtistName = work.linked_artist
                      ? (language === 'en' && work.linked_artist.name_en ? work.linked_artist.name_en : work.linked_artist.name)
                      : null;

                    return (
                      <div
                        key={work.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <span className="text-sm text-white/60 w-8">{index + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate text-white">{work.title}</h3>
                            {work.linked_artist && (
                              <div
                                className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/artists/${work.linked_artist!.slug}`);
                                }}
                              >
                                {work.linked_artist.profile_image && (
                                  <img
                                    src={work.linked_artist.profile_image}
                                    alt={linkedArtistName || ''}
                                    className="w-5 h-5 rounded-full object-cover"
                                  />
                                )}
                                <span className="text-xs text-white/60 hover:text-white/90">
                                  {linkedArtistName}
                                </span>
                              </div>
                            )}
                          </div>
                          {work.description && (
                            <p className="text-sm text-white/60 line-clamp-1">{work.description}</p>
                          )}
                        </div>
                        <Badge variant="secondary" className="capitalize flex-shrink-0 bg-white/10 text-white border-white/20">
                          {work.category}
                        </Badge>
                        {work.start_date && (
                          <span className="text-sm text-white/60 flex-shrink-0">
                            {new Date(work.start_date).getFullYear()}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {careerEntries.length > 10 && (
                  <Button variant="outline" className="w-full mt-4 border-white/20 text-white hover:bg-white/10 hover:text-white">
                    View All {careerEntries.length} Works
                  </Button>
                )}
              </motion.div>
            )}
            </div>
          </div>
        </div>
      </motion.div>
  );
}

