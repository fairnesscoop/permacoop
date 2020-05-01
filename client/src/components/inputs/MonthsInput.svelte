<script>
  import {createEventDispatcher} from 'svelte';
  import {subMonths, format, compareDesc, eachMonthOfInterval} from 'date-fns';
  import {fr} from 'date-fns/locale';

  export let label = '';
  export let amount;
  export let date;

  const dispatch = createEventDispatcher();
  const handleChange = () => {
    dispatch('change', date);
  };
  const periods = eachMonthOfInterval({
    start: subMonths(new Date(), amount - 1),
    end: new Date()
  }).sort(compareDesc);
</script>

<div class="form-group">
  <label for="date">{label}</label>
  <select
    id="date"
    bind:value={date}
    on:change={handleChange}
    class="form-control">
    {#each periods as period}
      <option
        value={format(period, 'yyyy-MM-dd')}
        selected={format(period, 'yyyy-MM') === format(new Date(date), 'yyyy-MM')}>
        {format(period, 'MMMM yyyy', {locale: fr})}
      </option>
    {/each}
  </select>
</div>
