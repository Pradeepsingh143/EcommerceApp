import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// morgan logger
app.use(morgan("tiny"));

// home route
app.use("/", (req, res) => {
  res.status(201).send("Hello, welcome to ecomm backend");
});

// use user routes
app.use("/auth", userRoutes);

export default app;
