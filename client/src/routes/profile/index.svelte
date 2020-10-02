<script context="module">
  export const preload = async ({}, {user}) => {
    return {
      token: user.apiToken
    };
  };
</script>

<script>
  import {onMount} from 'svelte';
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import {get, put} from '../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';

  export let token;

  let title = 'Mon profil';
  let errors = [];
  let data = {};

  onMount(async () => {
    ({data} = await get('users/me', {}, token));
  });

  const onSave = async e => {
    try {
      await put('users/me', e.detail, token);

      goto('/');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title}]} />
  <ServerErrors {errors} />
  <Form {...data} on:save={onSave} />
</div>
