<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import Breadcrumb from '../../components/Breadcrumb.svelte';

  let customers = [];

  onMount(async () => {
    let {data} = await axios.get('customers');
    customers = data;
  });
</script>

<svelte:head>
  <title>CoopERP - Clients</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'Clients'}]} />
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Client</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each customers as customer (customer.id)}
        <tr>
          <td>{customer.name}</td>
          <td>
            <a
              class="btn btn-outline-secondary btn-sm"
              href={`/projects/${customer.id}/edit`}>
              Modifier
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
