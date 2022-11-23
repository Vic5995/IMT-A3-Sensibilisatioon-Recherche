class ControlTower {
  private static instance: ControlTower;

  private constructor() { }

  public static getInstance(): ControlTower {
    if (!ControlTower.instance) {
      ControlTower.instance = new ControlTower;
    }
    return ControlTower;
  }
}