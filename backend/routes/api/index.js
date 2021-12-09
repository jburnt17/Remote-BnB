const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const hostRouter = require("./host.js");
const spotsRouter = require("./spots.js");
const bookingRouter = require("./booking.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/host", hostRouter);

router.use("/spots", spotsRouter);

router.use("/booking", bookingRouter);

module.exports = router;
