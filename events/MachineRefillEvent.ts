import { IEvent } from "./interfaces";

// Todo: (3) Implement MachineRefillSubscriber. It will increase the stock quantity of the machine.
class MachineRefillEvent implements IEvent {
  constructor(
    private readonly _refill: number,
    private readonly _machineId: string
  ) {}

  machineId(): string {
    throw new Error("Method not implemented.");
  }

  type(): string {
    throw new Error("Method not implemented.");
  }

  getRefillQuantity(): number {
    return this._refill
  }
}

export { MachineRefillEvent };
