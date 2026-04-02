const { error } = require('console');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|PDF/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (extName) {
    cb(null, true);
  } else {
    throw new Error("Unsupported file type. Only PDF files are allowed.");
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
