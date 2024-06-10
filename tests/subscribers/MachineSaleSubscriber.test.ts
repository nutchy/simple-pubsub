import { LowStockWarningEvent, MachineSaleEvent } from '../../events'
import { MachineRepository } from '../../repositories'
import { MachineSaleSubscriber } from '../../subscribers/machineSaleSubscriber'

describe('MachineSaleSubscriber', () => {
  it('handle with MachineSaleEvent', () => {
    const repo = MachineRepository.instance
    const publisher = { publish: jest.fn() }
    const subscriber = new MachineSaleSubscriber(repo, publisher)
    const machineId = '001'

    const machine = repo.findById(machineId)
    expect(machine!.stockLevel).toEqual(10)

    subscriber.handle(new MachineSaleEvent(1, machineId))
    expect(machine!.stockLevel).toEqual(9)
    expect(publisher.publish).not.toHaveBeenCalled()
  })

  it('handle with MachineSaleEvent and LowStockLevelEvent', () => {
    const repo = MachineRepository.instance
    const publisher = { publish: jest.fn() }
    const subscriber = new MachineSaleSubscriber(repo, publisher)
    const machineId = '002'

    const machine = repo.findById(machineId)
    expect(machine!.stockLevel).toEqual(10)

    subscriber.handle(new MachineSaleEvent(8, machineId))
    expect(machine!.stockLevel).toEqual(2)
    expect(publisher.publish).toHaveBeenCalledWith(
      new LowStockWarningEvent(machineId, 2)
    )
  })

  it('handle with MachineSaleEvent not found', () => {
    const repo = MachineRepository.instance
    const publisher = { publish: jest.fn() }
    const subscriber = new MachineSaleSubscriber(repo, publisher)
    const machineId = '000' // not found
    subscriber.handle(new MachineSaleEvent(1, machineId))
  })
})
