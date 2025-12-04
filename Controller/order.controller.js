const OrderModel = require("../Model/order.model");
const mongoose = require("mongoose");

//const jwt = require("jsonwebtoken");
//const config = require("../config/config");//

// Register a new user
const Register = async (req, res) => {
  try {
    const { orderid, description, totalprice,userid,orderStatus } = req.body;
    const order = new OrderModel({ orderid, description, totalprice, userid, orderStatus });
    await order.save();
    res.status(201).send({
      message: "Order created successfully",
      success: true,
      status: true,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const Getallorders = async (req, res) => {
  try {
    const order = await OrderModel.find({}, { orderid: 1, _id: 0, "address.city":1 }).sort({orderid:-1})
    res.status(200).send({
      message: "Order fetched successfully",
      success: true,
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const Getorderbyid = async (req, res) => {
  try {
    const order = await OrderModel.findOne(
      // { orderid: req.params.id },
      { orderid: req.params.id ,orderStatus:req.params.status},
      { orderid: 1, _id: 0, description: 1 }
    );
    res.status(200).send({
      message: "Order fetched successfully",
      success: true,
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const Getorderbyobjectid = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id, {
      orderid: 1,
      _id: 0,
      description: 1,
    });
    res.status(200).send({
      message: "Order fetched successfully",
      success: true,
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const GetallordersUsingFilter = async (req, res) => {
  try {

    let filter = {};

    if (req.query.orderStatus) {
      filter.orderStatus = req.query.orderStatus;
    }
    if(req.query.userid){
      filter.userid = req.query.userid;
    }

    console.log("Filter:", filter);


    const order = await OrderModel.find(filter);
    res.status(200).send({
      message: "Order fetched successfully",
      success: true,
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
 
 const  Updatebyid = async (req,res)=>{
  try{
    const order = await OrderModel.findByIdAndUpdate(req.params.id, {
     description: req.body.description
    });
    res.status(200).send({
      message: "Order fetched successfully",
      success: true,
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
 }

  const  deletebyid = async (req,res)=>{
  try{
    const order = await OrderModel.findByIdAndDelete(req.params.id, {
     description: req.body.description
    });
    res.status(200).send({
      message: "Order deleted successfully",
      success: true,
      status: true,
      data: order,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
 }

module.exports = {
  Register,
  Getallorders,
  Getorderbyid,
  Getorderbyobjectid,
  GetallordersUsingFilter,
  Updatebyid,deletebyid
};
