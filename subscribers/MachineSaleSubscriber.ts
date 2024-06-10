import { appConfig } from '../configs/appConfig'
import {
  MachineSaleEvent,
  ISubscriber,
  IEvent,
  LowStockWarningEvent
} from '../events'
import { Machine, MachineNotFoundError } from '../models'

interface machineRepository {
  findById(id: string): Machine | undefined
}

interface publisher {
  publish(event: IEvent): void
}

export class MachineSaleSubscriber implements ISubscriber {
  constructor(
    private machineRepository: machineRepository,
    private publisher: publisher
  ) {}

  handle(event: MachineSaleEvent): void {
    const machineId = event.machineId()

    const machine = this.machineRepository.findById(machineId)
    if (!machine) {
      console.log(new MachineNotFoundError(machineId).message)
      return
    }
    const newStockLevel = machine.stockLevel - event.getSoldQuantity()
    machine.stockLevel = newStockLevel

    if (newStockLevel < appConfig.LowStockThreshold) {
      this.publisher.publish(new LowStockWarningEvent(machineId, newStockLevel))
    }
  }
}
