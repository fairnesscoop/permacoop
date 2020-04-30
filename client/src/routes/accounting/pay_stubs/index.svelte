<script>
  import {onMount} from 'svelte';
  import Breadcrumb from '../../_components/Breadcrumb.svelte';
  import SecuredView from '../../_components/SecuredView.svelte';
  import SecuredLink from '../../_components/SecuredLink.svelte';
</script>

<svelte:head>
  <title>Permacoop - Fiches de paies</title>
</svelte:head>

<SecuredView roles={['cooperator', 'accountant']}>
  <div class="col-md-12">
    <Breadcrumb items={[{title: 'Comptabilité'}, {title: 'Fiches de paies'}]} />
    <SecuredLink
      className="btn btn-primary mb-3"
      href="accounting/pay_stubs/add"
      roles={['cooperator', 'accountant']}>
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
