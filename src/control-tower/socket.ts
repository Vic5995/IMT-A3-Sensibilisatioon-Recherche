import { Server, Socket } from 'socket.io';
import log from '../utils/logger';
import EVENTS from '../config/events';
import { ControlTower } from './ControlTower';

const socket = ({ io }: { io: Server }) => {
  log.info(`Sockets enable`);

  io.on(EVENTS.connection, (socket: Socket) => {
    log.info(`user connected ${socket.id}`);

    socket.emit(EVENTS.CONTROL_TOWER.GENERAL.request);

    socket.on(EVENTS.CONTROL_TOWER.GENERAL.register, (avatar) => {
      ControlTower.registerAvatar(avatar);
      socket.join(avatar.nameWorld);

      log.info(`🎉 ${avatar.pseudo} (id: ${avatar.id}) is registered!`);

      socket.emit(
        EVENTS.CONTROL_TOWER.GENERAL.welcome,
        `\n\n🌍 Welcome to The Universe! \nid: ${avatar.id} \nname: ${avatar.pseudo} \n✅ Registered Successfully!\n`
      );
    });

    socket.on(EVENTS.disconnect, (_) => {
      // TODO
      const leavingSocket = ControlTower.deleteWorld(socket.id);
      log.info(`👋 ${leavingSocket} (id: ${socket.id}) is gone!`);
    });

    socket.on(EVENTS.WORLD.AUTHORIZATION.request, (avatar, destinationName) => {
      log.info(
        `❓ ${avatar.pseudo} from ${avatar.nameWorld} asking to visit 📍${destinationName}...`
      );

      const destinationAdress = ControlTower.getWorld(destinationName);
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
      (destinationName, avatar) => {
        // check du format de l'avatar
        if (ControlTower.avatarIsAllowed(avatar, destinationName)) {
          log.info(`✈️ ${avatar.pseudo} is leaving ${avatar.nameWorld} to ${destinationName}`);
          socket.leave(avatar.nameWorld);
          socket.join(destinationName);
          socket
            .to(destinationName)
            .emit(
              EVENTS.WORLD.TRAVEL.arriving_dest,
              `🛬 ${avatar.pseudo} just arrived here!`
            );
          socket.emit(EVENTS.WORLD.TRAVEL.arriving_dest, destinationName);
        } else {
          socket.emit(EVENTS.CONTROL_TOWER.AUTHORIZATION.forbidden, 'FORMAT ERROR')
        }
        
      }
    );

    socket.on(
      EVENTS.WORLD.TRAVEL.leaving_dest,
      (avatar, dest) => {
        socket
          .to(dest)
          .emit(
            EVENTS.WORLD.TRAVEL.leaving_dest,
            `🛫 ${avatar.pseudo} is leaving!`
        );
        
        log.info(`✈️ ${avatar.pseudo} is returning to ${avatar.nameWorld}`);
        const originAvatar = ControlTower.getAvatar(avatar.id, avatar.nameWorld);

        if (originAvatar) {
          socket.leave(dest)
          socket.join(originAvatar.nameWorld);
          socket
            .to(originAvatar.nameWorld)
            .emit(
              EVENTS.WORLD.TRAVEL.returning_origin,
              `🙌 Welcome back ${originAvatar.id}`
            );
        }

        
      }
    );
  });
};

export default socket;
