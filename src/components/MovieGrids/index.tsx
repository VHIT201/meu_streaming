import React from 'react';
import FilmItem from "../../components/FilmItem";

interface MoviesGridProps {
  movies: Array<any>; // Replace `any` with the proper movie type
}

const MoviesGrid: React.FC<MoviesGridProps> = ({ movies }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16">
    {movies.map((movie) => (
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
);

export default MoviesGrid;
