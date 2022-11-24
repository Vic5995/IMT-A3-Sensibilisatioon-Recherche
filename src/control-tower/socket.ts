import { Server, Socket } from 'socket.io';
import log from '../utils/logger';
import EVENTS from '../config/events';
import { ControlTower } from './ControlTower';

ControlTower.getInstance();

const socket = ({ io }: { io: Server }) => {
  log.info(`Sockets enable`);

  io.on(EVENTS.connection, (socket: Socket) => {
    log.info(`user connected ${socket.id}`);

    socket.emit(EVENTS.CONTROL_TOWER.GENERAL.request);

    socket.on(EVENTS.CONTROL_TOWER.GENERAL.register, (socketId, name) => {
  
      ControlTower.registerWorld(socketId, name);
  
      log.info(`🎉 ${name} (id: ${socketId}) is registered!`);
      log.info(`🔢 World(s) available: ${ControlTower.getNumberOfWorld()}`);
  
      socket.emit(EVENTS.CONTROL_TOWER.GENERAL.welcome,
        `\n\n🌍 Welcome to The Universe! \nid: ${socketId} \nname: ${name} \n✅ Registered Successfully!\n`);
    });

    socket.on(EVENTS.disconnect, (_) => {
      const leavingSocket = ControlTower.getWorld(socket.id);
      ControlTower.deleteWorld(socket.id);
      log.info(`👋 ${leavingSocket} (id: ${socket.id}) is gone!`);
      log.info(`🔢 World(s) available: ${ControlTower.getNumberOfWorld()}`);
    });
  });

  
};

export default socket;
