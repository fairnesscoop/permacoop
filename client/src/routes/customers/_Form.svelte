<script>
  import {createEventDispatcher} from 'svelte';
  import {codes} from 'iso-country-codes';
  import TextInput from '../../components/inputs/TextInput.svelte';
  import SelectInput from '../../components/inputs/SelectInput.svelte';

  export let customer;

  const {address} = customer;
  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', customer);
  };
</script>

<form on:submit|preventDefault={submit}>
  <TextInput label={'Nom du client'} bind:value={customer.name} />
  <TextInput label={'Adresse'} bind:value={address.street} />
  <TextInput label={'Code postal'} bind:value={address.zipCode} />
  <TextInput label={'Ville'} bind:value={address.city} />
  <SelectInput label={'Pays'} bind:value={address.country}>
    {#each codes as code}
      <option value={code.alpha2}>{code.name}</option>
    {/each}
  </SelectInput>
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!customer.name || !address.country || !address.zipCode || !address.city || !address.street}>
    Enregistrer
  </button>
</form>
