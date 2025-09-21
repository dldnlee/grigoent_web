export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
}

export interface ProcessedVideo {
  id: string;
  videoId: string;
  title: string;
  views: string;
  date: string;
  category: string;
  thumbnail: string;
}

export async function fetchPlaylistVideos(playlistId: string, apiKey: string): Promise<YouTubeVideo[]> {
  const maxResults = 10; // Limit to 10 videos
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    return data.items?.map((item: {
      id: string;
      snippet: {
        resourceId: { videoId: string };
        title: string;
        description: string;
        thumbnails: {
          medium?: { url: string };
          default?: { url: string };
        };
        publishedAt: string;
        channelTitle: string;
      };
    }) => ({
      id: item.id,
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
    })) || [];
  } catch (error) {
    console.error('Error fetching YouTube playlist:', error);
    return [];
  }
}

export async function getVideoStats(videoId: string, apiKey: string): Promise<{ viewCount: string }> {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    const viewCount = data.items?.[0]?.statistics?.viewCount || '0';

    return { viewCount };
  } catch (error) {
    console.error('Error fetching video stats:', error);
    return { viewCount: '0' };
  }
}

export function formatViewCount(viewCount: string): string {
  const count = parseInt(viewCount);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  }
  return `${count} views`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

export function processYouTubeVideos(videos: YouTubeVideo[], videoStats: Record<string, { viewCount: string }>): ProcessedVideo[] {
  return videos.map((video) => ({
    id: video.id,
    videoId: video.videoId,
    title: video.title,
    views: formatViewCount(videoStats[video.videoId]?.viewCount || '0'),
    date: formatDate(video.publishedAt),
    category: 'BROADCAST',
    thumbnail: video.thumbnail,
  }));
}