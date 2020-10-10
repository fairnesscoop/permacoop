<script>
  import {onMount} from 'svelte';
  import {goto, stores} from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import H4Title from '../../components/H4Title.svelte';
  import {get, put} from '../../utils/axios';
  import sessionProxy from '../proxy';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';

  const { session } = stores();

  let title = 'Mon compte';
  let errors = [];
  let loading = false;
  let data = {};

  onMount(async () => {
    ({data} = await get('users/me', {}, $session.user.apiToken));
  });

  const onSave = async e => {
    try {
      loading = true;
      const {data} = await put('users/me', e.detail, $session.user.apiToken);
      await sessionProxy('POST', { ...data, scope: data.role });
      $session.user = {
        ...$session.user,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      };
      goto('/');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title}]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form {...data} {loading} on:save={onSave} />
