<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import SecuredView from '../_components/SecuredView.svelte';
  import SecuredLink from '../_components/SecuredLink.svelte';
  import Loader from '../_components/Loader.svelte';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import RowDetail from './_RowDetail.svelte';

  let title = 'Utilisateurs';
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
  <title>Permacoop - {title}</title>
</svelte:head>

<SecuredView roles={['cooperator', 'employee']}>
  <div class="col-md-12">
    <Breadcrumb items={[{title}]} />
    <ServerErrors {errors} />
    <SecuredLink
      className="btn btn-primary mb-3"
      href="users/add"
      roles={['cooperator']}>
      + Ajouter un utilisateur
    </SecuredLink>
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Date d'entrée</th>
          <th>Role</th>
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
</SecuredView>
