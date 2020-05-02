<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import CustomersInput from '../../components/inputs/CustomersInput.svelte';
  import TextInput from '../../components/inputs/TextInput.svelte';

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
  <TextInput label={'Nom du projet'} bind:value={name} />
  <CustomersInput customers={data} bind:customerId />
  <button type="submit" class="btn btn-primary" disabled={!name || !customerId}>
    Enregistrer
  </button>
</form>
