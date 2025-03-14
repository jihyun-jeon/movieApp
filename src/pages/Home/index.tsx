import { usePopularMoviesQuery, useTrendingMoviesQuery } from '@/hooks/query/useMovie';
import PosterImage from '@/components/PosterImage';
import { TMDB_LANGUAGE_KR } from '@/contants';
import useNavigateToContents from '@/hooks/usePathParams';
import { Movie } from '@/types/movie';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Home = () => {
  const popularMovies = usePopularMoviesQuery({ language: TMDB_LANGUAGE_KR, page: 1 });
  const trandingMovies = useTrendingMoviesQuery({ language: TMDB_LANGUAGE_KR, page: 1 });

  const { updatePathParam } = useNavigateToContents();

  return (
    <div className="text-white px-36">
      {/* Hero Carousel */}
      {popularMovies.isLoading ? (
        <div>Loading...</div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={15}
          slidesPerView={3}
          slidesPerGroup={3}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false, // 사용자가 슬라이드를 조작해도 자동 재생 유지
          }}
          onSwiper={(swiper) => console.log('swiper', swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {popularMovies.data?.results.map((movie: Movie) => (
            <SwiperSlide
              key={movie.id}
              onClick={() => {
                updatePathParam('.', movie.id);
              }}
            >
              <PosterImage posterPath={movie?.poster_path} size="w500" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Day Carousel */}
      {trandingMovies.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>오늘의 인기작 TOP 20</h1>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={15}
            slidesPerView={5}
            slidesPerGroup={5}
            navigation
            loop
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log('swiper', swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {trandingMovies.data?.results.map((movie: Movie, idx) => (
              <SwiperSlide
                key={movie.id}
                onClick={() => {
                  updatePathParam('.', movie.id);
                }}
              >
                <h1>{idx + 1}</h1>
                <PosterImage posterPath={movie?.poster_path} size="w342" />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default Home;
