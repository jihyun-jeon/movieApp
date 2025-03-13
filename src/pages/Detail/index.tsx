import { useParams } from 'react-router-dom';

export default function Detail() {
  const { movieId } = useParams();

  return <div>Detail {movieId}</div>;
}
