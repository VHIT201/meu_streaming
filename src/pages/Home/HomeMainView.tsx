import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import useDarkMode from "@/hooks/useDarkMode";
import { Images } from "@/app/assets/images";
import LeftSidebar from "./components/LeftSideBar/LeftSidebar";
import { FaTh, FaBell } from "react-icons/fa";
import HeaderSwiper from "./components/Banner/Banner";
import FilmSection from "./components/FilmSection/FilmSection";
import Modal from "./components/Modal/Modal";
import { Movie } from "@/Types/Types";
import MovieCard from "@/components/MovieCard/MovieCard";
// Internal (Client)
import apiClient from "../../services/apiServices/apiServices";
// Component: Types
import { SwiperData } from "@/Types/Types";

const HomeMainView: React.FC = () => {
  const router = useRouter();
  const {  toggleDarkMode } = useDarkMode();
  const [videoId, setVideoId] = useState<string | null>(null);
  const isSidebarOpen : boolean = true
  // const handleLogoClick = () => {
  //   setIsSidebarOpen((prev) => !prev);
  // };

  // Custom Hook: Fetch videos for a specific movie
  const useFetchVideos = (movieId: string) => {
    return useQuery({
      queryKey: ["videos", movieId],
      queryFn: async () => {
        if (!movieId) return [];
        const response = await apiClient.get(
          `/movie/${movieId}/videos?language=en-US`
        );
        return response.data.results;
      },
      enabled: !!movieId, // Chỉ thực hiện query nếu movieId có giá trị
    });
  };

  const trendingMoviesQuery = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: async () => {
      console.time("Fetching Trending Movies");
      const response = await apiClient.get("/trending/all/day?language=en-US");
      console.timeEnd("Fetching Trending Movies");
      return response.data.results;
    },
  });

  const topRatedMoviesQuery = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: async () => {
      console.time("Fetching Top Rated Movies");
      const response = await apiClient.get(
        "/movie/top_rated?language=en-US&page=1"
      );
      console.timeEnd("Fetching Top Rated Movies");
      return response.data.results;
    },
  });

  const trendingTVQuery = useQuery({
    queryKey: ["trendingTV"],
    queryFn: async () => {
      console.time("Fetching Trending TV");
      const response = await apiClient.get("/trending/tv/day?language=en-US");
      console.timeEnd("Fetching Trending TV");
      return response.data.results;
    },
  });

  const topRatedTVQuery = useQuery({
    queryKey: ["topRatedTV"],
    queryFn: async () => {
      console.time("Fetching Top Rated TV");
      const response = await apiClient.get(
        "/tv/top_rated?language=en-US&page=1"
      );
      console.timeEnd("Fetching Top Rated TV");
      return response.data.results;
    },
  });

  const swipersData: SwiperData[] = [
    {
      title: "Trending Movies",
      data: trendingMoviesQuery.data || [],
      viewMoreLink: "/movie",
      media_type: "movie",
      isLoading: trendingMoviesQuery.isLoading,
    },
    {
      title: "Top Rated Movies",
      data: topRatedMoviesQuery.data || [],
      viewMoreLink: "/movie",
      media_type: "movie",
      isLoading: topRatedMoviesQuery.isLoading,
    },
    {
      title: "Top Trending TV",
      data: trendingTVQuery.data || [],
      viewMoreLink: "/tvseries",
      media_type: "tv",
      isLoading: trendingTVQuery.isLoading,
    },
    {
      title: "Top Rated TV",
      data: topRatedTVQuery.data || [],
      viewMoreLink: "/tvseries",
      media_type: "tv",
      isLoading: topRatedTVQuery.isLoading,
    },
  ];

  // Queries: Fetch videos when videoId is set using the custom hook
  const {
    data: videos = [],
    // isLoading: isVideosLoading,
    // error: videosError,
  } = useFetchVideos(videoId!);

  // Methods: Toggle modal
  const toggleModal = () => {
    setVideoId(null);
  };
  const handleWatchTrailer = (id: number) => {
    setVideoId(id.toString());
  };

  const handleWatchNow = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <main className="w-full h-screen flex flex-col">
      <div className="w-full h-screen flex relative">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content */}
        <section
          className={`flex-1 overflow-y-auto bg-mainLight dark:bg-mainDark transition-all duration-300 ${
            isSidebarOpen ? "ml-1/6" : "ml-0"
          }`}
        >
          {/* Header */}
          <header className="fixed top-0 z-10 h-[8%] bg-mainLight dark:bg-mainDark w-4/6 flex items-center justify-center p-4 pb-0 ">
            <div className="flex flex-1 flex-row justify-start w-4/5 px-[5%] gap-10">
              <span className="text-textLight dark:text-textDark text-2xl font-bold hover:text-mainRed dark:hover:text-mainRed transition-colors duration-200 ease-in-out">
                Home
              </span>
              <span className="left-sidebar-text font-bold hover:text-mainRed dark:hover:text-mainRed transition-colors duration-200 ease-in-out">
                Movies
              </span>
              <span className="left-sidebar-text font-bold hover:text-mainRed dark:hover:text-mainRed transition-colors duration-200 ease-in-out">
                TV Series
              </span>
            </div>

            <div className="h-[2px] bg-gray-400 w-[90%] mt-2 absolute bottom-0 left-1/2 transform -translate-x-1/2" />
          </header>

          {/* Main content */}
          <div className="w-5/6 px-[5%] flex flex-col pt-[5%]">
            <span className="global-text text-3xl font-bold my-10">
              Trending
            </span>
            <HeaderSwiper
              swipersData={swipersData}
              onWatchNow={handleWatchNow}
              onWatchTrailer={handleWatchTrailer}
            />
            <div className="h-10"></div>
            {/* Render swipers for movies */}
            <FilmSection
              title="Trending Movies"
              viewMoreLink="/movies"
              mediaType="movie"
              data={trendingMoviesQuery.data || []}
              isLoading={trendingMoviesQuery.isLoading}
            />

            {/* Top Rated Movies Section */}
            <FilmSection
              title="Top Rated Movies"
              viewMoreLink="/movies"
              mediaType="movie"
              data={topRatedMoviesQuery.data || []}
              isLoading={topRatedMoviesQuery.isLoading}
            />

            {/* Trending TV Section */}
            <FilmSection
              title="Top Trending TV"
              viewMoreLink="/tvseries"
              mediaType="tv"
              data={trendingTVQuery.data || []}
              isLoading={trendingTVQuery.isLoading}
            />

            {/* Top Rated TV Section */}
            <FilmSection
              title="Top Rated TV"
              viewMoreLink="/tvseries"
              mediaType="tv"
              data={topRatedTVQuery.data || []}
              isLoading={topRatedTVQuery.isLoading}
            />
          </div>
        </section>

        {/* Sidebar phải - ẩn trên thiết bị nhỏ */}
        <aside className="hidden lg:block w-1/6 bg-sidebarLight dark:bg-sidebarDark h-screen fixed right-0">
          <div className="flex flex-col h-full">
            <header className="h-[8%] w-full flex items-center justify-end px-10">
              <div className="flex items-center gap-4">
                <FaTh className="text-3xl text-textLight dark:text-textDark cursor-pointer hover:text-mainRed transition-colors duration-200 ease-in-out" />
                <FaBell className="text-3xl text-textLight dark:text-textDark cursor-pointer hover:text-mainRed transition-colors duration-200 ease-in-out" />
                <button
                  className="ml-auto px-4 py-2 rounded bg-gray-700 dark:bg-gray-200"
                  onClick={toggleDarkMode}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                    />
                  </svg>
                </button>
                <div className="h-10 w-10 ">
                  <Image src={Images.logo} alt="Logo" width={50} height={50} />
                </div>
              </div>
            </header>

            <div className="flex flex-1  pt-10 flex-col px-6">
              <span className="text-2xl font-bold mb-5 global-text">
                Top This Week
              </span>
              {
                    topRatedMoviesQuery.data?.slice(0, 3).map((Movie:Movie) => (
                      <MovieCard key={Movie.id} movie={Movie} />
                    ))
                  }

            </div>
          </div>
        </aside>
        {/* Component: Modal section for video */}
        <Modal videoKey={videos[0]?.key} onClose={toggleModal} />
      </div>
    </main>
  );
};

export default HomeMainView;
