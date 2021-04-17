import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { IEventBus } from 'src/Application/IEventBus';
import { IEvent } from 'src/Application/IEvent';

@Injectable()
export class EventBusAdapter implements IEventBus {
  constructor(private readonly eventBus: EventBus) {}

  public publish(event: IEvent): void {
    this.eventBus.publish(event);
  }
}
