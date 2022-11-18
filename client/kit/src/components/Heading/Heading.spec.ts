/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { render } from "@testing-library/svelte";
import Heading from "./Heading.svelte";

test("Expected h1 is present", () => {
  const { getByRole } = render(Heading);
  const h1 = getByRole("heading", { level: 1 });
  expect(h1).toBeInTheDocument();
  expect(h1).toHaveTextContent("Welcome to SvelteKit");
});
