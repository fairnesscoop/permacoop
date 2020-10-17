<script>
  import { createEventDispatcher } from 'svelte';

  export let currentPage;
  export let pageCount;

  const dispatch = createEventDispatcher();
  const range = (size, startAt = 0) => {
    return [...Array(size).keys()].map((i) => i + startAt);
  };
  const changePage = (page) => {
    if (page !== currentPage) {
      dispatch('change', page);
    }
  };
</script>

{#if pageCount > 1}
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      {#if currentPage > 1}
        <li class="page-item">
          <a
            class="page-link"
            href="javascript:void(0)"
            on:click="{() => changePage(currentPage - 1)}"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
      {/if}
      {#each range(pageCount, 1) as page}
        <li class="{page == currentPage ? 'page-item active' : 'page-item'}">
          <a
            class="page-link"
            on:click="{() => changePage(page)}"
            href="javascript:void(0)"
          >
            {page}
          </a>
        </li>
      {/each}
      {#if currentPage < pageCount}
        <li class="page-item">
          <a
            class="page-link"
            href="javascript:void(0)"
            aria-label="Next"
            on:click="{() => changePage(currentPage + 1)}"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      {/if}
    </ul>
  </nav>
{/if}
