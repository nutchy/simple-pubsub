import { ISubscriber, StockLevelOkEvent } from '../events'

export class StockLevelOkSubscriber implements ISubscriber {
  handle(event: StockLevelOkEvent): void {
    console.warn(
      `[Subscriber::StockLevelOk] machine id: ${event.machineId()}, stock level: ${event.getStockQuantity()}`
    )
  }
}
