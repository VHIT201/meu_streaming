// components/MovieCard.tsx
import React from "react";
import Image from "next/image";
import { Images } from "@/app/assets/images"; // Adjust the import based on your project structure
import { Movie } from "@/Types/Types"; // Ensure this type has the properties you need
interface MovieCardProps {
  movie: Movie; // Accept a movie object
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { id, original_title, name, original_name, genre_ids, vote_average, poster_path} = movie; // Destructure properties from the movie object
  const title = original_title ?? name ?? original_name;

  return (
    <div className="flex w-full justify-start items-center text-left gap-4 group  mb-4">
      <Image src={'https://image.tmdb.org/t/p/w500/' + poster_path} alt="Logo" width={70} height={60} className="rounded-lg"/>
      <div className="flex flex-col justify-evenly items-start h-full">
        <span className="global-text font-bold text-xl group-hover:text-mainRed">
          {title}
        </span>
        <span className="global-text group-hover:text-mainRed">
          {genre_ids}
        </span>
        {vote_average !== undefined && ( // Check explicitly if rating is not undefined
          <span className="global-text font-bold text-xl">
            ⭐ {vote_average}
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
