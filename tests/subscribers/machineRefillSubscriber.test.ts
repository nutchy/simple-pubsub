import { MachineRefillEvent, StockLevelOkEvent } from '../../events'
import { MachineRepository } from '../../repositories'
import { MachineRefillSubscriber } from '../../subscribers/machineRefillSubscriber'

describe('MachineRefillSubscriber', () => {
  it('handle with MachineRefillEvent', () => {
    const repo = MachineRepository.instance
    const publisher = { publish: jest.fn() }
    const subscriber = new MachineRefillSubscriber(repo, publisher)
    const machineId = '001'

    const machine = repo.findById(machineId)
    machine!.stockLevel = 0 // reset to zero
    expect(machine!.stockLevel).toEqual(0)

    subscriber.handle(new MachineRefillEvent(1, machineId))
    expect(machine!.stockLevel).toEqual(1)
    expect(publisher.publish).not.toHaveBeenCalled()
  })

  it('handle MachineRefillEvent with StockLevelOkEvent equals to 3', () => {
    const repo = MachineRepository.instance
    const publisher = { publish: jest.fn() }
    const subscriber = new MachineRefillSubscriber(repo, publisher)
    const machineId = '002'

    const machine = repo.findById(machineId)
    machine!.stockLevel = 0 // reset to zero
    expect(machine!.stockLevel).toEqual(0)

    subscriber.handle(new MachineRefillEvent(3, machineId))
    expect(machine!.stockLevel).toEqual(3)
    expect(publisher.publish).toHaveBeenCalledWith(
      new StockLevelOkEvent(machineId, 3)
    )
  })

  it('handle MachineRefillEvent with StockLevelOkEvent greater than 3', () => {
    const repo = MachineRepository.instance
    const publisher = { publish: jest.fn() }
    const subscriber = new MachineRefillSubscriber(repo, publisher)
    const machineId = '002'

    const machine = repo.findById(machineId)
    machine!.stockLevel = 0 // reset to zero
    expect(machine!.stockLevel).toEqual(0)

    subscriber.handle(new MachineRefillEvent(4, machineId))
    expect(machine!.stockLevel).toEqual(4)
    expect(publisher.publish).toHaveBeenCalledWith(
      new StockLevelOkEvent(machineId, 4)
    )
  })

  it('handle with MachineRefillEvent not found', () => {
    const repo = MachineRepository.instance
    const publisher = { publish: jest.fn() }
    const subscriber = new MachineRefillSubscriber(repo, publisher)
    const machineId = '000' // not found
    subscriber.handle(new MachineRefillEvent(1, machineId))
  })
})
