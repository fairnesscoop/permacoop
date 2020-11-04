<script>
  import { _ } from 'svelte-i18n';
  import ErrorIcon from './icons/ErrorIcon.svelte';
  export let errors = [];
</script>

{#if errors.length > 0}
  <div
    class="inline-flex w-full bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden mb-3">
    <div class="flex justify-center items-center w-12 bg-red-500">
      <ErrorIcon className="{'h-6 w-6 text-white'}" />
    </div>
    <div class="-mx-3 py-2 px-4">
      <div class="mx-3">
        <span class="text-red-500 font-semibold">{$_('error')}</span>
        <ul class="text-gray-600 dark:text-gray-400 text-sm">
          {#each errors as error}
            <li>{$_(error)}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
{/if}
