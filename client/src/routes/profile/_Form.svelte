<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from '../../components/inputs/Input.svelte';
  import Button from '../../components/inputs/Button.svelte';

  export let firstName = '';
  export let lastName = '';
  export let email = '';
  export let password = '';
  export let loading;

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', {
      firstName,
      lastName,
      email,
      password,
    });
  };
</script>

<form
  on:submit|preventDefault="{submit}"
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    type="{'text'}"
    label="{$_('profile.form.first_name')}"
    bind:value="{firstName}" />
  <Input
    type="{'text'}"
    label="{$_('profile.form.last_name')}"
    bind:value="{lastName}" />
  <Input
    type="{'email'}"
    label="{$_('profile.form.email')}"
    bind:value="{email}" />
  <Input
    type="{'password'}"
    label="{$_('profile.form.password')}"
    bind:value="{password}" />
  <Button
    value="{$_('common.form.save')}"
    loading="{loading}"
    disabled="{!firstName || !lastName || !email || !password}" />
</form>
