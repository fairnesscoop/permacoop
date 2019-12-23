import {useLocation} from 'react-router';

export const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};
