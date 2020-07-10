<script>
  import { goto, stores } from '@sapper/app';
  import { post } from '../../utils/axios';
  import { errorNormalizer } from '../../normalizer/errors';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import ServerErrors from '../../components/ServerErrors.svelte';

  const { session } = stores();

  let title = 'Ajouter une mission';
  let errors = [];

  const onSave = async e => {
    try {
      await post('tasks', e.detail, $session.user.apiToken);

      return goto('/tasks');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{ title: 'Missions', path: 'tasks' }, { title }]} />
  <ServerErrors {errors} />
  <Form on:save={onSave} />
</div>
