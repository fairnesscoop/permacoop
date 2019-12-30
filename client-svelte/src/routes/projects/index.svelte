<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import Breadcrumb from '../../components/Breadcrumb.svelte';

  let projects = [];

  onMount(async () => {
    let {data} = await axios.get('projects');
    projects = data;
  });
</script>

<svelte:head>
  <title>CoopERP - Projets</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'Projets'}]} />
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Client</th>
        <th>Projet</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each projects as project (project.id)}
        <tr>
          <td>{project.customer.name}</td>
          <td>{project.name}</td>
          <td>
            <a
              class="btn btn-outline-secondary btn-sm"
              href={`/projects/${project.id}/edit`}>
              Modifier
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
