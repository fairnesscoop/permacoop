<script>
  import { _ } from 'svelte-i18n';
  import { format } from '../../../normalizer/money';
  import EditLink from '../../../components/links/EditLink.svelte';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('accounting.daily_rates.user')}</th>
      <th class="px-4 py-3">{$_('accounting.daily_rates.customer')}</th>
      <th class="px-4 py-3">{$_('accounting.daily_rates.task')}</th>
      <th class="px-4 py-3">{$_('accounting.daily_rates.amount')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, user, task, customer, amount } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{user.firstName} {user.lastName}</td>
        <td class="px-4 py-3 text-sm">{customer.name}</td>
        <td class="px-4 py-3 text-sm">{task.name}</td>
        <td class="px-4 py-3 text-sm">{format(amount)}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <EditLink href="{`/accounting/daily_rates/${id}/edit`}" />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
