<script>
  import { _ } from 'svelte-i18n';
  // import SeeLink from 'components/links/SeeLink.svelte';
  // import EditLink from 'components/links/EditLink.svelte';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('crm.contacts.first_name')}</th>
      <th class="px-4 py-3">{$_('crm.contacts.last_name')}</th>
      <th class="px-4 py-3">{$_('crm.contacts.company')}</th>
      <th class="px-4 py-3">{$_('crm.contacts.email')}</th>
      <th class="px-4 py-3">{$_('crm.contacts.phone_number')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, firstName, lastName, company, email, phoneNumber } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{firstName}</td>
        <td class="px-4 py-3 text-sm">{lastName}</td>
        <td class="px-4 py-3 text-sm">{company}</td>
        <td class="px-4 py-3 text-sm">{email}</td>
        <td class="px-4 py-3 text-sm">{phoneNumber}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <!-- <SeeLink href={`/crm/contacts/${id}`} /> -->
            <!-- <EditLink href={`/crm/contacts/${id}/edit`} /> -->
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
