import { MachineSaleEvent } from "../../events";
import { MachineNotFoundError } from "../../models";
import { MachineRepository } from "../../repository";
import { MachineSaleSubscriber } from "../../subscriber/MachineSaleSubscriber";

describe("MachineSaleSubscriber", () => {
  it("handle with MachineSaleEvent", () => {
    const repo = MachineRepository.instance;
    const subscriber = new MachineSaleSubscriber(repo);
    const machineId = "001";

    const machine = repo.findById(machineId);
    expect(machine!.stockLevel).toEqual(10);

    subscriber.handle(new MachineSaleEvent(1, machineId));
    expect(machine!.stockLevel).toEqual(9);
  });

  it("handle with MachineSaleEvent not found", () => {
    const repo = MachineRepository.instance;
    const subscriber = new MachineSaleSubscriber(repo);
    const machineId = "000"; // not found
    subscriber.handle(new MachineSaleEvent(1, machineId));
  });
});
