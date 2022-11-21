import Cookies from "js-cookie";
import { get, writable } from "svelte/store";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

const THEME_COOKIE = "permacoop_theme";

export const getThemeCookie = (
  cookieStore: { get: (v: string) => string | undefined } = Cookies
): Theme | null => {
  return (cookieStore.get(THEME_COOKIE) as Theme | undefined) || null;
};

export const theme = writable(getThemeCookie(Cookies));

export const toggleTheme = () => {
  const newTheme = get(theme) === Theme.DARK ? Theme.LIGHT : Theme.DARK;
  Cookies.set(THEME_COOKIE, newTheme.toString());
  theme.set(newTheme);
};
