import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import CustomError from "./utils/customError.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import couponRoutes from "./routes/couponRoutes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// morgan logger
app.use(morgan("tiny"));

// home route
app.use("/home", (_req, res) => {
  res.status(201).send("Hello, welcome to ecomm backend");
});

// use user routes
app.use("/api/auth", userRoutes);
// collection routes
app.use("/api/collection", collectionRoutes);
// coupon routes
app.use("/api/coupon", couponRoutes);

//handle custom error
app.use((err, _req, res, next) => {
  if (err instanceof CustomError) {
    res.status(400).json({
      message: err.message,
      code: err.code,
    });
  } else {
    next(err);
  }
});

export default app;
