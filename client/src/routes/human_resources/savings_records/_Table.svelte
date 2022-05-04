<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'normalizer/money';
  import SeeLink from 'components/links/SeeLink.svelte';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('human_resources.savings_records.user')}</th>
      <th class="px-4 py-3">{$_('human_resources.savings_records.balance')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, firstName, lastName, balance } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{firstName} {lastName}</td>
        <td class="px-4 py-3 text-sm">{format(balance)}</td>
        <td class="px-4 py-3">
          <SeeLink href={`/human_resources/savings_records/${id}`}/>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
