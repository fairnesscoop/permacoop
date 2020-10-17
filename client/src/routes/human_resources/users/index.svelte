<script context="module">
  export const preload = async ({}, { user }) => {
    return {
      token: user.apiToken,
    };
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { get } from '../../../utils/axios';
  import { errorNormalizer } from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import Loader from '../../../components/Loader.svelte';
  import Table from './_Table.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import { ROLE_COOPERATOR, ROLE_EMPLOYEE } from '../../../constants/roles';

  export let token;

  let title = 'Salariés';
  let loading = false;
  let errors = [];
  let data = [];

  onMount(async () => {
    try {
      loading = true;
      ({ data } = await get(
        'users',
        { params: { withAccountant: true } },
        token
      ));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items="{[{ title: 'RH' }, { title }]}" />
  <ServerErrors errors="{errors}" />
  <div class="row">
    <div class="col-md-8">
      <h3>{title} <small>({data.length})</small></h3>
    </div>
    <div class="col-md-4">
      <SecuredLink
        className="btn btn-primary float-right mb-3"
        href="human_resources/users/add"
        roles="{[ROLE_COOPERATOR, ROLE_EMPLOYEE]}">
        + Ajouter un salarié
      </SecuredLink>
    </div>
  </div>
  <Loader loading="{loading}" />
  <Table users="{data}" roles="{[ROLE_COOPERATOR, ROLE_EMPLOYEE]}" />
</div>
