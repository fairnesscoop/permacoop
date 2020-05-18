<script>
  import {user} from '../../../store';
  import filesize from 'filesize';
  import {format} from 'date-fns';
  import {fr} from 'date-fns/locale';
  import {client as axios} from '../../../utils/axios';
  import {downloadFile} from '../../../utils/downloadFile';

  export let items;

  let disableDownloadableButton = false;

  const download = async (id, fileName) => {
    try {
      disableDownloadableButton = true;
      const {data} = await axios.get(`pay_slips/${id}/download`, {
        responseType: 'blob'
      });
      downloadFile(data, fileName);
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      disableDownloadableButton = false;
    }
  };
</script>

<table class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th>Date</th>
      <th>Salarié</th>
      <th>Fichier</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each items as paySlip (paySlip.id)}
      <tr>
        <td>{format(new Date(paySlip.date), 'MMMM yyyy', {locale: fr})}</td>
        <td>{paySlip.user.firstName} {paySlip.user.lastName}</td>
        <td>{paySlip.file.originalName}</td>
        <td>
          {#if $user.id === paySlip.user.id}
            <button
              disabled={disableDownloadableButton}
              class="btn btn-outline-secondary btn-sm"
              on:click={download(paySlip.id, paySlip.file.originalName)}>
              Télécharger ({filesize(paySlip.file.size)})
            </button>
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
