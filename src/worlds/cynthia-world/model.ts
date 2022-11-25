import {
  Avatar, World
} from "../../model/model";
import { AvatarVic } from "../vic-world/model";

export class AvatarCynthia extends Avatar {
  pseudo: string;

  constructor(id: string, addressWorld: string) {
    super(id, addressWorld);
    this.pseudo = id;
  }

  public static toCynthiaWorld(avatar: Avatar) {
    return new AvatarCynthia(avatar.id, avatar.nameWorld);
  }
}

export class WorldCynthia extends World {
  register: Map<string,AvatarCynthia>;

  constructor(id: string) {
    super(id, "Cynthia World");
    this.register = new Map<string,AvatarCynthia>;
  }

  registerAvatar(avatar: AvatarCynthia) {
    this.register.set(avatar.id, avatar);
  }

  deleteAvatar(avatar: Avatar): void {
    this.register.delete(avatar.id);
  }

  isValidAvatar(avatar: Avatar): boolean {
    return avatar instanceof AvatarCynthia;
  }

  getAvatar(avatarId: string): Avatar | undefined {
    return this.register.get(avatarId);
  }
}