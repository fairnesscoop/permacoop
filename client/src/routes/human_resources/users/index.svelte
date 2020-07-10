<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { get } from '../../../utils/axios';
  import { errorNormalizer } from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import Loader from '../../../components/Loader.svelte';
  import Table from './_Table.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import { ROLE_COOPERATOR, ROLE_EMPLOYEE } from '../../../constants/roles';

  let title = 'Salariés';
  let loading;
  let errors = [];
  let data = [];
  let roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];

  const session = stores();

  onMount(async () => {
    try {
      loading = true;
      ({ data } = await get(
        'users',
        { params: { withAccountant: true } },
        $session.user.apiToken
      ));
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

<div class="col-md-12">
  <Breadcrumb items={[{ title: 'RH' }, { title }]} />
  <ServerErrors {errors} />
  <div class="row">
    <div class="col-md-8">
      <h3>
        {title}
        <small>({data.length})</small>
      </h3>
    </div>
    <div class="col-md-4">
      <SecuredLink
        className="btn btn-primary float-right mb-3"
        href="human_resources/users/add"
        {roles}>
        + Ajouter un salarié
      </SecuredLink>
    </div>
  </div>
  <Loader {loading} />
  <Table users={data} {roles} />
</div>
