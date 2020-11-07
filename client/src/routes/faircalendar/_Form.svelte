<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get } from '../../utils/axios';
  import TasksInput from '../../components/inputs/TasksInput.svelte';
  import ProjectsInput from '../../components/inputs/ProjectsInput.svelte';
  import Input from '../../components/inputs/Input.svelte';
  import SelectInput from '../../components/inputs/SelectInput.svelte';
  import Button from '../../components/inputs/Button.svelte';

  const dispatch = createEventDispatcher();

  let tasks = { items: [] };
  let projects = { items: [] };

  onMount(async () => {
    let [tasksReponse, projectsReponse] = await Promise.all([
      get('tasks', { params: { page: 1 } }),
      get('projects', { params: { page: 1 } }),
    ]);

    tasks = tasksReponse.data;
    projects = projectsReponse.data;
  });

  export let event;
  export let loading;

  const types = [
    'mission',
    'dojo',
    'support',
    'formationConference',
    'other',
  ];

  const submit = () => {
    dispatch('save', {
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
    });
  };
</script>

<form
  on:submit|preventDefault="{submit}"
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput label="{$_('faircalendar.form.type')}" bind:value="{event.type}">
    {#each types as type}
      <option value="{type}">{$_(`faircalendar.type.${type}`)}</option>
    {/each}
  </SelectInput>
  <SelectInput label="{$_('faircalendar.form.time')}" bind:value="{event.time}">
    <option value="{'25'}">0.25 jour</option>
    <option value="{'50'}">0.5 jour</option>
    <option value="{'75'}">0.75 jour</option>
    <option value="{'100'}">1 jour</option>
  </SelectInput>
  {#if event.type === 'mission'}
    <ProjectsInput
      projects="{projects.items}"
      bind:projectId="{event.projectId}" />
    <TasksInput tasks="{tasks.items}" bind:taskId="{event.taskId}" />
  {/if}
  <Input
    label="{$_('faircalendar.form.summary')}"
    bind:value="{event.summary}"
    required="{''}" />
  <Button
    value="{$_('common.form.save')}"
    loading="{loading}"
    disabled="{!event.time || !event.type || loading}" />
</form>
