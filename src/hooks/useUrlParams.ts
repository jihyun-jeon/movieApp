import { useLocation, useNavigate } from 'react-router-dom';

const useUrlParams = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const getSearchParam = (key: string) => queryParams.get(key);

  const updateSearchParams = (newParams: Record<string, string>) => {
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      } else {
        queryParams.delete(key);
      }
    });

    navigate({
      pathname,
      search: queryParams.toString(),
    });
  };

  return { getSearchParam, updateSearchParams };
};

export default useUrlParams;
