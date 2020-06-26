<script context="module">
  import {client as axios} from '../../../utils/axios';

  export const preload = async ({params}) => {
    const {data} = await axios.get(`users/${params.id}/administrative`);

    return {
      user: {
        id: params.id,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        userAdministrative: {
          annualEarnings: data.annualEarnings,
          contract: data.contract,
          executivePosition: data.executivePosition,
          healthInsurance: data.healthInsurance,
          joiningDate: data.joiningDate,
          leavingDate: data.leavingDate,
          transportFee: data.transportFee,
        },
      },
    };
  };
</script>

<script>
  import {goto} from '@sapper/app';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import EditForm from './_EditForm.svelte';
  import {errorNormalizer} from '../../../normalizer/errors';
  import SecuredView from '../../../components/SecuredView.svelte';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import {ROLE_COOPERATOR} from '../../../constants/roles';

  export let user;

  let title = `Édition du salarié "${user.firstName} ${user.lastName}"`;
  let errors = [];

  const onSave = async e => {
    try {
      await axios.put(`users/${user.id}/administrative`, e.detail);

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
    <EditForm role={user.role} userAdministrative={user.userAdministrative} on:save={onSave} />
  </div>
</SecuredView>
