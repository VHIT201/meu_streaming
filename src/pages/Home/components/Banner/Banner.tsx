// Core: Import necessary libraries and types
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import FilmSlide from "../../../../components/FilmSlide";
import Config from "../../../../configuration";

import { HeaderSwiperProps } from "@/Types/Types";
// Component Props

const HeaderSwiper: React.FC<HeaderSwiperProps> = ({ swipersData, onWatchNow, onWatchTrailer }) => {
  if (!swipersData || !swipersData[0]?.data) {
    return <div>Loading...</div>; 
  }
  return (
    <Swiper
    style={{borderRadius:20, overflow:"hidden"}}
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
      {swipersData[0].data.slice(0, 4).map((movie) => (
        <SwiperSlide key={movie.id}>
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
