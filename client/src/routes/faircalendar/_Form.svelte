<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {get} from '../../utils/axios';
  import TasksInput from '../../components/inputs/TasksInput.svelte';
  import ProjectsInput from '../../components/inputs/ProjectsInput.svelte';
  import Input from '../../components/inputs/Input.svelte';
  import SelectInput from '../../components/inputs/SelectInput.svelte';
  import Button from '../../components/inputs/Button.svelte';

  const dispatch = createEventDispatcher();

  let tasks = {items: []};
  let projects = {items: []};

  onMount(async () => {
    let [tasksReponse, projectsReponse] = await Promise.all([
      get('tasks', {params: {page: 1}}),
      get('projects', {params: {page: 1}})
    ]);

    tasks = tasksReponse.data;
    projects = projectsReponse.data;
  });

  export let event;
  export let loading;

  const submit = () => {
    dispatch('save', {
      ...event,
      date: new Date(event.date)
    });
  };
</script>

<form on:submit|preventDefault={submit} class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput label={'Type'} bind:value={event.type}>
    <option value={'mission'}>Mission</option>
    <option value={'dojo'}>Dojo</option>
    <option value={'support'}>Support // Podcast</option>
    <option value={'formationConference'}>Formation // Conf // Meetup</option>
    <option value={'holiday'}>Vacances</option>
    <option value={'medicalLeave'}>Congé maladie</option>
    <option value={'other'}>Autre</option>
  </SelectInput>
  <SelectInput label={'Temps passé'} bind:value={event.time}>
    <option value={'25'}>0.25 jour</option>
    <option value={'50'}>0.5 jour</option>
    <option value={'75'}>0.75 jour</option>
    <option value={'100'}>1 jour</option>
  </SelectInput>
  {#if event.type === 'mission'}
    <ProjectsInput projects={projects.items} bind:projectId={event.projectId} />
    <TasksInput tasks={tasks.items} bind:taskId={event.taskId} />
  {/if}
  <Input label={'Commentaire'} bind:value={event.summary} required={''} />
  <Button value={'Enregistrer'} {loading} disabled={!event.time || !event.type || loading} />
</form>