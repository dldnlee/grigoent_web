'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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

interface ArtistProfileViewProps {
  artist: Artist;
  artistName: string;
  careerEntries: CareerEntry[];
  teams: Team[];
  language: string;
}

const MAX_VISIBLE_ITEMS = 8;

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

export function ArtistProfileView({ artist, artistName, careerEntries, teams, language }: ArtistProfileViewProps) {
  const router = useRouter();
  const [showAllMedia, setShowAllMedia] = useState(false);
  const [showAllChoreography, setShowAllChoreography] = useState(false);

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

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="max-w-xl mx-auto">
        <div className='relative w-full overflow-hidden flex justify-center bg-black'>
          {artist.profile_image ? (
            <div className="relative w-full max-w-5xl h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]">
              <Image
                src={artist.profile_image}
                alt={artist.name}
                fill
                className='object-cover object-center'
                priority
              />
            </div>
          ) : (
            <div className="w-full max-w-5xl h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] bg-gradient-to-br from-purple-900 via-zinc-900 to-zinc-950 flex items-center justify-center">
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
                  <div className="space-y-3">
                    {(showAllChoreography ? choreographyWorks : choreographyWorks.slice(0, MAX_VISIBLE_ITEMS)).map((work) => {
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
                    <button
                      onClick={() => setShowAllChoreography(!showAllChoreography)}
                      className="mt-4 w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white/70 hover:text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {showAllChoreography ? '접기' : '더보기'}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${showAllChoreography ? 'rotate-180' : ''}`}
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </button>
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
              {/* Media (TV Works) */}
              {tvWorks.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Media</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {(showAllMedia ? tvWorks : tvWorks.slice(0, MAX_VISIBLE_ITEMS)).map((work) => {
                      const workDate = work.single_date
                        ? new Date(work.single_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                        : work.start_date
                        ? new Date(work.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })
                        : '';
                      const thumbnailUrl = getValidImageUrl(work.poster_url, work.video_url);
                      return (
                        <div
                          key={work.id}
                          className="group cursor-pointer rounded-lg overflow-hidden transition-all hover:scale-[1.02]"
                          onClick={() => {
                            if (work.video_url) {
                              window.open(work.video_url, '_blank');
                            }
                          }}
                        >
                          {/* Thumbnail */}
                          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-900 mb-3">
                            {thumbnailUrl ? (
                              <Image
                                src={thumbnailUrl}
                                alt={work.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-4xl opacity-40">📺</span>
                              </div>
                            )}
                          </div>
                          {/* Work Info */}
                          <div className="space-y-1">
                            <h3 className="font-medium text-white text-sm line-clamp-2 leading-snug">
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
                  {tvWorks.length > MAX_VISIBLE_ITEMS && (
                    <button
                      onClick={() => setShowAllMedia(!showAllMedia)}
                      className="mt-4 w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white/70 hover:text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {showAllMedia ? '접기' : '더보기'}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${showAllMedia ? 'rotate-180' : ''}`}
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </button>
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
    </div>
  );
}
