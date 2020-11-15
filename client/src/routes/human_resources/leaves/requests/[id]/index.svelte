<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { goto, stores } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import { get, put } from '../../../../../utils/axios';
  import Breadcrumb from '../../../../../components/Breadcrumb.svelte';
  import { errorNormalizer } from '../../../../../normalizer/errors';
  import ServerErrors from '../../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../../components/H4Title.svelte';
  import GrayBadge from '../../../../../components/badges/GrayBadge.svelte';
  import Form from './_Form.svelte';

  export let id;

  let leaveRequest;
  let errors = [];
  let loading = false;
  let title = $_('human_resources.leaves.requests.view');
  const { session } = stores();

  onMount(async () => {
    try {
      leaveRequest = (await get(`leave-requests/${id}`)).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onModerate = async (type, comment) => {
    try {
      loading = true;
      await put(`leave-requests/${id}/${type}`, { comment });
      goto('/human_resources/leaves/requests');
    } catch (e) {
      console.error(e);
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };

  const formatDate = date => {
    return format(new Date(date), 'dd/MM/yyyy', { locale: fr });
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items="{[{ title: $_('human_resources.breadcrumb') }, { title: $_('human_resources.leaves.title'), path: '/human_resources/leaves' }, { title: $_('human_resources.leaves.requests.title'), path: '/human_resources/leaves/requests' }, { title }]}" />
<H4Title {title} />
<ServerErrors {errors} />
{#if leaveRequest}
  <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <p>{leaveRequest.user.firstName} {leaveRequest.user.lastName}</p>
    <p>
      {$_('human_resources.leaves.requests.period', {
        values: {
          from: formatDate(leaveRequest.startDate),
          to: formatDate(leaveRequest.endDate)
        }
      })}
      <GrayBadge
        value="{$_('common.days_duration', {
          values: { n: leaveRequest.duration }
        })}" />

    </p>
    {#if leaveRequest.comment}
      <em>{leaveRequest.comment}</em>
    {/if}

    {#if 'pending' === leaveRequest.status}
      {#if $session.user.id !== leaveRequest.user.id}
        <Form
          on:accept="{(event) => onModerate('accept', event.detail.comment)}"
          on:refuse="{(event) => onModerate('refuse', event.detail.comment)}"
          {loading}
        />
      {:else}
        <p class="p-2 mt-2 bg-gray-50 dark:text-gray-400 text-center">
          {$_('human_resources.leaves.requests.errors.cant_be_moderated')}
        </p>
      {/if}

    {:else}
      <div class="p-2 bg-gray-50 dark:text-gray-400 text-center">
        <p class="font-bold">
          {$_(`human_resources.leaves.requests.states.${leaveRequest.status}`)}
        </p>

        <em>
          {leaveRequest.moderator.firstName} {leaveRequest.moderator.lastName}
          {#if leaveRequest.moderationComment}
            : &laquo;{leaveRequest.moderationComment}&raquo;
          {/if}
        </em>

      </div>
    {/if}
  </div>
{/if}
