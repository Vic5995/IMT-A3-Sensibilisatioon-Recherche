import {
  Avatar, World
} from "../../model/model";

export class AvatarCynthia extends Avatar {
  pseudo: string;

  constructor(id: string, addressWorld: string) {
    super(id, addressWorld);
    this.pseudo = id;
  }
}

export class WorldCynthia extends World {
  register: AvatarCynthia[];

  constructor(id: string) {
    super(id, "Cynthia World");
    this.register = [];
  }

  registerNewAvatar(avatar: AvatarCynthia) {
    this.register.push(avatar)
  }
}