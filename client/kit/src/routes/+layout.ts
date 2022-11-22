import "../app.css";

import type { LayoutLoad } from "./$types";
import { locale, loadTranslations } from "src/lib/i18n";

export const load: LayoutLoad = async ({ url, data }) => {
  console.log("layout.ts:load");

  const { pathname } = url;

  const defaultLocale = "fr";
  const initLocale = locale.get() || defaultLocale;
  await loadTranslations(initLocale, pathname);

  return {
    user: data.user,
    theme: data.theme,
  };
};
