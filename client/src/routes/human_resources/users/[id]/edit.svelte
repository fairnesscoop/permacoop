<script context="module">
  import { get, put } from '../../../../utils/axios';

  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import EditForm from '../_EditForm.svelte';
  import { errorNormalizer } from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import { ROLE_COOPERATOR } from '../../../../constants/roles';
  import H4Title from '../../../../components/H4Title.svelte';

  export let id;
  let user;

  let title = '';
  let errors = [];
  let loading = true;

  onMount(async () => {
    try {
      ({ data: user } = await get(`users/${id}/administrative`));
      title = $_('human_resources.users.edit.title', { values: { name: `${user.firstName} ${user.lastName}` } });
    } catch (e) {
      errors = errorNormalizer(e);
    }
    loading = false;
  });

  const onSave = async e => {
    loading = true;
    try {
      await put(`users/${user.id}/administrative`, e.detail);

      return goto('/human_resources/users');
    } catch (e) {
      errors = errorNormalizer(e);
    }
    loading = false;
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
<ServerErrors {errors} />
<H4Title title={title} />

{#if user && user.isAdministrativeEditable}
<EditForm
  role={user.role}
  userAdministrative={user.administrativeView}
  {loading}
  on:save={onSave} />
{/if}
