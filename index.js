const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const routes = require("./api/endPoints");
app.use(express.json());

const corsConfig = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "upload-images-cloudinary.vercel.app",
  ],
  credentials: true, // Permitir enviar cookies
};
app.use(cors(corsConfig));
app.use("/api", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
