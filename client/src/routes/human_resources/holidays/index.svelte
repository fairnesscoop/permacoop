<script>
  import {onMount} from 'svelte';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import SecuredView from '../../../components/SecuredView.svelte';
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../../constants/roles';

  let roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];
</script>

<svelte:head>
  <title>Permacoop - Congés</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'RH'}, {title: 'Congés'}]} />
  <SecuredLink
    className="btn btn-primary mb-3"
    href="human_resources/holidays/add"
    {roles}>
    + Demande de congé
  </SecuredLink>
</div>
