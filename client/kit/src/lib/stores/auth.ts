import Cookies from "js-cookie";
import { post } from "$lib/axios";
import { writable } from "svelte/store";

export const user = writable<User | null>();

const TOKEN_COOKIE = "permacoop_token";

export const getTokenCookie = (
  cookieStore: { get: (v: string) => string | undefined } = Cookies
) => {
  return cookieStore.get(TOKEN_COOKIE);
};

export const login = async (email: string, password: string) => {
  const {
    data: { apiToken },
  } = await post("login", { email, password });

  Cookies.set(TOKEN_COOKIE, apiToken, {
    expires: 365,
    secure: process.env.NODE_ENV === "production",
  });
};

export const logout = () => {
  Cookies.remove("permacoop_token");
};
