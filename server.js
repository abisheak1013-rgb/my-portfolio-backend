var express = require('express');
var mongoose = require('mongoose');
const UserRouter = require("./Routes/user.routes");
const OrderRouter = require("./Routes/order.routes");
const MessageRouter = require("./Routes/message.routes"); 
const cors = require('cors');
const app = express();
app.use(cors());



mongoose
  .connect("mongodb://0.0.0.0:27017/dp")
  .then(() => {
    console.log("MongoDB Is Connected");
  })
  .catch((error) => {
    console.log("MongoDB Is Not Connected");
    console.error(error);
  });

app.get("/", (request, response) => {
//   console.log("GET / route called");
  response.send("OK");
});


// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded data (if you expect form submissions)
app.use(express.urlencoded({ extended: true }));


app.use("/user", UserRouter);
app.use("/order", OrderRouter);
app.use("/message", MessageRouter);

app.listen(8080, () => {
  console.log("Server Is Running On Port 8080");
});






