import { Avatar, World } from '../../model/model';

export class AvatarVic extends Avatar {
  pseudo: string;
  addressBook: string[];

  constructor(id: string, nameWorld: string, pseudo: string) {
    super(id, nameWorld);
    this.pseudo = pseudo;
    this.addressBook = [];
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