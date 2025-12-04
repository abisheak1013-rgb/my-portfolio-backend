const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require("./routes/user.routes");
const OrderRouter = require("./routes/order.routes");
const MessageRouter = require("./routes/message.routes");
const cors = require('cors');
const app = express();
app.use(cors());  



const mongoUri = process.env.MONGO_URI || "mongodb://0.0.0.0:27017/dp";

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB Is Connected"))
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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Is Running On Port ${PORT}`);
});





