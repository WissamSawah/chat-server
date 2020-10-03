const express = require('express');
const app = express();
const cors = require('cors');
const servers = require('http').createServer(app);
const io = require('socket.io')(servers, );

const socketPort = 8300;

io.origins(['https://me-react.wissamsawah.me:443', 'http://localhost:3000'])


app.use(cors());

io.on('connection', function (socket) {

    socket.on('msgSend', function (clientData) {
        msg = {timestamp: new Date().toLocaleTimeString().split(0,5), user: "", message: "New user have landed to the chat!"};

        io.emit("msgReceived", msg);
        msg = {timestamp: new Date().toLocaleTimeString().split(0,5), user: clientData.user, message: clientData.message};
        io.emit('msgReceived', msg);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

servers.listen(socketPort);
