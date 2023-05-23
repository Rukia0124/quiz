const multer = require("multer");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};
const storage = multer.diskStorage({
  destination: (res, file, callback) => {
    callback(null, "Images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    const finalFileName = name + Date.now() + "." + extension;
    callback(null, finalFileName);
  },
});

module.exports = multer({ storage }).array("images", 4);
