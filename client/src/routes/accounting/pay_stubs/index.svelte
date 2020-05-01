<script>
  import {onMount} from 'svelte';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import SecuredView from '../../../components/SecuredView.svelte';
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import {ROLE_COOPERATOR, ROLE_ACCOUNTANT} from '../../../utils/roles';

  let roles = [ROLE_COOPERATOR, ROLE_ACCOUNTANT];
</script>

<svelte:head>
  <title>Permacoop - Fiches de paies</title>
</svelte:head>

<SecuredView {roles}>
  <div class="col-md-12">
    <Breadcrumb items={[{title: 'Comptabilité'}, {title: 'Fiches de paies'}]} />
    <SecuredLink
      className="btn btn-primary mb-3"
      href="accounting/pay_stubs/add"
      {roles}>
      + Ajouter une fiche de paie
    </SecuredLink>
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Date</th>
          <th>Utilisateur</th>
          <th />
        </tr>
      </thead>
      <tbody />
    </table>
  </div>
</SecuredView>
