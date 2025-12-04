const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderid: Number,
  description: String,
  totalprice: Number,
  userid: Number,
  orderStatus: String,
});
const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;