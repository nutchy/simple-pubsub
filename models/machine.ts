import { appConfig } from '../configs/appConfig'

class Machine {
  public stockLevel = appConfig.DefaultStockLevel
  public id: string

  constructor(id: string) {
    this.id = id
  }
}

export { Machine }
