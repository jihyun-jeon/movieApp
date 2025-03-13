import { usePopularMovies, useTrendingMovies } from '../../api/tmdb';
import { Movie } from '../../types/Movie';
import { getImageUrl } from '../../utils/tmdbUtils';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const TMDB_LANGUAGE = 'ko-KR';

const Home = () => {
  const popularMovies = usePopularMovies({ language: TMDB_LANGUAGE, page: 1 });
  const trandingMovies = useTrendingMovies({ language: TMDB_LANGUAGE, page: 1 });

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
            <SwiperSlide key={movie.id}>
              {movie.poster_path && (
                <img
                  src={getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  className="w-full h-auto rounded-lg"
                />
              )}
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
              <SwiperSlide key={movie.id}>
                <h1>{idx + 1}</h1>
                {movie.poster_path && (
                  <img
                    src={getImageUrl(movie.poster_path, 'w342')}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default Home;
