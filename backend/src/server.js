const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
  })
);

const authRouter = require("./routers/authRouter");
const profileRouter = require("./routers/profileRoutes");
const taskRouter = require("./routers/taskRoutes");

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/task", taskRouter);

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on PORT: " + PORT);
    });
  })
  .catch((err) => {
    console.log("ERROR: " + err);
  });
