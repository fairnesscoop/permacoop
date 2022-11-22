/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import Input from "./Input.svelte";

it("renders an email input.", () => {
  const value = "abc";
  const label = "my email input";
  const type = "email";

  const { getByRole } = render(Input, { value, label, type });

  expect(getByRole("textbox", { name: /my email input/i })).toBeInTheDocument();
});
