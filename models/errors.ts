export class MachineNotFoundError extends Error {
  constructor(id: string) {
    super(`Machine id: ${id} not found.`)
    this.name = 'MachineNotFoundError'
  }
}
