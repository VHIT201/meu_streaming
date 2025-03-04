import { useRouter } from "next/router";
import { FilmDetails, Video, SimilarFilm, Credits } from "../../Types/Types";
import Config from "../../configuration";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import FilmItem from "../../components/FilmItem";
import Image from "next/image";
import { useQuery } from '@tanstack/react-query';
import apiClient from "../../services/apiServices/apiServices";

const MovieDetailMainView: React.FC = () => {
  const router = useRouter();
  const { id, media_type } = router.query;

  // Custom hook to fetch movie details
  const { filmDetails, videos, similarFilms, credits, loading, error } = useMovieDetailContainer(id as string, media_type as string);

  // Check if id or media_type is undefined
  if (typeof id !== "string" || typeof media_type !== "string") {
    return <div>Thông tin phim không có sẵn.</div>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="spinner" aria-label="Loading..." />
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="text-white text-opacity-50 text-2xl h-[70vh] flex items-center justify-center">
        Lỗi khi tải thông tin phim. Vui lòng thử lại sau.
      </div>
    );
  }

  // No film details available
  if (!filmDetails || Object.keys(filmDetails).length === 0) {
    return <div>Không có chi tiết nào.</div>;
  }

  return (
    <main className="w-full flex flex-col items-center justify-start bg-black">
      <HeroSection
        filmDetails={filmDetails}
        credits={credits}
        router={router} // Pass router to HeroSection
        media_type={media_type as string}
      />
      <VideosSection videos={videos} />
      <SimilarMoviesSection
        media_type={media_type as string}
        similarFilms={similarFilms}
      />
    </main>
  );
};

// Custom hook to fetch movie details
const useMovieDetailContainer = (id: string, mediaType: string) => {
  // Fetch movie details
  const { data: filmDetails, isLoading: isFilmDetailsLoading, error: filmDetailsError } = useQuery({
    queryKey: ['filmDetails', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}?language=en-US`);
      return response.data; // Return response.data
    },
  });

  // Fetch videos
  const { data: videos = [], isLoading: isVideosLoading, error: videosError } = useQuery({
    queryKey: ['videos', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}/videos?language=en-US`);
      return response.data.results || []; // Ensure an empty array is returned if no results
    },
  });

  // Fetch similar films
  const { data: similarFilms = [], isLoading: isSimilarFilmsLoading, error: similarFilmsError } = useQuery({
    queryKey: ['similarFilms', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}/similar?language=en-US&page=1`);
      return response.data.results || []; // Ensure an empty array is returned if no results
    },
  });

  // Fetch credits
  const { data: credits = [], isLoading: isCreditsLoading, error: creditsError } = useQuery({
    queryKey: ['credits', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}/credits?language=en-US`);
      return response.data || []; // Assuming you only need the cast part
    },
  });

  // Loading state
  const loading = isFilmDetailsLoading || isVideosLoading || isSimilarFilmsLoading || isCreditsLoading;
  // Error handling: Return an array of errors for easier processing if needed
  const error = filmDetailsError || videosError || similarFilmsError || creditsError;

  return {
    filmDetails,
    videos,
    similarFilms,
    credits,
    loading,
    error,
  };
};

