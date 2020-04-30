import * as sapper from '@sapper/app';
import {useLocalStorage} from './store';

useLocalStorage();

sapper.start({
  target: document.querySelector('#sapper')
});
