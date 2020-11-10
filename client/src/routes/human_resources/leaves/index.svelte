<script>
  import { _ } from 'svelte-i18n';
  import H4Title from '../../../components/H4Title.svelte';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import AddLink from '../../../components/links/AddLink.svelte';
  
  let title = $_('human_resources.leaves.title');
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items="{[{ title: $_('human_resources.breadcrumb') }, { title }]}" />
<div class="inline-flex items-center">
  <H4Title title="{title}" />
  <AddLink
    href="{'/human_resources/leaves/requests/add'}"
    value="{$_('human_resources.leaves.requests.add.title')}" />
</div>
