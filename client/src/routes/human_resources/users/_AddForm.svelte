<script>
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import {
    ROLE_COOPERATOR,
    ROLE_ACCOUNTANT,
    ROLE_EMPLOYEE,
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
        userAdministrative: {
          role,
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

<form
  on:submit|preventDefault="{submit}"
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput
    label="{$_('human_resources.users.form.role')}"
    bind:value="{role}">
    <option value="{ROLE_COOPERATOR}">{$_('common.roles.cooperator')}</option>
    <option value="{ROLE_EMPLOYEE}">{$_('common.roles.employee')}</option>
    <option value="{ROLE_ACCOUNTANT}">{$_('common.roles.accountant')}</option>
  </SelectInput>
  <div class="flex">
    <div class="w-1/2 pr-2">
      <Input
        label="{$_('human_resources.users.form.first_name')}"
        bind:value="{firstName}" />
    </div>
    <div class="w-1/2 pl-2">
      <Input
        label="{$_('human_resources.users.form.last_name')}"
        bind:value="{lastName}" />
    </div>
  </div>
  <div class="flex">
    <div class="w-1/2 pr-2">
      <Input
        type="{'email'}"
        label="{$_('human_resources.users.form.email')}"
        bind:value="{email}" />
    </div>
    <div class="w-1/2 pl-2">
      <Input
        type="{'password'}"
        label="{$_('human_resources.users.form.password')}"
        bind:value="{password}" />
    </div>
  </div>
  {#if role !== ROLE_ACCOUNTANT}
    <UserAdministrativeForm bind:userAdministrative />
  {/if}
  <Button
    value="{$_('common.form.save')}"
    {loading}
    disabled="{!firstName || !lastName || !email || !password || !role || loading}" />
</form>
