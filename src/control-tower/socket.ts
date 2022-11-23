import { Server, Socket } from "socket.io";
import log from "../utils/logger"

const EVENTS = {
  connection: 'connection'
}

const socket = ({ io }: { io: Server }) => {
  log.info(`Sockets enable`);

  io.on(EVENTS.connection, (socket: Socket) => {
    log.info(`user connected ${socket.id}`)
  })

};

export default socket;