import i18n from "sveltekit-i18n";
import type { Config } from "sveltekit-i18n";

type Payload = {
  firstName: string;
  lastName: string;
};

const config: Config<Payload> = {
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
