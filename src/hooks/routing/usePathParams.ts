import { useNavigate, useParams } from 'react-router-dom';

const usePathParams = () => {
  const navigate = useNavigate();
  const params = useParams();

  /** 경로와 패스파라미터 업데이트 */
  const updatePathParam = (path: string, pathParams: string | number) => {
    navigate(`${path}/${pathParams}`);
  };

  /** 문자열 타입의 패스 파라미터를 상태처럼 사용하는 훅 */
  const useStringPathState = (paramName: string, defaultValue: string = '') => {
    const currentValue = (params[paramName] as unknown as string) || defaultValue; // 패스파라미터 조회(문자로)

    const setValue = (newValue: string) => {
      const newPath = window.location.pathname.replace(new RegExp(`/${params[paramName]}(?=/|$)`), `/${newValue}`);
      navigate(newPath);
    };

    return [currentValue, setValue] as const;
  };

  /** 숫자 타입의 패스 파라미터를 상태처럼 사용하는 훅 */
  const useNumberPathState = (paramName: string, defaultValue: number = 0) => {
    const paramValue = params[paramName];
    const currentValue = paramValue ? Number(paramValue) : defaultValue; // 패스파라미터 조회(숫자로)

    const setValue = (newValue: number) => {
      const newPath = window.location.pathname.replace(new RegExp(`/${params[paramName]}(?=/|$)`), `/${newValue}`);
      navigate(newPath);
    };

    return [currentValue, setValue] as const;
  };

  return {
    updatePathParam,
    useStringPathState,
    useNumberPathState,
  };
};

export default usePathParams;
