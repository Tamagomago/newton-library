import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import bg from '@/assets/background/index-bg.jpg';
import SearchBar from '@/components/features/SearchBar.tsx';
import GenreList from '@/components/features/genre/GenreList.tsx';
import { useGenreStore } from '@/stores/useGenreStore.ts';
import { useSearchBooks } from '@/hooks/useBooks.ts';
import type { SearchParams } from '@/types/types.ts';
import { getTotalItems, transformBookList } from '@/lib/formatters.ts';
import CollectionsPagination from '@/components/features/collections/CollectionsPagination.tsx';
import BookGrid from '@/components/features/collections/BookGrid.tsx';

function CollectionsIndex() {
  const { selectedGenres } = useGenreStore();
  const { query, genres, startIndex } = useSearch({ from: '/collections/' });
  const searchParams: SearchParams = {
    query: Array.isArray(query) ? query.join(' ') : (query ?? undefined),
    genres: Array.isArray(genres) ? genres.join(' ') : (genres ?? undefined),
    startIndex,
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query, genres, startIndex]);
  const { data: booksRaw, isLoading, error } = useSearchBooks(searchParams);
  const bookList = transformBookList(booksRaw);
  const totalBooks = getTotalItems(booksRaw);

  return (
    <main
      className={
        'relative min-h-full w-full bg-cover bg-center bg-no-repeat'
      }
      style={{ backgroundImage: `url(${bg})`, backgroundAttachment: 'fixed' }}
    >
      <div className="flex h-auto min-h-full flex-col items-center gap-5 bg-gray-950/90 text-white">
        <div className={'mt-24 flex w-[45%] flex-col items-center gap-5'}>
          <h1 className={'text-center text-2xl font-[700] md:text-4xl'}>
            Browse Collections
          </h1>
          <SearchBar selectedGenres={selectedGenres} />
        </div>
        <GenreList />
        <div
          className={`${isLoading ? 'skeleton-loading h-200' : 'h-auto'} bg-blue-dark/10 w-[90%] overflow-hidden rounded-sm p-5 backdrop-blur-3xl transition-all duration-500 md:w-[65%]`}
        >
          <SearchStatusMessage
            query={query}
            genres={genres}
            error={error}
            isLoading={isLoading}
            totalBooks={totalBooks}
            bookDetails={bookList}
          />
          {(query || genres) && !isLoading && !error && (
            <BookGrid bookList={bookList} />
          )}
        </div>
        <CollectionsPagination
          startIndex={startIndex}
          totalResults={totalBooks}
        />
      </div>
    </main>
  );
}

export default CollectionsIndex;

function SearchStatusMessage({
  query,
  genres,
  error,
  isLoading,
  totalBooks,
  bookDetails,
}: {
  query: unknown;
  genres: unknown;
  error: unknown;
  isLoading: boolean;
  totalBooks: number;
  bookDetails: unknown[];
}) {
  if (!query && !genres) {
    return (
      <div className="text-md flex h-200 items-center justify-center text-center font-[400] text-blue-300/30 md:text-2xl">
        Try searching for a book to get started!
      </div>
    );
  } else if (error) {
    return (
      <div className="text-md flex h-200 items-center justify-center text-center font-[400] text-blue-300/30 md:text-2xl">
        Oops, something went wrong! :(
      </div>
    );
  } else if (isLoading) {
    return null;
  } else if (totalBooks === 0) {
    return (
      <div className="text-md flex h-200 items-center justify-center text-center font-[400] text-blue-300/30 md:text-2xl">
        No Books Found! :(
      </div>
    );
  } else if (bookDetails.length === 0) {
    return (
      <div className="text-md flex h-200 w-full items-center justify-center text-center font-[400] text-blue-300/30 md:text-2xl">
        No more results.
      </div>
    );
  }
  return null;
}
