<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';
  import AddLink from 'components/links/AddLink.svelte';
  import Table from './_Table.svelte';
  import ServerErrors from 'components/ServerErrors.svelte';

  let title = $_('human_resources.users.title');
  let errors = [];
  let data = [];

  onMount(async () => {
    try {
      ({ data } = await get('users', { params: { withAccountant: true } }));
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title: $_('human_resources.breadcrumb') }, { title }]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/human_resources/users/add'} value={$_('common.form.add')} />
</div>
<Table users={data} />
