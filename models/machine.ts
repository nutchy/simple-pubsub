const DEFAULT_STOCK_LEVEL = 10

class Machine {
  public stockLevel = DEFAULT_STOCK_LEVEL;
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export { Machine };
