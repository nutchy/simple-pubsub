interface IEvent {
  type(): string;
  machineId(): string;
}

interface ISubscriber {
  handle(event: IEvent): void;
}

interface IPublishSubscribeService {
  publish(event: IEvent): void;
  subscribe(type: string, handler: ISubscriber): void;
  // unsubscribe ( /* Question 2 - build this feature */ );
}

export {
    IEvent,
    ISubscriber,
    IPublishSubscribeService
}