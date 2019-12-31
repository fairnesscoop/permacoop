<script>
  import {onMount} from 'svelte';
  import {goto} from '@sapper/app';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import {client as axios} from '../../utils/axios';
  import Form from '../users/_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../_components/ServerErrors.svelte';

  let pageTitle = 'Mon profil';
  let errors = [];
  let data = {};

  onMount(async () => {
    ({data} = await axios.get('users/me'));
  });

  const onSave = async e => {
    try {
      await axios.put('users/me', e.detail);

      return goto('/');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>CoopERP - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: pageTitle}]} />
  <ServerErrors {errors} />
  <Form {...data} on:save={onSave} />
</div>
