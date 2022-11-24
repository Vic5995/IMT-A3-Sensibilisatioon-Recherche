import { Avatar, World } from '../../model/model';

export class AvatarVic extends Avatar {
  pseudo: string;

  constructor(id: string, addressWorld: string, pseudo: string) {
    super(id, addressWorld);
    this.pseudo = pseudo;
  }
}

export class WorldVic extends World {
  private register: AvatarVic[];

  constructor(id: string, addressWorld: string) {
    super(id, addressWorld);
    this.register = [];
  }

  registerAvatar(avatar: AvatarVic) {
    this.register.push(avatar);
  }
}