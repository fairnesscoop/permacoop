<script>
  import { createEventDispatcher } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Button from '../../../../../components/inputs/Button.svelte';
  import Input from '../../../../../components/inputs/Input.svelte';

  const dispatch = createEventDispatcher();

  export let comment = '';
  export let loading = false;

  const submit = (event) => {
    dispatch(event.submitter.name, {
      comment
    });
  };
</script>

<form on:submit|preventDefault="{submit}">
  <Input
    type="text"
    required={false}
    label="{$_('human_resources.leaves.requests.form.comment')}"
    bind:value={comment} />

  <div class="flex">
    <div class="w-1/2 pr-2">
      <Button
        name="accept"
        value={$_('human_resources.leaves.requests.actions.accept')}
        loading={loading}
        disabled={loading} />
    </div>
    <div class="w-1/2 pl-2">
      <Button
        name="refuse"
        value={$_('human_resources.leaves.requests.actions.refuse')}
        loading={loading}
        disabled={loading} />
    </div>
  </div>
</form>
