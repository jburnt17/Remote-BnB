const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { Comment, Spot } = require("../../db/models");

router.post(
  "/:spotId",
  asyncHandler(async (req, res) => {
    const spotId = req.params.spotId
    const comment = await Comment.create({
      userId: req.body.userId,
      spotId,
      content: req.body.comment
    });
    return res.json(comment);
  })
);

router.get(
  "/:spotId",
  asyncHandler(async (req, res) => {
    const spotId = req.params.spotId
    const comments = await Comment.findAll({
      where: {
        spotId: spotId
      }
    });
    console.log(comments)
    return res.json(comments);
  })
);



module.exports = router;
