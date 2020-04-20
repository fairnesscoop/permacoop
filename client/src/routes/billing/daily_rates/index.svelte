<script>
  import {onMount} from 'svelte';
  import Breadcrumb from '../../_components/Breadcrumb.svelte';
</script>

<svelte:head>
  <title>Permacoop - TJM</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'Facturation'}, {title: 'TJM'}]} />
  <a class="btn btn-primary mb-3" href="billing/daily_rates/add">
    + Ajouter un TJM
  </a>
</div>
