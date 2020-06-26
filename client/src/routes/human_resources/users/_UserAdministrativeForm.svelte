<script>
  import MoneyInput from '../../../components/inputs/MoneyInput.svelte';
  import DateInput from '../../../components/inputs/DateInput.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';

  export let userAdministrative;
</script>

<h3 class="mt-3">Informations administratives</h3>
<hr />
<div class="row">
  <div class="col-md-4">
    <SelectInput
      label={'Contrat de travail'}
      bind:value={userAdministrative.contract}>
      <option value={'cdi'}>CDI</option>
      <option value={'cdd'}>CDD</option>
      <option value={'ctt'}>CTT</option>
      <option value={'professionalization'}>
        Contrat de professionalisation
      </option>
      <option value={'apprenticeship'}>Contrat de d'apprentisage</option>
    </SelectInput>
  </div>
  <div class="col-md-4">
    <SelectInput
      label={'Statut cadre'}
      bind:value={userAdministrative.executivePosition}>
      <option value={true}>Oui</option>
      <option value={false}>Non</option>
    </SelectInput>
  </div>
  <div class="col-md-4">
    <SelectInput
      label={'Mutuelle'}
      bind:value={userAdministrative.healthInsurance}>
      <option value={true}>Oui</option>
      <option value={false}>Non</option>
    </SelectInput>
  </div>
  <div class="col-md-6">
    <MoneyInput
      label={'Salaire annuel brut'}
      bind:value={userAdministrative.annualEarnings} />
  </div>
  <div class="col-md-6">
    <MoneyInput
      label={'Frais de transport'}
      required={''}
      bind:value={userAdministrative.transportFee} />
  </div>
  <div class="col-md-6">
    <DateInput
      label={"Date d'entrée"}
      bind:value={userAdministrative.joiningDate} />
  </div>
  <div class="col-md-6">
    <DateInput
      label={'Date de sortie'}
      required={false}
      bind:value={userAdministrative.leavingDate} />
  </div>
</div>
