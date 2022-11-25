import { Avatar, World } from '../model/model';
import { AvatarVic } from '../worlds/vic-world/model';

/**
 * worldRegister -> duo socketId - name
 * nameRegister -> duo name - socketId
 */
export class ControlTower {
  private static instance: ControlTower;
  private worldRegister: Map<string, World>;

  private constructor() {
    this.worldRegister = new Map<string, World>();
  }

  public static getInstance(): ControlTower {
    if (!ControlTower.instance) {
      ControlTower.instance = new ControlTower();
    }
    return ControlTower.instance;
  }

  public static registerWorld(world: World) {
    ControlTower.getInstance().worldRegister.set(world.name,world);
  }

  public static registerAvatar(avatar: Avatar) {
    ControlTower.getInstance().worldRegister.get(avatar.nameWorld)?.registerAvatar(
      avatar
    );
  }

  public static getWorld(worldName: string) {
    return ControlTower.getInstance().worldRegister.get(worldName);
  }

  public static deleteWorld(worldName: string) {
    const deletedWorld = ControlTower.getWorld(worldName);
    deletedWorld && ControlTower.getInstance().worldRegister.delete(worldName);
    return deletedWorld;
  }

  public static deleteAvatar(avatar: Avatar) {
    ControlTower.getInstance().worldRegister.get(avatar.nameWorld)?.deleteAvatar(
      avatar
    );
  }

  public static avatarIsAllowed(avatar: Avatar, world: string) {
    return true;
    return ControlTower.getInstance().worldRegister.get(world)?.isValidAvatar(avatar);
  }

  public static getAvatar(avatarId: string, avatarWorld: string) {
    return ControlTower.getInstance().worldRegister.get(avatarWorld)?.getAvatar(avatarId);
  }
}
