<script>
  import {format as dateFormat} from 'date-fns';
  import {format} from '../../../normalizer/money';
  import PencilIcon from '../../../components/icons/PencilIcon.svelte';
  import GrayBadge from '../../../components/badges/GrayBadge.svelte';
  import RedBadge from '../../../components/badges/RedBadge.svelte';
  import OrangeBadge from '../../../components/badges/OrangeBadge.svelte';
  import GreenBadge from '../../../components/badges/GreenBadge.svelte';
  import {fr} from 'date-fns/locale';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">Numéro de devis</th>
      <th class="px-4 py-3">Date</th>
      <th class="px-4 py-3">Nom du client</th>
      <th class="px-4 py-3">Montant TTC</th>
      <th class="px-4 py-3">Statut</th>
      <th class="px-4 py-3">Actions</th>
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
            <OrangeBadge value={status}/>
          {:else if 'accepted' === status}
            <GreenBadge value={status}/>
          {:else if 'sent' === status}
            <GrayBadge value={status}/>
          {:else}
            <RedBadge value={status}/>
          {/if}
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <a href={`/accounting/quotes/${id}/edit`} class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Modifier">
              <PencilIcon className={'w-5 h-5'} />
            </a>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
