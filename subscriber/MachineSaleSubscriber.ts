import { MachineSaleEvent, ISubscriber, IEvent } from "../events";
import { Machine, MachineNotFoundError } from "../models";

interface machineRepository {
  findById(id: string): Machine | undefined;
}

export class MachineSaleSubscriber implements ISubscriber {
  constructor(private machineRepository: machineRepository) {}

  handle(event: MachineSaleEvent): void {
    const machineId = event.machineId();

    const machine = this.machineRepository.findById(machineId);
    if (!machine) {
      console.log(new MachineNotFoundError(machineId).message);
      return
    }
    const newStockLevel = machine.stockLevel - event.getSoldQuantity();
    machine.stockLevel = newStockLevel;

    // Todo: change magic to constant
    if (newStockLevel < 3) {
      // Todo: Publish low stock level event
    }
  }
}
