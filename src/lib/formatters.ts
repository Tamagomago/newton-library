import type {
  BookDetails,
  GoogleBooksApiResponse,
  BookVolumeInfo,
  NYTList,
  CarouselItem,
} from '@/types/types.ts';

export function transformBookList(
  response: GoogleBooksApiResponse | undefined
): BookDetails[] {
  const items = response?.items ?? [];
  return items
    .map(transformBook)
    .filter((book): book is BookDetails => book !== undefined);
}

export function transformBook(
  item: { id: string; volumeInfo?: BookVolumeInfo } | undefined
): BookDetails | undefined {
  if (!item || !item.volumeInfo) return;
  const info = item.volumeInfo;
  return {
    id: item.id,
    volumeInfo: {
      title: info.title || 'Untitled',
      subtitle: info.subtitle,
      authors: info.authors || [],
      categories: info.categories || [],
      publishedDate: info.publishedDate,
      description: info.description,
      pageCount: info.pageCount,
      publisher: info.publisher,
      language: info.language,
      imageLinks: info.imageLinks,
      previewLink: info.previewLink,
      infoLink: info.infoLink,
      averageRating: info.averageRating,
      ratingsCount: info.ratingsCount,
    },
  };
}

export function getTotalItems(response: GoogleBooksApiResponse) {
  return response?.totalItems ?? undefined;
}

export function formatNYTBooksToCarousel(
  data: NYTList | undefined
): CarouselItem[] {
  if (!data?.results?.books) return [];
  return data.results.books
    .map((book) => {
      const isbn13 = book.isbns?.find((isbn) => isbn.isbn13)?.isbn13;
      return isbn13 ? { book_image: book.book_image, isbn13 } : null;
    })
    .filter(
      (entry): entry is { book_image: string; isbn13: string } => entry !== null
    );
}
