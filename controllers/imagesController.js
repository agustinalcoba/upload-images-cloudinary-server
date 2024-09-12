const cloudinary = require("../utils/cloudinary");
const db = require("../modules/db");

module.exports.deleteImage = (req, res) => {
  console.log("deleting image");
  const { id } = req.params;
  console.log(id);
  db.query("SELECT * FROM images WHERE id = ?", [id], async (err, result) => {
    if (err) return res.status(400).send(err);
    if (result.length === 0) return res.status(404).send("Image not found");

    await cloudinary.uploader.destroy(result[0].public_id);
    db.query("DELETE FROM `images` WHERE id = ?", [id], (err, resultdb) => {
      if (err) return res.status(400).send(err);
      res.send({ message: "Image deleted successfully" });
    });
  });
};

module.exports.getImages = (req, res) => {
  db.query("SELECT * FROM `images`", (err, result) => {
    if (err) return res.status(400).send(err);

    if (result.length === 0) {
      res.status(200).send({});
      return;
    }
    const images = result.map((item) => {
      return {
        ...item, // Copiamos todos los campos originales
        url: cloudinary.url(item.public_id, {
          transformation: [
            { fetch_format: "auto", quality: "auto" },
            { width: 300, height: 300, gravity: "auto", crop: "fill" },
          ],
        }),
      };
    });

    res.status(200).json(images);
  });
};

module.exports.uploadImage = (req, res) => {
  console.log("uploading image...");
  const { name } = req.body;
  console.log("name", name);

  if (!name) return res.status(400).send("Please provide a name for the image");

  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) return res.status(400).send(err);

    console.log("Image uploaded successfully", result);

    db.query(
      "INSERT INTO `images`(`public_id`, `name`) VALUES (?,?)",
      [result.public_id, name],
      (err, resultdb) => {
        if (err) return res.status(400).send(err);
        console.log("Image inserted into database successfully", resultdb);
        res.send({
          data: result,
          url: cloudinary.url(result.public_id, {
            transformation: [{ fetch_format: "auto" }, { quality: "auto" }],
          }),
        });
      }
    );
  });
};
