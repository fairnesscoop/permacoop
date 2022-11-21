import i18n from "sveltekit-i18n";
import type { Config } from "sveltekit-i18n";

const config: Config = {
  loaders: [
    {
      locale: "fr",
      key: "",
      loader: async () => {
        return (await import("./fr.json")).default;
      },
    },
  ],
};

export const {
  t: _,
  locale,
  locales,
  loading,
  addTranslations,
  loadTranslations,
} = new i18n(config);
