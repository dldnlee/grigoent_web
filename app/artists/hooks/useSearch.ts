'use client';

import { useState, useMemo, useCallback } from 'react';
import { Dancer, Team, SearchFilters } from '../types/dancer';

interface UseSearchProps {
  dancers: Dancer[];
  teams: Team[];
}

export function useSearch({ dancers, teams }: UseSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    specialty: undefined,
    sortBy: 'name',
    type: 'all'
  });

  const filteredDancers = useMemo(() => {
    let result = [...dancers];

    // Filter by search query (Korean or English name)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      result = result.filter(dancer =>
        dancer.koreanName.toLowerCase().includes(query) ||
        dancer.englishName.toLowerCase().includes(query)
      );
    }

    // Filter by specialty
    if (filters.specialty) {
      result = result.filter(dancer =>
        dancer.specialty.toLowerCase() === filters.specialty?.toLowerCase()
      );
    }

    // Filter by type
    if (filters.type !== 'all') {
      result = result.filter(dancer => dancer.type === filters.type);
    }

    // Sort results
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'popularity':
          return (b.monthlyListeners || 0) - (a.monthlyListeners || 0);
        case 'newest':
          return b.id.localeCompare(a.id); // Assuming newer IDs are larger
        case 'name':
        default:
          return a.englishName.localeCompare(b.englishName);
      }
    });

    return result;
  }, [dancers, filters]);

  const filteredTeams = useMemo(() => {
    let result = [...teams];

    // Filter by search query (team name or Korean name)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      result = result.filter(team =>
        team.teamName.toLowerCase().includes(query) ||
        (team.koreanName && team.koreanName.toLowerCase().includes(query))
      );
    }

    // Filter by specialty
    if (filters.specialty) {
      result = result.filter(team =>
        team.specialty.toLowerCase() === filters.specialty?.toLowerCase()
      );
    }

    // Sort results
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'popularity':
          return (b.followers || 0) - (a.followers || 0);
        case 'newest':
          return b.formedYear - a.formedYear;
        case 'name':
        default:
          return a.teamName.localeCompare(b.teamName);
      }
    });

    return result;
  }, [teams, filters]);

  const updateFilter = useCallback(<K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearSearch = useCallback(() => {
    setFilters({
      query: '',
      specialty: undefined,
      sortBy: 'name',
      type: 'all'
    });
  }, []);

  return {
    filters,
    filteredDancers,
    filteredTeams,
    updateFilter,
    clearSearch,
    totalResults: filteredDancers.length + filteredTeams.length
  };
}