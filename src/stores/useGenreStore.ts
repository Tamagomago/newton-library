import { create } from 'zustand';
import type { Genre } from '@/types/types.ts';

interface GenreSelectionState {
  randomGenres: Genre[];
  setRandomGenres: (genres: Genre[]) => void;
  selectedGenres: Genre[];
  toggleGenre: (genre: Genre) => void;
  isGenreSelected: (genreValue: string) => boolean;
}

export const useGenreStore = create<GenreSelectionState>((set, get) => ({
  randomGenres: [],
  setRandomGenres: (genres) => set({ randomGenres: genres }),
  selectedGenres: [],
  toggleGenre: (genre) =>
    set((state) => {
      const isSelected = state.selectedGenres.some(
        (g) => g.encoded === genre.encoded
      );
      return {
        selectedGenres: isSelected
          ? state.selectedGenres.filter((g) => g.encoded !== genre.encoded)
          : [...state.selectedGenres, genre],
      };
    }),
  isGenreSelected: (genreValue) =>
    get().selectedGenres.some((g) => g.encoded === genreValue),
}));
