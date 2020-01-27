<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import {subMonths, format, compareDesc, eachMonthOfInterval} from 'date-fns';
  import {fr} from 'date-fns/locale';

  const dispatch = createEventDispatcher();

  export let projectId;
  export let userId;
  export let date;

  let users = [];
  let projects = [];
  let periods = eachMonthOfInterval({
    start: subMonths(new Date(), 6),
    end: new Date()
  }).sort(compareDesc);

  onMount(async () => {
    const [usersResponse, projectsReponse] = await Promise.all([
      axios.get('users'),
      axios.get('projects')
    ]);

    users = usersResponse.data;
    projects = projectsReponse.data;
  });

  const handleFilter = () => {
    const filters = {
      userId,
      date: format(new Date(date), 'yyyy-MM-dd')
    };

    if (projectId) {
      filters.projectId = projectId;
    }

    const uri = new URLSearchParams(filters).toString();
    window.history.pushState({}, null, `/activities?${uri}`);

    dispatch('filter', {...filters, date: new Date(date)});
  };
</script>

<style>
  form.filter {
    background: #e9ecef;
    padding: 0.75rem 1rem;
    margin-bottom: 20px;
    border-radius: 0.25rem;
  }
</style>

<form class="filter" on:submit|preventDefault={handleFilter}>
  <div class="row">
    <div class="col-md-4">
      <div class="form-group">
        <label for="date">Filtrer par mois :</label>
        <select id="date" name="date" bind:value={date} class="form-control">
          {#each periods as period}
            <option
              value={format(period, 'yyyy-MM-dd')}
              selected={format(period, 'yyyy-MM') === format(new Date(date), 'yyyy-MM')}>
              {format(period, 'MMMM yyyy', {locale: fr})}
            </option>
          {/each}
        </select>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label for="projectId">Filtrer par projet :</label>
        <select
          id="projectId"
          name="projectId"
          bind:value={projectId}
          class="form-control">
          <option value={null}>-- Tous les projets --</option>
          {#each projects as project}
            <option value={project.id} selected={projectId === project.id}>
              [{project.customer.name}] {project.name}
            </option>
          {/each}
        </select>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label for="userId">Filtrer par coopérateur :</label>
        <select
          id="userId"
          name="userId"
          bind:value={userId}
          class="form-control">
          {#each users as user}
            <option value={user.id} selected={userId === user.id}>
              {`${user.lastName} ${user.firstName}`}
            </option>
          {/each}
        </select>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="float-right">
        <button type="submit" class="btn btn-primary">Rechercher</button>
        <button type="button" class="btn btn-primary ml-1">Exporter</button>
      </div>
    </div>
  </div>
</form>
