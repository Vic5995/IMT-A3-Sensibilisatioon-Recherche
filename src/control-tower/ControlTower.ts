/**
 * worldRegister -> duo socketId - name
 * nameRegister -> duo name - socketId
 */
export class ControlTower {
  private static instance: ControlTower;
  private worldRegister: Map<String, String>;
  private nameRegister: Map<String, String>;

  private constructor() {
    this.worldRegister = new Map<String, String>();
    this.nameRegister = new Map<String, String>();
  }

  public static getInstance(): ControlTower {
    if (!ControlTower.instance) {
      ControlTower.instance = new ControlTower();
    }
    return ControlTower.instance;
  }

  public static registerWorld(socketId: string, name: string) {
    ControlTower.getInstance().worldRegister.set(socketId, name);
    ControlTower.getInstance().nameRegister.set(name, socketId);
  }

  public static getWorld(socketId: string) {
    return ControlTower.getInstance().worldRegister.get(socketId);
  }

  public static getAddress(name: string) {
    return ControlTower.getInstance().nameRegister.get(name);
  }

  public static deleteWorld(socketId: string) {
    const deletedWorldName = ControlTower.getWorld(socketId);
    deletedWorldName && ControlTower.getInstance().nameRegister.delete(deletedWorldName);
    ControlTower.getInstance().worldRegister.delete(socketId);
    return deletedWorldName;
  }

  public static getNumberOfWorld() {
    return ControlTower.getInstance().worldRegister.size;
  }
}
