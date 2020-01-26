<script>
  import {format} from 'date-fns';
  import {client as axios} from '../../utils/axios';
  import {fr} from 'date-fns/locale';
  export let day;
  export let isLoggedUser;
  $: day.activities;

  const handleDelete = activityId => {
    axios.delete(`activities/${activityId}`)
    day.activities = day.activities.filter(activity => activity.id !== activityId);
  };
</script>

<style>
  tr.disabled {
    background-color: rgba(0, 0, 0, 0.05);
  }
</style>

<tr class={day.isWeekend ? 'disabled' : ''}>
  <td>{format(new Date(day.date), 'EEEE dd MMMM yyyy', {locale: fr})}</td>
  <td>
    {#each day.activities as activity}
      <div>
        <span class="badge badge-success">{activity.taskName}</span>
        <span class="badge badge-success">{activity.time / 100}</span>
        {activity.projectName} <button class="btn btn-sm btn-danger" on:click={handleDelete(activity.id)} title="supprimer">x</button>
      </div>
    {/each}
  </td>
  <td>
    {#if !day.isWeekend && isLoggedUser}
      <a
        class="btn btn-outline-secondary btn-sm"
        href={`/activities/${day.date}/add`}>
        +
      </a>
    {/if}
  </td>
</tr>
