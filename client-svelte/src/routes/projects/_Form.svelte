<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';

  let data = [];

  onMount(async () => {
    ({data} = await axios.get('customers'));
  });

  export let name = '';
  export let customerId = '';

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', {name, customerId});
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-group">
    <label for="name">Nom du projet *</label>
    <input type="text" id="name" bind:value={name} class="form-control" />
  </div>
  <div class="form-group">
    <label for="customerId">Client *</label>
    <select id="customerId" class="form-control" bind:value={customerId}>
      <option value="">Choisir un client</option>
      {#each data as customer}
        <option value={customer.id} selected={customerId === customer.id}>
          {customer.name}
        </option>
      {/each}
    </select>
  </div>
  <button type="submit" class="btn btn-primary" disabled={!name || !customerId}>
    Sauvegarder
  </button>
</form>
