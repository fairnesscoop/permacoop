<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { post } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Form from './_Form.svelte';

  let title = $_('crm.contacts.add.title');
  let loading = false;
  let errors = [];

  const contact = {
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phoneNumber: '',
    notes: '',
  };

  const onSave = async (e) => {
    try {
      loading = true;
      await post('contacts', e.detail);
      goto('/crm/contacts');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items={[{ title: $_('crm.breadcrumb') }, { title: $_('crm.contacts.title'), path: '/crm/contacts' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form {loading} {contact} on:save={onSave} />
