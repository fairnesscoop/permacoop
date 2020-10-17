<script>
  import SecuredLink from '../../components/SecuredLink.svelte';

  export let items;
  export let roles;
</script>

<table class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th>Projet</th>
      <th>Client</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each items as project (project.id)}
      <tr>
        <td>{project.name}</td>
        <td>{project.customer.name}</td>
        <td>
          <SecuredLink
            className="btn btn-outline-secondary btn-sm"
            href="{`/projects/${project.id}/edit`}"
            roles="{roles}"
          >
            Modifier
          </SecuredLink>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
