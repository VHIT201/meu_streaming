// Core: Contains the core components like libraries, routing, and common configuration.
import React, { useState, useEffect } from "react";
import apiClient from '../../services/apiServices/apiServices';
import { useInfiniteQuery } from '@tanstack/react-query';
import Spinner from "../../components/Spinner/Spinner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// Component: UI components to display data.
import FilmItem from "../../components/FilmItem";
import { useRouter } from 'next/router'; // Sử dụng useRouter từ next/router

export const MoviesMainView: React.FC = () => {
  // States: Manage internal component states like keywords for searching.
  const [keyword, setKeyword] = useState<string>(''); 
  const router = useRouter(); // Khởi tạo useRouter

  // Get the search term from the URL query parameters
  const searchTerm = router.query.keyword as string || ''; // Lấy từ query parameters

  // Sync the search term with the input keyword.
  useEffect(() => {
    setKeyword(searchTerm);
  }, [searchTerm]);

  // Client: Function to fetch popular films.
  const fetchPopularFilm = async ({ pageParam = 1 }) => {
    const response = await apiClient.get(`movie/popular?language=en-US&page=${pageParam}`);
    return {
      results: response.data.results,
      nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
    };
  };

  // Queries: Fetch popular movies data using `useInfiniteQuery` for infinite scrolling.
  const {
    data: popularMoviesData,
    fetchNextPage,
    hasNextPage: hasNextPagePopular,
    isFetching,
    isFetchingNextPage,
    isLoading, // Indicates if the initial loading is happening
  } = useInfiniteQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularFilm,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: searchTerm === '', // Only fetch when search term is empty
  });

  const movies = popularMoviesData?.pages.flatMap(page => page.results) || [];

  // Client: Function to fetch movies based on the search keyword.
  const fetchMoviesByKeyword = async ({ pageParam = 1 }) => {
    const response = await apiClient.get(`search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${pageParam}`);
    return {
      results: response.data.results,
      nextPage: response.data.page < response.data.total_pages ? response.data.page + 1 : undefined,
    };
  };

  // Queries: Fetch search results using `useInfiniteQuery` when a search term is provided.
  const {
    data: searchResultsData,
    fetchNextPage: fetchNextPageSearch,
    hasNextPage: hasNextPageSearch,
    refetch: refetchSearch,
    isLoading: isLoadingSearch,
  } = useInfiniteQuery({
    queryKey: ['searchMovies', searchTerm],
    queryFn: fetchMoviesByKeyword,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: searchTerm.trim() !== '', // Only fetch when search term is not empty
    initialPageParam: 1,
  });

  const searchResults = searchResultsData?.pages.flatMap(page => page.results) || [];

  // Methods: Determine what movies to display based on search term.
  const moviesToDisplay = searchTerm.trim() ? searchResults : movies;

  // Methods: Load more movies depending on whether searching or showing popular movies.
  const handleLoadMore = () => {
    if (searchTerm.trim()) {
      fetchNextPageSearch(); // Load more search results
    } else {
      fetchNextPage(); // Load more popular movies
    }
  };

  // Methods: Handle the search form submission.
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/movies/?keyword=${keyword}`); // Cập nhật URL với keyword
      refetchSearch(); // Fetch search results
    }
  };

  // Methods: Handle keyword input changes.
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value); // Update local keyword state
    // Cập nhật URL nếu input không rỗng
    if (e.target.value.trim() === "") {
      router.push('/?keyword='); // Nếu không có keyword, xóa keyword khỏi URL
    }
  };

  return (
    <main className="w-full flex flex-col items-center justify-start">
      <Header/>
      {/* App: Layout structure for the main view */}
      <div className="relative w-full h-48 bg-gradient-to-b from-white to-black">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 text-white text-4xl font-bold z-10">
          Movies
        </span>
      </div>
      <div className="bg-black-main w-full px-4 md:px-8 py-8 xl:p-16">
        <div className="max-w-screen-2xl mx-auto">
          {/* Component: Search form */}
          <form
            className="flex items-center relative rounded-full bg-black w-full md:w-fit lg:w-fit"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Enter keyword"
              name="keyword"
              value={keyword}
              onChange={handleKeywordChange}
              className="outline-none border-none rounded-full px-6 py-2 bg-black placeholder-gray-500 text-white flex-1 md:flex-auto md:w-96"
            />
            <button
              type="submit"
              className="btn-primary py-2 px-8 text-white rounded-full"
            >
              Search
            </button>
          </form>

          {/* Component: Conditional content display */}
          {moviesToDisplay.length === 0 && (isLoading || isFetching || isLoadingSearch) ? (
            <div className="flex flex-row items-center justify-center text-center text-white h-[50vh] gap-10">
              <Spinner />
              <p className="text-xl md:text-2xl text-opacity-50">Loading...</p>
            </div>
          ) : moviesToDisplay.length === 0 && !isFetching ? (
            <div className="flex items-center justify-center text-center h-[50vh]">
              <p className="text-xl md:text-2xl text-white text-opacity-50">No results</p>
            </div>
          ) : (
            <>
              {/* Component: Movie list grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
                {moviesToDisplay.map((movie) => (
                  <FilmItem
                    key={movie.id}
                    id={movie.id}
                    original_title={movie.original_title}
                    original_name={movie.original_name}
                    name={movie.name}
                    media_type="movie"
                    poster_path={movie.poster_path}
                    className="w-full"
                  />
                ))}
              </div>

              {/* Component: Load more button */}
              <div className="text-center mt-8">
                {(isFetching || isFetchingNextPage) ? (
                  <div className="h-[20vh] flex justify-center items-center flex-row gap-5">
                    <Spinner />
                  </div>
                ) : (
                  (searchTerm.trim() ? hasNextPageSearch : hasNextPagePopular) ? (
                    <button
                      onClick={handleLoadMore}
                      className="btn-sm btn-default"
                    >
                      Watch more
                    </button>
                  ) : (
                    <div>
                      {/* No more results */}
                      <p className="text-xl text-white">No more results</p>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer/>
    </main>
  );
};

export default MoviesMainView;
