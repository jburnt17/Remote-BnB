const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const hostRouter = require("./host.js");
const spotsRouter = require("./spots.js");
const bookingRouter = require("./bookings.js");
const commentRouter = require("./comments.js");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/host", hostRouter);

router.use("/spots", spotsRouter);

router.use("/bookings", bookingRouter);

router.use("/comments", commentRouter);

module.exports = router;
