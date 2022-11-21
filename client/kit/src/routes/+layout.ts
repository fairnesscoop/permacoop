import "../app.css";

import { browser } from "$app/environment";
import type { LayoutLoad } from "./$types";
import { locale, loadTranslations } from "src/lib/i18n";
import { useLocalStorage, settings } from "src/lib/stores";

export const load: LayoutLoad = async ({ url }) => {
  if (browser) {
    useLocalStorage("permacoop:settings", settings);
  }

  const { pathname } = url;

  const defaultLocale = "fr";
  const initLocale = locale.get() || defaultLocale;
  await loadTranslations(initLocale, pathname);

  return {};
};
