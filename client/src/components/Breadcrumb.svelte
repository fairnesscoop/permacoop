<script>
  import { _ } from 'svelte-i18n';
  import DashboardIcon from './icons/DashboardIcon.svelte';

  export let items = [];
</script>

<nav
  class="flex p-2 mt-6 mb-6 text-sm text-gray-500 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <ol class="list-reset flex">
    <li>
      <a href="/" class="font-semibold text-grey-dark inline-flex">
        <DashboardIcon className="{'w-4 h-4 mr-1'}" />
        {$_('app')}
      </a>
    </li>
    {#each items as item}
      <li><span class="ml-2 mr-2">/</span></li>
      {#if !item.path}
        <li>{item.title}</li>
      {:else}
        <li>
          <a
            href="{item.path}"
            class="font-semibold text-grey-dark">{item.title}</a>
        </li>
      {/if}
    {/each}
  </ol>
</nav>
