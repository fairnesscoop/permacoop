<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {get} from '../../../utils/axios';
  import QuoteItemsForm from './_QuoteItemsForm.svelte';
  import Button from '../../../components/inputs/Button.svelte';
  import ProjectsInput from '../../../components/inputs/ProjectsInput.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';
  import {byAlpha2} from 'iso-country-codes';

  export let customerId = '';
  export let loading;
  export let projectId = undefined;
  export let status = 'draft';

  let displayForm = false;
  let items = [
    {
      title: '',
      quantity: '',
      dailyRate: ''
    }
  ];
  let projects = {items: []};
  let customers = {items: []};

  onMount(async () => {
    customers = (await get('customers', {params: {page: 1}})).data;
  });

  const onCustomerSelected = async () => {
    projects = (await get(`projects`, {params: {page: 1, customerId}})).data;
    projectId = undefined;
    displayForm = true;
  };

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', {customerId, status, items, projectId});
  };
</script>

<form on:submit|preventDefault={submit} class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput label={"Statut"} bind:value={status}>
    <option value="draft">Brouillon</option>
      <option value="sent">Envoyé</option>
      <option value="refused">Refusé</option>
      <option value="canceled">Annulé</option>
      <option value="accepted">Accepté</option>
  </SelectInput>
  <div class="block mt-4 text-sm">
    <label class="text-gray-700 dark:text-gray-400" for={'customerId'}>Nom du client</label>
    <select 
      id='customerId' 
      class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" 
      bind:value={customerId} 
      on:change={onCustomerSelected}>
      <option value="">-- Choisir un client --</option>
      {#each customers.items as {id, address, name}}
        <option value={id} selected={customerId === id}>
          {name} ({address.street} - {address.zipCode}
          {address.city} - {byAlpha2[address.country].name})
        </option>
      {/each}
    </select>
  </div>
  {#if displayForm}
    <ProjectsInput projects={projects.items} {projectId} />
    <QuoteItemsForm bind:values={items} />
    <Button value={'Enregistrer'} {loading} disabled={!customerId || !status || loading} />
  {/if}
</form>
