import { IEvent } from "./interfaces";
import { EventType } from "./type";

class MachineRefillEvent implements IEvent {
  constructor(
    private readonly _refill: number,
    private readonly _machineId: string
  ) {}

  machineId(): string {
    return this._machineId
  }

  type(): EventType {
    return EventType.MachineRefill
  }

  getRefillQuantity(): number {
    return this._refill
  }
}

export { MachineRefillEvent };
