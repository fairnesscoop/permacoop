<script>
  import {goto, stores} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {post} from '../../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  const { session } = stores();

  let title = 'Demande de congé';
  let loading = false;
  let errors = [];

  const onSave = async e => {
    try {
      loading = true;
      await post('holidays', e.detail, $session.user.apiToken);
      goto('/human_resources/holidays');
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

<Breadcrumb items={[{title: 'RH'}, {title: 'Congés', path: 'human_resources/holidays'}, {title}]} />
<ServerErrors {errors} />
<H4Title {title} />
<Form on:save={onSave} {loading} />
