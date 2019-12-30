<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import Breadcrumb from '../../components/Breadcrumb.svelte';

  let users = [];

  onMount(async () => {
    let {data} = await axios.get('users');
    users = data;
  });
</script>

<svelte:head>
  <title>CoopERP - Coopérateurs</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'Coopérateurs'}]} />
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Prénom</th>
        <th>Nom</th>
        <th>Adresse e-mail</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user (user.id)}
        <tr>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
