<script>
  export let overview;
</script>

<div class="mt-3">
  <hr />
  <h2 class="display-5">Récapitulatif</h2>
  <table class="table table-striped table-bordered table-hover ">
    <thead>
      <tr>
        <td class="text-center">Mission</td>
        <td class="text-center">Support // Podcast</td>
        <td class="text-center">Dojo</td>
        <td class="text-center">Formation // Conf // Meetup</td>
        <td class="text-center">Vacances</td>
        <td class="text-center">Congé maladie</td>
        <td class="text-center">Autres</td>
        <td class="text-center">Tickets Resto</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center">{overview.mission}</td>
        <td class="text-center">{overview.support}</td>
        <td class="text-center">{overview.dojo}</td>
        <td class="text-center">{overview.formationConference}</td>
        <td class="text-center">{overview.holiday}</td>
        <td class="text-center">{overview.medicalLeave}</td>
        <td class="text-center">{overview.other}</td>
        <td class="text-center"><b>{overview.mealTicket}</b></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th colspan="8">
          Total jour(s) travaillé(s):
          {overview.totalTimeSpent}
        </th>
      </tr>
    </tfoot>
  </table>
</div>
