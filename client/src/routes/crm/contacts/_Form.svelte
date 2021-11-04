<script>
  import { _ } from 'svelte-i18n';
  import Input from 'components/inputs/Input.svelte';

  export let contact;
</script>

<form class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input label={$_('crm.contacts.first_name')} bind:value={contact.firstName} />
  <Input label={$_('crm.contacts.last_name')} bind:value={contact.lastName} />
  <Input label={$_('crm.contacts.company')} bind:value={contact.company} />
  <Input
    type="email"
    label={$_('crm.contacts.email')}
    bind:value={contact.email} />
  <Input
    label={$_('crm.contacts.phone_number')}
    bind:value={contact.phoneNumber} />
  <Input label={$_('crm.contacts.notes')} bind:value={contact.notes} />
</form>
