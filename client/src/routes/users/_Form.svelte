<script>
  import {createEventDispatcher} from 'svelte';

  export let firstName = '';
  export let lastName = '';
  export let email = '';
  export let password = '';

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', {firstName, lastName, email, password});
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-group">
    <label for="firstName">Prénom *</label>
    <input
      type="text"
      id="firstName"
      bind:value={firstName}
      class="form-control" />
  </div>
  <div class="form-group">
    <label for="lastName">Nom *</label>
    <input
      type="text"
      id="lastName"
      bind:value={lastName}
      class="form-control" />
  </div>
  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" bind:value={email} class="form-control" />
  </div>
  <div class="form-group">
    <label for="password">Mot de passe *</label>
    <input
      type="password"
      id="password"
      bind:value={password}
      class="form-control" />
  </div>
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!firstName || !lastName || !email || !password}>
    Sauvegarder
  </button>
</form>
