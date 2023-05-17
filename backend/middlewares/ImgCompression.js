const sharp = require("sharp");
const fs = require("fs");

module.exports = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const filename = req.file.filename;
  const newFilename = filename.split(".")[0] + "-compressed.jpg";
  const imagePath = "images/" + filename;
  const newImagePath = "images/" + newFilename;
  sharp(imagePath)
    .resize({ width: 300 })
    .toFile(newImagePath, (error) => {
      if (error) {
        return res.status(500).json({ error: error });
      }
      fs.unlink(imagePath, (error) => {
        if (error) {
          return res.status(500).json({ error: error });
        }
      });
      req.file.filename = newFilename;
      next();
    });
};
