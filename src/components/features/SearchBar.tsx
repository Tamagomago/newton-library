import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { type FormEvent, useCallback, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { ValidateSearchParams, Genre } from '@/types/types.ts';

interface SearchBarProps {
  variant?: 'home' | 'collections';
  selectedGenres?: Genre[];
}

function SearchBar({
  variant = 'collections',
  selectedGenres,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (query.trim() === '' && selectedGenres?.length === 0) {
        console.log('cancelling search');
        return;
      }

      const searchParams: ValidateSearchParams = {
        startIndex: 0,
      };

      if (query.trim()) {
        searchParams.query = query.trim();
      }

      if (selectedGenres && selectedGenres.length > 0) {
        searchParams.genres = selectedGenres.map((g) => g.encoded);
      }

      console.log('search section genres: ', searchParams.genres);

      if (variant !== 'collections') {
        await navigate({
          to: '/collections',
          search: searchParams,
        });
      } else {
        console.log('collections page');
        await navigate({
          to: '/collections',
          search: searchParams,
          replace: true,
        });
      }
    },
    [navigate, query, variant, selectedGenres]
  );

  return (
    <form
      className={`group ${variant === 'collections' ? 'h-10' : ''} focus-within:border-orange-primary flex w-full items-center rounded-md border-1 border-white/50 p-1 backdrop-blur-xs transition-colors duration-500 md:h-[64px] md:gap-3 md:px-5`}
      style={{ backgroundColor: 'rgba(156, 163, 175, 0.1)' }}
      onSubmit={handleSubmit}
    >
      <MagnifyingGlassIcon className="group-focus-within:text-orange-primary h-10 w-auto text-white/50 transition-colors duration-500" />
      <Input
        className="!border-none text-xs text-white/70 focus-visible:!ring-0 focus-visible:!outline-none md:!text-lg"
        placeholder={'Search for books...'}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <Button
        className={
          'bg-orange-primary hover:bg-orange-secondary h-8 w-11 cursor-pointer text-center text-xs font-normal !break-words md:h-10 md:w-20 md:text-lg'
        }
        type={'submit'}
      >
        Search
      </Button>
    </form>
  );
}

export default SearchBar;
