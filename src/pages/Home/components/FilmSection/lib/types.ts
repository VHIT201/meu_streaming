//Core
import { Movie } from "../../../../../Types/Types"; 

// Types
export default interface FilmSectionProps {
    title: string;
    viewMoreLink: string;
    mediaType: string;
    data: Movie[];  // Cần chỉnh lại cho đúng với kiểu dữ liệu của API
    isLoading: boolean; // Thêm isLoading
  }
  