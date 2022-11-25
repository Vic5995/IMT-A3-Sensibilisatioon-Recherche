import { AvatarCynthia } from "../worlds/cynthia-world/model";
import { AvatarVic } from "../worlds/vic-world/model";

export abstract class Avatar {
  id: string;
  nameWorld: string;

  constructor(id: string, nameWorld: string) {
    this.id = id;
    this.nameWorld = nameWorld;
  }
}

export abstract class World {
  id: string;
  name: string;
  
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  abstract registerAvatar(avatar: Avatar): void;

  abstract deleteAvatar(avatar: Avatar): void;

  abstract isValidAvatar(avatar: Avatar): boolean;

  abstract getAvatar(avatarId: string): Avatar | undefined;
}