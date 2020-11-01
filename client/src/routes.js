import {Router} from '@beyonk/sapper-rbac';

const routes = new Router()
  .unrestrict('/login.*')
  .unrestrict('/service-worker.*')
  .restrict('.*', ['cooperator', 'employee', 'accountant'])
  .build();

export default routes;
