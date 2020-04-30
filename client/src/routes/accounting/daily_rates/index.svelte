<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../../utils/axios';
  import {errorNormalizer} from '../../../normalizer/errors';
  import Breadcrumb from '../../_components/Breadcrumb.svelte';
  import Loader from '../../_components/Loader.svelte';
  import ServerErrors from '../../_components/ServerErrors.svelte';
  import {format} from '../../../normalizer/money';
  import SecuredView from '../../_components/SecuredView.svelte';
  import SecuredLink from '../../_components/SecuredLink.svelte';

  let loading = true;
  let errors = [];
  let data = [];

  onMount(async () => {
    try {
      ({data} = await axios.get('daily_rates'));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Permacoop - TJM</title>
</svelte:head>

<SecuredView roles={['cooperator', 'employee']}>
  <div class="col-md-12">
    <Breadcrumb items={[{title: 'Comptabilité'}, {title: 'TJM'}]} />
    <ServerErrors {errors} />
    <SecuredLink
      className="btn btn-primary mb-3"
      roles={['cooperator', 'employee']}
      href="accounting/daily_rates/add">
      + Ajouter un TJM
    </SecuredLink>
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Utilisateur</th>
          <th>Mission</th>
          <th>Client</th>
          <th>Montant HT</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each data as dailyRate (dailyRate.id)}
          <tr>
            <td>{dailyRate.user.firstName} {dailyRate.user.lastName}</td>
            <td>{dailyRate.task.name}</td>
            <td>{dailyRate.customer.name}</td>
            <td>{format(dailyRate.amount)}</td>
            <td>
              <SecuredLink
                className="btn btn-outline-secondary btn-sm"
                roles={['cooperator', 'employee']}
                href={`accounting/daily_rates/${dailyRate.id}/edit`}>
                Modifier
              </SecuredLink>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <Loader {loading} />
  </div>
</SecuredView>
