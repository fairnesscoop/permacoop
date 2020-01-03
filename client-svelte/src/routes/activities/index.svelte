<script>
  import {onMount} from 'svelte';
  import {user} from '../../store';
  import {monthNormalizer} from '../../normalizer/date';
  import {errorNormalizer} from '../../normalizer/errors';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import Loader from '../_components/Loader.svelte';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import RowDetail from './_RowDetail.svelte';
  import {client as axios} from '../../utils/axios';

  let pageTitle = `CRA de ${monthNormalizer(new Date())}`;
  let loading = true;
  let errors = [];
  let data = {};

  onMount(async () => {
    try {
      ({data} = await axios.get('activities', {
        params: {
          userId: $user.id,
          date: new Date()
        }
      }));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>CoopERP - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: pageTitle}]} />
  <ServerErrors {errors} />
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Date</th>
        <th>Activités</th>
        <th />
      </tr>
    </thead>
    {#if data.totalTimeSpent >= 0}
      <tbody>
        {#each data.days as day (day.date)}
          <RowDetail {day} />
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3">Total: {data.totalTimeSpent / 100} jours</th>
        </tr>
      </tfoot>
    {/if}
  </table>
  <Loader {loading} />
</div>
