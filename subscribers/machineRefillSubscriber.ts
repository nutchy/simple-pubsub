import { appConfig } from '../configs/appConfig'
import {
  IEvent,
  ISubscriber,
  MachineRefillEvent,
  StockLevelOkEvent
} from '../events'
import { Machine, MachineNotFoundError } from '../models'

interface machineRepository {
  findById(id: string): Machine | undefined
}

interface publisher {
  publish(event: IEvent): void
}

export class MachineRefillSubscriber implements ISubscriber {
  constructor(
    private machineRepository: machineRepository,
    private publisher: publisher
  ) {}

  handle(event: MachineRefillEvent): void {
    const machineId = event.machineId()
    const machine = this.machineRepository.findById(machineId)

    if (!machine) {
      console.log(new MachineNotFoundError(machineId))
      return
    }

    const newStockLevel = machine.stockLevel + event.getRefillQuantity()
    machine.stockLevel = newStockLevel

    if (newStockLevel >= appConfig.LowStockThreshold) {
      this.publisher.publish(new StockLevelOkEvent(machineId, newStockLevel))
    }
  }
}
