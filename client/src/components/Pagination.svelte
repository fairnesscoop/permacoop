<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import { range } from '../utils/array';

  const itemsPerPage = 30;

  export let currentPage;
  export let pageCount;
  export let totalItems;

  $: start = (currentPage - 1) * itemsPerPage + 1;
  $: from = Math.min(totalItems, start + itemsPerPage - 1);

  const dispatch = createEventDispatcher();
  const changePage = (page) => {
    if (page !== currentPage) {
      dispatch('change', page);
    }
  };

  const link =
    'px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple';
  const activeLink =
    'px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple';
</script>

{#if totalItems > 0}
  <div
    class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
    <span class="flex items-center col-span-3">
      {$_('pagination', { values: { start, from, totalItems } })}
    </span>
    <span class="col-span-2"></span>
    {#if pageCount > 1}
      <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul class="inline-flex items-center">
            {#if currentPage > 1}
              <li>
                <button
                  on:click="{() => changePage(currentPage - 1)}"
                  class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Précédent">
                  <svg
                    class="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20">
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"></path>
                  </svg>
                </button>
              </li>
            {/if}
            {#each range(1, pageCount) as page}
              <li>
                <button
                  class="{page == currentPage ? activeLink : link}"
                  on:click="{() => changePage(page)}">
                  {page}
                </button>
              </li>
            {/each}
            {#if currentPage < pageCount}
              <li>
                <button
                  on:click="{() => changePage(currentPage + 1)}"
                  class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                  aria-label="Suivant">
                  <svg
                    class="w-4 h-4 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20">
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"></path>
                  </svg>
                </button>
              </li>
            {/if}
          </ul>
        </nav>
      </span>
    {/if}
  </div>
{/if}
