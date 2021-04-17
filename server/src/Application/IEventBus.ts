import { IEvent } from './IEvent';

export interface IEventBus {
  publish(event: IEvent): void;
}
