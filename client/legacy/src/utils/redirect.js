// This helper exists to mark places where we move to a page
// managed by SvelteKit.
export const redirectKit = (redirect, path) => {
  return redirect(302, path);
}
