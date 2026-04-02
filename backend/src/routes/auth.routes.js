const express = require("express");
const multer = require("multer");

const { registerUser, loginUser } = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../schema/user.schema");

const upload = multer();
const router = express.Router();

router.post(
  "/register",
  validate(userRegisterSchema),
  upload.none(),
  registerUser,
);
router.post("/login", validate(userLoginSchema), upload.none(), loginUser);

module.exports = router;
