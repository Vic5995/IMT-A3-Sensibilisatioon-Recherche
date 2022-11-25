import { io } from 'socket.io-client';
import EVENTS from '../../config/events';
import log from '../../utils/logger';
import config from '../../config/default';
import { v4 as uuidv4 } from 'uuid';
import { AvatarVic, WorldVic } from './model';

/**
 * ÉTAPE 0 :
 * Création de la socket, du monde et d'un premier avatar
 * Ajout de cet avatar au registre du monde
 */

const socket = io(`http://${config.host}:${config.port}`);

const avatar1 = new AvatarVic(uuidv4(), 'Vic World', 'Avatar Dead');

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
});

socket.on(EVENTS.WORLD.TRAVEL.returning_origin, (message) => {
  log.info(message);
});