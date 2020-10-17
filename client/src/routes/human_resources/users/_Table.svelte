<script>
  import SecuredLink from '../../../components/SecuredLink.svelte';

  export let users;
  export let roles;
</script>

<table class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th>Prénom</th>
      <th>Nom</th>
      <th>Email</th>
      <th>Rôle</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each users as user (user.id)}
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <SecuredLink
            className="btn btn-outline-secondary btn-sm"
            href="{''}"
            roles="{roles}">
            Modifier
          </SecuredLink>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
