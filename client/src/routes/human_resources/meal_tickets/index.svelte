<script>
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import { _ } from 'svelte-i18n';
  import H4Title from '../../../components/H4Title.svelte';
  import { onMount } from 'svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import { get, post } from '../../../utils/axios';
  import Table from './_Table.svelte';
  import Form from './_Form.svelte';
  let title = $_('human_resources.meal_tickets.title');

  let mealTicketsSummaries = [];
  let errors;

  const fetchMealTicketsSummaries = async () => {
    try {
      mealTicketsSummaries = (await get('meal-tickets/count')).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  const saveMealTicketException = async (e) => {
    try {
      await post('meal-tickets-removals', {
        date: e.detail.exceptionDate,
      });
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  onMount(async () => {
    await fetchMealTicketsSummaries();
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title: $_('human_resources.breadcrumb') }, { title }]} />

<ServerErrors {errors} />

<H4Title title={$_('human_resources.meal_tickets.available_meal_tickets')} />
<Table {mealTicketsSummaries} />

<H4Title
  title={$_('human_resources.meal_tickets.do_not_want_to_receive_meal_ticket')} />

<Form on:save={saveMealTicketException} />
