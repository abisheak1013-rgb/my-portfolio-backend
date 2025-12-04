const Message = require("../Model/message.model");
const SampleModel = require("../Model/sample.model")
const mongoose = require("mongoose");

const createSample = async (req, res) => {   
    try {
        const sample = await SampleModel.create( req.body);
        res.status(201).json({
            message: "Message created successfully",
            success: true, 
            data: sample
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
    createSample,
    getAllMessages
};