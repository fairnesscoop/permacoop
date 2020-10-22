<script>
  import {onMount} from 'svelte';
  import {goto} from '@sapper/app';
  import {post} from '../../../utils/axios';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  let errors = [];
  let loading = false;
  let title = 'Créer un devis';

  const onSave = async e => {
    try {
      loading = true;
      await post('quotes', e.detail);
      goto('/accounting/quotes');
    } catch (e) {
      loading = false;
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title: 'Gestion & Comptabilité'}, {path: 'accounting/quotes', title: 'Devis'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form on:save={onSave} {loading} />
