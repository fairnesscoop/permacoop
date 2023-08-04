<script lang="ts">
  import { page } from "$app/stores";
  import { _ } from "$lib/i18n";
  import paths from "$lib/paths";
  import { Theme } from "src/constants";
  import { theme } from "$lib/stores/theme";
  import { user } from "$lib/stores/auth";
  import Header from "src/components/Header/Header.svelte";
  import Nav from "src/components/Nav.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: user.set(data.user);
  $: theme.set(data.theme || Theme.LIGHT);
  $: isLoginPage = $page.url.pathname == paths.login;
</script>

<div class={$theme === Theme.DARK ? "dark" : ""}>
  {#if isLoginPage}
    <slot />
  {:else}
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900 dark-theme">
      <Nav />

      <div class="flex flex-col flex-1 w-full">
        <Header />

        <main class="h-full overflow-y-auto">
          <div class="container px-6 mx-auto grid">
            <slot />
          </div>
        </main>
      </div>
    </div>
  {/if}
</div>
