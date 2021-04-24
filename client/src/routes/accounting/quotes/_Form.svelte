<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher, onMount } from 'svelte';
  import { get } from 'utils/axios';
  import QuoteItemsForm from './_QuoteItemsForm.svelte';
  import Button from 'components/inputs/Button.svelte';
  import ProjectsInput from 'components/inputs/ProjectsInput.svelte';
  import SelectInput from 'components/inputs/SelectInput.svelte';
  import { byAlpha2 } from 'iso-country-codes';

  export let customerId = '';
  export let loading;
  export let projectId = undefined;
  export let status = 'draft';

  let items = [
    {
      title: '',
      quantity: '',
      dailyRate: '',
    },
  ];
  let projects = { items: [] };
  let customers = { items: [] };

  onMount(async () => {
    customers = (await get('customers', { params: { page: 1 } })).data;
  });

  const onCustomerSelected = async () => {
    projects = (await get(`projects`, { params: { page: 1, customerId } }))
      .data;
    projectId = undefined;
  };

  const states = ['draft', 'sent', 'refused', 'canceled', 'accepted'];
  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', { customerId, status, items, projectId });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput label={$_('accounting.quotes.status.title')} bind:value={status}>
    {#each states as state}
      <option value={state}>{$_(`accounting.quotes.status.${state}`)}</option>
    {/each}
  </SelectInput>
  <div class="block mt-4 text-sm">
    <label
      class="text-gray-700 dark:text-gray-400"
      for={'customerId'}>{$_('accounting.quotes.form.customer')}</label>
    <select
      id="customerId"
      class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
      bind:value={customerId}
      on:blur={onCustomerSelected}
      on:change={onCustomerSelected}>
      <option value="">{$_('crm.customers.form.customer_placeholder')}</option>
      {#each customers.items as { id, address, name }}
        <option value={id} selected={customerId === id}>
          {name}
          ({address.street}
          -
          {address.zipCode}
          {address.city}
          -
          {byAlpha2[address.country].name})
        </option>
      {/each}
    </select>
  </div>
  {#if customerId && status}
    <ProjectsInput projects={projects.items} bind:projectId />
    <QuoteItemsForm bind:values={items} />
    <Button
      value={$_('common.form.save')}
      {loading}
      disabled={!customerId || !status || loading} />
  {/if}
</form>
