import { readable } from "svelte/store";

// Mock content for "$app/stores" for testing purposes.
export default {
  page: readable({
    url: new URL("http://testserver"),
  }),
};
