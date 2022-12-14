<script lang="ts">
  import { _ } from "$lib/i18n";
  import { theme, toggleTheme } from "$lib/stores/theme";
  import DarkThemeIcon from "src/components/icons/DarkThemeIcon.svelte";
  import LightThemeIcon from "src/components/icons/LightThemeIcon.svelte";

  $: title = $theme === "dark" ? $_("theme.switch_light") : $_("theme.switch_dark");
</script>

<button on:click={toggleTheme} class="rounded-md" {title}>
  {#if $theme === "dark"}
    <LightThemeIcon aria-hidden="true" className="w-5 h-5" />
  {:else}
    <DarkThemeIcon aria-hidden="true" className="w-5 h-5" />
  {/if}
</button>
