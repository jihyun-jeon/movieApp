import { useGetFavorite, useDeleteComment, FavoriteQuery } from '@/api/favorite';
import PosterImage from '@/components/PosterImage';
import { useAuth } from '@/context/AuthContext';
import { useQueryClient } from '@tanstack/react-query';

const Favorite = () => {
  const favorites = useGetFavorite();
  const deleteCommnet = useDeleteComment();

  const getUser = useAuth();
  const userId = getUser.session?.user.id;

  const queryClient = useQueryClient();

  const onFavoriteDelete = (movieId: number | null) => {
    if (!userId || !movieId) {
      console.log('userId or movieId undefined!');
      return;
    }
    const deleteData = {
      userId: userId,
      movieId: movieId,
    };
    deleteCommnet.mutate(deleteData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: FavoriteQuery.all });
      },
      onError: (error) => {
        console.error('error', error);
      },
    });
  };

  return (
    <div>
      Favorite
      <ul className="flex">
        {favorites.data?.data?.map((favorite) => {
          return (
            <li key={favorite.id}>
              {favorite.title}
              <div className="w-40" onClick={() => onFavoriteDelete(favorite.movie_id)}>
                <PosterImage posterPath={favorite.img_url} size={'w500'} />
                {/* [TODO] 이미지 사이즈 상수로 관리 */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Favorite;
