const Message = require("../Model/message.model");
const mongoose = require("mongoose");

const createMessage = async (req, res) => {   
    try {
        const newMessage = await Message.create( req.body);
        res.status(201).json({
            message: "Message created successfully",
            success: true, 
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllMessages = async (req, res) => {  
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    }   catch (error)   {
        res.status(500).json({ message: error.message });
    }   
}; 

module.exports = {
    createMessage,
    getAllMessages
};