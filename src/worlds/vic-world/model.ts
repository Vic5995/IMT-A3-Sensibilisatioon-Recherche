import { Avatar, World } from '../../model/model';

export class AvatarVic extends Avatar {
  pseudo: string;
  addressBook: string[];

  constructor(id: string, nameWorld: string, pseudo: string) {
    super(id, nameWorld);
    this.pseudo = pseudo;
    this.addressBook = [];
  }

  

  public static toVicWorld(avatar: Avatar, pseudo:string) {
    return new AvatarVic(avatar.id, avatar.nameWorld, pseudo)
  }
}

export class WorldVic extends World {
  private register: Map<string, AvatarVic>;

  constructor(id: string) {
    super(id, "Vic World");
    this.register = new Map<string, AvatarVic>();
  }

  registerAvatar(avatar: AvatarVic) {
    this.register.set(avatar.id, avatar);
  }

  deleteAvatar(avatar: Avatar): void {
    this.register.delete(avatar.id)
  }

  isValidAvatar(avatar: Avatar): boolean {
    return avatar instanceof AvatarVic;
  }

  getAvatar(avatarId: string): Avatar | undefined {
    return this.register.get(avatarId);
  }
}