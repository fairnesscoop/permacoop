<script>
  import Input from '../../../components/inputs/Input.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';

  export let userAdministrative;
</script>

<div class="flex">
  <div class="w-1/3 pr-2">
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
  <div class="w-1/3 pr-2">
    <SelectInput
      label={'Statut cadre'}
      bind:value={userAdministrative.executivePosition}>
      <option value={'true'}>Oui</option>
      <option value={'false'}>Non</option>
    </SelectInput>
  </div>
  <div class="w-1/3 pr-2">
    <SelectInput
      label={'Mutuelle'}
      bind:value={userAdministrative.healthInsurance}>
      <option value={'true'}>Oui</option>
      <option value={'false'}>Non</option>
    </SelectInput>
  </div>
</div>
<div class="flex">
  <div class="w-1/2 pr-2">
    <Input
      type={'money'}
      label={'Salaire annuel brut'}
      bind:value={userAdministrative.annualEarnings} />
  </div>
  <div class="w-1/2 pl-2">
    <Input
      type={'money'}
      label={'Frais de transport'}
      required={''}
      bind:value={userAdministrative.transportFee} />
  </div>
</div>
<div class="flex">
  <div class="w-1/2 pr-2">
    <Input
      type={'date'}
      label={"Date d'entrée"}
      bind:value={userAdministrative.joiningDate} />
  </div>
  <div class="w-1/2 pl-2">
    <Input
      type={'date'}
      label={'Date de sortie'}
      required={''}
      bind:value={userAdministrative.leavingDate} />
  </div>
</div>