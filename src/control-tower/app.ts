import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import log from '../utils/logger';
import { version } from '../../package.json';
import config from "../config/default";
import { v4 as uuidv4 } from 'uuid';

import socket from './socket';
import { WorldVic } from '../worlds/vic-world/model';
import { WorldCynthia } from '../worlds/cynthia-world/model';
import { ControlTower } from './ControlTower';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: config.corsOrigin,
		credentials: true,
	},
});

const worldVic = new WorldVic(uuidv4());
const worldCynthia = new WorldCynthia(uuidv4());

ControlTower.registerWorld(worldVic);
ControlTower.registerWorld(worldCynthia);

app.get('/', (_, res) =>
	res.send(`Server is up and running version ${version}`)
);

httpServer.listen(config.port, config.host, () => {
	log.info(`🚀 Server version ${version} is listening 🚀`);
	log.info(`http://${config.host}:${config.port}`);

	socket({ io });
});