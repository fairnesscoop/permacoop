<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import Loader from '../_components/Loader.svelte';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import RowDetail from './_RowDetail.svelte';

  let title = 'Coopérateurs';
  let loading = true;
  let errors = [];
  let data = [];

  onMount(async () => {
    try {
      ({data} = await axios.get('users'));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>CoopERP - {title}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title}]} />
  <ServerErrors {errors} />
  <a class="btn btn-primary mb-3" href="users/add">+ Ajouter un coopérateur</a>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Prénom</th>
        <th>Nom</th>
        <th>Adresse e-mail</th>
      </tr>
    </thead>
    <tbody>
      {#each data as user (user.id)}
        <RowDetail {user} />
      {/each}
    </tbody>
  </table>
  <Loader {loading} />
</div>
