import { createClient } from '@/utils/supabase/client';
import { DbUser, DbTeam, Dancer, Team } from '../types/dancer';
import { mapUserToDancer, mapTeamToTeam } from './mappers';

/**
 * Fetches all dancers from Supabase
 */
export async function fetchDancers(): Promise<Dancer[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('type', 'dancer')
    .order('display_order', { ascending: true, nullsLast: true });

  if (error) {
    console.error('Error fetching dancers:', error);
    return [];
  }

  return (data as DbUser[]).map(mapUserToDancer);
}

/**
 * Fetches all teams with their members from Supabase
 */
export async function fetchTeams(): Promise<Team[]> {
  const supabase = createClient();

  // Fetch teams
  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true, nullsLast: true });

  if (teamsError) {
    console.error('Error fetching teams:', teamsError);
    return [];
  }

  // Fetch team members for each team
  const teamsWithMembers: Team[] = [];

  for (const team of teams as DbTeam[]) {
    const { data: teamMembers, error: membersError } = await supabase
      .from('team_members')
      .select('user_id')
      .eq('team_id', team.id);

    if (membersError) {
      console.error(`Error fetching members for team ${team.id}:`, membersError);
      continue;
    }

    // Fetch user details for team members
    const memberIds = teamMembers.map(m => m.user_id);
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .in('id', memberIds);

    if (usersError) {
      console.error(`Error fetching users for team ${team.id}:`, usersError);
      continue;
    }

    const mappedTeam = mapTeamToTeam(team, users as DbUser[]);
    teamsWithMembers.push(mappedTeam);
  }

  return teamsWithMembers;
}

/**
 * Fetches featured dancers (limited number for homepage)
 */
export async function fetchFeaturedDancers(limit: number = 8): Promise<Dancer[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('type', 'dancer')
    .order('display_order', { ascending: true, nullsLast: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured dancers:', error);
    return [];
  }

  return (data as DbUser[]).map(mapUserToDancer);
}
