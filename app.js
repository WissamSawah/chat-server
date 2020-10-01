const express = require('express');
const app = express();
const cors = require('cors');
const servers = require('http').createServer(app);
const io = require('socket.io')(servers);
const time = require('./time.js');
const bodyParser = require("body-parser");
const socketPort = 9595;

io.origins(['https://wissamsawah.me:443']);
app.use(cors());

io.on('connection', function (socket) {
    console.log("User connected");

    msg = {timestamp: time.getTimeOfDay(), user: "", message: "A new user have arrived to the chat!"};

    io.emit("msgReceived", msg);

    socket.on('msgSend', function (clientData) {
        msg = {timestamp: time.getTimeOfDay(), user: clientData.user, message: clientData.message};
        io.emit('msgReceived', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

servers.listen(socketPort);
