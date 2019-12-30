<script>
  import {onMount} from 'svelte';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import ActivityDetail from '../../components/activity/ActivityDetail.svelte';
  import {client as axios} from '../../utils/axios';

  let payload = {};

  onMount(async () => {
    let {data} = await axios.get('activities', {
      params: {
        userId: '3fbf06f8-73b9-4946-8c79-8547e52f3595',
        date: new Date()
      }
    });
    payload = data;
  });
</script>

<svelte:head>
  <title>CoopERP - CRA</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'CRA'}]} />
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Date</th>
        <th>Activités</th>
        <th />
      </tr>
    </thead>
    {#if payload.totalTimeSpent}
      <tbody>
        {#each payload.days as day (day.date)}
          <ActivityDetail {day} />
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3">Total: {payload.totalTimeSpent / 100}</th>
        </tr>
      </tfoot>
    {/if}
  </table>
</div>
