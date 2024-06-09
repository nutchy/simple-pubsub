import { ISubscriber, MachineRefillEvent } from "../events";

export class MachineRefillSubscriber implements ISubscriber {
  handle(event: MachineRefillEvent): void {
    throw new Error("Method not implemented.");
  }
}
