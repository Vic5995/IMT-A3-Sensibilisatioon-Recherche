class WorldCynthia extends World {
  register: AvatarCynthia[];

  constructor(id: string, addressWorld: string) {
    super(id, addressWorld);
    this.register = [];
  }
}
