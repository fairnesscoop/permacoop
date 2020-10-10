<script context="module">
  export const preload = async ({query}, {user}) => {
    return {
      page: query.page || 1,
      token: user.apiToken
    };
  };
</script>

<script>
  import {onMount} from 'svelte';
  import {get} from '../../../utils/axios';
  import {errorNormalizer} from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import H4Title from '../../../components/H4Title.svelte';
  import AddLink from '../../../components/AddLink.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import Table from './_Table.svelte';
  import Pagination from '../../../components/Pagination.svelte';
  import {historyPushState} from '../../../utils/url';

  export let page;
  export let token;

  let title = 'Devis';
  let loading;
  let errors = [];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0
  };

  onMount(async () => {
    fetchQuotes();
  });

  const changePage = async e => {
    page = e.detail;
    historyPushState('accounting/quotes', {page});
    fetchQuotes();
  };

  const fetchQuotes = async () => {
    try {
      response = (await get('quotes', {params: {page}}, token)).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title: 'Gestion & Comptabilité'}, {title}]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/accounting/quotes/add'} value={'Créer'} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">  
    <Table items={response.items} />
  </div>
  <Pagination
    on:change={changePage}
    currentPage={page}
    totalItems={response.totalItems}
    pageCount={response.pageCount} />
</div>