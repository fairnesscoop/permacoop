/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, getByRole, queryAllByTestId, queryByRole } from "@testing-library/svelte";
import UsersIcon from "./icons/UsersIcon.svelte";
import Nav from "./Nav.svelte";

it("renders a navbar with brand link and no sections", () => {
  const page = render(Nav, { sections: [] });

  const nav = page.getByRole("navigation");

  const homeLink = getByRole(nav, "link", { name: "Permacoop" });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute("href", "/kit");

  expect(queryAllByTestId(nav, "nav-link")).toHaveLength(0);
});

it("renders the expected sections", () => {
  const sections: NavSection[] = [
    {
      type: "link",
      label: "Home",
      href: "/",
      icon: UsersIcon,
      isActive: false,
    },
    {
      type: "link",
      label: "Calendar",
      href: "/calendar",
      icon: UsersIcon,
      isActive: true,
    },
    {
      type: "group",
      label: "CRM",
      icon: UsersIcon,
      isOpen: true,
      links: [
        {
          label: "Projects",
          href: "/crm/projects",
          isActive: false,
        },
        {
          label: "Customers",
          href: "/crm/customers",
          isActive: false,
        },
      ],
    },
    {
      type: "group",
      label: "HR",
      icon: UsersIcon,
      isOpen: false, // Not open
      links: [
        {
          label: "Users",
          href: "/hr/users",
          isActive: false,
        },
      ],
    },
  ];

  const page = render(Nav, { sections });

  const nav = page.getByRole("navigation");

  expect(queryAllByTestId(nav, "nav-link")).toHaveLength(4);

  const homeLink = getByRole(nav, "link", { name: "Home" });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute("href", "/");

  const calendarLink = getByRole(nav, "link", { name: "Calendar" });
  expect(calendarLink).toBeInTheDocument();
  expect(calendarLink).toHaveAttribute("href", "/calendar");
  expect(calendarLink).toHaveAttribute("aria-current", "page");

  // Group titles are not links
  const crmLink = queryByRole(nav, "link", { name: "CRM" });
  expect(crmLink).not.toBeInTheDocument();

  const projectsLink = getByRole(nav, "link", { name: "Projects" });
  expect(projectsLink).toBeInTheDocument();
  expect(projectsLink).toHaveAttribute("href", "/crm/projects");

  const customersLink = getByRole(nav, "link", { name: "Customers" });
  expect(customersLink).toBeInTheDocument();
  expect(customersLink).toHaveAttribute("href", "/crm/customers");

  const usersLink = queryByRole(nav, "link", { name: "Users" });
  expect(usersLink).not.toBeInTheDocument();
});
