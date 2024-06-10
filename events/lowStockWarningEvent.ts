import { IEvent } from './interfaces'
import { EventType } from './type'

export class LowStockWarningEvent implements IEvent {
  constructor(
    private readonly _machineId: string,
    private readonly _stockLevel: number
  ) {}

  machineId(): string {
    return this._machineId
  }

  getStockQuantity(): number {
    return this._stockLevel
  }

  type(): EventType {
    return EventType.LowStockWarning
  }
}
