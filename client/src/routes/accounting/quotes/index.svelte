<script>
  import {onMount} from 'svelte';
  import Breadcrumb from '../../_components/Breadcrumb.svelte';
</script>

<svelte:head>
  <title>Permacoop - Devis</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: 'Comptabilité'}, {title: 'Devis'}]} />
  <a class="btn btn-primary mb-3" href="accounting/quotes/add">
    + Créer un nouveau devis
  </a>
</div>
