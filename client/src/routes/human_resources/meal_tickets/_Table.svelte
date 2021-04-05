<script>
  import { _ } from 'svelte-i18n';
  export let mealTicketsSummaries = [];
</script>

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

  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each mealTicketsSummaries as { month, total, base, mealTicketRemovalCount }}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_(`common.month.${month}`)}</td>
        <td class="px-4 py-3 text-sm">{base}</td>
        <td class="px-4 py-3 text-sm">{mealTicketRemovalCount}</td>
        <td
          class="px-4 py-3 text-gray-50 font-bold dark:bg-indigo-600 bg-indigo-400 text-md">
          {total}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
