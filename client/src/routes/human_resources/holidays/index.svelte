<script>
  import {onMount} from 'svelte';
  import {format} from 'date-fns';
  import {fr} from 'date-fns/locale';
  import {errorNormalizer} from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import SecuredView from '../../../components/SecuredView.svelte';
  import SecuredLink from '../../../components/SecuredLink.svelte';
  import Loader from '../../../components/Loader.svelte';
  import {client as axios} from '../../../utils/axios';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../../constants/roles';

  let roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];
  let data = [];
  let loading = true;
  let errors = [];

  onMount(async () => {
    try {
      ({data} = await axios.get('holidays'));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Permacoop - Congés</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'RH'}, {title: 'Congés'}]} />
  <ServerErrors {errors} />
  <SecuredLink
    className="btn btn-primary mb-3"
    href="human_resources/holidays/add"
    {roles}>
    + Demande de congé
  </SecuredLink>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Salarié</th>
        <th>Période</th>
        <th>Durée</th>
        <th>Type de congé</th>
        <th>Statut</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data as holiday (holiday.id)}
        <tr>
          <td>{holiday.user.firstName} {holiday.user.lastName}</td>
          <td>
            Du {format(new Date(holiday.startDate), 'dd/MM/yyyy', {locale: fr})}
            au {format(new Date(holiday.endDate), 'dd/MM/yyyy', {locale: fr})}
          </td>
          <td>{holiday.duration} jours</td>
          <td>{holiday.leaveType}</td>
          <td>
            <span class="badge badge-{holiday.status}">{holiday.status}</span>
          </td>
          <td>
            <SecuredLink
              className="btn btn-outline-secondary btn-sm"
              href={`/human_resources/holidays/${holiday.id}`}
              {roles}>
              Détail
            </SecuredLink>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <Loader {loading} />
</div>
