<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { goto, stores } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get, put } from 'utils/axios';
  import { format } from 'date-fns';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import EditOrUpdateForm from '../_Form.svelte';
  import Detail from './_Detail.svelte';

  export let id;

  let leaveRequest;
  let errors = [];
  let loading = false;
  let title = '';
  let user;

  const { session } = stores();

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`leave-requests/${leaveRequest.id}`, e.detail);
      goto('/human_resources/leaves/requests');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    try {
      leaveRequest = (await get(`leave-requests/${id}`)).data;
      user = leaveRequest.user;
      title = $_('human_resources.leaves.requests.view', {
        values: { user: `${user.firstName} ${user.lastName}` },
      });
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items={[{ title: $_('human_resources.breadcrumb') }, { title: $_('human_resources.leaves.title'), path: '/human_resources/leaves' }, { title: $_('human_resources.leaves.requests.title'), path: '/human_resources/leaves/requests' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
{#if leaveRequest}
  <EditOrUpdateForm
    on:save={onSave}
    {loading}
    startDate={format(new Date(leaveRequest.startDate), 'Y-MM-dd')}
    endDate={format(new Date(leaveRequest.endDate), 'Y-MM-dd')}
    startsAllDay={leaveRequest.startsAllDay}
    endsAllDay={leaveRequest.endsAllDay}
    comment={leaveRequest.comment}
    type={leaveRequest.type} />
{/if}
