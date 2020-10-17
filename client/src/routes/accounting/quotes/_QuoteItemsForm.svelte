<script>
  import { format } from '../../../normalizer/money';
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

<table class="table table-bordered">
  <thead>
    <tr>
      <th>Description</th>
      <th style="width:15%">Quantité</th>
      <th style="width:20%">Taux</th>
      <th style="width:5%"></th>
    </tr>
  </thead>
  <tbody>
    {#each values as value, index}
      <tr>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Description de la prestation"
            bind:value="{value.title}"
            class="form-control" />
        </td>
        <td>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0,00"
            required="required"
            bind:value="{value.quantity}"
            class="form-control" />
        </td>
        <td>
          <div class="input-group">
            <input
              type="number"
              min="1"
              placeholder="0,00"
              step="0.01"
              required="required"
              bind:value="{value.dailyRate}"
              class="form-control" />
            <div class="input-group-append">
              <span class="input-group-text">€</span>
            </div>
          </div>
        </td>
        <td>
          {#if values.length > 1}
            <button
              class="btn btn-sm btn-danger"
              type="button"
              on:click="{() => removeItem(index)}">
              x
            </button>
          {/if}
        </td>
      </tr>
    {/each}
    <tr>
      <td colspan="4" style="text-align:right">
        <div class="mb-1">Sous total : <b>{format(subTotal)}</b></div>
        <div class="mb-1">TVA (20%) : <b>{format(vat)}</b></div>
        <div>Total TTC : <b>{format(total)}</b></div>
      </td>
    </tr>
  </tbody>
</table>

<div class="form-group">
  <button class="btn btn-sm btn-secondary" type="button" on:click="{addItem}">
    + Ajouter une autre ligne
  </button>
</div>
