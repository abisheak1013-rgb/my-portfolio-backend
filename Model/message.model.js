const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    secondname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);

