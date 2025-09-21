import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URL);
  if (conn) {
    console.log(`📶 MonogoDB connected. \n`);
  }
};

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`📞 Server is listening on PORT ${PORT} \n`);
  connectDB();
});
