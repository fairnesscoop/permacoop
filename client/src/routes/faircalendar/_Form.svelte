<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { get } from '../../utils/axios';
  import TasksInput from '../../components/inputs/TasksInput.svelte';
  import ProjectsInput from '../../components/inputs/ProjectsInput.svelte';
  import TextInput from '../../components/inputs/TextInput.svelte';
  import SelectInput from '../../components/inputs/SelectInput.svelte';

  const dispatch = createEventDispatcher();
  const { session } = stores();
  const token = $session.user.apiToken;

  let tasks = { items: [] };
  let projects = { items: [] };

  onMount(async () => {
    const [tasksReponse] = await Promise.all([
      get('tasks', { params: { page: 1 } }, token),
      get('projects', { params: { page: 1 } }, token),
    ]);

    tasks = tasksReponse.data;
    projects = projectsReponse.data;
  });

  export let event;

  const submit = () => {
    dispatch('save', {
      ...event,
      date: new Date(event.date),
    });
  };
</script>

<form on:submit|preventDefault="{submit}">
  <SelectInput label="{'Type'}" bind:value="{event.type}">
    <option value="{'mission'}">Mission</option>
    <option value="{'dojo'}">Dojo</option>
    <option value="{'support'}">Support // Podcast</option>
    <option value="{'formationConference'}">Formation // Conf // Meetup</option>
    <option value="{'holiday'}">Vacances</option>
    <option value="{'medicalLeave'}">Congé maladie</option>
    <option value="{'other'}">Autre</option>
  </SelectInput>
  <SelectInput label="{'Temps passé'}" bind:value="{event.time}">
    <option value="{'25'}">0.25 jour</option>
    <option value="{'50'}">0.5 jour</option>
    <option value="{'75'}">0.75 jour</option>
    <option value="{'100'}">1 jour</option>
  </SelectInput>
  {#if event.type === 'mission'}
    <ProjectsInput
      projects="{projects.items}"
      bind:projectId="{event.projectId}"
    />
    <TasksInput tasks="{tasks.items}" bind:taskId="{event.taskId}" />
  {/if}
  <TextInput
    label="{'Commentaire'}"
    bind:value="{event.summary}"
    required="{''}"
  />
  <button
    type="submit"
    class="btn btn-primary"
    disabled="{!event.time || !event.type}"
  >
    Enregistrer
  </button>
  <slot />
</form>
