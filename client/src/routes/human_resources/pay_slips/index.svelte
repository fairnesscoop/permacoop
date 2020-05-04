<script>
  import {onMount} from 'svelte';
  import filesize from 'filesize';
  import {format} from 'date-fns';
  import {fr} from 'date-fns/locale';
  import {user} from '../../../store';
  import {errorNormalizer} from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import SecuredView from '../../../components/SecuredView.svelte';
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import Loader from '../../../components/Loader.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import {client as axios} from '../../../utils/axios';
  import {ROLE_COOPERATOR, ROLE_ACCOUNTANT} from '../../../constants/roles';

  let roles = [ROLE_COOPERATOR, ROLE_ACCOUNTANT];
  let data = [];
  let loading = true;
  let errors = [];

  onMount(async () => {
    try {
      ({data} = await axios.get('pay_slips'));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Permacoop - Fiches de paies</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'RH'}, {title: 'Fiches de paies'}]} />
  <ServerErrors {errors} />
  <SecuredLink
    className="btn btn-primary mb-3"
    href="human_resources/pay_slips/add"
    {roles}>
    + Ajouter une fiche de paie
  </SecuredLink>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Date</th>
        <th>Salarié</th>
        <th>Fichier</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data as paySlip (paySlip.id)}
        <tr>
          <td>{format(new Date(paySlip.date), 'MMMM yyyy', {locale: fr})}</td>
          <td>{paySlip.user.firstName} {paySlip.user.lastName}</td>
          <td>{paySlip.file.originalName}</td>
          <td>
            {#if $user.id === paySlip.user.id}
              <a class="btn btn-outline-secondary btn-sm" href="d">
                Télécharger ({filesize(paySlip.file.size)})
              </a>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Loader {loading} />
</div>
