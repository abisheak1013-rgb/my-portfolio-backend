const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../Routes/Middleware/middleware");

const UserControllers = require("../Controller/user.controller");
const SamepleControllers = require("../Controller/sample.controller");

// Register and login routes
router.get("/userAggregate", UserControllers.aggregate);

// quick ping to verify router mounting
router.get("/ping", (req, res) => {
	res.status(200).send({ message: "user router ok" });
});

router.post("/register", UserControllers.Register);
router.get("/findalluserss/:id", authenticateJWT,UserControllers.Findalluser);
router.get("/findalluser",UserControllers.Findalluser);
router.post("/createSample",SamepleControllers.createSample);



router.post("/login",UserControllers.Login);

module.exports = router;
