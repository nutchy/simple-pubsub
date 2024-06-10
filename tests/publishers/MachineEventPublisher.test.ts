import { IEvent } from '../../events'
import { EventType } from '../../events/type'
import { MachineEventPublisher } from '../../publishers/machineEventPublisher'

describe('MachineEventPublisher', () => {
  it('allow ISubscriber object to register for an event type', () => {
    const publisher = MachineEventPublisher.instance

    expect(publisher.subscribers).toEqual({})
    expect(publisher.subscribers[EventType.MachineSale]).toBeUndefined()

    const foo = { handle: jest.fn() }
    publisher.subscribe(EventType.MachineSale, foo)
    expect(publisher.subscribers[EventType.MachineSale]).toBeDefined()
    expect(publisher.subscribers[EventType.MachineSale]?.size).toEqual(1)
  })

  it('publish event with specific event type', () => {
    // Mock subsribers
    const foo = { handle: jest.fn() }
    const bar = { handle: jest.fn() }

    // Create concrete object with subscribable object
    const publisher = MachineEventPublisher.instance
    publisher.subscribe(EventType.MachineRefill, foo),
      publisher.subscribe(EventType.MachineSale, bar)

    // Publish foo event
    const event: IEvent = {
      machineId: () => '001',
      type: () => EventType.MachineRefill
    }
    publisher.publish(event)

    expect(foo.handle).toHaveBeenCalledTimes(1)
    expect(bar.handle).toHaveBeenCalledTimes(0)
  })

  it('unsubscribe with specific event type', () => {
    // Mock subscribers
    const foo = { handle: jest.fn() }

    // Create concrete object with subscribable object
    const publisher = MachineEventPublisher.instance
    publisher.subscribe(EventType.MachineRefill, foo)

    // Publish foo event
    const event: IEvent = {
      machineId: () => '001',
      type: () => EventType.MachineRefill
    }
    publisher.publish(event)

    expect(foo.handle).toHaveBeenCalledTimes(1)
    foo.handle.mockClear()

    publisher.unsubscribe(EventType.MachineRefill)
    publisher.publish(event)
    expect(foo.handle).toHaveBeenCalledTimes(0)
  })
})
