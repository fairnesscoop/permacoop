<script>
  import {createEventDispatcher} from 'svelte';
  import {
    ROLE_COOPERATOR,
    ROLE_ACCOUNTANT,
    ROLE_EMPLOYEE
  } from '../../../constants/roles';
  import UserAdministrativeForm from './_UserAdministrativeForm.svelte';
  import Input from '../../../components/inputs/Input.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';
  import Button from '../../../components/inputs/Button.svelte';

  export let loading;
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
    leavingDate: null
  };

  const dispatch = createEventDispatcher();
  const submit = () => {
    let data = {};

    if (role === ROLE_ACCOUNTANT) {
      data = {firstName, lastName, email, password, role};
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
            : null
        }
      };
    }

    dispatch('save', data);
  };
</script>

<form on:submit|preventDefault={submit} class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput label={'Role'} bind:value={role}>
    <option value={ROLE_COOPERATOR}>Coopérateur</option>
    <option value={ROLE_EMPLOYEE}>Employé</option>
    <option value={ROLE_ACCOUNTANT}>Comptable</option>
  </SelectInput>
  <div class="flex">
    <div class="w-1/2 pr-2">
      <Input label={'Prénom'} bind:value={firstName} />
    </div>
    <div class="w-1/2 pl-2">
      <Input label={'Nom'} bind:value={lastName} />
    </div>
  </div>
  <div class="flex">
    <div class="w-1/2 pr-2">
      <Input type={'email'} label={'Email'} bind:value={email} />
    </div>
    <div class="w-1/2 pl-2">
      <Input type={'password'} label={'Mot de passe'} bind:value={password} />
    </div>
  </div>
  {#if role !== ROLE_ACCOUNTANT}
    <UserAdministrativeForm bind:userAdministrative />
  {/if}
  <Button value={'Enregistrer'} {loading} disabled={!firstName || !lastName || !email || !password || !role || loading} />
</form>
