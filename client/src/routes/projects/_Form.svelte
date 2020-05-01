<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import CustomersInput from '../../components/inputs/CustomersInput.svelte';

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
    <input
      type="text"
      id="name"
      required="required"
      bind:value={name}
      class="form-control" />
  </div>
  <CustomersInput customers={data} bind:customerId />
  <button type="submit" class="btn btn-primary" disabled={!name || !customerId}>
    Enregistrer
  </button>
</form>
