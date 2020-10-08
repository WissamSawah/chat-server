const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatModule = new Schema({
    message: {
    type: String
    },
    user: {
    type: String
        },
    timeMsg: {
    type: String
        }
    },
        {
    timestamps: true
});

let Chat = mongoose.model("Chat", chatModule);
module.exports = Chat;
