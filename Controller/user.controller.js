const UserModel = require("../Model/user.model");
const mongoose = require("mongoose");
const SampleModel = require("../Model/sample.model");
const jwt = require("jsonwebtoken");
//const jwt = require("jsonwebtoken");
//const config = require("../config/config");//

// Register a new user
const Register = async (req, res) => {
  try {
    const {
      id,
      firstname,
      secondname,
      message,
      age,
      hobbies,
      address,
      email,
      phone,
      password, 
      gender,
    } = req.body;
    const user = new UserModel({
      id,
      firstname,
      secondname,
      message,
      age,
      hobbies,
      password,
      address,
      email,
      phone,
      gender,
    });
    await user.save();
    res.status(200).send({
      message: "User registered successfully",
      success: true,
      status: true,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const Findalluser = async (req, res) => {
  try {
    // const user = await UserModel.find();
    // Text index example
    const user = await SampleModel.find({$text:{$search:"dev"}});
    // const user = await SampleModel.find({message:"dev"});


    res.status(200).send({
      message: "User fetched successfully",
      success: true,
      status: true,
      data: user,
    });
    // res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email});
    
    if (!user || await user.comparePassword(req.body.password) === false ) {
      
      return res.status(401).send({ message: "login unsuccessful"});
    } else {
      return res.status(200).send({ message: "login successful" ,token: token ,userId: user._id});
    }}
  catch (error) {
    res.status(500).send({ message: error.message });
  }   
};

const aggregate = async (req, res) => {
  try {
    const result = await UserModel.aggregate([
      { $match: { age: { $gte: 25 } } },
      // { $match: { hobbies: { $in:[ req.query.hobbies] } } },
      { $group: { _id: "$gender", averageAge: { $avg: "$age" } } },
      // { $group: { _id: "$gender", averageAge: { $avg: "$age" } } },
    ]);
    res.status(200).send({
      message: "User fetched successfully",
      success: true,
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  Register,
  Findalluser,
  aggregate,
  Login,
};
