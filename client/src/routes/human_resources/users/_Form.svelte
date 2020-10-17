<script>
  import { createEventDispatcher } from 'svelte';
  import {
    ROLE_COOPERATOR,
    ROLE_ACCOUNTANT,
    ROLE_EMPLOYEE,
  } from '../../../constants/roles';
  import UserAdministrativeForm from './_UserAdministrativeForm.svelte';
  import TextInput from '../../../components/inputs/TextInput.svelte';
  import EmailInput from '../../../components/inputs/EmailInput.svelte';
  import PasswordInput from '../../../components/inputs/PasswordInput.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';

  export let firstName = '';
  export let lastName = '';
  export let email = '';
  export let password = '';
  export let role = ROLE_COOPERATOR;
  export let userAdministrative = {
    contract: 'cdi',
    executivePosition: 'true',
    healthInsurance: 'true',
    annualEarnings: null,
    transportFee: null,
    joiningDate: null,
    leavingDate: null,
  };

  const dispatch = createEventDispatcher();
  const submit = () => {
    let data = {};

    if (role === ROLE_ACCOUNTANT) {
      data = { firstName, lastName, email, password, role };
    } else {
      data = {
        firstName,
        lastName,
        email,
        password,
        role,
        userAdministrative: {
          ...userAdministrative,
          joiningDate: new Date(userAdministrative.joiningDate),
          leavingDate: userAdministrative.leavingDate
            ? new Date(userAdministrative.leavingDate)
            : null,
        },
      };
    }

    dispatch('save', data);
  };
</script>

<form on:submit|preventDefault="{submit}">
  <SelectInput label="{'Role'}" bind:value="{role}">
    <option value="{ROLE_COOPERATOR}">Coopérateur</option>
    <option value="{ROLE_EMPLOYEE}">Employé</option>
    <option value="{ROLE_ACCOUNTANT}">Comptable</option>
  </SelectInput>
  <div class="row">
    <div class="col-md-6">
      <TextInput label="{'Prénom'}" bind:value="{firstName}" />
    </div>
    <div class="col-md-6">
      <TextInput label="{'Nom'}" bind:value="{lastName}" />
    </div>
  </div>
  <EmailInput label="{'Email'}" bind:value="{email}" />
  <PasswordInput label="{'Mot de passe'}" bind:value="{password}" />
  {#if role !== ROLE_ACCOUNTANT}
    <UserAdministrativeForm bind:userAdministrative />
  {/if}
  <button
    type="submit"
    class="btn btn-primary"
    disabled="{!firstName || !lastName || !email || !password || !role}"
  >
    Enregistrer
  </button>
</form>
