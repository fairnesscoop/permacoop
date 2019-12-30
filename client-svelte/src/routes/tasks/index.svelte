<script>
  import {onMount} from 'svelte';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import {client as axios} from '../../utils/axios';

  let tasks = [];

  onMount(async () => {
    let {data} = await axios.get('tasks');
    tasks = data;
  });
</script>

<svelte:head>
  <title>CoopERP - Missions</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'Missions'}]} />
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Mission</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each tasks as task (task.id)}
        <tr>
          <td>{task.name}</td>
          <td>
            <a
              class="btn btn-outline-secondary btn-sm"
              href={`/tasks/${task.id}/edit`}>
              Modifier
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
