<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import AddLink from 'components/links/AddLink.svelte';
  import { get } from 'utils/axios';
  import Table from './_Table.svelte';

  const title = $_('human_resources.meal_tickets.title', {
    values: {
      month: format(new Date(), 'MMMM yyyy', { locale: fr }),
    },
  });

  let errors;
  let mealTicketsRemovals = [];

  onMount(async () => {
    try {
      mealTicketsRemovals = (await get('meal-tickets')).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title: $_('human_resources.breadcrumb') }, { title: $_('human_resources.meal_tickets.breadcrumb') }]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/human_resources/meal_tickets/add'} value={$_('human_resources.meal_tickets.add.title')} />
</div>
<Table items={mealTicketsRemovals} />
