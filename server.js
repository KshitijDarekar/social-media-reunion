import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);


app.get("/", (req, res) => {
  res.send("Hello World, from express.App is running !");
});

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Error = " + err.message);
  });

//Start server
const port = process.env.PORT || 3000;
const ip = process.env.IP || "0.0.0.0";

app.listen(port, ip, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
