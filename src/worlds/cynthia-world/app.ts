import { io } from "socket.io-client";
import EVENTS from "../../config/events";
import log from "../../utils/logger";
import config from "../../config/default";
import { v4 as uuidv4 } from 'uuid';
import { AvatarCynthia, WorldCynthia } from "./model";

/**
 * ÉTAPE 0 :
 * Création de la socket, du monde et d'un premier avatar
 * Ajout de cet avatar au registre du monde
 */

const socket = io(`http://${config.host}:${config.port}`);

const WORLD = new WorldCynthia(socket.id);

const avatar1 = new AvatarCynthia(uuidv4(), WORLD.id);
WORLD.registerNewAvatar(avatar1)

socket.on(EVENTS.connect, () => {
  log.info(`id: ${socket.id} connected!`);
});

/**
 * Lors de la connexion à la tour de contrôle
 * on envoie l'identité du monde (l'identifiant de la socket et le nom de notre monde)
 */
socket.on(EVENTS.CONTROL_TOWER.GENERAL.request, () => {
  log.info("📤 Sending informations...");

  socket.emit(EVENTS.CONTROL_TOWER.GENERAL.register, socket.id, "Cynthia World");
});

/**
 * Affichage du message de bienvenue reçu par la tour de contrôle
 */
socket.on(EVENTS.CONTROL_TOWER.GENERAL.welcome, (message) => {
  log.info(message);
});