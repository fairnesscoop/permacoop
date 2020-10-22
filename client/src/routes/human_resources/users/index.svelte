<script>
  import {onMount} from 'svelte';
  import {get} from '../../../utils/axios';
  import {errorNormalizer} from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import H4Title from '../../../components/H4Title.svelte';
  import AddLink from '../../../components/AddLink.svelte';
  import Table from './_Table.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';

  let title = 'Coopérateurs - salariés';
  let errors = [];
  let data = [];

  onMount(async () => {
    try {
      ({data} = await get('users', {params: {withAccountant: true}}));
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title: 'RH'}, {title}]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/human_resources/users/add'} value={'Ajouter'} />
</div>
<Table users={data} />
