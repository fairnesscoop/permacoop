/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, getByRole, queryAllByTestId, queryByRole } from "@testing-library/svelte";
import Nav from "./Nav.svelte";

it("renders the expected sections", () => {
  const page = render(Nav);

  const nav = page.getByRole("navigation");

  expect(queryAllByTestId(nav, "nav-link")).toHaveLength(4);

  const homeLink = getByRole(nav, "link", { name: "Home" });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute("href", "/");
  expect(homeLink).toHaveAttribute("aria-current", "page");

  const calendarLink = getByRole(nav, "link", { name: "Calendar" });
  expect(calendarLink).toBeInTheDocument();
  expect(calendarLink).toHaveAttribute("href", "/calendar");
  expect(calendarLink).toHaveAttribute("aria-current", "page");

  // Group titles are not links
  const crmLink = queryByRole(nav, "link", { name: "CRM" });
  expect(crmLink).not.toBeInTheDocument();

  const projectsLink = getByRole(nav, "link", { name: "Projets" });
  expect(projectsLink).toBeInTheDocument();
  expect(projectsLink).toHaveAttribute("href", "/crm/projects");

  const customersLink = getByRole(nav, "link", { name: "Clients" });
  expect(customersLink).toBeInTheDocument();
  expect(customersLink).toHaveAttribute("href", "/crm/customers");

  const usersLink = queryByRole(nav, "link", { name: "Coopérateurs - Salariés" });
  expect(usersLink).not.toBeInTheDocument();
});
