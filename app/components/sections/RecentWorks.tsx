'use client';

import { useState } from 'react';

export default function RecentWorks() {
  const videos = [
    {
      id: 1,
      title: "[BOYS II PLANET K] 유메키 YUMEKI @시그널송 '올라(HOLA SOLAR)' 개인 무대 평가",
      views: "2,476,925 views",
      date: "Jun 13, 2025",
      category: "BROADCAST",
      thumbnail: "/placeholder-video.jpg"
    },
    {
      id: 2,
      title: "[BOYS II PLANET K] 유메키 YUMEKI @시그널송 '올라(HOLA SOLAR)' 개인 무대 평가",
      views: "2,476,925 views",
      date: "Jun 13, 2025",
      category: "BROADCAST",
      thumbnail: "/placeholder-video.jpg"
    },
    {
      id: 3,
      title: "[MUSIC VIDEO] K-POP 안무 제작 비하인드",
      views: "1,234,567 views",
      date: "May 20, 2025",
      category: "BROADCAST",
      thumbnail: "/placeholder-video.jpg"
    },
    {
      id: 4,
      title: "[WORKSHOP] 글로벌 댄스 워크샵 하이라이트",
      views: "987,654 views",
      date: "Apr 15, 2025",
      category: "BROADCAST",
      thumbnail: "/placeholder-video.jpg"
    },
    {
      id: 5,
      title: "[CHALLENGE] 바이럴 댄스 챌린지 모음",
      views: "3,456,789 views",
      date: "Mar 10, 2025",
      category: "BROADCAST",
      thumbnail: "/placeholder-video.jpg"
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <section className="py-24 bg-secondary" id="works">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-secondary-foreground mb-6">
            RECENT WORKS
          </h2>
          <p className="text-lg text-secondary-foreground/70 max-w-3xl mx-auto leading-relaxed">
            우리 댄서들이 참여한 다양한 프로젝트들을 확인해보세요. 각각의 작품은<br />
            열정과 창의성이 담긴 결과물입니다.
          </p>
        </div>

        {/* Video Player and List Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player - Left Side */}
          <div className="lg:col-span-2">
            <div className="aspect-video bg-gray-300 rounded-2xl overflow-hidden relative">
              {/* Video Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                <div className="text-6xl text-gray-600">▶</div>
              </div>
            </div>

            {/* Selected Video Info */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-secondary-foreground mb-2 leading-tight">
                {selectedVideo.title}
              </h3>
              <div className="flex justify-between items-center text-secondary-foreground/70">
                <span>{selectedVideo.views}</span>
                <span>{selectedVideo.date}</span>
              </div>
            </div>
          </div>

          {/* Video List - Right Side */}
          <div className="lg:col-span-1">
            <div className="h-[600px] overflow-y-auto bg-white rounded-2xl p-4 border">
              <div className="space-y-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className={`cursor-pointer p-3 rounded-xl transition-all duration-200 ${
                      selectedVideo.id === video.id
                        ? 'border-2 border-black bg-gray-50'
                        : 'border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Video Thumbnail */}
                      <div className="w-24 h-16 bg-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">▶</span>
                      </div>

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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}