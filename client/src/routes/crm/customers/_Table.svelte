<script>
  import { _ } from 'svelte-i18n';
  //import SeeLink from '../../../components/links/SeeLink.svelte';
  import EditLink from '../../../components/links/EditLink.svelte';
  import { byAlpha2 } from 'iso-country-codes';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('crm.customers.title')}</th>
      <th class="px-4 py-3">{$_('crm.customers.addresses')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, name, address } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{name}</td>
        <td class="px-4 py-3 text-sm">
          {address.street}
          <br />
          {address.zipCode}
          {address.city}
          <br />
          {byAlpha2[address.country].name}
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <!--<SeeLink href={`/crm/customers/${id}`} />-->
            <EditLink href="{`/crm/customers/${id}/edit`}" />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
