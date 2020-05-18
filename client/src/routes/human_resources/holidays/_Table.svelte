<script>
  import {format} from 'date-fns';
  import {fr} from 'date-fns/locale';
  import SecuredLink from '../../../components/SecuredLink.svelte';

  export let items;
  export let roles;
</script>

<table class="table table-striped table-bordered table-hover">
  <thead>
    <tr>
      <th>Salarié</th>
      <th>Période</th>
      <th>Durée</th>
      <th>Type de congé</th>
      <th>Statut</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each items as holiday (holiday.id)}
      <tr>
        <td>{holiday.user.firstName} {holiday.user.lastName}</td>
        <td>
          Du {format(new Date(holiday.startDate), 'dd/MM/yyyy', {locale: fr})}
          au {format(new Date(holiday.endDate), 'dd/MM/yyyy', {locale: fr})}
        </td>
        <td>{holiday.duration} jours</td>
        <td>{holiday.leaveType}</td>
        <td>
          <span class="badge badge-{holiday.status}">{holiday.status}</span>
        </td>
        <td>
          <SecuredLink
            className="btn btn-outline-secondary btn-sm"
            href={`/human_resources/holidays/${holiday.id}`}
            {roles}>
            Détail
          </SecuredLink>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
