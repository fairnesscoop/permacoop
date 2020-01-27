<script context="module">
  export const preload = ({query}) => {
    return {
      filters: {
        date: query.date ? new Date(query.date) : new Date(),
        projectId: query.projectId ? query.projectId : null,
        userId: query.userId ? query.userId : null
      }
    };
  };
</script>

<script>
  import {onMount} from 'svelte';
  import {user} from '../../store';
  import {client as axios} from '../../utils/axios';
  import Filters from './_Filters.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import Loader from '../_components/Loader.svelte';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import RowDetail from './_RowDetail.svelte';

  export let filters;

  let loading = false;
  let errors = [];
  let data = {};
  let isLoggedUser = false;

  const fetchActivities = async params => {
    try {
      loading = true;
      isLoggedUser = params.userId === $user.id;
      ({data} = await axios.get('activities', {params}));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    if (!filters.userId) {
      filters.userId = $user.id;
    }

    fetchActivities(filters);
  });

  const onFilter = e => {
    fetchActivities(e.detail);
  };
</script>

<svelte:head>
  <title>CoopERP - CRA</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'CRA'}]} />
  <ServerErrors {errors} />
  <Filters {...filters} on:filter={onFilter} />
  <Loader {loading} />
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
          <RowDetail {day} {isLoggedUser} />
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3">Total: {data.totalTimeSpent / 100} jours</th>
        </tr>
      </tfoot>
    {/if}
  </table>
</div>
