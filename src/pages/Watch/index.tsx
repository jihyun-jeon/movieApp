import usePathParams from '@/hooks/usePathParams';
import useUrlParams from '@/hooks/useUrlParams';
import { X } from 'lucide-react';

const Watch = () => {
  const { useNumberPathState, updatePathParam } = usePathParams();
  const { useStringQueryState } = useUrlParams();

  const [movieId, setMovieId] = useNumberPathState('movieId');
  const [videoId, setVideoId] = useStringQueryState('play');

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black px-6">
      <div className="h-12 bg-black flex items-end">
        <button type="button" onClick={() => updatePathParam('/movie', movieId)}>
          <X className="w-7 h-7 text-gray-100" />
        </button>
      </div>
      {videoId && (
        <iframe
          width="100%"
          style={{ height: 'calc(100% - 70px)' }}
          src={`https://www.youtube.com/embed/${videoId}`}
          className="border-0 "
          allowFullScreen
        ></iframe>
      )}
      <div className="h-5"></div>
    </div>
  );
};

export default Watch;
