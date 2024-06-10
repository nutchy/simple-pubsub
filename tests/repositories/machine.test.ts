import { expect } from '@jest/globals'

import { MachineRepository } from '../../repositories'

describe('MachineRepository', () => {
  it('should got the same instance', () => {
    const repo1 = MachineRepository.instance
    const repo2 = MachineRepository.instance
    expect(repo1).toEqual(repo2)
  })

  it('should got machine with id 001', () => {
    const machine = MachineRepository.instance.findById('001')
    expect(machine!.id).toEqual('001')
  })

  it('should got an undefined when given machine id not found', () => {
    const machine = MachineRepository.instance.findById('000')
    expect(machine).toBeUndefined()
  })

  it('should able to mutate stock level with the same instance', () => {
    const machine = MachineRepository.instance.findById('001')
    expect(machine?.stockLevel).toEqual(10)

    // Increase stock level by 5 (10+5 = 15)
    machine!.stockLevel += 5

    const machineAfter = MachineRepository.instance.findById('001')
    expect(machineAfter!.stockLevel).toEqual(15)
  })
})
