import { io } from 'socket.io-client';
import EVENTS from '../../config/events';
import log from '../../utils/logger';
import config from '../../config/default';
import { v4 as uuidv4 } from 'uuid';
import { AvatarVic } from './model';
import { AvatarCynthia } from '../cynthia-world/model';

/**
 * ÉTAPE 0 :
 * Création de la socket, du monde et d'un premier avatar
 * Ajout de cet avatar au registre du monde
 */

const socket = io(`http://${config.host}:${config.port}`);

const avatar1 = new AvatarVic(uuidv4(), "Vic World", 'Avatar Test');

socket.on(EVENTS.connect, () => {
  log.info(`id: ${socket.id} connected!`);
});

/**
 * Lors de la connexion à la tour de contrôle
 * on envoie l'identité du monde (l'identifiant de la socket et le nom de notre monde)
 */
socket.on(EVENTS.CONTROL_TOWER.GENERAL.request, () => {
  log.info('📤 Sending informations...');

  socket.emit(EVENTS.CONTROL_TOWER.GENERAL.register, avatar1);
});

/**
 * Affichage du message de bienvenue reçu par la tour de contrôle
 *
 * ÉTAPE 1 : Demande d'autorisation pour voyager vers un autre monde
 */
socket.on(EVENTS.CONTROL_TOWER.GENERAL.welcome, (message) => {
  log.info(message);

  log.info(`🧐 ${avatar1.pseudo} asking to visit Cynthia World...`);
  socket.emit(EVENTS.WORLD.AUTHORIZATION.request, avatar1, 'Cynthia World'); // ajouter les information de l'avatar
});

/**
 * ÉTAPE 2 : Réception de la réponse de la tour de contrôle
 */

socket.on(EVENTS.CONTROL_TOWER.AUTHORIZATION.unvalaible, (message) => {
  log.error(message);
});

socket.on(EVENTS.CONTROL_TOWER.AUTHORIZATION.forbidden, (message) => {
  log.error(message);
})

socket.on(
  EVENTS.CONTROL_TOWER.AUTHORIZATION.allowed,
  (message, destinationName) => {
    log.info(message);
    // réception du modèle de l'avatar

    log.info(`🛫 ${avatar1.pseudo} is leaving!`);
    /**
     * ÉTAPE 3 : départ pour le monde de destination
     */
    // préparation de l'avatar pour le changement de monde
    const tmpAvatar = AvatarCynthia.toCynthiaWorld(avatar1);
    socket.emit(
      EVENTS.WORLD.TRAVEL.leaving_origin,
      destinationName,
      tmpAvatar
    );
  }
);

socket.on(EVENTS.WORLD.TRAVEL.arriving_dest, (destinationName) => {
  socket.emit(
    EVENTS.WORLD.TRAVEL.leaving_dest,
    avatar1,
    destinationName
  );
});

socket.on(EVENTS.WORLD.TRAVEL.returning_origin, (message) => {
  log.info(message);
});
