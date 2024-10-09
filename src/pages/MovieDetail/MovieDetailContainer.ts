import { useQuery } from '@tanstack/react-query';
import apiClient from "../../services/apiServices/apiServices";

const useMovieDetailContainer = (id: string, mediaType: string) => {
  // Truy vấn chi tiết phim
  const { data: filmDetails, isLoading: isFilmDetailsLoading, error: filmDetailsError } = useQuery({
    queryKey: ['filmDetails', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}?language=en-US`);
      return response.data; // Trả về response.data thay vì response.data.results
    },
    // Optional: add staleTime or cacheTime if needed
  });

  // Truy vấn video
  const { data: videos = [], isLoading: isVideosLoading, error: videosError } = useQuery({
    queryKey: ['videos', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}/videos?language=en-US`);
      return response.data.results || []; // Đảm bảo trả về mảng rỗng nếu không có kết quả
    },
  });

  // Truy vấn phim tương tự
  const { data: similarFilms = [], isLoading: isSimilarFilmsLoading, error: similarFilmsError } = useQuery({
    queryKey: ['similarFilms', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}/similar?language=en-US&page=1`);
      return response.data.results || []; // Đảm bảo trả về mảng rỗng nếu không có kết quả
    },
  });

  // Truy vấn diễn viên
  const { data: credits = [], isLoading: isCreditsLoading, error: creditsError } = useQuery({
    queryKey: ['credits', id],
    queryFn: async () => {
      const response = await apiClient.get(`${mediaType}/${id}/credits?language=en-US`);
      return response.data.cast || []; // Giả định bạn chỉ cần phần cast
    },
  });

  // Kiểm tra trạng thái loading
  const loading = isFilmDetailsLoading || isVideosLoading || isSimilarFilmsLoading || isCreditsLoading;
  // Xử lý lỗi: Trả về một mảng lỗi để xử lý dễ hơn nếu cần
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
