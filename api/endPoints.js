const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
  uploadImage,
  getImages,
  deleteImage,
} = require("../controllers/imagesController");

router.post("/uploadImage", upload.single("file"), uploadImage);
router.get("/images", getImages);
router.delete("/image/:id", deleteImage);

module.exports = router;
