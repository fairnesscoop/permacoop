import * as sapper from '@sapper/app';
import {user, useLocalStorage} from './store';

useLocalStorage(user, 'persist:user');

sapper.start({
  target: document.querySelector('#sapper')
});
