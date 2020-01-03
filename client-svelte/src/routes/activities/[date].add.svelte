<script context="module">
  export const preload = ({params}) => {
    return {date: params.date};
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import {client as axios} from '../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import {dateNormalizer} from '../../normalizer/date';
  import ServerErrors from '../_components/ServerErrors.svelte';

  export let date;

  let pageTitle = `Activité du ${dateNormalizer(date)}`;
  let errors = [];

  const onSave = async e => {
    try {
      await axios.post('activities', e.detail);

      return goto('/activities');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>CoopERP - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb
    items={[{title: 'CRA', path: 'activities'}, {title: pageTitle}]} />
  <ServerErrors {errors} />
  <Form on:save={onSave} {date} />
</div>
