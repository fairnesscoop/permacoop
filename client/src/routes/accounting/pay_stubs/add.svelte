<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import {client as axios} from '../../../utils/axios';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import SecuredView from '../../../components/SecuredView.svelte';

  let title = 'Ajouter une fiche de paie';
  let errors = [];

  const onSave = async e => {
    try {
      await axios.post('pay_stubs', e.detail);

      return goto('/accounting/pay_stubs');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>Permacoop - {title}</title>
</svelte:head>

<SecuredView roles={['cooperator', 'accountant']}>
  <div class="col-md-12">
    <Breadcrumb
      items={[{title: 'Comptabilité'}, {title: 'Fiches de paies', path: 'accounting/pay_stubs'}, {title}]} />
    <ServerErrors {errors} />
    <Form on:save={onSave} />
  </div>
</SecuredView>
