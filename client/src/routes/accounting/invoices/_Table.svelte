<script>
  import { _ } from 'svelte-i18n';
  import { fr } from 'date-fns/locale';
  import { format as dateFormat } from 'date-fns';
  import { format } from 'normalizer/money';
  import GrayBadge from 'components/badges/GrayBadge.svelte';
  import RedBadge from 'components/badges/RedBadge.svelte';
  import OrangeBadge from 'components/badges/OrangeBadge.svelte';
  import GreenBadge from 'components/badges/GreenBadge.svelte';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('accounting.invoices.date')}</th>
      <th class="px-4 py-3">{$_('accounting.invoices.invoice_id')}</th>
      <th class="px-4 py-3">{$_('accounting.invoices.project')}</th>
      <th class="px-4 py-3">{$_('accounting.invoices.status.title')}</th>
      <th class="px-4 py-3">{$_('accounting.invoices.expiry_date')}</th>
      <th class="px-4 py-3">{$_('accounting.invoices.amount')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, invoiceId, createdAt, expiryDate, status, project, amount } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">
          {dateFormat(new Date(createdAt), 'dd/MM/yyyy', { locale: fr })}
        </td>
        <td class="px-4 py-3 text-sm">{invoiceId}</td>
        <td class="px-4 py-3 text-sm">
          {project.name}
          ({project.customer.name})
        </td>
        <td class="px-4 py-3 text-sm">
          {#if 'draft' === status}
            <OrangeBadge value={$_(`accounting.invoices.status.${status}`)} />
          {:else if 'payed' === status}
            <GreenBadge value={$_(`accounting.invoices.status.${status}`)} />
          {:else if 'sent' === status}
            <GrayBadge value={$_(`accounting.invoices.status.${status}`)} />
          {:else}
            <RedBadge value={$_(`accounting.invoices.status.${status}`)} />
          {/if}
        </td>
        <td class="px-4 py-3">
          {dateFormat(new Date(expiryDate), 'dd/MM/yyyy', { locale: fr })}
        </td>
        <td class="px-4 py-3">{format(amount)}</td>
        <td class="px-4 py-3" />
      </tr>
    {/each}
  </tbody>
</table>
