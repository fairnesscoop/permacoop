<script>
  import { _ } from 'svelte-i18n';

  export let items;
</script>

<table
  class="w-full whitespace-no-wrap px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('human_resources.meal_tickets.user')}</th>
      <th class="px-4 py-3">{$_('human_resources.meal_tickets.nb_meal_tickets')}</th>
      <th class="px-4 py-3">{$_('human_resources.meal_tickets.nb_meal_tickets_removals')}</th>
    </tr>
  </thead>

  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { firstName, lastName, mealTickets, mealTicketRemovals}}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">
          {firstName} {lastName}
        </td>
        <td class="px-4 py-3 text-sm">{mealTickets}</td>
        <td class="px-4 py-3 text-sm">{mealTicketRemovals}</td>
      </tr>
    {/each}
  </tbody>
</table>
