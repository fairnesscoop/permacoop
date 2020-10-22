<script>
  import {goto} from '@sapper/app';
  import H4Title from '../../../components/H4Title.svelte';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {post} from '../../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';  

  let title = 'Ajouter une mission';
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
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title: 'Gestion & Comptabilité'}, {title: 'Missions', path: '/accounting/tasks'}, {title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form on:save={onSave} {loading} />
