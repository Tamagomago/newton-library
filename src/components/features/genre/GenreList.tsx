import type { Genre } from '@/types/types.ts';
import GenreButton from '@/components/features/genre/GenreButton.tsx';
import { useEffect } from 'react';
import { genres } from '@/data/bisacGenre.ts';
import { useGenreStore } from '@/stores/useGenreStore.ts';

function GenreList() {
  const { randomGenres, setRandomGenres, isGenreSelected, toggleGenre } =
    useGenreStore();

  useEffect(() => {
    if (genres && randomGenres.length === 0) {
      const filtered = genres.sort(() => 0.5 - Math.random()).slice(0, 5);
      setRandomGenres(filtered);
    }
  }, [genres, randomGenres.length, setRandomGenres]);

  return (
    <section
      className={`hidden w-[40%] grid-cols-3 gap-2 sm:grid md:h-[48px] md:grid-cols-5 md:gap-4`}
    >
      {randomGenres.map((genre: Genre) => (
        <GenreButton
          key={genre.encoded}
          name={genre.name}
          value={genre.encoded}
          isSelected={isGenreSelected(genre.encoded)}
          onClick={() => toggleGenre(genre)}
        />
      ))}
    </section>
  );
}

export default GenreList;
