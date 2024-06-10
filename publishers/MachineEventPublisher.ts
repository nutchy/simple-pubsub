import {
  EventType,
  IEvent,
  IPublishSubscribeService,
  ISubscriber
} from '../events'

export class MachineEventPublisher implements IPublishSubscribeService {
  private static _instance: MachineEventPublisher
  public subscribers: { [type in EventType]?: Set<ISubscriber> } = {}
  private constructor() {}

  // Getter
  public static get instance(): MachineEventPublisher {
    if (!MachineEventPublisher._instance) {
      MachineEventPublisher._instance = new MachineEventPublisher()
    }
    return MachineEventPublisher._instance
  }

  publish(event: IEvent): void {
    const subscribers = this.subscribers[event.type()]
    if (subscribers) {
      subscribers.forEach((sub) => sub.handle(event))
    }
  }

  subscribe(type: EventType, handler: ISubscriber): void {
    if (!this.subscribers[type]) {
      this.subscribers[type] = new Set<ISubscriber>()
    }
    this.subscribers[type]!.add(handler)
  }

  unsubscribe(type: EventType): void {
    if (this.subscribers[type]) {
      this.subscribers[type]?.clear()
    }
  }
}
