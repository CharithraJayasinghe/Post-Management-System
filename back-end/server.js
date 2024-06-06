import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";


dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/v1/post", postRoutes);


app.listen(port, () => console.log(`Server listening on ${port}`));
