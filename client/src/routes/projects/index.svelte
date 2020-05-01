<script>
  import {onMount} from 'svelte';
  import {client as axios} from '../../utils/axios';
  import {errorNormalizer} from '../../normalizer/errors';
  import Loader from '../../components/Loader.svelte';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import SecuredView from '../../components/SecuredView.svelte';
  import SecuredLink from '../../components/SecuredLink.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../utils/roles';

  let title = 'Projets';
  let loading = true;
  let errors = [];
  let data = [];
  let roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];

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
  <title>Permacoop - {title}</title>
</svelte:head>

<SecuredView {roles}>
  <div class="col-md-12">
    <Breadcrumb items={[{title}]} />
    <ServerErrors {errors} />
    <SecuredLink className="btn btn-primary mb-3" href="projects/add" {roles}>
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
          <tr>
            <td>{project.name}</td>
            <td>{project.customer.name}</td>
            <td>
              <SecuredLink
                className="btn btn-outline-secondary btn-sm"
                href={`/projects/${project.id}/edit`}
                {roles}>
                Modifier
              </SecuredLink>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <Loader {loading} />
  </div>
</SecuredView>
