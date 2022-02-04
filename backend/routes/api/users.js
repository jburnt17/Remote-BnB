const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

const router = express.Router();
// Fetch all users
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  })
);

// Sign up
router.post(
  "/",
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const image = await singlePublicFileUpload(req.file);
    const user = await User.signup({ email, username, password, image });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
