// Core
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/router';

// App
import HeaderSwiper from "./components/Banner/Banner";
import FilmSection from "./components/FilmSection/FilmSection";
import Modal from "./components/Modal/Modal";

// Internal (Client)
import apiClient from "../../services/apiServices/apiServices";

// Component: Types
import { SwiperData } from "@/Types/Types";

// Component: Spinner
import Spinner from "../../components/Spinner/Spinner";

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

// App: Main view component
const HomeMainView: React.FC = () => {

  const router = useRouter(); // Khởi tạo router
  // States: Modal open/close state and video ID state
  const [videoId, setVideoId] = useState<string | null>(null);

  // Queries: Fetching data from the API using useQuery
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

  // Prepare swipersData with loading state checks
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
    error: videosError,
  } = useFetchVideos(videoId!);

  // Methods: Toggle modal
  const toggleModal = () => {
    setVideoId(null);
  };

  // Methods: Handle trailer watch button click
  const handleWatchTrailer = (id: number) => {
    setVideoId(id.toString()); // Set the video ID when the button is clicked
  };

  // Methods: Handle movie navigation
  const handleWatchNow = (id: number) => {
    router.push(`/movie/${id}`); // Chuyển đến trang chi tiết với id
  };

  // UI: Loading or error states
  const loading =
    trendingMoviesQuery.isLoading ||
    topRatedMoviesQuery.isLoading ||
    trendingTVQuery.isLoading ||
    topRatedTVQuery.isLoading;

  if (loading) {
    return (
      <div className="h-[70vh] bg-black flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (videosError) {
    return <div>Error occurred</div>;
  }

  return (
    <main className="w-full flex flex-col items-center justify-start gap">
      {/* Component: Header Swiper */}
      <HeaderSwiper
        swipersData={swipersData}
        onWatchNow={handleWatchNow} // Pass down the function
        onWatchTrailer={handleWatchTrailer} // Pass down the function
      />

      {/* Component: Render swipers for movies */}
      <FilmSection
        title="Trending Movies"
        viewMoreLink="/movie"
        mediaType="movie"
        data={trendingMoviesQuery.data || []} // Truyền dữ liệu hoặc mảng rỗng
        isLoading={trendingMoviesQuery.isLoading} // Truyền trạng thái isLoading
      />

      {/* Top Rated Movies Section */}
      <FilmSection
        title="Top Rated Movies"
        viewMoreLink="/movie"
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

      {/* Component: Modal section for video */}
      <Modal videoKey={videos[0]?.key} onClose={toggleModal} />
    </main>
  );
};

export default HomeMainView;
