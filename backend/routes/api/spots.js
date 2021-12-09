const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Spot } = require("../../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll();
    res.json(spots);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const spot = await Spot.findByPk(req.params.id);
    await spot.destroy();
    return res.json(spot);
  })
);

router.put(
  "/:id/edit",
  asyncHandler(async (req, res) => {
    const spot = await Spot.findByPk(req.params.id);
    const newSpot = await spot.update(req.body);
    res.json(newSpot);
  })
);

module.exports = router;
