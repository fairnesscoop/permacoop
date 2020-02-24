import {ICommand} from './ICommand';

export interface ICommandBus {
  execute(command: ICommand): Promise<any>;
}
