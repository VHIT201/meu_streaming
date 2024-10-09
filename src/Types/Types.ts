export interface Movie {
    adult?: boolean; 
    backdrop_path?: string;  
    first_air_date?: Date;  
    genre_ids?: number[]; 
    original_title?: string;
    id: number; 
    name?: string;
    media_type?: string;   
    origin_country?: string[];
    original_language?:string;
    original_name?: string | null | undefined; 
    overview?: string;  
    popularity?: number;             
    poster_path: string | null | undefined;
    vote_average?:number;
    vote_count?: number      
  }

  


  // FilmDetails.ts
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface FilmDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | any; 
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string; 
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}




export interface SimilarFilm {
  adult: boolean;
  backdrop_path: string | null; // can be null if no image
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null; // can be null if no image
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
  original_name : string
}


export interface Cast {
  adult: boolean;
  gender: number; // 0: not specified, 1: female, 2: male
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null; // can be null if no image
  cast_id: number;
  character: string;
  credit_id: string;
  order: number; // order in the cast list
}

export interface Crew {
  adult: boolean;
  gender: number; // 0: not specified, 1: female, 2: male
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null; // can be null if no image
  credit_id: string;
  department: string; // department of the crew member
  job: string; // job title of the crew member
}


export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}


