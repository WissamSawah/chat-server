const express = require('express');
const app = express();
const cors = require('cors');
const servers = require('http').createServer(app);
const io = require('socket.io')(servers, );

const socketPort = 8300;
const bodyParser = require("body-parser");

const Chat = require("./modules/chatModule");
const connect = require("./dbconnection");

io.origins(['https://me-react.wissamsawah.me:443', 'http://localhost:3000'])


app.use(cors());

io.on('connection', function (socket) {

    msg = {timestamp: new Date().toLocaleTimeString().split(0,5), user: "", message: "New user have landed to the chat!"};

    socket.on('msgSend', function (clientData) {

        io.emit("msgReceived", msg);
        msg = {timestamp: new Date().toLocaleTimeString().split(0,5), user: clientData.user, message: clientData.message};
        io.emit('msgReceived', msg);

        connect.then(db  =>  {
            console.log("Saving chat message");

            let chatMsg = new Chat({ message: clientData.message, user: clientData.user, timeMsg: new Date().toLocaleTimeString()});
            chatMsg.save();
        });
    });

    socket.on('getHistory', function (clientData) {
        connect.then(db  =>  {
            console.log("Getting chat history");
            Chat.find({}).then(chat => {
                io.emit('chatHistory', chat)
            });
        });
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

servers.listen(socketPort);
