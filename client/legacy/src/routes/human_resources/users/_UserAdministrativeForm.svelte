<script>
  import { _ } from 'svelte-i18n';
  import Input from 'components/inputs/Input.svelte';
  import SelectInput from 'components/inputs/SelectInput.svelte';

  export let userAdministrative;

  const contracts = [
    'cdi',
    'cdd',
    'ctt',
    'professionalization',
    'apprenticeship',
  ];

  const workingTimes = ['full_time', 'part_time'];
</script>

<div class="flex">
  <div class="w-1/4 pr-2">
    <SelectInput
      label={$_('human_resources.users.form.contract.title')}
      bind:value={userAdministrative.contract}>
      {#each contracts as contract}
        <option value={contract}>
          {$_(`human_resources.users.form.contract.${contract}`)}
        </option>
      {/each}
    </SelectInput>
  </div>
  <div class="w-1/4 pr-2">
    <SelectInput
      label={$_('human_resources.users.form.working_time.title')}
      bind:value={userAdministrative.workingTime}>
      {#each workingTimes as workingTime}
        <option value={workingTime}>
          {$_(`human_resources.users.form.working_time.${workingTime}`)}
        </option>
      {/each}
    </SelectInput>
  </div>
  <div class="w-1/4 pr-2">
    <SelectInput
      label={$_('human_resources.users.form.executive_position')}
      bind:value={userAdministrative.executivePosition}>
      <option value="true">{$_('common.yes')}</option>
      <option value="false">{$_('common.no')}</option>
    </SelectInput>
  </div>
  <div class="w-1/4 pr-2">
    <SelectInput
      label={$_('human_resources.users.form.health_insurance')}
      bind:value={userAdministrative.healthInsurance}>
      <option value="true">{$_('common.yes')}</option>
      <option value="false">{$_('common.no')}</option>
    </SelectInput>
  </div>
</div>
<div class="flex">
  <div class="w-1/3 pr-2">
    <Input
      type={'money'}
      label={$_('human_resources.users.form.annual_earnings')}
      bind:value={userAdministrative.annualEarnings} />
  </div>
  <div class="w-1/3 pr-2">
    <Input
      type={'money'}
      label={$_('human_resources.users.form.transport_fee')}
      required={false}
      bind:value={userAdministrative.transportFee} />
  </div>
  <div class="w-1/3">
    <Input
      type={'money'}
      label={$_('human_resources.users.form.sustainable_mobility_fee')}
      required={false}
      bind:value={userAdministrative.sustainableMobilityFee} />
  </div>
</div>
<div class="flex">
  <div class="w-1/2 pr-2">
    <Input
      type={'date'}
      label={$_('human_resources.users.form.joining_date')}
      bind:value={userAdministrative.joiningDate} />
  </div>
  <div class="w-1/2 pl-2">
    <Input
      type="date"
      label={$_('human_resources.users.form.leaving_date')}
      required={false}
      bind:value={userAdministrative.leavingDate} />
  </div>
</div>
