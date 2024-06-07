import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "./uploads/";
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/api/v1/post/uploaded", upload.single("image"), (req, res) => {
  res.json({ filePath: req.file.filename });
});

app.post("/api/v1/post/upload", upload.single("image"), (req, res) => {
  res.json({ filePath: req.file.path });
});




app.use("/api/v1/post", postRoutes);

app.listen(port, () => console.log(`Server listening on ${port}`));
