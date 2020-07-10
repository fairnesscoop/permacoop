<script>
  import { stores } from '@sapper/app';
  import { createEventDispatcher, onMount } from 'svelte';
  import { get } from '../../utils/axios';
  import CustomersInput from '../../components/inputs/CustomersInput.svelte';
  import TextInput from '../../components/inputs/TextInput.svelte';

  let response = {
    items: []
  };

  export let name = '';
  export let customerId = '';

  const dispatch = createEventDispatcher();
  const session = stores();

  onMount(async () => {
    response = (await get(
      'customers',
      { params: { page: 1 } },
      $session.user.apiToken
    )).data;
  });

  const submit = () => {
    dispatch('save', { name, customerId });
  };
</script>

<form on:submit|preventDefault={submit}>
  <TextInput label={'Nom du projet'} bind:value={name} />
  <CustomersInput customers={response.items} bind:customerId />
  <button type="submit" class="btn btn-primary" disabled={!name || !customerId}>
    Enregistrer
  </button>
</form>
