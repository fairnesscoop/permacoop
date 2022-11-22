import { _ } from "src/lib/i18n";
import type { AxiosError } from "$lib/axios";

export const errorNormalizer = (e: AxiosError<any>): string[] => {
  if (!e.response) {
    // eslint-disable-next-line no-console
    console.error("Non standard error", e);
    return [_.get("error_generic")];
  }

  const message = e.response.data.message || "";

  if (Array.isArray(message)) {
    return message;
  }

  return [message];
};
