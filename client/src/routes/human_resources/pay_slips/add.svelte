<script>
  import {goto, stores} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {post} from '../../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  const { session } = stores();

  let title = 'Ajouter une fiche de paie';
  let errors = [];
  let loading = false;

  const onSave = async e => {
    try {
      loading = true;
      await post('pay_slips', e.detail, $session.user.apiToken);
      goto('/human_resources/pay_slips');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb
  items={[{title: 'RH'}, {title: 'Fiches de paies', path: 'human_resources/pay_slips'}, {title}]} />
<ServerErrors {errors} />
<H4Title {title} />
<Form on:save={onSave} {loading} />
