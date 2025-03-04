/* TMDB Images*/
export const getImageUrl = (path: string, size = 'original') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
