<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import Loader from '../_components/Loader.svelte';
  import ServerErrors from '../_components/ServerErrors.svelte';
  import Breadcrumb from '../_components/Breadcrumb.svelte';
  import RowDetail from './_RowDetail.svelte';
  import SecuredView from '../_components/SecuredView.svelte';
  import SecuredLink from '../_components/SecuredLink.svelte';

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
  <title>Permacoop - {pageTitle}</title>
</svelte:head>

<SecuredView roles={['cooperator', 'employee']}>
  <div class="col-md-12">
    <Breadcrumb items={[{title: pageTitle}]} />
    <ServerErrors {errors} />
    <SecuredLink
      className="btn btn-primary mb-3"
      href="projects/add"
      roles={['cooperator', 'employee']}>
      + Ajouter un projet
    </SecuredLink>
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Projet</th>
          <th>Client</th>
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
</SecuredView>
