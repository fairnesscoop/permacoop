<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { range } from 'utils/array';
  import { minutesToHours } from 'normalizer/time';
  import { get } from 'utils/axios';
  import TasksInput from 'components/inputs/TasksInput.svelte';
  import ProjectsInput from 'components/inputs/ProjectsInput.svelte';
  import Input from 'components/inputs/Input.svelte';
  import SelectInput from 'components/inputs/SelectInput.svelte';
  import Button from 'components/inputs/Button.svelte';

  export let event;
  export let loading;

  const dispatch = createEventDispatcher();

  let tasks = { items: [] };
  let projects = { items: [] };
  let maxDayDuration;

  onMount(async () => {
    let [tasksReponse, projectsReponse, settingsResponse] = await Promise.all([
      get('tasks', { params: { page: 1 } }),
      get('projects', { params: { page: 1 } }),
      get('settings/cooperative'),
    ]);

    tasks = tasksReponse.data;
    projects = projectsReponse.data;
    maxDayDuration = settingsResponse.data.dayDuration;
    event.time = event.time ? event.time : maxDayDuration;
  });

  const types = ['mission', 'dojo', 'support', 'formationConference', 'other'];

  $: times = [...range(30, maxDayDuration, 30)].reverse();

  const submit = () => {
    dispatch('save', {
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      billable: String(event.billable),
    });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput label={$_('faircalendar.form.type')} bind:value={event.type}>
    {#each types as type}
      <option value={type}>{$_(`faircalendar.type.${type}`)}</option>
    {/each}
  </SelectInput>
  {#if event.type === 'mission'}
    <div class="flex">
      <div class="w-1/2 pr-2">
        <ProjectsInput
          projects={projects.items}
          bind:projectId={event.projectId} />
      </div>
      <div class="w-1/2 pl-2">
        <TasksInput tasks={tasks.items} bind:taskId={event.taskId} />
      </div>
    </div>
  {/if}
  <div class="flex">
    <div class="w-1/2 pr-2">
      <SelectInput label={$_('faircalendar.form.time')} bind:value={event.time}>
        {#each times as minutes}
          <option value={minutes} selected={minutes === event.time}>
            {minutesToHours(minutes)}
          </option>
        {/each}
      </SelectInput>
    </div>
    {#if event.type === 'mission'}
      <div class="w-1/2 pl-2">
        <SelectInput
          label={$_('faircalendar.form.billable')}
          bind:value={event.billable}>
          <option value={true}>{$_('common.yes')}</option>
          <option value={false}>{$_('common.no')}</option>
        </SelectInput>
      </div>
    {/if}
  </div>
  <Input
    label={$_('faircalendar.form.summary')}
    bind:value={event.summary}
    required={''} />
  <Button
    value={$_('common.form.save')}
    {loading}
    disabled={!event.time || !event.type || loading} />
</form>
