import { DbUser, DbTeam, Dancer, Team } from '../types/dancer';

/**
 * Maps a database user to a Dancer type for UI components
 */
export function mapUserToDancer(user: DbUser): Dancer {
  return {
    id: user.id,
    koreanName: user.name,
    englishName: user.name_en,
    slug: user.slug,
    specialty: 'Dance', // Default - can be enhanced with additional data
    image: user.profile_image || '/placeholder-avatar.jpg',
    type: 'solo',
    isVerified: true, // All GRIGO artists are verified
    socialLinks: {
      instagram: user.instagram_url || undefined,
      youtube: user.youtube_url || undefined,
      tiktok: user.twitter_url || undefined, // Using twitter_url for tiktok as placeholder
    }
  };
}

/**
 * Maps a database team with members to a Team type for UI components
 */
export function mapTeamToTeam(team: DbTeam, members: DbUser[]): Team {
  const mappedMembers = members.map(mapUserToDancer);

  // Get formed year from created_at
  const formedYear = new Date(team.created_at).getFullYear();

  return {
    id: team.id,
    teamName: team.name_en,
    koreanName: team.name,
    slug: team.slug,
    members: mappedMembers,
    image: team.cover_image || team.logo_url || '/placeholder-team.jpg',
    specialty: 'Dance Group', // Default - can be enhanced
    formedYear,
    isVerified: true,
    followers: mappedMembers.length * 50000, // Mock calculation based on member count
  };
}
