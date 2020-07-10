<script>
  import { goto, stores } from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import { post } from '../../../utils/axios';
  import Form from './_Form.svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';

  let title = 'Demande de congé';
  let errors = [];

  const { session } = stores();

  const onSave = async e => {
    try {
      await post('holidays', e.detail, $session.user.apiToken);

      return goto('/human_resources/holidays');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb
    items={[{ title: 'RH' }, { title: 'Congés', path: 'human_resources/holidays' }, { title }]} />
  <ServerErrors {errors} />
  <Form on:save={onSave} />
</div>
