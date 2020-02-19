<script>
  import {onMount} from 'svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import Loader from '../_components/Loader.svelte';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import RowDetail from './_RowDetail.svelte';
  import {client as axios} from '../../utils/axios';

  let pageTitle = 'Missions';
  let loading = true;
  let errors = [];
  let data = [];

  onMount(async () => {
    try {
      ({data} = await axios.get('tasks'));
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Permacoop - {pageTitle}</title>
</svelte:head>

<div class="col-md-12">
  <Breadcrumb items={[{title: pageTitle}]} />
  <ServerErrors {errors} />
  <a class="btn btn-primary mb-3" href="tasks/add">+ Ajouter une mission</a>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th>Mission</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data as task (task.id)}
        <RowDetail {task} />
      {/each}
    </tbody>
  </table>
  <Loader {loading} />
</div>
