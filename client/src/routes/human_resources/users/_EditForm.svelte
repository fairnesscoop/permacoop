<script>
  import {createEventDispatcher} from 'svelte';
  import {
    ROLE_COOPERATOR,
    ROLE_ACCOUNTANT,
    ROLE_EMPLOYEE
  } from '../../../constants/roles';
  import UserAdministrativeForm from './_UserAdministrativeForm.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';

  export let role = ROLE_COOPERATOR;
  export let userAdministrative;

  const dispatch = createEventDispatcher();
  const submit = () => {
    let data = {
        role,
        ...userAdministrative,
        joiningDate: new Date(userAdministrative.joiningDate),
        leavingDate: userAdministrative.leavingDate
          ? new Date(userAdministrative.leavingDate)
          : null
    }

    dispatch('save', data);
  };
</script>

<form on:submit|preventDefault={submit}>
  <SelectInput label={'Role'} bind:value={role}>
    <option value={ROLE_COOPERATOR}>Coopérateur</option>
    <option value={ROLE_EMPLOYEE}>Employé</option>
    <option value={ROLE_ACCOUNTANT}>Comptable</option>
  </SelectInput>
  <UserAdministrativeForm bind:userAdministrative />
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!role}>
    Enregistrer
  </button>
</form>
