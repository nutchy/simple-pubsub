import { IEvent, ISubscriber } from "../../events";
import { MachineEventPublisher } from "../../publisher/MachineEventPublisher";

describe("MachineEventPublisher", () => {
  it("allow ISubscriber object to register for an event type", () => {
    const publisher = new MachineEventPublisher({});

    expect(publisher.subscribers).toEqual({});
    expect(publisher.subscribers["foo"]).toBeUndefined();

    const foo = { handle: jest.fn() };
    publisher.subscribe("foo", foo);
    expect(publisher.subscribers["foo"]).toBeDefined();
    expect(publisher.subscribers["foo"].size).toEqual(1);
  });

  it("publish event with specific event type", () => {
    // Mock subsribers
    const foo = { handle: jest.fn() };
    const bar = { handle: jest.fn() };

    // Create concrete object with subscribable object
    const publisher = new MachineEventPublisher({
      foo: new Set<ISubscriber>().add(foo),
      bar: new Set<ISubscriber>().add(bar),
    });

    // Publish foo event
    const event: IEvent = {
        machineId: () => "001",
        type: () => "foo"
    }
    publisher.publish(event)

    expect(foo.handle).toHaveBeenCalledTimes(1)
    expect(bar.handle).toHaveBeenCalledTimes(0)
  });

  it("unsubscribe with specific event type", () => {
    // Mock subscribers
    const foo = { handle: jest.fn() };

    // Create concrete object with subscribable object
    const publisher = new MachineEventPublisher({
      foo: new Set<ISubscriber>().add(foo),
    });

    // Publish foo event
    const event: IEvent = {
        machineId: () => "001",
        type: () => "foo"
    }
    publisher.publish(event)

    expect(foo.handle).toHaveBeenCalledTimes(1)
    foo.handle.mockClear()

    publisher.unsubscribe("foo")
    publisher.publish(event)
    expect(foo.handle).toHaveBeenCalledTimes(0)
  })
});
