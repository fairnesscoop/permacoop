import {CommandBus} from '@nestjs/cqrs';
import {Injectable} from '@nestjs/common';
import {ICommandBus} from 'src/Application/ICommandBus';
import {ICommand} from 'src/Application/ICommand';

@Injectable()
export class CommandBusAdapter implements ICommandBus {
  constructor(private readonly commandBus: CommandBus) {}

  public execute(command: ICommand): Promise<any> {
    return this.commandBus.execute(command);
  }
}
