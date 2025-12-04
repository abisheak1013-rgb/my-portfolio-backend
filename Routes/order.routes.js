const express = require("express");
const router = express.Router();

const OrderControllers = require("../Controller/order.controller");
// Register and login routes
router.post("/register", OrderControllers.Register);
router.get("/getallorders",OrderControllers.Getallorders );
router.get("/getorderbyid/:id",OrderControllers.Getorderbyid);
router.get("/getorderbyobjectid/:id",OrderControllers.Getorderbyobjectid);
router.get("/getallorderusingfilter",OrderControllers.GetallordersUsingFilter);
router.put("/updatebyid/:id",OrderControllers.Updatebyid);
router.delete("/deletebyid/:id",OrderControllers.deletebyid);
module.exports = router;