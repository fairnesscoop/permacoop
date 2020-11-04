<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import { codes } from 'iso-country-codes';
  import Input from '../../../components/inputs/Input.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';
  import Button from '../../../components/inputs/Button.svelte';

  export let customer;
  export let loading;

  const address = customer.address;
  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', customer);
  };
</script>

<form
  on:submit|preventDefault="{submit}"
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    label="{$_('crm.customers.form.customer')}"
    bind:value="{customer.name}" />
  <Input
    label="{$_('crm.customers.form.address')}"
    bind:value="{address.street}" />
  <Input
    label="{$_('crm.customers.form.zip_code')}"
    bind:value="{address.zipCode}" />
  <Input label="{$_('crm.customers.form.city')}" bind:value="{address.city}" />
  <SelectInput
    label="{$_('crm.customers.form.country')}"
    bind:value="{address.country}">
    {#each codes as code}
      <option value="{code.alpha2}">{code.name}</option>
    {/each}
  </SelectInput>
  <Button
    value="{$_('common.form.save')}"
    loading="{loading}"
    disabled="{!customer.name || !address.country || !address.zipCode || !address.city || !address.street || loading}" />
</form>
