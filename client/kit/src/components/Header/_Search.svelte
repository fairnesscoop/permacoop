<script lang="ts">
  import { _ } from "$lib/i18n";
  import SearchIcon from "src/components/icons/SearchIcon.svelte";
</script>

<form role="search" class="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
  <label
    for="search"
    aria-labelledby="search-title"
    class="absolute inset-y-0 flex items-center pl-2"
  >
    <SearchIcon aria-hidden="true" className={"w-4 h-4"}>
      <title id="search-title">{$_("search.title")}</title>
    </SearchIcon>
  </label>
  <input
    id="search"
    class="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
    type="search"
    name="q"
    placeholder={$_("search.placeholder")}
  />
</form>
