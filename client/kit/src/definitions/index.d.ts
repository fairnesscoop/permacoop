interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  scope: string;
}

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

type NavSection = LinkNavSection | GroupNavSection;
