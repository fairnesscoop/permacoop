import "../app.css";

import type { LayoutLoad } from "./$types";
import { locale, loadTranslations } from "src/lib/i18n";

export const load: LayoutLoad = async ({ url, data }) => {
  const { pathname } = url;

  const defaultLocale = "fr";
  const initLocale = locale.get() || defaultLocale;
  await loadTranslations(initLocale, pathname);

  return data;
};
