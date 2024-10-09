// FilmSection.tsx

// Core
import React from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; 
import FilmItem from '../../../../components/FilmItem'; 
import Spinner from '../../../../components/Spinner/Spinner';

import { FilmSectionProps } from './lib/types';
// Component: FilmSection
const FilmSection: React.FC<FilmSectionProps> = ({
  title, 
  viewMoreLink, 
  mediaType, 
  data, 
  isLoading,
}) => {

  return (
    <div className="bg-black-main w-full px-10 md:px-8 py-6 md:py-0 border-0"> {/* Component: Wrapper */}
      <div className="max-w-screen-2xl mx-auto mb-8"> {/* Component: Container */}
        <div className="flex items-center justify-between"> {/* Component: Header */}
          <span className="text-white font-medium text-lg md:text-2xl">
            {title} {/* Hiển thị tiêu đề ngay cả khi đang tải */}
          </span>
          <a className="btn-sm btn-default" href={viewMoreLink}> {/* Component: Link */}
            Xem thêm
          </a>
        </div>
        <div className="max-w-screen-2xl mx-auto mt-8"> {/* Component: Swiper Container */}
          {isLoading ? ( // Kiểm tra nếu đang tải
            <div className='py-20 '>
              <Spinner /> {/* Hiển thị Spinner khi đang tải */}
            </div>
          ) : data.length === 0 ? (
            <p className="text-white">Không có dữ liệu</p> // Hiển thị khi không có dữ liệu
          ) : (
            <Swiper
              modules={[Autoplay, Pagination, Navigation]} 
              spaceBetween={20} 
              loop={true} 
              autoplay={{ delay: 2500, disableOnInteraction: false }} 
              slidesPerView={2} 
              breakpoints={{ 
                640: { slidesPerView: 2 }, 
                768: { slidesPerView: 4 }, 
                1024: { slidesPerView: 6 }, 
              }}
              className="w-full" 
            >
              {data.map((movie) => ( 
                <SwiperSlide key={movie.id}> {/* Component: Slide */}
                  <FilmItem
                    id={movie.id} // Core
                    original_title={movie.original_title} 
                    original_name={movie.original_name} 
                    name={movie.name} 
                    poster_path={movie.poster_path} 
                    media_type={mediaType} 
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmSection;
