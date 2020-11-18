<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher, onMount } from 'svelte';
  import { get } from '../../../utils/axios';
  import CustomersInput from '../../../components/inputs/CustomersInput.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';
  import Input from '../../../components/inputs/Input.svelte';
  import Button from '../../../components/inputs/Button.svelte';
  import { minutesToHours } from '../../../normalizer/time';

  let response = {
    items: [],
  };

  onMount(async () => {
    response = (await get('customers', { params: { page: 1 } })).data;
  });

  export let loading;
  export let name = '';
  export let dayDuration = 480;
  export let customerId = '';

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', { name, dayDuration, customerId });
  };
</script>

<form
  on:submit|preventDefault="{submit}"
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    label="{$_('crm.projects.form.project')}"
    type="{'text'}"
    bind:value="{name}" />
  <CustomersInput customers="{response.items}" bind:customerId />
  <SelectInput
    label="{$_('crm.projects.form.day_duration')}"
    bind:value="{dayDuration}">
    {#each [420, 480] as minutes}
      <option value={minutes}>{minutesToHours(minutes)}</option>
    {/each}
  </SelectInput>
  <Button
    value="{$_('common.form.save')}"
    loading="{loading}"
    disabled="{!name || !customerId || loading}" />
</form>
