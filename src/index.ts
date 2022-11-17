import { Socket } from 'socket.io';

const options = { /* ... */ };
const io = require("socket.io")(options);

io.on("connection", (socket: Socket) => { console.log(socket.id) });

io.listen(3000);