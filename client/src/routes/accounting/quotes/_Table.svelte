<script>
  import { _ } from 'svelte-i18n';
  import { format as dateFormat } from 'date-fns';
  import { format } from '../../../normalizer/money';
  //import EditLink from '../../../components/links/EditLink.svelte';
  import GrayBadge from '../../../components/badges/GrayBadge.svelte';
  import RedBadge from '../../../components/badges/RedBadge.svelte';
  import OrangeBadge from '../../../components/badges/OrangeBadge.svelte';
  import GreenBadge from '../../../components/badges/GreenBadge.svelte';
  import { fr } from 'date-fns/locale';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('accounting.quotes.quote_id')}</th>
      <th class="px-4 py-3">{$_('accounting.quotes.date')}</th>
      <th class="px-4 py-3">{$_('accounting.quotes.customer')}</th>
      <th class="px-4 py-3">{$_('accounting.quotes.amount')}</th>
      <th class="px-4 py-3">{$_('accounting.quotes.status.title')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as {id, quoteId, createdAt, status, customer, amountInclusiveOfTaxe, project} (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{quoteId}</td>
        <td class="px-4 py-3 text-sm">{dateFormat(new Date(createdAt), 'dd/MM/yyyy', {locale: fr})}</td>
        <td class="px-4 py-3 text-sm">
          {customer.name}
          {#if project}({project.name}){/if}
        </td>
        <td class="px-4 py-3 text-sm">{format(amountInclusiveOfTaxe)}</td>
        <td class="px-4 py-3 text-sm">
          {#if 'draft' === status}
            <OrangeBadge value={$_(`accounting.quotes.status.${status}`)} />
          {:else if 'accepted' === status}
            <GreenBadge value={$_(`accounting.quotes.status.${status}`)} />
          {:else if 'sent' === status}
            <GrayBadge value={$_(`accounting.quotes.status.${status}`)} />
          {:else}
            <RedBadge value={$_(`accounting.quotes.status.${status}`)} />
          {/if}
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <!--<EditLink href={`/accounting/quotes/${id}/edit`} />-->
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
