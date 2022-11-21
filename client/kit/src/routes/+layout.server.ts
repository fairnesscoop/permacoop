import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    user: event.locals.user,
    theme: event.locals.theme,
  };
};
