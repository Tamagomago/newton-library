import { useNavigate } from '@tanstack/react-router';
import { fetchBooksBySearch } from '@/lib/googleBooks';

interface Book {
  book_image?: string;
  isbn13?: string;
}

interface ImageCarouselProps {
  books: Book[];
}

function ImageCarousel({ books }: ImageCarouselProps) {
  const navigate = useNavigate();

  if (!books.length) return null;

  const handleBookClick = async (book: Book) => {
    if (!book.isbn13) return;
    try {
      const searchResults = await fetchBooksBySearch(`isbn:${book.isbn13}`);
      console.log(book.isbn13);
      if (searchResults?.items?.[0]?.id) {
        await navigate({
          to: '/popular/books/$bookId',
          params: {
            bookId: searchResults.items[0].id,
          },
        });
      }
    } catch (error) {
      console.error('Error searching for book:', error);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto p-3">
      {books.map((book) => (
        <div
          key={book.isbn13}
          className="min-w-[120px] flex-shrink-0 cursor-pointer overflow-hidden rounded shadow-md transition-all duration-300 hover:scale-105"
          onClick={() => handleBookClick(book)}
        >
          <img
            src={book.book_image}
            alt={`Book ${book.isbn13}`}
            className="h-75 w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default ImageCarousel;
