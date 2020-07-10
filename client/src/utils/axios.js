import axios from 'axios';

const client = axios.create({
  baseURL: '/api'
});

const header = token => {
  if (!token) {
    return;
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const post = (url, payload, token) => {
  return client.post(url, payload, header(token));
};

export const put = (url, payload, token) => {
  return client.put(url, payload, header(token));
};

export const del = (url, token) => {
  return client.delete(url, header(token));
};

export const get = (url, payload, token) => {
  return client.get(url, { ...payload, ...header(token) });
};
