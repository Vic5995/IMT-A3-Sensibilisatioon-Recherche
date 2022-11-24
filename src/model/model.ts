export abstract class Avatar {
  id: string;
  addressWorld: string;

  constructor(id: string, addressWorld: string) {
    this.id = id;
    this.addressWorld = addressWorld;
  }
}

export abstract class World {
  id: string;
  name: string;
  
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}