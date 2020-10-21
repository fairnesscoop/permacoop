<script>
  import ErrorIcon from './icons/ErrorIcon.svelte'
  export let errors = [];
</script>

{#if errors.length > 0}
  <div class="inline-flex w-full bg-white shadow-md rounded-lg overflow-hidden mb-3">
    <div class="flex justify-center items-center w-12 bg-red-500">
      <ErrorIcon className={'h-6 w-6 text-white'} />
    </div>
    <div class="-mx-3 py-2 px-4">
      <div class="mx-3">
        <span class="text-red-500 font-semibold">Erreur</span>
        <ul class="text-gray-600 text-sm">
          {#each errors as error}
            <li>{error}</li>
          {/each}
          </ul>
      </div>
    </div>
  </div>
{/if}
