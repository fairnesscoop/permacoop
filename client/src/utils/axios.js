import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../../config';

const client = axios.create({
  baseURL: process.browser ? config.API_URL : config.API_URL_SSR,
});

const authorizationBearerHeader = (token) => {
  const bearer = token || Cookies.get('permacoop_token');
  const headers = bearer ? { Authorization: `Bearer ${bearer}` } : {};
  return {
    headers,
  };
};

export const post = (url, payload) => {
  return client.post(url, payload, authorizationBearerHeader());
};

export const put = (url, payload) => {
  return client.put(url, payload, authorizationBearerHeader());
};

export const del = (url) => {
  return client.delete(url, authorizationBearerHeader());
};

export const get = (url, payload, token) => {
  return client.get(url, { ...payload, ...authorizationBearerHeader(token) });
};
