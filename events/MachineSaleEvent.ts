import { IEvent } from "./interfaces";
import { EventType } from "./type";

class MachineSaleEvent implements IEvent {
  constructor(
    private readonly _sold: number,
    private readonly _machineId: string
  ) {}

  machineId(): string {
    return this._machineId;
  }

  getSoldQuantity(): number {
    return this._sold;
  }

  type(): EventType {
    return EventType.MachineSale;
  }
}

export { MachineSaleEvent };
