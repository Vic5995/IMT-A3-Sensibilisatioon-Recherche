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

const avatar1 = new AvatarCynthia(uuidv4(), "Cynthia World");

socket.on(EVENTS.connect, () => {
  log.info(`id: ${socket.id} connected!`);
});

/**
 * Lors de la connexion à la tour de contrôle
 * on envoie l'identité du monde (l'identifiant de la socket et le nom de notre monde)
 */
socket.on(EVENTS.CONTROL_TOWER.GENERAL.request, () => {
  log.info("📤 Sending informations...");

  socket.emit(EVENTS.CONTROL_TOWER.GENERAL.register, avatar1);
});

/**
 * Affichage du message de bienvenue reçu par la tour de contrôle
 */
socket.on(EVENTS.CONTROL_TOWER.GENERAL.welcome, (message) => {
  log.info(message);
});


/**
 * Arrivée d'un nouvel avatar
 */
socket.on(EVENTS.WORLD.TRAVEL.arriving_dest, (message) => {
  log.info(message);
});

/**
 * Départ d'un avatar étranger
 */
socket.on(EVENTS.WORLD.TRAVEL.leaving_dest, (message) => {
  log.info(message);
})