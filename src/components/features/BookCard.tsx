import clsx from 'clsx';
import type { BookDetails } from '@/types/types.ts';
import { Link } from '@tanstack/react-router';

interface BookCardProps {
  bookDetails: BookDetails;
  variant: '/collections' | '/popular';
}
function BookCard({
  bookDetails: {
    id,
    volumeInfo: { title, subtitle, authors, imageLinks, averageRating },
  },
  variant,
}: BookCardProps) {
  return (
    <Link
      to={'books/$bookId'}
      from={variant}
      params={{ bookId: id }}
      className={clsx(
        'relative flex h-90 cursor-pointer items-end gap-4 !overflow-visible rounded-sm border-1 border-blue-300 bg-cover bg-center p-4 text-white',
        'transition-all duration-200',
        'hover:border-orange-primary hover:z-10 hover:scale-105 hover:border-2',
        'hover:shadow-[0_0_12px_2px_rgba(255,125,0,0.6)]'
      )}
      style={{
        backgroundImage: imageLinks?.thumbnail
          ? `linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url(${imageLinks.smallThumbnail})`
          : undefined,
      }}
    >
      <div className="z-10 space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {subtitle && (
          <h3 className="text-sm text-blue-300 italic">
            {subtitle.length > 60 ? `${subtitle.slice(0, 60)} ...` : subtitle}
          </h3>
        )}
        <p className="text-sm text-blue-200">
          {authors
            ? authors.length > 2
              ? `${authors[0]}, ${authors[1]}, et al.`
              : authors.join(', ')
            : 'Unknown Author'}
        </p>
        {averageRating && (
          <p className="text-yellow-400">⭐ {averageRating} / 5</p>
        )}
      </div>
    </Link>
  );
}

export default BookCard;
