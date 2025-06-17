import type { BookDetails } from '@/types/types.ts';
import BookCard from '@/components/features/BookCard.tsx';

interface BookGridProps {
  bookList: BookDetails[];
}

function BookGrid({ bookList }: BookGridProps) {
  return (
    <div
      className={
        'grid h-auto w-full grid-cols-2 gap-5 p-2 sm:grid-cols-3 lg:grid-cols-4'
      }
    >
      {bookList.map((bookDetail: BookDetails) => (
        <BookCard
          key={bookDetail.id}
          bookDetails={bookDetail}
          variant={'/collections'}
        />
      ))}
    </div>
  );
}

export default BookGrid;
