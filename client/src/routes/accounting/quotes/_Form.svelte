<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {stores} from '@sapper/app';
  import {get} from '../../../utils/axios';
  import QuoteItemsForm from './_QuoteItemsForm.svelte';
  import ProjectsInput from '../../../components/inputs/ProjectsInput.svelte';
  import {byAlpha2} from 'iso-country-codes';

  const { session } = stores();
  const token = $session.user.apiToken;

  export let customerId = '';
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
    customers = (await get('customers', {params: {page: 1}}, token)).data;
  });

  const onCustomerSelected = async () => {
    projects = (await get(`projects`, {
      params: {page: 1, customerId}
    }, token)).data;
    projectId = undefined;
    displayForm = true;
  };

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', {customerId, status, items, projectId});
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-group">
    <label for="status">Statut</label>
    <select
      id="status"
      required="required"
      class="form-control"
      bind:value={status}>
      <option value="draft">Brouillon</option>
      <option value="sent">Envoyé</option>
      <option value="refused">Refusé</option>
      <option value="canceled">Annulé</option>
      <option value="accepted">Accepté</option>
    </select>
  </div>
  <div class="form-group">
    <label for="customerId">Nom du client</label>
    <select
      id="customerId"
      required="required"
      class="form-control"
      bind:value={customerId}
      on:change={onCustomerSelected}>
      <option value="">-- Choisir un client --</option>
      {#each customers.items as customer}
        <option value={customer.id} selected={customerId === customer.id}>
          {customer.name} ({customer.address.street} - {customer.address.zipCode}
          {customer.address.city} - {byAlpha2[customer.address.country].name})
        </option>
      {/each}
    </select>
  </div>
  {#if displayForm}
    <div class="form-group">
      <label for="projectId">Nom du projet</label>
      <select id="projectId" class="form-control" bind:value={projectId}>
        <option value={undefined} />
        {#each projects.items as project}
          <option value={project.id} selected={projectId === project.id}>
            {project.name}
          </option>
        {/each}
      </select>
    </div>
    <hr />
    <QuoteItemsForm bind:values={items} />
    <hr />
  {/if}
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!customerId || !status}>
    Enregistrer
  </button>
</form>
