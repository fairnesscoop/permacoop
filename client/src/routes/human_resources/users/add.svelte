<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {client as axios} from '../../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import SecuredView from '../../../components/SecuredView.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import {ROLE_COOPERATOR} from '../../../constants/roles';

  let title = 'Ajouter un salarié';
  let errors = [];

  const onSave = async e => {
    try {
      await axios.post('users', e.detail);

      return goto('/human_resources/users');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<SecuredView roles={[ROLE_COOPERATOR]}>
  <div class="col-md-12">
    <Breadcrumb
      items={[{title: 'RH'}, {title: 'Salariés', path: 'human_resources/users'}, {title}]} />
    <ServerErrors {errors} />
    <Form on:save={onSave} />
  </div>
</SecuredView>
