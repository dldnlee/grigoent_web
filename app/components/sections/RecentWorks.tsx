'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { fetchPlaylistVideos, getVideoStats, processYouTubeVideos, ProcessedVideo } from '@/app/lib/youtube';

export default function RecentWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Fallback videos for when API is not available or loading
  const fallbackVideos: ProcessedVideo[] = [
    {
      id: "1",
      videoId: "ktWrP16ZpTk",
      title: "[BOYS II PLANET K] 유메키 YUMEKI @시그널송 '올라(HOLA SOLAR)' 개인 무대 평가",
      views: "2.5M views",
      date: "Jun 13, 2023",
      category: "BROADCAST",
      thumbnail: "https://img.youtube.com/vi/ktWrP16ZpTk/mqdefault.jpg"
    },
    {
      id: "2",
      videoId: "ktWrP16ZpTk",
      title: "[MUSIC VIDEO] K-POP 안무 제작 비하인드",
      views: "1.2M views",
      date: "May 20, 2023",
      category: "BROADCAST",
      thumbnail: "https://img.youtube.com/vi/ktWrP16ZpTk/mqdefault.jpg"
    },
    {
      id: "3",
      videoId: "ktWrP16ZpTk",
      title: "[WORKSHOP] 글로벌 댄스 워크샵 하이라이트",
      views: "987K views",
      date: "Apr 15, 2023",
      category: "BROADCAST",
      thumbnail: "https://img.youtube.com/vi/ktWrP16ZpTk/mqdefault.jpg"
    },
    {
      id: "4",
      videoId: "ktWrP16ZpTk",
      title: "[CHALLENGE] 바이럴 댄스 챌린지 모음",
      views: "3.5M views",
      date: "Mar 10, 2023",
      category: "BROADCAST",
      thumbnail: "https://img.youtube.com/vi/ktWrP16ZpTk/mqdefault.jpg"
    },
    {
      id: "5",
      videoId: "ktWrP16ZpTk",
      title: "[LIVE] 댄스 배틀 챔피언십 2023",
      views: "2.1M views",
      date: "Feb 25, 2023",
      category: "BROADCAST",
      thumbnail: "https://img.youtube.com/vi/ktWrP16ZpTk/mqdefault.jpg"
    }
  ];

  const [videos, setVideos] = useState<ProcessedVideo[]>(fallbackVideos);
  const [selectedVideo, setSelectedVideo] = useState<ProcessedVideo>(fallbackVideos[0]);

  // YouTube API configuration
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const PLAYLIST_ID = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID;

  useEffect(() => {
    const loadYouTubeVideos = async () => {
      // Only load from API if both API key and playlist ID are available
      if (!YOUTUBE_API_KEY || !PLAYLIST_ID) {
        console.log('YouTube API key or playlist ID not configured, using fallback videos');
        return;
      }

      try {
        const youtubeVideos = await fetchPlaylistVideos(PLAYLIST_ID, YOUTUBE_API_KEY);

        if (youtubeVideos.length > 0) {
          // Get video stats for each video
          const videoStatsPromises = youtubeVideos.map(video =>
            getVideoStats(video.videoId, YOUTUBE_API_KEY)
          );

          const videoStatsArray = await Promise.all(videoStatsPromises);
          const videoStats = youtubeVideos.reduce((acc, video, index) => {
            acc[video.videoId] = videoStatsArray[index];
            return acc;
          }, {} as Record<string, { viewCount: string }>);

          const processedVideos = processYouTubeVideos(youtubeVideos, videoStats);
          setVideos(processedVideos);
          setSelectedVideo(processedVideos[0]);
        }
      } catch (error) {
        console.error('Failed to load YouTube videos:', error);
        // Keep using fallback videos
      }
    };

    loadYouTubeVideos();
  }, [YOUTUBE_API_KEY, PLAYLIST_ID]);

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const playerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const listVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-secondary" id="works" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-normal text-secondary-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            RECENT WORKS
          </motion.h2>
          <motion.p
            className="text-lg text-secondary-foreground/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            우리 댄서들이 참여한 다양한 프로젝트들을 확인해보세요. 각각의 작품은<br />
            열정과 창의성이 담긴 결과물입니다.
          </motion.p>
        </motion.div>

        {/* Video Player and List Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player - Left Side */}
          <motion.div
            className="lg:col-span-2"
            variants={playerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="aspect-video bg-gray-300 rounded-2xl overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* YouTube Video Embed */}
              <iframe
                className="w-full h-full border-0"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0&modestbranding=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            {/* Selected Video Info */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-secondary-foreground mb-2 leading-tight">
                {selectedVideo.title}
              </h3>
              <div className="flex justify-between items-center text-secondary-foreground/70">
                <span>{selectedVideo.views}</span>
                <span>{selectedVideo.date}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Video List - Right Side */}
          <motion.div
            className="lg:col-span-1"
            variants={listVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="h-[600px] overflow-y-auto bg-white rounded-2xl p-4 border"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="space-y-4">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`cursor-pointer p-3 rounded-xl transition-all duration-200 ${
                      selectedVideo.id === video.id
                        ? 'border-2 border-black bg-gray-50'
                        : 'border border-gray-200 hover:border-gray-300'
                    }`}
                    variants={listItemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{
                      duration: 0.4,
                      delay: 0.7 + index * 0.1
                    }}
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex gap-3">
                      {/* Video Thumbnail */}
                      <motion.div
                        className="w-24 h-16 bg-gray-300 rounded-lg flex-shrink-0 overflow-hidden relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 96px, 96px"
                          onError={() => {
                            // Fallback handled by the parent container
                            console.log('Failed to load thumbnail for video:', video.title);
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">▶</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Video Info */}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-secondary-foreground/60 mb-1 font-medium">
                          {video.category}
                        </div>
                        <h4 className="text-sm font-semibold text-secondary-foreground leading-tight mb-2 line-clamp-2">
                          {video.title}
                        </h4>
                        <div className="text-xs text-secondary-foreground/60 space-y-1">
                          <div>{video.views}</div>
                          <div>{video.date}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}