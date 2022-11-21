<script lang="ts">
  import { theme, toggleTheme } from "$lib/stores/theme";
  import DarkThemeIcon from "src/components/icons/DarkThemeIcon.svelte";
  import LightThemeIcon from "src/components/icons/LightThemeIcon.svelte";
</script>

<button on:click={toggleTheme} class="rounded-md focus:outline-none focus:shadow-outline-purple">
  {#if $theme === "dark"}
    <LightThemeIcon className="w-5 h-5" />
  {:else}
    <DarkThemeIcon className="w-5 h-5" />
  {/if}
</button>
