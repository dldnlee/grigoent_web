'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface ArtistSearchProps {
  onSearch: (query: string) => void;
  totalResults: number;
  isLoading?: boolean;
}

export function ArtistSearch({
  onSearch,
  totalResults,
  isLoading = false
}: ArtistSearchProps) {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('artists.searchPlaceholder')}
          className="pl-12 pr-12 h-14 text-lg bg-card border-border rounded-full
                     focus:ring-2 focus:ring-primary/20 focus:border-primary
                     transition-all duration-200"
          disabled={isLoading}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full
                       hover:bg-muted/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Results counter */}
      {query && (
        <div className="mt-3 text-sm text-muted-foreground text-center">
          {isLoading ? (
            <span>{t('common.loading')}</span>
          ) : (
            <span>
              {totalResults} {totalResults === 1 ? 'result' : 'results'} found
            </span>
          )}
        </div>
      )}
    </div>
  );
}