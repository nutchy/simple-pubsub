import { MachineSaleEvent, ISubscriber } from "../events";
import { Machine } from "../models/Machine";

// Subscriber implementations
export class MachineSaleSubscriber implements ISubscriber {
  public machines: Machine[];

  constructor(machines: Machine[]) {
    this.machines = machines;
  }

  handle(event: MachineSaleEvent): void {
    const machine = this.machines.find((m) => m.id === event.machineId());
    if (machine) {
      machine.stockLevel -= event.getSoldQuantity();
    }
    // this.machines[2].stockLevel -= event.getSoldQuantity();
  }
}
