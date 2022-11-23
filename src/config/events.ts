const EVENTS = {
  connection: 'connection',
  connect: 'connect',
  disconnect: 'disconnect',
  CONTROL_TOWER: {
    GENERAL: {
      welcome: 'welcome',
      request: 'request register',
      register: 'register'
    },
    AUTHORIZATION: {
      allowed: 'allowed',
      forbidden: 'forbidden',
    },
  },
  WORLD: {
    AUTHORIZATION: {
      request: 'request authorization',
    },
    TRAVEL: {
      leaving_origin: 'leaving origin',
      arriving_dest: 'arriving destination',
      leaving_dest: 'leaving destination',
      returning_origin: 'returning origin'
    }
  },
};

export default EVENTS;
