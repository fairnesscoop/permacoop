import {Router} from '@beyonk/sapper-rbac';

const routes = new Router()
  .unrestrict('/login.*')
  .restrict('.*', ['cooperator', 'employee', 'accountant'])
  .build();

export default routes;
