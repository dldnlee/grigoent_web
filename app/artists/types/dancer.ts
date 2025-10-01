// Database types from Supabase
export interface DbUser {
  id: string;
  name: string;
  name_en: string;
  email: string | null;
  phone: string | null;
  profile_image: string | null;
  slug: string;
  type: string;
  display_order: number | null;
  introduction: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
  created_at: string;
}

export interface DbTeam {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  cover_image: string | null;
  leader_id: string | null;
  status: string;
  display_order: number | null;
  created_at: string;
}

// UI types for components (mapped from database)
export interface Dancer {
  id: string;
  koreanName: string;
  englishName: string;
  specialty: string;
  image: string;
  slug: string;
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
  slug: string;
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