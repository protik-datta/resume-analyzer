const express = require("express");
const multer = require("multer");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../schema/user.schema");
const { authMiddleware } = require("../middlewares/auth.middleware");

const upload = multer();
const router = express.Router();

router.post(
  "/register",
  upload.none(),
  validate(userRegisterSchema),
  registerUser,
);
router.post("/login", upload.none(), validate(userLoginSchema), loginUser);
router.get("/me", authMiddleware, getMe);

module.exports = router;
