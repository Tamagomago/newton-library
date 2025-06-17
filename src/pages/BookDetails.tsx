import bg from '@/assets/background/index-bg.jpg';
import { Link, useParams } from '@tanstack/react-router';
import { useSearchBookByID } from '@/hooks/useBooks.ts';
import { Button } from '@/components/ui/button.tsx';
import { transformBook } from '@/lib/formatters.ts';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import BookMetaGrid from '@/components/features/book/BookMetaGrid.tsx';
import BookLinksPanel from '@/components/features/book/BookLinksPanel.tsx';
import BookCategories from '@/components/features/book/BookCategories.tsx';

function BookDetails() {
  const { bookId } = useParams({ strict: false });
  const { data: bookRaw, isLoading, error } = useSearchBookByID(bookId ?? '');
  const bookDetails = transformBook(bookRaw);
  const info = bookDetails?.volumeInfo;

  // Stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="h-5 w-5 text-yellow-400" />);
      } else {
        stars.push(
          <StarOutlineIcon key={i} className="h-5 w-5 text-gray-400" />
        );
      }
    }
    return stars;
  };

  return (
    <main
      className={`relative min-h-screen w-screen bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${bg})`, backgroundAttachment: `fixed` }}
    >
      <div className="flex min-h-screen items-center justify-center bg-gray-950/90 py-8 text-white">
        <div
          className={`${
            isLoading ? 'skeleton-loading h-200' : error ? 'h-200' : 'h-auto'
          } mt-20 flex w-[95%] max-w-6xl items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-blue-900/30 p-6 backdrop-blur-3xl transition-all duration-500 lg:mt-20`}
        >
          {error && <BookErrorMessage />}

          {!isLoading && !error && bookDetails && info && (
            <div className="flex w-full flex-col gap-8 lg:flex-row">
              {/* Book Cover */}
              <div className="flex flex-shrink-0 justify-center lg:justify-start">
                <div className="relative">
                  <img
                    src={
                      info.imageLinks?.thumbnail ||
                      info.imageLinks?.smallThumbnail ||
                      '/placeholder-book.jpg'
                    }
                    alt={info.title}
                    className="h-64 w-auto rounded-lg border border-white/20 object-cover shadow-2xl md:h-84"
                  />
                  {info.averageRating && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 backdrop-blur-sm">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {info.averageRating}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Book Information  */}
              <div className="flex-1 space-y-6">
                {/* Title and Subtitle */}
                <div>
                  <h1 className="mb-2 text-3xl leading-tight font-bold lg:text-4xl">
                    {info.title}
                  </h1>
                  {info.subtitle && (
                    <h2 className="text-xl font-medium text-gray-300">
                      {info.subtitle}
                    </h2>
                  )}
                </div>

                {/* Authors */}
                {info.authors && info.authors.length > 0 && (
                  <div>
                    <p className="text-lg text-gray-200">
                      by {info.authors.join(', ')}
                    </p>
                  </div>
                )}

                {/* Rating and Reviews */}
                {info.averageRating && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {renderStars(info.averageRating)}
                    </div>
                    <span className="text-gray-300">
                      {info.averageRating} out of 5
                    </span>
                    {info.ratingsCount && (
                      <span className="text-gray-400">
                        ({info.ratingsCount} reviews)
                      </span>
                    )}
                  </div>
                )}

                {/* Book Details */}
                <BookMetaGrid
                  publishedDate={info.publishedDate}
                  publisher={info.publisher}
                  pageCount={info.pageCount}
                  language={info.language}
                />

                {/* Categories */}
                <BookCategories categories={info.categories} />

                {/* Description */}
                {info.description && (
                  <div>
                    <h3 className="mb-3 text-3xl font-semibold text-gray-200">
                      Description
                    </h3>
                    <div
                      className="pr-2 text-sm leading-relaxed text-gray-300 md:text-lg"
                      dangerouslySetInnerHTML={{ __html: info.description }}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <BookLinksPanel
                  infoLink={info.infoLink}
                  previewLink={info.previewLink}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default BookDetails;

function BookErrorMessage() {
  return (
    <div
      className={
        'text-md flex h-auto flex-col items-center justify-center gap-5 text-center font-[400] text-blue-300/30 md:text-3xl'
      }
    >
      We can't find that book yet.
      <Button
        variant={'link'}
        className={'text-md cursor-pointer font-[400] text-blue-300/30'}
      >
        <Link to={`/`}>Back to Home</Link>
      </Button>
    </div>
  );
}
