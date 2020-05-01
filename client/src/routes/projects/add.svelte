<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../components/Breadcrumb.svelte';
  import {client as axios} from '../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../normalizer/errors';
  import ServerErrors from '../../components/ServerErrors.svelte';
  import SecuredView from '../../components/SecuredView.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../constants/roles';

  let title = 'Ajouter un projet';
  let errors = [];

  const onSave = async e => {
    try {
      await axios.post('projects', e.detail);

      return goto('/projects');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<SecuredView roles={[ROLE_COOPERATOR, ROLE_EMPLOYEE]}>
  <div class="col-md-12">
    <Breadcrumb items={[{title: 'Projets', path: 'projects'}, {title}]} />
    <ServerErrors {errors} />
    <Form on:save={onSave} />
  </div>
</SecuredView>