// Hero section to display movie details and cast
const HeroSection: React.FC<{
  filmDetails: FilmDetails;
  credits: Credits | null;
  router: ReturnType<typeof useRouter>; // Get router from props
  media_type: string; // Get media_type from props
}> = ({ filmDetails, credits, router, media_type }) => (
  <div
    className='relative w-full px-4 md:px-8 lg:px-16 py-12 md:pt-32 md:pb-20 bg-center bg-no-repeat bg-cover z-0 before:content-[""] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1/2 before:bg-black-main before:-z-10 after:content-[""] after:absolute after:top-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-t after:from-black-main after:to-transparent after:-z-10'
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${filmDetails.backdrop_path})`,
    }}
  >
    <div className="flex items-start -mx-4 max-h-fit">
      <div className="hidden md:block w-64 lg:w-96 px-4">
        <Image
          src={`https://image.tmdb.org/t/p/w500${filmDetails.poster_path}`}
          alt={filmDetails.title}
          className="w-full rounded-3xl"
          width={500}
          height={750}
        />
      </div>
      <div className="px-4 flex-1 flex flex-col items-start justify-between -my-2 lg:-my-4">
        <h2 className="py-2 lg:py-4 font-bold text-white text-3xl md:text-5xl lg:text-7xl">
          {filmDetails.title}
        </h2>
        <div className="py-4 flex flex-wrap items-center -mx-1">
          {filmDetails.genres?.map((genre) => (
            <div className="px-1 mb-4" key={genre.id}>
              <span className="bg-black-main px-4 py-1 border-2 border-white rounded-full text-white text-xs lg:text-sm">
                {genre.name}
              </span>
            </div>
          ))}
        </div>
        <p className="py-2 lg:py-4 text-white text-xs md:text-sm lg:text-base text-left">
          {filmDetails.overview}
        </p>
        <div className="py-2 lg:py-4 text-left">
          <h3 className="text-white text-xl font-medium">Casts</h3>
          <div className="flex flex-wrap -mx-2 mt-1">
            {credits?.cast.slice(0, 5).map((item) => (
              <div className="w-28 px-2 mb-1" key={item.id}>
                <Image
                  src={Config.imgPath + item.profile_path}
                  className="rounded-xl"
                  alt={item.name}
                  width={100}
                  height={150}
                />
                <span className="text-white text-xs md:text-sm font-sm">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="py-4">
          <button
            className="btn-lg btn-primary"
            onClick={() =>
              router.push(`/watch?id=${filmDetails.id}&media_type=${media_type}`)
            }
          >
            Watch now
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Videos section
const VideosSection: React.FC<{ videos: Video[] }> = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <div
        className="relative px-4 md:px-8 lg:px-16 w-full text-left z-0 
        before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 
        before:bg-gradient-to-b before:from-black/50 before:to-black-main before:z-10"
      >
        <div className="w-full relative py-20 text-center flex flex-col gap-20 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1/2 before:bg-gradient-to-t before:from-transparent before:to-back-main before:z-10">
          <h3 className="text-white text-base md:text-2xl font-semibold mb-4 self-start">
            Videos
          </h3>
          <span className="text-2xl font-bold text-white opacity-50">
            Không có video nào liên quan đến bộ phim này.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-4 md:px-8 lg:px-16 w-full text-left z-0">
      {videos.slice(0, 5).map((item) => (
        <div key={item.id} className="mb-16">
          <h3 className="text-white text-base md:text-2xl font-semibold mb-4">
            {item.name}
          </h3>
          <iframe
            src={`https://www.youtube.com/embed/${item.key}`}
            title={item.name}
            width="100%"
            height="800px"
            loading="lazy"
            allowFullScreen={true}
          ></iframe>
        </div>
      ))}
    </div>
  );
};

// Similar movies section
const SimilarMoviesSection: React.FC<{
  similarFilms: SimilarFilm[];
  media_type: string;
}> = ({ similarFilms, media_type }) => (
  <div className="px-4 w-full md:px-8 lg:px-16 pb-16 mt-16 text-left">
    <h3 className="text-white text-base md:text-2xl font-semibold mb-4">
      Phim tương tự
    </h3>
    {similarFilms.length > 0 ? (
      <div className="flex flex-wrap -mx-2">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="relative w-full"
        >
          {similarFilms.map((movie) => (
            <SwiperSlide key={movie.id}>
              <FilmItem
                id={movie.id}
                original_title={movie.original_title}
                original_name={movie.original_name}
                name={movie.name}
                poster_path={movie.poster_path}
                media_type={media_type}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ) : (
      <span className="text-2xl font-bold text-white opacity-50">
        Không có phim nào liên quan đến bộ phim này.
      </span>
    )}
  </div>
);

export default MovieDetailMainView;
