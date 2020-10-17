<script>
  export let items = [];
</script>

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href=".">Permacoop</a></li>
    {#each items as item}
      {#if !item.path}
        <li class="breadcrumb-item active" aria-current="page">{item.title}</li>
      {:else}
        <li class="breadcrumb-item"><a href="{item.path}">{item.title}</a></li>
      {/if}
    {/each}
  </ol>
</nav>
