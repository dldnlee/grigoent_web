'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Youtube, Twitter, Music, Calendar, MapPin, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
      className="min-h-screen bg-background text-foreground"
    >
      {/* Hero Section with Cover */}
      <div className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        {/* Background Image with Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: artist.profile_image
              ? `url(${artist.profile_image})`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-background" />
        </div>

        {/* Back Button */}
        <div className="absolute top-24 left-6 z-10">
          <Button
            variant="ghost"
            onClick={() => router.push('/artists')}
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border-none"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Artist Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-end gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-white/90 font-medium">Verified Artist</span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
                  {artistName}
                </h1>
                {language === 'en' && artist.name && artist.name_en && artist.name !== artist.name_en && (
                  <p className="text-xl md:text-2xl text-white/80 mb-4">{artist.name}</p>
                )}
                <div className="flex items-center gap-4 text-white/80">
                  <span className="text-sm font-medium">GRIGO Entertainment Artist</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-20 z-20">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Button className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-transform">
              <Play className="h-6 w-6 ml-1" fill="currentColor" />
            </Button>
            <div className="flex gap-2">
              {artist.instagram_url && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => window.open(artist.instagram_url!, '_blank')}
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              )}
              {artist.youtube_url && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => window.open(artist.youtube_url!, '_blank')}
                >
                  <Youtube className="h-5 w-5" />
                </Button>
              )}
              {artist.twitter_url && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => window.open(artist.twitter_url!, '_blank')}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="works">Works</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-12">
            {/* Featured Works */}
            {featuredWorks.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Featured</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredWorks.map((work) => (
                    <WorkCard key={work.id} work={work} />
                  ))}
                </div>
              </section>
            )}

            {/* About Section Preview */}
            {artist.introduction && (
              <section>
                <h2 className="text-3xl font-bold mb-6">About</h2>
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap max-w-3xl">
                  {artist.introduction.length > 300
                    ? `${artist.introduction.substring(0, 300)}...`
                    : artist.introduction}
                </p>
                {artist.introduction.length > 300 && (
                  <Button variant="link" className="mt-4 px-0">
                    Read more
                  </Button>
                )}
              </section>
            )}

            {/* Recent Works */}
            {recentWorks.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Recent Works</h2>
                <div className="space-y-2">
                  {recentWorks.map((work, index) => (
                    <WorkListItem key={work.id} work={work} index={index + 1} />
                  ))}
                </div>
              </section>
            )}
          </TabsContent>

          <TabsContent value="works" className="space-y-8">
            <div className="space-y-6">
              {['choreography', 'performance', 'advertisement', 'tv', 'workshop'].map((category) => {
                const categoryWorks = careerEntries.filter(entry => entry.category === category);
                if (categoryWorks.length === 0) return null;

                return (
                  <section key={category}>
                    <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryWorks.map((work) => (
                        <WorkCard key={work.id} work={work} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-8">
            {artist.introduction && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Biography</h2>
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap max-w-3xl">
                  {artist.introduction}
                </p>
              </section>
            )}

            <section>
              <h2 className="text-3xl font-bold mb-6">Connect</h2>
              <div className="flex flex-wrap gap-4">
                {artist.instagram_url && (
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.open(artist.instagram_url!, '_blank')}
                  >
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </Button>
                )}
                {artist.youtube_url && (
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.open(artist.youtube_url!, '_blank')}
                  >
                    <Youtube className="h-5 w-5" />
                    YouTube
                  </Button>
                )}
                {artist.twitter_url && (
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.open(artist.twitter_url!, '_blank')}
                  >
                    <Twitter className="h-5 w-5" />
                    Twitter
                  </Button>
                )}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}

function WorkCard({ work }: { work: CareerEntry }) {
  return (
    <Card className="group relative overflow-hidden rounded-lg bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card transition-all duration-300 cursor-pointer">
      <div className="aspect-video relative overflow-hidden">
        {work.poster_url ? (
          <img
            src={work.poster_url}
            alt={work.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <Music className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="h-12 w-12 text-white" fill="white" />
        </div>
      </div>
      <div className="p-4">
        <Badge variant="secondary" className="mb-2 capitalize">
          {work.category}
        </Badge>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{work.title}</h3>
        {work.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{work.description}</p>
        )}
        {work.start_date && (
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(work.start_date).getFullYear()}</span>
            {work.country && (
              <>
                <MapPin className="h-3 w-3 ml-2" />
                <span>{work.country}</span>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

function WorkListItem({ work, index }: { work: CareerEntry; index: number }) {
  return (
    <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-card/50 transition-colors cursor-pointer">
      <span className="text-muted-foreground text-sm font-medium w-8">{index}</span>
      <div className="flex-1">
        <h3 className="font-semibold group-hover:text-primary transition-colors">{work.title}</h3>
        {work.description && (
          <p className="text-sm text-muted-foreground line-clamp-1">{work.description}</p>
        )}
      </div>
      <Badge variant="secondary" className="capitalize">
        {work.category}
      </Badge>
      {work.start_date && (
        <span className="text-sm text-muted-foreground">
          {new Date(work.start_date).getFullYear()}
        </span>
      )}
    </div>
  );
}
