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
});
