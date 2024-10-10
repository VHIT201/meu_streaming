// components/FilmSlide.tsx
import React from 'react';
import Image from 'next/image'; 

interface FilmSlideProps {
  id?: number;
  title: string | undefined;
  description: string | undefined;
  backgroundImage?: string;
  posterImage?: string | undefined;
  onWatchNow: () => void;
  onWatchTrailer?: () => void;
}

const FilmSlide: React.FC<FilmSlideProps> = ({
  title,
  description,
  backgroundImage,
  posterImage,
  onWatchNow,
  onWatchTrailer,
}) => {
  return (
    <div className="swiper-slide" style={{ width: '100%' }}>
      <div
        className="relative h-auto md:h-[20rem] lg:h-[30rem] px-4 md:px-12 object-cover py-12 md:py-32 flex justify-center bg-center bg-no-repeat before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-black/60 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-28 after:bg-gradient-to-t after:from-black-main after:to-transparent"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'crisp-edges',
        }}
      >
        <div className="w-full  z-10 h-full flex items-center justify-between">
          <div className="w-full lg:w-2/3 px-4 flex flex-col items-start justify-between">
            <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl text-white animate-fallDown">
              {title}
            </h2>
            <p className="font-medium text-white text-xs md:text-xl my-4 text-left animate-fallDown">
              {description}
            </p>
            <div className="flex text-white animate-fallDown mt-4">
              <button className="btn-lg btn-primary mr-4" onClick={onWatchNow}>
                Watch now
              </button>
              <button className="btn-lg btn-default" onClick={onWatchTrailer}>
                Watch trailer
              </button>
            </div>
          </div>
          <div className="hidden px-4 lg:block lg:w-1/3 animate-scaleUp">
            {posterImage && (
              <Image
                className="rounded-3xl animate-scale h-full object-cover"
                src={posterImage} // Use the Next.js Image component
                alt="Poster"
                width={200} // width of 96 rem (in pixels)
                height={576} // appropriate height for your image
                quality={75} // Set image quality for optimization
                priority // This can optimize loading for important images
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmSlide;
