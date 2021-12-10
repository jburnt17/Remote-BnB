const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Booking } = require("../../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll();
    res.json(bookings);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const booking = await Booking.findByPk(req.params.id);
    await booking.destroy();
    return res.json(booking);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log("sdfsdfsdf");
    const booking = await Booking.create(req.body);
    res.json(booking);
  })
);

module.exports = router;
