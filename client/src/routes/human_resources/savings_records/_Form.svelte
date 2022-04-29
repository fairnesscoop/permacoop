<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get } from 'utils/axios';
  import Button from 'components/inputs/Button.svelte';
  import Input from 'components/inputs/Input.svelte';
  import UsersInput from 'components/inputs/UsersInput.svelte';

  const dispatch = createEventDispatcher();

  export let userId;
  export let amount;
  export let loading;

  let users = [];

  onMount(async () => {
    users = (await get('users', { params: {activeOnly: true} })).data;
  });

  const submit = () => {
    dispatch('save', { userId, amount });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <UsersInput {users} bind:userId />
  <Input
    type={'money'}
    label={$_('human_resources.savings_records.form.amount')}
    bind:value={amount} />
  <Button
    value={$_('common.form.save')}
    {loading}
    disabled={!userId || !amount || loading} />
</form>
