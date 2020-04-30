<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import TasksInput from '../_components/inputs/TasksInput.svelte';
  import ProjectsInput from '../_components/inputs/ProjectsInput.svelte';

  const dispatch = createEventDispatcher();

  let tasks = [];
  let projects = [];

  onMount(async () => {
    let [tasksReponse, projectsReponse] = await Promise.all([
      axios.get('tasks'),
      axios.get('projects')
    ]);

    tasks = tasksReponse.data;
    projects = projectsReponse.data;
  });

  export let event;

  const submit = () => {
    dispatch('save', {
      ...event,
      date: new Date(event.date)
    });
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-group">
    <label for="time">Type *</label>
    <select
      id="time"
      required="required"
      class="form-control"
      bind:value={event.type}>
      <option value={'mission'}>Mission</option>
      <option value={'dojo'}>Dojo</option>
      <option value={'support'}>Support // Podcast</option>
      <option value={'formationConference'}>Formation // Conf // Meetup</option>
      <option value={'holiday'}>Vacances</option>
      <option value={'medicalLeave'}>Congé maladie</option>
      <option value={'other'}>Autre</option>
    </select>
  </div>
  <div class="form-group">
    <label for="time">Temps passé *</label>
    <select
      id="time"
      required="required"
      class="form-control"
      bind:value={event.time}>
      <option value={'25'}>0.25 jour</option>
      <option value={'50'}>0.5 jour</option>
      <option value={'75'}>0.75 jour</option>
      <option value={'100'}>1 jour</option>
    </select>
  </div>
  {#if event.type === 'mission'}
    <ProjectsInput {projects} bind:projectId={event.projectId} />
    <TasksInput {tasks} bind:taskId={event.taskId} />
  {/if}
  <div class="form-group">
    <label for="summary">Commentaire</label>
    <input
      type="text"
      id="summary"
      bind:value={event.summary}
      class="form-control" />
  </div>
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!event.time || !event.type}>
    Enregistrer
  </button>
  <slot />
</form>
