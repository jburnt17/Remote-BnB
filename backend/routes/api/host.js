const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Spot } = require("../../db/models");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const spot = await Spot.create(req.body);
    res.json(spot);
  })
);

module.exports = router;
