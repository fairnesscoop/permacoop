<script>
  import { _ } from 'svelte-i18n';
  import EditLink from 'components/links/EditLink.svelte';
  import { minutesToHours } from 'normalizer/time';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('crm.projects.customer')}</th>
      <th class="px-4 py-3">{$_('crm.projects.name')}</th>
      <th class="px-4 py-3">{$_('crm.projects.invoice_unit.title')}</th>
      <th class="px-4 py-3">{$_('crm.projects.day_duration')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, name, dayDuration, customer, invoiceUnit } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{customer.name}</td>
        <td class="px-4 py-3 text-sm">{name}</td>
        <td class="px-4 py-3 text-sm">
          {$_(`crm.projects.invoice_unit.${invoiceUnit}`)}
        </td>
        <td class="px-4 py-3 text-sm">{minutesToHours(dayDuration)}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <EditLink href={`/crm/projects/${id}/edit`} />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
