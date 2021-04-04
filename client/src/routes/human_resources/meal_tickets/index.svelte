<script>
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import { _ } from 'svelte-i18n';
  import H4Title from '../../../components/H4Title.svelte';

  let title = $_('human_resources.meal_tickets.title');
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items="{[{ title: $_('human_resources.breadcrumb') }, { title }]}" />
<H4Title title="{$_('human_resources.meal_tickets.available_meal_tickets')}" />

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('human_resources.meal_tickets.month')}</th>
      <th class="px-4 py-3">{$_('human_resources.meal_tickets.base')}</th>
      <th class="px-4 py-3">{$_('human_resources.meal_tickets.exceptions')}</th>
      <th class="px-4 py-3">{$_('human_resources.meal_tickets.total')}</th>
    </tr>
  </thead>
</table>
