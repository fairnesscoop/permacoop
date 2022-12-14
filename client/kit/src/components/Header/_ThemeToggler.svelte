<script lang="ts">
  import { theme, toggleTheme } from "$lib/stores/theme";
  import DarkThemeIcon from "src/components/icons/DarkThemeIcon.svelte";
  import LightThemeIcon from "src/components/icons/LightThemeIcon.svelte";

  $: title = $theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre";
</script>

<button on:click={toggleTheme} class="rounded-md" {title}>
  {#if $theme === "dark"}
    <LightThemeIcon aria-hidden="true" className="w-5 h-5" />
  {:else}
    <DarkThemeIcon aria-hidden="true" className="w-5 h-5" />
  {/if}
</button>
