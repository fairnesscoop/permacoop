interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  scope: string;
}

interface LinkNavSection {
  type?: "link";
  label: string;
  href: string;
  icon: typeof SvelteComponent;
  isActive: boolean;
}

interface LinkListNavSection {
  type: "list";
  label: string;
  icon: typeof SvelteComponent;
  isActive: boolean;
  isOpen: boolean;
  subSections?: { label: string; href: string }[];
}

type NavSection = LinkNavSection | LinkListNavSection;
