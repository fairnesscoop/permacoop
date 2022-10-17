<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'date-fns';

  export let userLeaves;

  // TODO: factorize this function
  const formatDate = (date) => format(new Date(date), 'dd/MM/yyyy');
</script>

{#if userLeaves.totalDays > 0}
  <div><strong>{userLeaves.totalDays}</strong></div>
  {#each userLeaves.leaves as userLeave}
    <div>{formatDate(userLeave.startDate)} -> {formatDate(userLeave.endDate)}</div>
  {/each}
{/if}
