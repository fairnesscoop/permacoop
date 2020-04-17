<script>
  import {createEventDispatcher, onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import {subMonths, format, compareDesc, eachMonthOfInterval} from 'date-fns';
  import {fr} from 'date-fns/locale';

  const dispatch = createEventDispatcher();

  export let userId;
  export let date;

  let data = [];
  let periods = eachMonthOfInterval({
    start: subMonths(new Date(), 6),
    end: new Date()
  }).sort(compareDesc);

  onMount(async () => {
    ({data} = await axios.get('users'));
  });

  const handleFilter = () => {
    const filters = {
      userId,
      date: format(new Date(date), 'yyyy-MM-dd')
    };

    const uri = new URLSearchParams(filters).toString();
    window.history.pushState({}, null, `/faircalendar?${uri}`);

    dispatch('filter', {...filters, date: new Date(date)});
  };
</script>

<style>
  form.filter {
    background: #e9ecef;
    padding: 0.75rem 1rem;
    margin-bottom: 20px;
    border-radius: 0.25rem;
  }
</style>

<form class="filter">
  <div class="row">
    <div class="col-md-6">
      <div class="form-group">
        <label for="date">Filtrer par mois :</label>
        <select
          id="date"
          name="date"
          bind:value={date}
          on:change={handleFilter}
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
    </div>
    <div class="col-md-6">
      <div class="form-group">
        <label for="userId">Filtrer par coopérateur :</label>
        <select
          id="userId"
          on:change={handleFilter}
          name="userId"
          bind:value={userId}
          class="form-control">
          {#each data as user}
            <option value={user.id} selected={userId === user.id}>
              {`${user.lastName} ${user.firstName}`}
            </option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</form>
