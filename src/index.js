import express from "express";
import connectDB from "./config/db.js";
import HANDLERS from "./handlers/index.js";
import errorMiddleware from "./middlewares/error.js";
import AUTH_ROUTER from "./handlers/auth.js";
import { authMiddleware } from "./middlewares/auth.js";


const APP_SERVER = express();
const PORT = process.env.PORT;

connectDB()
  .then(() => {})
  .catch(() => {})
  .finally(() => {});

APP_SERVER.get("/", (req, res) => {
  res.send("Welcome to Wander Wise");
});

APP_SERVER.use(express.json()); // Middleware to parse JSON bodies
APP_SERVER.use(authMiddleware);
APP_SERVER.use("/", HANDLERS);
APP_SERVER.use("/auth",AUTH_ROUTER); // Use the AUTH_ROUTER for /auth routes
APP_SERVER.use(errorMiddleware);

APP_SERVER.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});