import { useQuery } from '@tanstack/react-query';
import apiClient from "../../services/apiServices/apiServices";

const useMovieDetailContainer = (id: string, mediaType: string) => {
  const { data: filmDetails = [], isLoading: isFilmDetailsLoading, error: filmDetailsError } = useQuery({
    queryKey: ['filmDetails', id], // Thêm id vào queryKey để tránh cache bị lỗi
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}?language=en-US`);
      return response.data; // Trả về response.data thay vì response.data.results
    },
  });

  const { data: videos = [], isLoading: isVideosLoading, error: videosError } = useQuery({
    queryKey: ['videos', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}/videos?language=en-US`);
      return response.data.results;
    },
  });

  const { data: similarFilms = [], isLoading: isSimilarFilmsLoading, error: similarFilmsError } = useQuery({
    queryKey: ['similarFilms', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}/similar?language=en-US&page=1`);
      return response.data.results;
    },
  });

  const { data: credits = [], isLoading: isCreditsLoading, error: creditsError } = useQuery({
    queryKey: ['credits', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}/credits?language=en-US`);
      return response.data; // Giả định bạn chỉ cần phần cast
    },
  });

  const loading = isFilmDetailsLoading || isVideosLoading || isSimilarFilmsLoading || isCreditsLoading;
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

export default useMovieDetailContainer;