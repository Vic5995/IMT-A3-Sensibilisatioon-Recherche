class WorldVic extends World {
  register: AvatarVic[];

  constructor(id: string, addressWorld: string) {
    super(id, addressWorld);
    this.register = [];
  }
}