<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import Ban from '../components/icons/Ban.svelte';
  import Check from '../components/icons/Check.svelte';
  import { get } from '../utils/axios';

  const { session } = stores();

  onMount(async () => {
    console.log(await get('users/presence'));
  });

</script>

<svelte:head>
  <title>{$_('dashboard.title')} - {$_('app')}</title>
</svelte:head>

{#if $session.user}
  <h2
    class="my-6 inline-flex text-2xl font-semibold text-gray-700 dark:text-gray-200">
    {$_('dashboard.welcome', {
      values: {
        firstName: $session.user.firstName,
        lastName: $session.user.lastName,
      },
    })}
  </h2>
{/if}

<h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
  Qui est présent aujourd'hui ?
</h4>
<div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
  <!-- Card -->
  <div class="flex items-center p-2 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-2 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
      <Check className={"w-5 h-5"} />
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Mathieu MARCHOIS (Radio France)
      </p>
    </div>
  </div>
  <!-- Card -->
  <div class="flex items-center p-2 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-2 mr-4 text-red-500 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-500">
      <Ban className={"w-5 h-5"} />
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Hélène MARCHOIS (congé) 
      </p>
    </div>
  </div>
   <div class="flex items-center p-2 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-2 mr-4 text-red-500 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-500">
      <Ban className={"w-5 h-5"} />
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Nicolas DIEVARD
      </p>
    </div>
  </div>
  <!-- Card -->
  <div class="flex items-center p-2 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-2 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
      <Check className={"w-5 h-5"} />
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Sebastien Solère
      </p>
    </div>
  </div>
</div>
