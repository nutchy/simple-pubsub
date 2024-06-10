import { Machine } from '../models'

export class MachineRepository {
  private static _instance: MachineRepository

  private machines: Machine[]
  private constructor() {
    this.machines = [new Machine('001'), new Machine('002'), new Machine('003')]
  }

  public static get instance(): MachineRepository {
    if (!MachineRepository._instance) {
      MachineRepository._instance = new MachineRepository()
    }
    return MachineRepository._instance
  }

  findById(id: string): Machine | undefined {
    return this.machines.find((m) => m.id === id)
  }
}
