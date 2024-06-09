import { IEvent, IPublishSubscribeService, ISubscriber } from "../events";

export class MachineEventPublisher implements IPublishSubscribeService {
  constructor(
    public subscribers: {
      [event: string]: Set<ISubscriber>;
    }
  ) {}

  // (1.2) Implement the publish method so that when a publish event occurs, all subscribers of that the event type published will have a chance to handle the event.
  publish(event: IEvent): void {
    this.subscribers[event.type()].forEach((sub) => {
      sub.handle(event);
    });
  }

  // (1.1) Build the Publish-Subscribe mechanism. Allow ISubscriber objects to register against an concrete IPublishSubscribeService object for an event type
  subscribe(type: string, handler: ISubscriber): void {
    if (!this.subscribers[type])  {
      this.subscribers[type] = new Set<ISubscriber>()
    } 
    this.subscribers[type].add(handler);
  }
}
