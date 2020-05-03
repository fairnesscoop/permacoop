<script>
  import {createEventDispatcher} from 'svelte';
  import TextInput from '../../components/inputs/TextInput.svelte';

  export let name = '';
  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', {name});
  };
</script>

<form on:submit|preventDefault={submit}>
  <TextInput label={'Nom de la mission'} bind:value={name} />
  <button type="submit" class="btn btn-primary" disabled={!name}>
    Enregistrer
  </button>
</form>
