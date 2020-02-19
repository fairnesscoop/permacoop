<script>
  import {createEventDispatcher} from 'svelte';
  export let name = '';
  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', {name});
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-group">
    <label for="name">Nom du client *</label>
    <input type="text" id="name" bind:value={name} class="form-control" />
  </div>
  <button type="submit" class="btn btn-primary" disabled={!name}>
    Sauvegarder
  </button>
</form>
