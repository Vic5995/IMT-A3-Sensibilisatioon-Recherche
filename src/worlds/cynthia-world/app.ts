import { io } from "socket.io-client";
import EVENTS from "../../config/events";
import log from "../../utils/logger";
import config from "../../config/default";

const socket = io(`http://${config.host}:${config.port}`);

socket.on(EVENTS.connect, () => {
  log.info(`id: ${socket.id} connected!`);
});

socket.on(EVENTS.CONTROL_TOWER.GENERAL.request, () => {
  log.info("📤 Sending informations...");

  socket.emit(EVENTS.CONTROL_TOWER.GENERAL.register, socket.id, "Cynthia World");
});

socket.on(EVENTS.CONTROL_TOWER.GENERAL.welcome, (message) => {
  log.info(message);
});