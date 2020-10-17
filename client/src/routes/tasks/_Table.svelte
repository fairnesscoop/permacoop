<script>
  import SecuredLink from '../../components/SecuredLink.svelte';

  export let items;
  export let roles;
</script>

<table class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th>Mission</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each items as task (task.id)}
      <tr>
        <td>{task.name}</td>
        <td>
          <SecuredLink
            className="btn btn-outline-secondary btn-sm"
            href="{`/tasks/${task.id}/edit`}"
            roles="{roles}"
          >
            Modifier
          </SecuredLink>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
