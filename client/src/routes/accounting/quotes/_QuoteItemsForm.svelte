<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'normalizer/money';
  import TrashIcon from 'components/icons/TrashIcon.svelte';
  import Input from 'components/inputs/Input.svelte';
  export let values = [];

  const addItem = () => {
    values.push({
      title: '',
      quantity: '',
      dailyRate: '',
    });

    values = values;
  };

  const removeItem = (index) => {
    values.splice(index, 1);
    values = values;
  };

  $: subTotal = values
    .map((value) => {
      return value.quantity * value.dailyRate;
    })
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
  $: vat = subTotal * 0.2;
  $: total = subTotal + vat;
</script>

<table class="mt-6 w-full whitespace-no-wrap">
  <thead>
    <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('accounting.quotes.form.description')}</th>
      <th class="px-4 py-3">{$_('accounting.quotes.form.quantity')}</th>
      <th class="px-4 py-3">{$_('accounting.quotes.form.daily_rate')}</th>
      <th class="px-4 py-3"></th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each values as value, index}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">
          <Input
            placeholder="{$_('accounting.quotes.form.description_placeholder')}"
            marginClass="{''}"
            bind:value="{value.title}"
            required="{true}" />
        </td>
        <td class="px-4 py-3 text-sm">
          <Input
            type="{'money'}"
            bind:value="{value.quantity}"
            marginClass="{''}"
            required="{true}" />
        </td>
        <td class="px-4 py-3 text-sm">
          <Input
            type="{'money'}"
            bind:value="{value.dailyRate}"
            marginClass="{''}"
            required="{true}" />
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            {#if values.length > 1}
              <button type="button" on:click="{() => removeItem(index)}">
                <TrashIcon className="{'w-5 h-5'}" />
              </button>
            {/if}
          </div>
        </td>
      </tr>
    {/each}
    <tr>
      <td colspan="4" class="text-right">
        <button
          type="button"
          class="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple mt-2 mb-2"
          on:click="{addItem}">
          {$_('accounting.quotes.form.add_new')}
        </button>
      </td>
    </tr>
    <tr>
      <td colspan="4" class="dark:text-white border-none text-right">
        <div class="mb-2 mt-2">
          {@html $_('accounting.quotes.form.sub_total', {
            values: { subTotal: format(subTotal) },
          })}
        </div>
        <div class="mb-2">
          {@html $_('accounting.quotes.form.vat', {
            values: { vat: format(vat) },
          })}
        </div>
        <div>
          {@html $_('accounting.quotes.form.total', {
            values: { total: format(total) },
          })}
        </div>
      </td>
    </tr>
  </tbody>
</table>
