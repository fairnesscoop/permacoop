import { goto } from "$app/navigation";

// This helper exists to mark places where we intend to redirect
// to a page that we know is still managed by Sapper.
// We will see a 404 error in the web console, because SvelteKit will try
// to match a route, fail, and then let the browser take over, which will
// let Sapper respond.
export const gotoSapper = async (path: string): Promise<void> => {
  await goto(path);
};
