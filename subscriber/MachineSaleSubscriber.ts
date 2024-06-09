import { MachineSaleEvent, ISubscriber } from "../events";
import { Machine } from "../models/Machine";

// Subscriber implementations
export class MachineSaleSubscriber implements ISubscriber {
  public machines: Machine[];

  constructor(machines: Machine[]) {
    this.machines = machines;
  }

  handle(event: MachineSaleEvent): void {
    this.machines[2].stockLevel -= event.getSoldQuantity();
  }
}
