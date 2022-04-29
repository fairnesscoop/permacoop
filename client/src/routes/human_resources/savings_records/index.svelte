<script>
  import { _ } from 'svelte-i18n';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';
  import AddLink from 'components/links/AddLink.svelte';

  const title = $_('human_resources.savings_records.title');
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title: $_('human_resources.breadcrumb') }, { title }]} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/human_resources/savings_records/add'} value={$_('human_resources.savings_records.add.title')} />
</div>
