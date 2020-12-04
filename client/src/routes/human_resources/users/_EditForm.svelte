<script>
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import {
    ROLE_COOPERATOR,
    ROLE_ACCOUNTANT,
    ROLE_EMPLOYEE
  } from '../../../constants/roles';
  import UserAdministrativeForm from './_UserAdministrativeForm.svelte';
  import Button from '../../../components/inputs/Button.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';

  export let loading;
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
    };

    dispatch('save', data);
  };
</script>

<form on:submit|preventDefault="{submit}">
  <SelectInput
    label="{$_('human_resources.users.form.role')}"
    bind:value="{role}">
    <option value="{ROLE_COOPERATOR}">{$_('common.roles.cooperator')}</option>
    <option value="{ROLE_EMPLOYEE}">{$_('common.roles.employee')}</option>
    <option value="{ROLE_ACCOUNTANT}">{$_('common.roles.accountant')}</option>
  </SelectInput>
  <UserAdministrativeForm bind:userAdministrative />
  <Button value="{$_('common.form.save')}" {loading} disabled="{loading}" />
</form>
