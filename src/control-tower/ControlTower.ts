
export class ControlTower {
  private static instance: ControlTower;
  private worldRegister: Map<String, String>;

  private constructor() { 
    this.worldRegister = new Map<String, String>();
  }

  public static getInstance(): ControlTower {
    if (!ControlTower.instance) {
      ControlTower.instance = new ControlTower;
    }
    return ControlTower.instance;
  }

  public static registerWorld(socketId: string, name: string) {
    ControlTower.getInstance().worldRegister.set(socketId, name);
  }

  public static getWorld(socketId: string) {
    ControlTower.getInstance().worldRegister.get(socketId);
  }

  public static deleteWorld(socketId: string) {
    ControlTower.getInstance().worldRegister.delete(socketId);
  }

  public static getNumberOfWorld() {
    return ControlTower.getInstance().worldRegister.size;
  }


}