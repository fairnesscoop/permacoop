<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {stores} from  '@sapper/app';
  import {get} from '../../../utils/axios';
  import CustomersInput from '../../../components/inputs/CustomersInput.svelte';
  import Input from '../../../components/inputs/Input.svelte';
  import Button from '../../../components/inputs/Button.svelte';

  const { session } = stores();

  let response = {
    items: []
  };

  onMount(async () => {
    response = (await get('customers', {params: {page: 1}}, $session.user.apiToken)).data;
  });

  export let loading;
  export let name = '';
  export let customerId = '';

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', {name, customerId});
  };
</script>

<form on:submit|preventDefault={submit} class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input label={'Nom du projet'} type={'text'} bind:value={name} />
  <CustomersInput customers={response.items} bind:customerId />
  <Button value={'Enregistrer'} {loading} disabled={!name || !customerId || loading} />
</form>
