<script context="module">
  export const preload = async ({query}) => {
    return {
      page: query.page || 1
    };
  };
</script>

<script>
  import {onMount} from 'svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import AddLink from '../../../components/AddLink.svelte';
  import H4Title from '../../../components/H4Title.svelte';
  import Table from './_Table.svelte';
  import {get} from '../../../utils/axios';
  import {historyPushState} from '../../../utils/url';
  import Pagination from '../../../components/Pagination.svelte';

  export let page;

  let title = 'Fiches de paies';
  let errors = [];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0
  };

  onMount(async () => {
    fetchPaySlips();
  });

  const changePage = async e => {
    page = e.detail;
    historyPushState('human_resources/pay_slips', {page});
    fetchPaySlips();
  };

  const fetchPaySlips = async () => {
    try {
      response = (await get('pay_slips', {params: {page}})).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - Permacoop</title>
</svelte:head>

<Breadcrumb items={[{title: 'RH'}, {title}]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/human_resources/pay_slips/add'} value={'Ajouter'} />
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
