export interface Dancer {
  id: string;
  koreanName: string;
  englishName: string;
  specialty: string;
  image: string;
  type: 'solo' | 'team';
  isVerified?: boolean;
  followers?: number;
  monthlyListeners?: number;
  genres?: string[];
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export interface Team {
  id: string;
  teamName: string;
  koreanName?: string;
  members: Dancer[];
  image: string;
  specialty: string;
  formedYear: number;
  isVerified?: boolean;
  followers?: number;
}

export interface SearchFilters {
  query: string;
  specialty?: string;
  sortBy: 'name' | 'popularity' | 'newest';
  type: 'all' | 'solo' | 'team';
}