<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import H4Title from '../../../components/H4Title.svelte';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import { post } from '../../../utils/axios';
  import Form from './_Form.svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';  

  let title = $_('accounting.tasks.add.title');
  let loading = false;
  let errors = [];

  const onSave = async e => {
    try {
      loading = true;
      await post('tasks', e.detail);
      goto('/accounting/tasks');
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

<Breadcrumb items={[{title: $_('accounting.breadcrumb')}, {title: $_('accounting.tasks.title'), path: '/accounting/tasks'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form on:save={onSave} {loading} />
