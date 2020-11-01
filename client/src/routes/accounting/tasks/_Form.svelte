<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Button from '../../../components/inputs/Button.svelte';
  import Input from '../../../components/inputs/Input.svelte';

  export let name = '';
  export let loading;
  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', {name});
  };
</script>

<form on:submit|preventDefault={submit} class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input label={$_('accounting.tasks.form.name')} type={'text'} bind:value={name} />
  <Button value={$_('common.form.save')} {loading} disabled={!name || loading} />
</form>
