/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import { addTranslations } from "src/lib/i18n";
import ServerErrors from "./ServerErrors.svelte";

it("renders nothing with no error.", () => {
  const { queryByText } = render(ServerErrors, { errors: [] });

  expect(queryByText("Erreur")).not.toBeInTheDocument();
});

it("renders the given errors", async () => {
  addTranslations({
    fr: {
      "": {
        first_error: "Fichier non trouvé",
        second_error: "Saisie invalide",
      },
    },
  });

  const errors = ["first_error", "second_error"];
  const { getAllByRole, getByText } = render(ServerErrors, { errors });

  const listItems = getAllByRole("listitem");
  const listItemErrors = listItems.map((item) => item.textContent);
  expect(listItems).toHaveLength(2);
  expect(listItemErrors).toStrictEqual(["Fichier non trouvé", "Saisie invalide"]);
  expect(getByText(/Erreur/i)).toBeInTheDocument();
});
