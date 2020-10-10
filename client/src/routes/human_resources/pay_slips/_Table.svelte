<script>
  import filesize from 'filesize';
  import {format} from 'date-fns';
  import {fr} from 'date-fns/locale';
  import {stores} from '@sapper/app';
  import {errorNormalizer} from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import {get} from '../../../utils/axios';
  import {downloadFile} from '../../../utils/downloadFile';

  const { session } = stores();

  export let items;

  let errors = [];
  let disableDownloadableButton = false;

  const download = async (id, fileName) => {
    try {
      disableDownloadableButton = true;
      const {data} = await get(`pay_slips/${id}/download`, {
        responseType: 'blob'
      }, $session.user.apiToken);
      downloadFile(data, fileName);
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      disableDownloadableButton = false;
    }
  };
</script>

<ServerErrors {errors} />
<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">Périodes</th>
      <th class="px-4 py-3">Salariés</th>
      <th class="px-4 py-3">Fichiers</th>
      <th class="px-4 py-3"></th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as {id, date, user, file} (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{format(new Date(date), 'MMMM yyyy', {locale: fr})}</td>
        <td class="px-4 py-3 text-sm">{user.firstName} {user.lastName}</td>
        <td class="px-4 py-3 text-sm">{file.originalName}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            {#if $session.user.id === user.id}
              <button 
                disabled={disableDownloadableButton}
                on:click={download(id, file.originalName)} 
                class="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                  Télécharger ({filesize(file.size)})
                </button>
            {/if}
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
