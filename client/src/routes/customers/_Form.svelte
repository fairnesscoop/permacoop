<script>
  import {createEventDispatcher} from 'svelte';
  import {codes} from 'iso-country-codes';

  export let customer;

  const address = customer.address;
  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', customer);
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-group">
    <label for="name">Nom du client *</label>
    <input
      type="text"
      id="name"
      required="required"
      bind:value={customer.name}
      class="form-control" />
  </div>
  <div class="form-group">
    <label for="street">Adresse *</label>
    <input
      type="text"
      id="street"
      required="required"
      bind:value={address.street}
      class="form-control" />
  </div>
  <div class="form-group">
    <label for="zipCode">Code postal *</label>
    <input
      type="text"
      id="zipCode"
      maxlength="6"
      required="required"
      bind:value={address.zipCode}
      class="form-control" />
  </div>
  <div class="form-group">
    <label for="city">Ville *</label>
    <input
      type="text"
      id="city"
      bind:value={address.city}
      class="form-control" />
  </div>
  <div class="form-group">
    <label for="country">Pays *</label>
    <select
      id="country"
      required="required"
      class="form-control"
      bind:value={address.country}>
      {#each codes as code}
        <option value={code.alpha2}>{code.name}</option>
      {/each}
    </select>
  </div>
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!customer.name || !address.street || !address.city || !address.country || !address.zipCode}>
    Sauvegarder
  </button>
</form>
