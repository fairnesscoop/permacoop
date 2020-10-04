<script>
  import {goto, stores} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {post} from '../../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';

  const { session } = stores();

  let title = 'Ajouter un TJM';
  let errors = [];

  const onSave = async e => {
    try {
      await post('daily_rates', e.detail, $session.user.apiToken);

      goto('/accounting/daily_rates');
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
    items={[{title: 'Gestion & Comptabilité'}, {title: 'TJM', path: 'accounting/daily_rates'}, {title}]} />
  <ServerErrors {errors} />
  <Form on:save={onSave} />
</div>
