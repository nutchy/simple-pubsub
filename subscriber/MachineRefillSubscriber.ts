import { IEvent, ISubscriber } from "../events";

export class MachineRefillSubscriber implements ISubscriber {
  handle(event: IEvent): void {
    throw new Error("Method not implemented.");
  }
}
