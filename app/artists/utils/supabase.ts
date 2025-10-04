import { createClient } from '@/utils/supabase/client';
import { DbUser, DbTeam, Dancer, Team } from '../types/dancer';
import { mapUserToDancer, mapTeamToTeam } from './mappers';

/**
 * Fetches all dancers from Supabase ordered by display_order_items table
 */
export async function fetchDancers(): Promise<Dancer[]> {
  const supabase = createClient();

  // Get artists from display_order_items table
  const { data: orderItems, error: orderError } = await supabase
    .from('display_order_items')
    .select('item_id, display_order')
    .eq('item_type', 'artist')
    .order('display_order', { ascending: true });

  if (orderError) {
    console.error('Error fetching display order:', orderError);
    // Fallback to direct query without ordering
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('type', 'dancer');

    if (error) {
      console.error('Error fetching dancers:', error);
      return [];
    }

    return (data as DbUser[]).map(mapUserToDancer);
  }

  // Fetch users based on ordered IDs
  const orderedIds = orderItems?.map(item => item.item_id) || [];

  if (orderedIds.length === 0) {
    // No items in display_order_items, fetch all dancers
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('type', 'dancer');

    if (error) {
      console.error('Error fetching dancers:', error);
      return [];
    }

    return (data as DbUser[]).map(mapUserToDancer);
  }

  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
    .in('id', orderedIds);

  if (usersError) {
    console.error('Error fetching users:', usersError);
    return [];
  }

  // Sort users based on display_order_items order
  const orderedUsers = orderedIds
    .map(id => users?.find(user => user.id === id))
    .filter(user => user !== undefined) as DbUser[];

  return orderedUsers.map(mapUserToDancer);
}

/**
 * Fetches all teams with their members from Supabase ordered by display_order_items table
 */
export async function fetchTeams(): Promise<Team[]> {
  const supabase = createClient();

  // Get teams from display_order_items table
  const { data: orderItems, error: orderError } = await supabase
    .from('display_order_items')
    .select('item_id, display_order')
    .eq('item_type', 'team')
    .order('display_order', { ascending: true });

  if (orderError) {
    console.error('Error fetching team display order:', orderError);
    // Fallback to direct query
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('*')
      .eq('status', 'active');

    if (teamsError) {
      console.error('Error fetching teams:', teamsError);
      return [];
    }

    return await fetchTeamMembers(supabase, teams as DbTeam[]);
  }

  // Fetch teams based on ordered IDs
  const orderedIds = orderItems?.map(item => item.item_id) || [];

  if (orderedIds.length === 0) {
    return [];
  }

  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .select('*')
    .eq('status', 'active')
    .in('id', orderedIds);

  if (teamsError) {
    console.error('Error fetching teams:', teamsError);
    return [];
  }

  // Sort teams based on display_order_items order
  const orderedTeams = orderedIds
    .map(id => teams?.find(team => team.id === id))
    .filter(team => team !== undefined) as DbTeam[];

  return await fetchTeamMembers(supabase, orderedTeams);
}

/**
 * Helper function to fetch team members
 */
async function fetchTeamMembers(supabase: any, teams: DbTeam[]): Promise<Team[]> {
  const teamsWithMembers: Team[] = [];

  for (const team of teams) {
    const { data: teamMembers, error: membersError } = await supabase
      .from('team_members')
      .select('user_id')
      .eq('team_id', team.id);

    if (membersError) {
      console.error(`Error fetching members for team ${team.id}:`, membersError);
      continue;
    }

    // Fetch user details for team members
    const memberIds = teamMembers.map((m: any) => m.user_id);
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
 * Fetches featured dancers (limited number for homepage) ordered by display_order_items
 */
export async function fetchFeaturedDancers(limit: number = 8): Promise<Dancer[]> {
  const supabase = createClient();

  // Get artists from display_order_items table
  const { data: orderItems, error: orderError } = await supabase
    .from('display_order_items')
    .select('item_id, display_order')
    .eq('item_type', 'artist')
    .order('display_order', { ascending: true })
    .limit(limit);

  if (orderError || !orderItems || orderItems.length === 0) {
    console.error('Error fetching display order for featured dancers:', orderError);
    // Fallback to direct query
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('type', 'dancer')
      .limit(limit);

    if (error) {
      console.error('Error fetching featured dancers:', error);
      return [];
    }

    return (data as DbUser[]).map(mapUserToDancer);
  }

  // Fetch users based on ordered IDs
  const orderedIds = orderItems.map(item => item.item_id);

  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
    .in('id', orderedIds);

  if (usersError) {
    console.error('Error fetching featured dancers:', usersError);
    return [];
  }

  // Sort users based on display_order_items order
  const orderedUsers = orderedIds
    .map(id => users?.find(user => user.id === id))
    .filter(user => user !== undefined) as DbUser[];

  return orderedUsers.map(mapUserToDancer);
}
