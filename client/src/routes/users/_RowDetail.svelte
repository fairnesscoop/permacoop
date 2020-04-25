<script>
  import {format} from 'date-fns';
  import {fr} from 'date-fns/locale';

  export let user;
</script>

<tr>
  <td>{user.firstName}</td>
  <td>{user.lastName}</td>
  <td>{user.email}</td>
  <td>
    {user.entryDate ? format(new Date(user.entryDate), 'dd/MM/yyyy', {
          locale: fr
        }) : '/'}
  </td>
  <td>{user.role}</td>
</tr>
