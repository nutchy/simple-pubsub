import { EventType } from "./type";

interface IEvent {
  type(): EventType;
  machineId(): string;
}

interface ISubscriber {
  handle(event: IEvent): void;
}

interface IPublishSubscribeService {
  publish(event: IEvent): void;
  subscribe(type: EventType, handler: ISubscriber): void;
  // unsubscribe ( /* Question 2 - build this feature */ );
}

export { IEvent, ISubscriber, IPublishSubscribeService };
