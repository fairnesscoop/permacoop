<script>
  import shortid from '../../utils/shortid';

  export let id = shortid.generate();
  export let type = 'text';
  export let value;
  export let label = '';
  export let placeholder = '';
  export let marginClass = 'mt-4';
  export let required = 'required';
  export let readonly = false;
  export let input;

  const className =
    'block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input';
</script>

<div class={`block text-sm ${marginClass}`}>
  {#if label}
    <label class="text-gray-700 dark:text-gray-400" for={id}>{label}</label>
  {/if}
  {#if type === 'email'}
    <input
      type="email"
      {id}
      {required}
      {readonly}
      {placeholder}
      class={className}
      bind:this={input}
      bind:value />
  {:else if type === 'password'}
    <input
      type="password"
      {id}
      {required}
      {readonly}
      {placeholder}
      class={className}
      bind:this={input}
      bind:value />
  {:else if type === 'money'}
    <input
      type="number"
      min="0"
      placeholder="0,00"
      step="0.01"
      {id}
      {required}
      {readonly}
      class={className}
      bind:this={input}
      bind:value />
  {:else if type === 'date'}
    <input
      type="date"
      {id}
      {required}
      {readonly}
      {placeholder}
      class={className}
      bind:this={input}
      bind:value />
  {:else}
    <input
      type="text"
      {id}
      {required}
      {readonly}
      {placeholder}
      class={className}
      bind:this={input}
      bind:value
      {...$$restProps} />
  {/if}
</div>
