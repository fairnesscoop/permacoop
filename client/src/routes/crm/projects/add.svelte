<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {post} from '../../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  let title = 'Ajouter un projet';
  let loading = false;
  let errors = [];

  const onSave = async e => {
    try {
      loading = true;
      await post('projects', e.detail);
      goto('/crm/projects');
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

<Breadcrumb items={[{title: 'CRM'}, {title: 'Projets', path: '/crm/projects'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form {loading} on:save={onSave} />
