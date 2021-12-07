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
    if (!spot) throw new Error("Cannot find spot...");
    const id = await Spot.destroy({ where: { id: spot.id } });
    return res.json({id})
  })
);

module.exports = router;
