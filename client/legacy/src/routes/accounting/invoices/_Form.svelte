<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher, onMount } from 'svelte';
  import { get } from 'utils/axios';
  import Button from 'components/inputs/Button.svelte';
  import ProjectsInput from 'components/inputs/ProjectsInput.svelte';
  import SelectInput from 'components/inputs/SelectInput.svelte';

  export let loading;

  let projectId;
  let expireInDays = 30;
  let projects = { items: [] };

  onMount(async () => {
    projects = (await get('projects', { params: { page: 1 } })).data;
  });

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', { expireInDays, projectId });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <ProjectsInput projects={projects.items} bind:projectId />
  <SelectInput
    label={$_('accounting.invoices.form.expire_in_days')}
    bind:value={expireInDays}>
    {#each [30, 60, 90] as day}
      <option value={day}>{day}</option>
    {/each}
  </SelectInput>
  <Button
    value={$_('accounting.invoices.form.submit')}
    {loading}
    disabled={!projectId || !expireInDays || loading} />
</form>
