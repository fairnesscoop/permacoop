<script>
  import {onMount} from 'svelte';
  import {goto} from '@sapper/app';
  import {client as axios} from '../../../utils/axios';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import Form from './_Form.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import SecuredView from '../../../components/SecuredView.svelte';
  import {ROLE_COOPERATOR, ROLE_EMPLOYEE} from '../../../constants/roles';

  let errors = [];
  let title = 'Créer un nouveau devis';

  const onSave = async e => {
    try {
      await axios.post('quotes', e.detail);

      return goto('/accounting/quotes');
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
    <Breadcrumb
      items={[{title: 'Comptabilité'}, {path: 'accounting/quotes', title: 'Devis'}, {title}]} />
    <ServerErrors {errors} />
    <Form on:save={onSave} />
  </div>
</SecuredView>
