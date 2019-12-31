<script>
  import {dateNormalizer} from '../../normalizer/date';
  export let day;
</script>

<style>
  tr.disabled {
    background-color: rgba(0, 0, 0, 0.05);
  }
</style>

<tr class={day.isWeekend ? 'disabled' : ''}>
  <td>{dateNormalizer(day.date)}</td>
  <td>
    {#each day.activities as activity}
      <div>
        <span class="badge badge-success">{activity.taskName}</span>
        <span class="badge badge-success">{activity.time / 100}</span>
        {activity.projectName}
      </div>
    {/each}
  </td>
  <td>
    {#if !day.isWeekend}
      <a
        class="btn btn-outline-secondary btn-sm"
        href={`/activities/${day.date}/add`}>
        +
      </a>
    {/if}
  </td>
</tr>
