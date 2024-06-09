import { IEvent, IPublishSubscribeService, ISubscriber } from "../events";

export class MachineEventPublisher implements IPublishSubscribeService {
  // TODO: add constructor to register event subsciber

  publish(event: IEvent): void {}

  subscribe(type: string, handler: ISubscriber): void {}
}
