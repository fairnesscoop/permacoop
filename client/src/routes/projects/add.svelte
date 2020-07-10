<script>
  import { goto, stores } from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import { post } from '../../utils/axios';
  import Form from './_Form.svelte';
  import { errorNormalizer } from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';

  const { session } = stores();

  let title = 'Ajouter un projet';
  let errors = [];

  const onSave = async e => {
    try {
      await post('projects', e.detail, $session.user.apiToken);

      return goto('/projects');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{ title: 'Projets', path: 'projects' }, { title }]} />
  <ServerErrors {errors} />
  <Form on:save={onSave} />
</div>
