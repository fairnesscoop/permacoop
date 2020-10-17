<script>
  import { onMount } from 'svelte';
  import { goto, stores } from '@sapper/app';
  import { post } from '../../../utils/axios';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';

  const { session } = stores();

  let errors = [];
  let title = 'Créer un nouveau devis';

  const onSave = async (e) => {
    try {
      await post('quotes', e.detail, $session.user.apiToken);

      goto('/accounting/quotes');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb
    items="{[{ title: 'Gestion & Comptabilité' }, { path: 'accounting/quotes', title: 'Devis' }, { title }]}"
  />
  <ServerErrors errors="{errors}" />
  <Form on:save="{onSave}" />
</div>
