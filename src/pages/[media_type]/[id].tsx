// pages/[media_type]/[id].tsx

import { useRouter } from 'next/router';
import MovieDetailMainView from '../MovieDetail/MovieDetailMainView';

const MovieDetailPage = () => {
  const router = useRouter();

  if (router.isFallback || !router.isReady) {
    return <p>Loading...</p>;
  }

  return (
    <MovieDetailMainView />
  );
};

export default MovieDetailPage;
