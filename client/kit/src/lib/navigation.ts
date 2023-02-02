import { goto } from "$app/navigation";
import type { SvelteComponent } from "svelte";

// This helper exists to mark places where we intend to redirect
// to a page that we know is still managed by Sapper.
// We will see a 404 error in the web console, because SvelteKit will try
// to match a route, fail, and then let the browser take over, which will
// let Sapper respond.
export const gotoSapper = async (path: string): Promise<void> => {
  await goto(path);
};

interface LinkNavSection {
  type: "link";
  label: string;
  href: string;
  icon: typeof SvelteComponent;
  isActive: boolean;
}

interface GroupNavSection {
  type: "group";
  label: string;
  icon: typeof SvelteComponent;
  isOpen: boolean;
  links?: { label: string; href: string; isActive: boolean }[];
}

export type NavSection = LinkNavSection | GroupNavSection;
