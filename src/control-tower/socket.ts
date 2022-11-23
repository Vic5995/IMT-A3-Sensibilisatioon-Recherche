import { Server, Socket } from 'socket.io';
import log from '../utils/logger';
import EVENTS from '../config/events';

const register = new Map<String, String>();

const socket = ({ io }: { io: Server }) => {
  log.info(`Sockets enable`);

  io.on(EVENTS.connection, (socket: Socket) => {
    log.info(`user connected ${socket.id}`);

    socket.emit(EVENTS.CONTROL_TOWER.GENERAL.request);

    socket.on(EVENTS.CONTROL_TOWER.GENERAL.register, (socketId, name) => {
  
      register.set(socketId, name);
  
      log.info(`${name} (id: ${socketId}) is registered!`)
  
      socket.emit(EVENTS.CONTROL_TOWER.GENERAL.welcome,
        `\n\n🌍 Welcome to The Universe! \nid: ${socketId} \nname: ${name} \n✅ Registered Successfully!\n`);
    })
  });

  
};

export default socket;
