import axios from 'axios';
import {goto} from '@sapper/app';
import {TokenStorage} from './tokenStorage';

export const client = axios.create({
  baseURL: '/api'
});

client.interceptors.request.use((conf) => {
  if ('login' !== conf.url) {
    conf.headers.Authorization = `Bearer ${TokenStorage.get()}`;
  }

  return conf;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const {responseURL} = error.request;

    if (401 === error.response.status && -1 === responseURL.indexOf('login')) {
      return goto('/login');
    }

    return Promise.reject(error);
  }
);
