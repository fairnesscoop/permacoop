import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  event.depends("auth:login");

  return {
    user: event.locals.user,
    theme: event.locals.theme,
  };
};
