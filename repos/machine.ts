import { Machine } from "../models";

export class MachineRepository {
  static _instance: MachineRepository;

  private machines: Machine[];
  private constructor() {}

  public static get instance(): MachineRepository {
    if (!MachineRepository._instance) {
      MachineRepository._instance = new MachineRepository();
    }
    return MachineRepository._instance;
  }

  findById(id: string): Machine {
    const machine = this.machines.find((m) => m.id === id);
    if (!machine) {
      throw new Error(`Machine id: ${id} not found`);
    }
    return machine;
  }
}
