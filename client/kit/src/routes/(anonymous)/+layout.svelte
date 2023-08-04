<script lang="ts">
  import { Theme } from "src/constants";
  import { theme } from "$lib/stores/theme";
</script>

<div class={$theme === Theme.DARK ? "dark" : ""}>
  <slot />
</div>
