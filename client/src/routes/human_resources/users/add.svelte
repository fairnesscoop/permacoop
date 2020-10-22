<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {post} from '../../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  let title = 'Ajouter un coopérateur - salarié';
  let errors = [];
  let loading = false;

  const onSave = async e => {
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
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title: 'RH'}, {title: 'Coopérateurs - salariés', path: 'human_resources/users'}, {title}]} />
<ServerErrors {errors} />
<H4Title {title} />
<Form on:save={onSave} {loading} />
