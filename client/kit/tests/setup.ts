import { loadTranslations } from "$lib/i18n";

beforeAll(async () => {
  await loadTranslations("fr");
});
