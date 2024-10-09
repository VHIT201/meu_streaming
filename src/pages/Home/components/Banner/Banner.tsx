// Core: Import necessary libraries and types
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import FilmSlide from "../../../../components/FilmSlide";
import { SwiperData } from "@/Types/Types";
import Config from "../../../../configuration";

// Component Props
interface HeaderSwiperProps {
  swipersData: SwiperData[];
  onWatchNow: (id: number) => void;
  onWatchTrailer: (id: number) => void;
}

const HeaderSwiper: React.FC<HeaderSwiperProps> = ({ swipersData, onWatchNow, onWatchTrailer }) => {
  return (
    <Swiper
      loop
      autoplay={{ delay: 3000, disableOnInteraction: true }}
      className="w-full mb-0 p-0"
      onSlideChange={() => {
        // Effects: Reset animation on slide change
        document
          .querySelectorAll(".animate-fallDown, .animate-scaleUp")
          .forEach((element) => {
            element.classList.remove("animate-fallDown", "animate-scaleUp");
            setTimeout(() => {
              element.classList.add("animate-fallDown", "animate-scaleUp");
            }, 0);
          });
      }}
    >
      {swipersData[0].data.slice(0, 4).map((movie, index) => (
        <SwiperSlide key={index}>
          <FilmSlide
            id={movie.id}
            title={movie.original_title}
            description={movie.overview}
            backgroundImage={
              "https://image.tmdb.org/t/p/original/" + movie.backdrop_path
            }
            posterImage={Config.imgPath + movie.poster_path}
            onWatchNow={() => onWatchNow(movie.id)} // Pass the navigation function
            onWatchTrailer={() => onWatchTrailer(movie.id)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeaderSwiper;
