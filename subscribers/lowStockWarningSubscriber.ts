import { ISubscriber, LowStockWarningEvent } from "../events";

export class LowStockWarningSubscriber implements ISubscriber {
  handle(event: LowStockWarningEvent): void {
    console.warn(
      `[Subscriber::LowStockWarning] machine id: ${event.machineId()}, stock level: ${event.getStockQuantity()}`
    );
  }
}
