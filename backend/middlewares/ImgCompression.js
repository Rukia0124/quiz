const sharp = require("sharp");
const fs = require("fs");

module.exports = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const filePath = req.file.path;
  const newFilename = req.file.filename.split(".")[0] + "-compressed.jpg";
  const newFilePath = filePath.replace(req.file.filename, newFilename);

  sharp(filePath)
    .resize({ width: 300 })
    .toFile(newFilePath, (error) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      fs.unlink(filePath, (error) => {
        if (error) {
          console.error("Error deleting original image:", error);
        }
        req.file.filename = newFilename;
        next();
      });
    });
};
