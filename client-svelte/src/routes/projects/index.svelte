<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import Loader from '../_components/Loader.svelte';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import RowDetail from './_RowDetail.svelte';

  let pageTitle = 'Projets';
  let loading = true;
  let errors = [];
  let data = [];

  onMount(async () => {
    try {
      ({data} = await axios.get('projects'));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>CoopERP - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: pageTitle}]} />
  <ServerErrors {errors} />
  <a class="btn btn-primary mb-3" href="projects/add">+ Ajouter un projet</a>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Projets</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data as project (project.id)}
        <RowDetail {project} />
      {/each}
    </tbody>
  </table>
  <Loader {loading} />
</div>
