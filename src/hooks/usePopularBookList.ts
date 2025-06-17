import { useQuery } from '@tanstack/react-query';
import { fetchFictionList, fetchNonFictionsList } from '@/api/nyt.ts';

export function useFictionBestSellers() {
  const { data, isLoading, error } = useQuery({
    queryFn: fetchFictionList,
    queryKey: ['nyt', 'bestsellers', 'fiction'],
    refetchOnWindowFocus: false,
  });
  return { fictionList: data, isLoading, error };
}

export function useNonFictionBestSellers() {
  const { data, isLoading, error } = useQuery({
    queryFn: fetchNonFictionsList,
    queryKey: ['nyt', 'bestsellers', 'nonfiction'],
    refetchOnWindowFocus: false,
  });
  return { nonFictionList: data, isLoading, error };
}
