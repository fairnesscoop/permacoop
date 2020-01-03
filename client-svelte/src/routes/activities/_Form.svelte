<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';

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

  export let date;
  export let projectId = '';
  export let taskId = '';
  export let time = '';
  export let summary = '';

  const submit = () => {
    dispatch('save', {projectId, taskId, time, summary, date: new Date(date)});
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-group">
    <label for="time">Temps passé *</label>
    <select id="time" class="form-control" bind:value={time}>
      <option value="">-- Choisir le temps passé --</option>
      <option value={'25'}>0.25</option>
      <option value={'50'}>0.5</option>
      <option value={'75'}>0.75</option>
      <option value={'100'}>1</option>
    </select>
  </div>
  <div class="form-group">
    <label for="projectId">Projet *</label>
    <select id="projectId" class="form-control" bind:value={projectId}>
      <option value="">-- Choisir un projet --</option>
      {#each projects as project}
        <option value={project.id} selected={projectId === project.id}>
          [{project.customer.name}] {project.name}
        </option>
      {/each}
    </select>
  </div>
  <div class="form-group">
    <label for="taskId">Mission *</label>
    <select id="taskId" class="form-control" bind:value={taskId}>
      <option value="">-- Choisir une mission --</option>
      {#each tasks as task}
        <option value={task.id} selected={taskId === task.id}>
          {task.name}
        </option>
      {/each}
    </select>
  </div>
  <div class="form-group">
    <label for="summary">Commentaire</label>
    <input type="text" id="summary" bind:value={summary} class="form-control" />
  </div>
  <button
    type="submit"
    class="btn btn-primary"
    disabled={!time || !taskId || !projectId}>
    Sauvegarder
  </button>
</form>
