import { useNavigate } from 'react-router-dom';

const usePathParams = () => {
  const navigate = useNavigate();

  const updatePathParam = (path: string, pathParams: string | number) => {
    navigate(`${path}/${pathParams}`);
  };
  return { updatePathParam };
};

export default usePathParams;
