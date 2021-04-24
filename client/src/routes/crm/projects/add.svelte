<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { post } from 'utils/axios';
  import Form from './_Form.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';

  let title = $_('crm.projects.add.title');
  let loading = false;
  let errors = [];

  const onSave = async (e) => {
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
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items={[{ title: $_('crm.breadcrumb') }, { title: $_('crm.projects.title'), path: '/crm/projects' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form {loading} on:save={onSave} />
