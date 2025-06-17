import bg from '@/assets/background/index-bg.jpg';
import {
  useFictionBestSellers,
  useNonFictionBestSellers,
} from '@/hooks/usePopularBookList.ts';
import { formatNYTBooksToCarousel } from '@/lib/formatters.ts';
import ImgCarousel from '@/components/features/popular/ImgCarousel.tsx';

function PopularIndex() {
  const {
    fictionList,
    isLoading: isFictionLoading,
    error: fictionErr,
  } = useFictionBestSellers();
  const {
    nonFictionList,
    isLoading: isNonFictionLoading,
    error: nonfictionErr,
  } = useNonFictionBestSellers();

  console.log(formatNYTBooksToCarousel(nonFictionList));
  return (
    <main
      className="relative min-h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})`, backgroundAttachment: 'fixed' }}
    >
      <div className="min-h-screen bg-gray-950/90 py-10 text-white">
        <div className="container mx-auto mt-25 space-y-12 px-4">
          <div className="w-full">
            <h1 className="mb-8 text-4xl font-bold text-white md:text-6xl">
              Fiction
            </h1>
            <div
              className={`${
                isFictionLoading ? 'skeleton-loading h-94' : 'h-auto'
              } bg-blue-dark/10 w-full overflow-hidden rounded-lg border border-blue-500/20 p-6 backdrop-blur-xl transition-all duration-500`}
            >
              <StatusMessageText error={fictionErr} />
              {!isFictionLoading && !fictionErr && (
                <ImgCarousel books={formatNYTBooksToCarousel(fictionList)} />
              )}
            </div>
          </div>
          <div className="w-full">
            <h1 className="mb-8 text-4xl font-bold text-white md:text-6xl">
              Non-Fiction
            </h1>
            <div
              className={`${
                isNonFictionLoading ? 'skeleton-loading h-94' : 'h-auto'
              } bg-blue-dark/10 w-full overflow-hidden rounded-lg border border-blue-500/20 p-6 backdrop-blur-xl transition-all duration-500`}
            >
              <StatusMessageText error={nonfictionErr} />
              {!isNonFictionLoading && !nonfictionErr && (
                <ImgCarousel books={formatNYTBooksToCarousel(nonFictionList)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PopularIndex;

function StatusMessageText({ error }: { error: unknown }) {
  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-xl font-medium text-blue-300/30 md:text-2xl">
        Failed to load books.
      </div>
    );
  }

  return null;
}
