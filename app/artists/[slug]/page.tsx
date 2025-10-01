'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Youtube, Twitter, Calendar, MapPin, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
  const [artist, setArtist] = useState<Artist | null>(null);
  const [careerEntries, setCareerEntries] = useState<CareerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slug = params.slug as string;

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setIsLoading(true);
        const supabase = createClient();

        // Fetch artist data
        const { data: artistData, error: artistError } = await supabase
          .from('users')
          .select('*')
          .eq('slug', slug)
          .eq('type', 'dancer')
          .single();

        if (artistError) throw artistError;
        if (!artistData) throw new Error('Artist not found');

        setArtist(artistData);

        // Fetch career entries
        const { data: careerData, error: careerError } = await supabase
          .from('career_entries')
          .select('*')
          .eq('user_id', artistData.id)
          .order('start_date', { ascending: false });

        if (careerError) throw careerError;
        setCareerEntries(careerData || []);
      } catch (err) {
        console.error('Error fetching artist:', err);
        setError(err instanceof Error ? err.message : 'Failed to load artist');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchArtistData();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-4xl font-bold text-foreground">Artist Not Found</h1>
        <p className="text-muted-foreground text-center max-w-md">
          The artist you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push('/artists')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Artists
        </Button>
      </div>
    );
  }

  const artistName = language === 'en' && artist.name_en ? artist.name_en : artist.name;
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
      <div className="sticky top-0 z-50 bg-primary/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto max-w-7xl px-6 py-4">
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

      {/* Main Content - macOS Preview Style */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Large Image Preview */}
          <div className="sticky top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20"
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
                    <p className="text-muted-foreground">No Image</p>
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
            </motion.div>
          </div>

          {/* Right Side - Artist Information */}
          <div className="space-y-8">
            {/* Artist Name and Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-4 leading-tight text-white">
                {artistName}
              </h1>
              {language === 'en' && artist.name && artist.name_en && artist.name !== artist.name_en && (
                <p className="text-2xl text-white/70 mb-4">{artist.name}</p>
              )}
              <p className="text-lg text-white/70">GRIGO Entertainment Artist</p>
            </motion.div>

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
                  {featuredWorks.slice(0, 5).map((work) => (
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
                  ))}
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
                  {recentWorks.map((work, index) => (
                    <div
                      key={work.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-white/60 w-8">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate text-white">{work.title}</h3>
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
                  ))}
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

