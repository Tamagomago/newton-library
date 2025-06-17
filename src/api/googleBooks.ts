const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const fetchBooksBySearch = async (
  query: string,
  genres = '',
  startIndex = 0,
  maxResults = 20
) => {
  const searchQuery = encodeURI(
    [query?.trim(), genres ? `subject:${genres}` : ''].filter(Boolean).join(' ')
  );
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error();
  }
  return await response.json();
};

export const fetchBookByID = async (bookId: string) => {
  if (!bookId) throw new Error('Missing book ID');
  const url = `https://www.googleapis.com/books/v1/volumes/${encodeURI(bookId.trim())}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }
  return await response.json();
};
