<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import { get } from 'utils/axios';
  import Table from './_Table.svelte';

  const month = format(new Date(), 'MMMM yyyy', { locale: fr });

  const title = $_('human_resources.payslips.title', {
    values: {
      month,
    },
  });

  let errors;
  let payslipElements = [];

  onMount(async () => {
    try {
      ({ data: payslipElements } = await get('payslips'));
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const getCsvAsbase64 = async () => {
    try {
      const csv = await get('payslips.csv');
      const csvFile = new Blob([csv.data], { type: 'text/csv' });
      return window.URL.createObjectURL(csvFile);
    } catch (e) {
      errors = errorNormalizer(e);
      return "#";
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items={[{ title: $_('human_resources.breadcrumb') }, { title: $_('human_resources.payslips.breadcrumb') }]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  {#await getCsvAsbase64() then csvObjectUrl}
    <a
      href={csvObjectUrl}
      download={`Fairness - Éléments de paie - ${month.replace(' ', '-')}.csv`}
      class="px-2 py-1 mb-6 ml-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
      {$_('human_resources.payslips.download')}
    </a>
  {/await}

  <a
    href="https://gitlab.fairness.coop/fairness/documentation/-/wikis/Paiement-des-salaires"
    class="px-2 py-1 mb-6 ml-2 text-sm font-medium leading-5 bg-purple-200 border rounded-lg"
    rel="noreferrer"
    target="_blank">
    Voir le Wiki <span aria-hidden="true">↗</span>
  </a>
</div>
<Table items={payslipElements} />
