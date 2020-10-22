<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {post} from '../../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  let loading = false;
  let title = 'Ajouter un TJM';
  let errors = [];

  const onSave = async e => {
    try {
      loading = true;
      await post('daily_rates', e.detail);
      goto('/accounting/daily_rates');
    } catch (e) {
      loading = false;
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title: 'Gestion & Comptabilité'}, {title: 'TJM', path: '/accounting/daily_rates'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form on:save={onSave} {loading} />
