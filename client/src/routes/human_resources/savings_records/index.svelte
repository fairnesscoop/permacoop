<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';
  import AddLink from 'components/links/AddLink.svelte';
  import ServerErrors from 'components/ServerErrors.svelte';
  import Table from './_Table.svelte';

  const title = $_('human_resources.savings_records.title');
  let errors = [];
  let items = [];

  onMount(async () => {
    try {
      items = (await get('users/savings-records')).data;
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
  <AddLink href={'/human_resources/savings_records/add'} value={$_('human_resources.savings_records.add.title')} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table {items} />
  </div>
</div>
