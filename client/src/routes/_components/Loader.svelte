<script>
  export let loading;
</script>

{#if loading}
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{/if}
