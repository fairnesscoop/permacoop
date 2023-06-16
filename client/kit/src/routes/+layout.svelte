<script lang="ts">
  import { _ } from "$lib/i18n";
  import { Theme } from "src/constants";
  import { theme } from "$lib/stores/theme";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  $: theme.set(data.theme || Theme.LIGHT);
</script>

<div class={$theme === Theme.DARK ? "dark" : ""}>
  <slot />
</div>
