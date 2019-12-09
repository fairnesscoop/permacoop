import axios, {AxiosInstance} from 'axios';
import {TokenStorage} from './tokenStorage';
import {logout} from '../modules/auth/actions/authentication';

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const axiosMiddleware = (axios: AxiosInstance) => ({dispatch}: any) => {
  axios.interceptors.request.use((config: any) => {
    if ('login' !== config.url) {
      config.headers.Authorization = `Bearer ${TokenStorage.get()}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      const {responseURL} = error.request;

      if (
        401 === error.response.status &&
        -1 === responseURL.indexOf('login')
      ) {
        return dispatch(logout());
      }

      return Promise.reject(error);
    }
  );

  return (next: any) => (action: any) => next(action);
};
