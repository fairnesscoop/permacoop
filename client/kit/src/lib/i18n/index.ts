import i18n from "@sveltekit-i18n/base";
import parser from "@sveltekit-i18n/parser-icu";
import type { Config } from "@sveltekit-i18n/parser-icu";

interface Payload {
  firstName?: string;
  lastName?: string;
  count?: number;
}

const config: Config<Payload> = {
  parser: parser(),

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
