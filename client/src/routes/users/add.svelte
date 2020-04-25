<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import {client as axios} from '../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../_components/ServerErrors.svelte';

  let pageTitle = 'Ajouter un utilisateur';
  let errors = [];

  const onSave = async e => {
    try {
      await axios.post('users', e.detail);

      return goto('/users');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb
    items={[{title: 'Utilisateurs', path: 'users'}, {title: pageTitle}]} />
  <ServerErrors {errors} />
  <Form on:save={onSave} />
</div>
