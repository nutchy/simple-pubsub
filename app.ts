import { IPublishSubscribeService } from "./events";
import { MachineEventPublisher } from "./publishers/MachineEventPublisher";
import { MachineSaleSubscriber } from "./subscribers/MachineSaleSubscriber";
import { eventGenerator } from "./helpers/generator";
import { Machine } from "./models";

// program
(async () => {
  // create 3 machines with a quantity of 10 stock
  const machines: Machine[] = [
    new Machine("001"),
    new Machine("002"),
    new Machine("003"),
  ];

  // create a machine sale event subscriber. inject the machines (all subscribers should do this)
  const saleSubscriber = new MachineSaleSubscriber(machines);

  // create the PubSub service
  const pubSubService: IPublishSubscribeService = new MachineEventPublisher({});

  // create 5 random events
  const events = [1, 2, 3, 4, 5].map((_) => eventGenerator());

  // publish the events
  events.map(pubSubService.publish);
})();
