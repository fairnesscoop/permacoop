import { browser } from "$app/environment";
import axios from "axios";
import Cookies from "js-cookie";
import config from "src/config";
export { AxiosError } from "axios";

const client = axios.create({
  baseURL: browser ? config.API_URL : config.API_URL_SSR,
});

const authorizationBearerHeader = (token = "") => {
  const bearer = token || Cookies.get("permacoop_token");
  const headers = bearer ? { Authorization: `Bearer ${bearer}` } : {};
  return {
    headers,
  };
};

export const post = (url: string, payload: any) => {
  return client.post(url, payload, authorizationBearerHeader());
};

export const put = (url: string, payload: any) => {
  return client.put(url, payload, authorizationBearerHeader());
};

export const del = (url: string) => {
  return client.delete(url, authorizationBearerHeader());
};

export const get = (url: string, payload: any, token: string) => {
  return client.get(url, { ...payload, ...authorizationBearerHeader(token) });
};
