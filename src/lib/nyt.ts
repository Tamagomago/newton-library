export const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const fetchFictionList = async () => {
  const response = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${NYT_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Not found.');
  }
  return await response.json();
};

export const fetchNonFictionsList = async () => {
  const response = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/combined-print-and-e-book-nonfiction.json?api-key=${NYT_API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Not found.');
  }
  return await response.json();
};
