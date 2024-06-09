import { ISubscriber, MachineRefillEvent } from "../events";
import { MachineNotFoundError } from "../models";
import { MachineRepository } from "../repository";

export class MachineRefillSubscriber implements ISubscriber {
  handle(event: MachineRefillEvent): void {
    const machineId = event.machineId();
    const machine = MachineRepository.instance.findById(machineId)

    if (!machine) {
      console.log(new MachineNotFoundError(machineId))
      return
    } 
    
    machine.stockLevel += event.getRefillQuantity()
  }
}
