<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import EditLink from 'components/links/EditLink.svelte';
  import DeleteLink from 'components/links/DeleteLink.svelte';

  export let items;

  const dispatch = createEventDispatcher();

  const handleConfirmDelete = (id) => dispatch('delete', id);
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
      <th class="px-4 py-3">{$_('crm.contacts.contacted_by')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, firstName, lastName, company, email, phoneNumber, contactedByName } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{firstName}</td>
        <td class="px-4 py-3 text-sm">{lastName}</td>
        <td class="px-4 py-3 text-sm">{company}</td>
        <td class="px-4 py-3 text-sm">{email}</td>
        <td class="px-4 py-3 text-sm">{phoneNumber}</td>
        <td class="px-4 py-3 text-sm">{contactedByName || ''}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <EditLink href={`/crm/contacts/${id}/edit`} />
            <DeleteLink
              on:confirm={() => handleConfirmDelete(id)}
              confirmMessage={$_('crm.contacts.delete.confirm')} />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
