<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from 'components/inputs/Input.svelte';
  import Button from 'components/inputs/Button.svelte';

  export let contact;
  export let loading;

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', contact);
  };

  $: isFormValid = contact.firstName || contact.lastName || contact.company;
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    label={$_('crm.contacts.first_name')}
    required={false}
    bind:value={contact.firstName} />
  <Input
    label={$_('crm.contacts.last_name')}
    required={false}
    bind:value={contact.lastName} />
  <Input
    label={$_('crm.contacts.company')}
    required={false}
    bind:value={contact.company} />
  <Input
    type="email"
    label={$_('crm.contacts.email')}
    required={false}
    bind:value={contact.email} />
  <Input
    label={$_('crm.contacts.phone_number')}
    required={false}
    bind:value={contact.phoneNumber} />
  <Input
    label={$_('crm.contacts.notes')}
    required={false}
    bind:value={contact.notes} />
  <Button
    value={$_('common.form.save')}
    {loading}
    disabled={loading || !isFormValid} />
</form>
