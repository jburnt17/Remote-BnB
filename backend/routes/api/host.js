const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { multipleMulterUpload, multiplePublicFileUpload } = require("../../awsS3");
const { Spot } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");

router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    res.json();
  })
);

router.post(
  "/",
  multipleMulterUpload("images"),
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const {
      userId,
      address,
      city,
      state,
      country,
      name,
      price,
      beds,
      baths,
    } = req.body;
    const images = await multiplePublicFileUpload(req.files);
    const spot = await Spot.create({
      userId,
      address,
      city,
      state,
      country,
      name,
      price,
      beds,
      baths,
      images
    });
    return res.json(spot);
  })
);

module.exports = router;
