const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Spot } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");

router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    console.log('hello1212')
    res.json();
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const spot = await Spot.create(req.body);
    res.json(spot);
  })
);

module.exports = router;
