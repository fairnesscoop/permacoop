<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import { post } from '../../../utils/axios';
  import Form from './_AddForm.svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  let title = $_('human_resources.users.add.title');
  let errors = [];
  let loading = false;

  const onSave = async (e) => {
    try {
      loading = true;
      await post('users', e.detail);
      goto('/human_resources/users');
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
  items="{[
    { title: $_('human_resources.breadcrumb') },
    { title: $_('human_resources.users.title'), path: 'human_resources/users' },
    { title }
  ]}" />
<ServerErrors errors="{errors}" />
<H4Title title="{title}" />
<Form on:save="{onSave}" loading="{loading}" />
