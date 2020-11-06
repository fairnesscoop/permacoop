<script>
  import DarkThemeIcon from '../icons/DarkThemeIcon.svelte';
  import LightThemeIcon from '../icons/LightThemeIcon.svelte';
  import { settings } from '../../store';

  const onToggle = () => {
    if ($settings.theme) {
      $settings.theme = '';

      return;
    }

    $settings.theme = 'theme-dark';
  };
</script>

<button
  on:click="{onToggle}"
  class="rounded-md focus:outline-none focus:shadow-outline-purple">
  {#if $settings.theme === 'theme-dark'}
    <LightThemeIcon className="{'w-5 h-5'}" />
  {:else}
    <DarkThemeIcon className="{'w-5 h-5'}" />
  {/if}
</button>
