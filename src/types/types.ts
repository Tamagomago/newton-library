export interface SearchParams {
  query?: string;
  genres?: string;
  startIndex?: number;
  maxResults?: number;
}

export interface ValidateSearchParams {
  query?: string | string[];
  genres?: string | string[];
  startIndex?: number;
}

export interface Genre {
  name: string;
  encoded: string;
}

export interface BookVolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  categories?: string[];
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  publisher?: string;
  language?: string;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  previewLink?: string;
  infoLink?: string;
  averageRating?: number;
  ratingsCount?: number;
}

export interface GoogleBooksApiResponse {
  kind: string;
  totalItems: number;
  items: {
    id: string;
    volumeInfo: BookVolumeInfo;
  }[];
}

export interface BookDetails {
  id: string;
  volumeInfo: BookVolumeInfo;
}

export interface NYTList {
  num_results: number;
  results: {
    books: {
      book_image: string;
      isbns?: {
        isbn10?: string;
        isbn13?: string;
      }[];
    }[];
  };
}

export interface CarouselItem {
  imgUrl?: string;
  isbn13?: string;
}
