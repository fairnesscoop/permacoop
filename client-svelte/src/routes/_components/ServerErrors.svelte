<script>
  export let errors = [];
</script>

{#if errors.length > 0}
  <div class="alert alert-danger" role="alert">
    <strong>Une erreur est survenue !</strong>
    <ul>
      {#each errors as error}
        <li>{error}</li>
      {/each}
    </ul>
  </div>
{/if}
