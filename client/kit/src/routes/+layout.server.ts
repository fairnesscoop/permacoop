import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  // Ensure this load function re-runs when the user logs in or out.
  // https://kit.svelte.dev/docs/load#rerunning-load-functions-manual-invalidation
  event.depends("auth:changed");

  return {
    user: event.locals.user,
    theme: event.locals.theme,
  };
};
