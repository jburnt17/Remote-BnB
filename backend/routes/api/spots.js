const router = require('express').Router();
const asyncHandler = require("express-async-handler");
const { Spot } = require("../../db/models");

router.get('/', asyncHandler(async(req, res) => {
  const spots = await Spot.findAll();
  res.json(spots);
}))

module.exports = router;
