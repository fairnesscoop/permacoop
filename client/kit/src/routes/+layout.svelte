<script lang="ts">
  import { settings } from "$lib/stores";
</script>

<div class={$settings.theme}>
  <slot />
</div>
