import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import log from '../utils/logger';
import { version } from '../../package.json';
import config from "../config/default";

import socket from './socket';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: config.corsOrigin,
		credentials: true,
	},
});

app.get('/', (_, res) =>
	res.send(`Server is up and running version ${version}`)
);

httpServer.listen(config.port, config.host, () => {
	log.info(`🚀 Server version ${version} is listening 🚀`);
	log.info(`http://${config.host}:${config.port}`);

	socket({ io });
});