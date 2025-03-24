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

  /** 문자열 타입의 URL 쿼리 파라미터를 상태처럼 사용하는 훅 */
  const useStringQueryState = (key: string, defaultValue: string = '') => {
    const currentValue = getSearchParam(key) || defaultValue; // 쿼리 파라미터 조회(문자로)

    const setValue = (newValue: string) => {
      updateSearchParams({ [key]: newValue });
    };

    return [currentValue, setValue] as const;
  };

  /** 숫자 타입의 URL 쿼리 파라미터를 상태처럼 사용하는 훅 */
  const useNumberQueryState = (key: string, defaultValue: number = 0) => {
    const paramValue = getSearchParam(key);
    const currentValue = paramValue ? Number(paramValue) : defaultValue; // 쿼리 파라미터 조회(숫자로)

    const setValue = (newValue: number) => {
      updateSearchParams({ [key]: String(newValue) });
    };

    return [currentValue, setValue] as const;
  };

  return {
    useStringQueryState,
    useNumberQueryState,
  };
};

export default useUrlParams;
