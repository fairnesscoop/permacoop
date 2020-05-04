<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {client as axios} from '../../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import SecuredView from '../../../components/SecuredView.svelte';
  import {ROLE_COOPERATOR, ROLE_ACCOUNTANT} from '../../../constants/roles';

  let title = 'Ajouter une fiche de paie';
  let errors = [];

  const onSave = async e => {
    try {
      await axios.post('pay_slips', e.detail);

      return goto('/human_resources/pay_slips');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<SecuredView roles={[ROLE_COOPERATOR, ROLE_ACCOUNTANT]}>
  <div class="col-md-12">
    <Breadcrumb
      items={[{title: 'RH'}, {title: 'Fiches de paies', path: 'human_resources/pay_slips'}, {title}]} />
    <ServerErrors {errors} />
    <Form on:save={onSave} />
  </div>
</SecuredView>
