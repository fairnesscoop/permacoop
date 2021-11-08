<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Form from '../_Form.svelte';

  export let id;

  let contact;
  let errors = [];
  let loading = false;
  let title = '';

  onMount(async () => {
    try {
      loading = true;
      contact = (await get(`contacts/${id}`)).data;
      title = $_('crm.contacts.view', {
        values: { name: `${contact.firstName} ${contact.lastName}` },
      });
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items={[{ title: $_('crm.breadcrumb') }, { title: $_('crm.contacts.title'), path: '/crm/contacts' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
{#if contact}
  <Form {loading} {contact} editable={false} />
{/if}
