"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = { /* ... */};
const io = require("socket.io")(options);
io.on("connection", (socket) => { console.log(socket.id); });
io.listen(3000);
