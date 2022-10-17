<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { post } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Form from './_Form.svelte';

  const title = $_('human_resources.meal_tickets.add.title');
  let loading = false;
  let errors = [];

  const onSave = async (e) => {
    try {
      loading = true;
      await post('meal-tickets/removals', {
        date: e.detail.exceptionDate,
      });
      goto('/human_resources/meal_tickets');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items={[
    { title: $_('human_resources.breadcrumb') }, 
    { title: $_('human_resources.meal_tickets.breadcrumb'), path: '/human_resources/meal_tickets' },
    { title }
  ]}
/>
<H4Title {title} />
<ServerErrors {errors} />
<Form {loading} on:save={onSave} />
