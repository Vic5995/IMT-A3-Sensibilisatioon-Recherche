import { Server, Socket } from 'socket.io';
import log from '../utils/logger';
import EVENTS from '../config/events';
import { ControlTower } from './ControlTower';

const rooms: Record<string, { name: string }> = {};

const socket = ({ io }: { io: Server }) => {
  log.info(`Sockets enable`);

  io.on(EVENTS.connection, (socket: Socket) => {
    log.info(`user connected ${socket.id}`);

    socket.emit(EVENTS.CONTROL_TOWER.GENERAL.request);

    socket.on(EVENTS.CONTROL_TOWER.GENERAL.register, (socketId, name) => {
      ControlTower.registerWorld(socketId, name);
      socket.join(name);

      log.info(`🎉 ${name} (id: ${socketId}) is registered!`);
      log.info(`🔢 World(s) available: ${ControlTower.getNumberOfWorld()}`);

      socket.emit(
        EVENTS.CONTROL_TOWER.GENERAL.welcome,
        `\n\n🌍 Welcome to The Universe! \nid: ${socketId} \nname: ${name} \n✅ Registered Successfully!\n`
      );
    });

    socket.on(EVENTS.disconnect, (_) => {
      const leavingSocket = ControlTower.deleteWorld(socket.id);
      log.info(`👋 ${leavingSocket} (id: ${socket.id}) is gone!`);
      log.info(`🔢 World(s) available: ${ControlTower.getNumberOfWorld()}`);
    });

    socket.on(EVENTS.WORLD.AUTHORIZATION.request, (destinationName) => {
      log.info(
        `❓ ${ControlTower.getWorld(
          socket.id
        )} asking to visit 📍${destinationName}...`
      );

      const destinationAdress = ControlTower.getAddress(destinationName);
      if (destinationAdress) {
        // test des autorisations
        // cas pas autorisé -> EVENTS.CONTROL_TOWER.AUTHORIZATION.forbidden
        // sinon
        socket.emit(
          EVENTS.CONTROL_TOWER.AUTHORIZATION.allowed,
          `👍 Great news! You are allowed to visit ${destinationName}!`,
          destinationName
        );
      } else {
        socket.emit(
          EVENTS.CONTROL_TOWER.AUTHORIZATION.unvalaible,
          `🚨 ${destinationName} n'est pas disponible`
        );
      }
    });

    socket.on(
      EVENTS.WORLD.TRAVEL.leaving_origin,
      (destinationName, avatarPseudo) => {
        // check du format de l'avatar
        socket.join(destinationName);
        socket
          .to(destinationName)
          .emit(
            EVENTS.WORLD.TRAVEL.arriving_dest,
            `🛬 ${avatarPseudo} just arrived here!`
          );
        socket.emit(EVENTS.WORLD.TRAVEL.arriving_dest, destinationName);
      }
    );

    socket.on(
      EVENTS.WORLD.TRAVEL.leaving_dest,
      (avatarPseudo, dest, origin) => {
        socket
          .to(dest)
          .emit(
            EVENTS.WORLD.TRAVEL.leaving_dest,
            `🛫 ${avatarPseudo} is leaving!`
          );
        socket.join(origin);
        socket
          .to(origin)
          .emit(
            EVENTS.WORLD.TRAVEL.returning_origin,
            `🙌 Welcome back ${avatarPseudo}`
          );
      }
    );
  });
};

export default socket;
