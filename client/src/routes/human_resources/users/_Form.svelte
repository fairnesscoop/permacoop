<script>
  import {createEventDispatcher} from 'svelte';
  import {
    ROLE_COOPERATOR,
    ROLE_ACCOUNTANT,
    ROLE_EMPLOYEE
  } from '../../../constants/roles';

  export let firstName = '';
  export let lastName = '';
  export let email = '';
  export let password = '';
  export let role = ROLE_COOPERATOR;
  export let entryDate = null;

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', {
      firstName,
      lastName,
      email,
      password,
      role,
      entryDate: entryDate ? new Date(entryDate) : null
    });
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-group">
    <label for="firstName">Prénom *</label>
    <input
      type="text"
      id="firstName"
      required="required"
      bind:value={firstName}
      class="form-control" />
  </div>
  <div class="form-group">
    <label for="lastName">Nom *</label>
    <input
      type="text"
      id="lastName"
      required="required"
      bind:value={lastName}
      class="form-control" />
  </div>
  <div class="form-group">
    <label for="email">Email *</label>
    <input
      type="email"
      required="required"
      id="email"
      bind:value={email}
      class="form-control" />
  </div>
  <div class="form-group">
    <label for="password">Mot de passe *</label>
    <input
      type="password"
      id="password"
      required="required"
      bind:value={password}
      class="form-control" />
  </div>
  <div class="form-group">
    <label for="role">Role *</label>
    <select
      id="role"
      required="required"
      class="form-control"
      bind:value={role}>
      <option value={ROLE_COOPERATOR}>Coopérateur</option>
      <option value={ROLE_EMPLOYEE}>Employé</option>
      <option value={ROLE_ACCOUNTANT}>Comptable</option>
    </select>
  </div>
  {#if role !== ROLE_ACCOUNTANT}
    <div class="form-group">
      <label for="date">Date d'entrée *</label>
      <input
        type="date"
        id="date"
        required="required"
        bind:value={entryDate}
        class="form-control" />
    </div>
  {/if}
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!firstName || !lastName || !email || !password || !role}>
    Enregistrer
  </button>
</form>
