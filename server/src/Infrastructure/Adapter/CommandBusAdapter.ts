import {CommandBus} from '@nestjs/cqrs';
import {Injectable} from '@nestjs/common';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {ICommand} from 'src/Application/ICommand';

@Injectable()
export class CommandBusAdapter implements ICommandBusAdapter {
  constructor(private readonly commandBus: CommandBus) {}

  public execute(command: ICommand): Promise<any> {
    return this.commandBus.execute(command);
  }
}
