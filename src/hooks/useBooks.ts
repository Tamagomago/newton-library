import { useQuery } from '@tanstack/react-query';
import { fetchBookByID, fetchBooksBySearch } from '@/lib/googleBooks.ts';
import type { SearchParams } from '@/types/types.ts';

export function useSearchBooks({
  query = '',
  genres = '',
  startIndex = 0,
}: SearchParams) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchBooksBySearch(query, genres, startIndex),
    queryKey: [query, genres, startIndex],
    enabled: !!query || !!genres || startIndex > 0,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
}

export function useSearchBookByID(bookId: string) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchBookByID(bookId),
    queryKey: [bookId],
    enabled: !!bookId,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
}
