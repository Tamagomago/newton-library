import bg from '@/assets/background/index-bg.jpg';
import FullLogo from '@/assets/FullLogo.png';
import SearchBar from '@/components/features/SearchBar.tsx';
import { useGenreStore } from '@/stores/useGenreStore.ts';
import GenreList from '@/components/features/genre/GenreList.tsx';

function Home() {
  const { selectedGenres } = useGenreStore();
  return (
    <main
      className="relative h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex h-screen items-center justify-center bg-gray-950/90 text-white">
        <section className="flex flex-col items-center justify-center gap-5 border-white">
          <div className="flex flex-col items-center justify-center gap-10 text-center">
            <img
              src={FullLogo}
              alt="Newton Full Logo"
              className="h-36 w-auto md:h-72"
            />
            <p className="w-[60%] text-center text-xs leading-tight font-[500] text-blue-200/50 md:text-xl">
              Discover a world of knowledge at your fingertips. Access thousands
              of books, articles, and educational resources designed to enhance
              your learning journey.
            </p>
          </div>
          <div className="flex w-[45%] flex-col items-center gap-5">
            <SearchBar variant={'home'} selectedGenres={selectedGenres} />
          </div>
          <GenreList />
        </section>
      </div>
    </main>
  );
}

export default Home;
